---
layout: "../../layouts/BlogPost.astro"
title: "Lambda Performance Comparison Golang vs Java"
description: "Compare performance of AWS Lambda written in Golang vs Java."
pubDate: "Jan 12 2025"
heroImage: "/blog-assets/lambda-benchmark/lambda-benchmark-logo.png"
---

## Introduction

**AWS Lambda** enables developers to focus on solving customer problems by abstracting server management and scaling, with a pay-as-you-go pricing model that makes it ideal for testing new ideas.

Choosing the right language and runtime for Lambda is critical, as it affects cold start times, execution speed, and memory usage. There’s no one-size-fits-all solution; the choice depends on trade-offs aligned with the specific use case.

In this blog post, we’ll compare **Golang and Java** for building AWS Lambda functions.

## Key Performance Metrics

We will mainly focus on the following key metrics in evaluating lambda performance.

### Cold Start Time

Whenever the function is invoked for an execution, AWS has to provision an execution
environment configured with the runtime which is declared by user, with all the configurations.

All of this provisioning is called as [`INIT`](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html) phase of the lambda function.

The duration of the `INIT` phase is commonly referred to as the cold start time for the function.

### Execution Time

Total execution duration of function. This infamously also includes the time in which your runtime is getting initialised
which can be slow for certain languages.

### Memory Allocation

The amount of memory which will be used by the function during the invocation.

## Test Bench

We will use the following infrastructure for benchmarking the performance of Lambda.  have kept the code as close as possible to typical day-to-day examples.

<img class="bg-clip-border rounded-lg" width="720" height="360" src="/blog-assets/lambda-benchmark/lambda-benchmark.png" alt="Lambda Benchmark Test Bench" />

<details>
<summary>Benchmarking Note #1</summary>

> INFO: Java functions have increased execution timeout of 60 seconds, as 3 seconds was not working on test bench.
> To have parity `Golang` functions were executed once with 3 seconds timeout and 60 seconds timeout.

</details>

## Performance Comparison: Golang vs Java

I used the following script to generate load on the API endpoint. It is using [`k6`](https://k6.io/) to gradually rampup up the connections
and number of virtual users to the endpoint.

```javascript
import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus: 2,
    stages: [
        { duration: "30s", target: 20 },
        { duration: "1m30s", target: 10 },
        { duration: "20s", target: 0 },
    ],
};

export default function () {
    // Making a call to endpoint
    http.get(__ENV.API_ENDPOINT);

    // Sleeping for 1 second to simulate real world traffic
    sleep(1);
}
```

<details>
<summary>Golang code</summary>

```go
package main

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/kms"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var (
	s3Client  *s3.Client
	kmsClient *kms.Client
)

func init() {
	// Initialize the S3 client outside of the handler, during the init phase
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	s3Client = s3.NewFromConfig(cfg)
	kmsClient = kms.NewFromConfig(cfg)
}

func uploadReceiptToS3(ctx context.Context, bucketName string, key string, content []byte) error {
	_, err := s3Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket: &bucketName,
		Key:    &key,
		Body:   bytes.NewReader(content),
	})
	if err != nil {
		log.Printf("Failed to upload receipt to S3: %v", err)
		return err
	}
	return nil
}

func getRandomId() (string, error) {
	randBytes := make([]byte, 16)
	_, err := rand.Read(randBytes)
	if err != nil {
		log.Printf("Error while creating random bits %v\n", err)
		return "", err
	}

	randomId := hex.EncodeToString(randBytes)
	return randomId, nil
}

func getFile(ctx context.Context, bucketName string, key string) ([]byte, error) {
	result, err := s3Client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: &bucketName,
		Key:    &key,
	})
	if err != nil {
		log.Printf("Received error while get object %v", err)
		return nil, err
	}
	defer result.Body.Close()
	body, err := io.ReadAll(result.Body)
	if err != nil {
		log.Printf("Error while reading bytes from output %v\n", err)
		return nil, err
	}

	return body, nil
}

func encryptContent(ctx context.Context, keyId string, content []byte) ([]byte, error) {
	encOut, err := kmsClient.Encrypt(ctx, &kms.EncryptInput{
		KeyId:     &keyId,
		Plaintext: content,
	})
	if err != nil {
		log.Printf("Unable to encrypt the object from kms %v\n", err)
		return nil, err
	}

	return encOut.CiphertextBlob, nil
}

type Response struct {
	Body string `json:"body"`
}

func handleRequest(ctx context.Context) (*Response, error) {
	fileLocationBucket := os.Getenv("FILE_LOCATION_BUCKET")
	if fileLocationBucket == "" {
		log.Printf("FILE_LOCATION_BUCKET environment variable is not set")
		return &Response{}, fmt.Errorf(
			"missing required environment variable FILE_LOCATION_BUCKET",
		)
	}

	fileName := os.Getenv("FILE_NAME")
	if fileName == "" {
		log.Printf("FILE_NAME environment variable is not set")
		return &Response{}, fmt.Errorf("missing required environment variable FILE_NAME")
	}

	keyId := os.Getenv("KEY_ID")
	if keyId == "" {
		log.Printf("KEY_ID environment variable is not set")
		return &Response{}, fmt.Errorf("missing required environment variable KEY_ID")
	}

	uploadBucket := os.Getenv("UPLOAD_BUCKET")
	if uploadBucket == "" {
		log.Printf("UPLOAD_BUCKET environment variable is not set")
		return &Response{}, fmt.Errorf("missing required environment variable UPLOAD_BUCKET")
	}

	fileData, err := getFile(ctx, fileLocationBucket, fileName)
	if err != nil {
		return &Response{}, fmt.Errorf("Unable to fetch file from S3")
	}

	encText, err := encryptContent(ctx, keyId, fileData)
	if err != nil {
		return &Response{}, fmt.Errorf("Unable to encrypt the content using KMS")
	}

	randomId, err := getRandomId()
	if err != nil {
		return &Response{}, fmt.Errorf("Unable to generate the random id")
	}

	err = uploadReceiptToS3(
		ctx,
		uploadBucket,
		randomId,
		encText,
	)
	if err != nil {
		return &Response{}, fmt.Errorf("Unable to upload the encrypted file to S3")
	}

	response := Response{Body: randomId}
	log.Printf("Response returned %v\n", response)
	return &response, nil
}

func main() {
	lambda.Start(handleRequest)
}
```
</details>


<details>
<summary>Java Code</summary>

```java
package org.example;

import java.io.IOException;
import java.security.SecureRandom;

import com.amazonaws.services.lambda.runtime.Context;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.http.SdkHttpClient;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.kms.KmsClient;
import software.amazon.awssdk.services.kms.model.EncryptRequest;
import software.amazon.awssdk.services.kms.model.EncryptResponse;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

public class App {
    private static S3Client s3Client;
    private static KmsClient kmsClient;
    private static SdkHttpClient httpClient = UrlConnectionHttpClient.create();
    private static Region deployRegion = Region.AP_SOUTH_1;

    static {
        s3Client = S3Client.builder()
                .region(deployRegion)
                .httpClient(httpClient)
                .build();

        kmsClient = KmsClient.builder()
                .region(deployRegion)
                .httpClient(httpClient)
                .build();
    }

    private static byte[] fetchFileFromS3(String fileLocationBucket, String fileName) throws IOException {
        ResponseInputStream<GetObjectResponse> respObject = s3Client.getObject(GetObjectRequest.builder()
                .bucket(fileLocationBucket)
                .key(fileName)
                .build());
        return respObject.readAllBytes();
    }

    private static byte[] encryptFile(String keyId, byte[] content) {
        EncryptResponse response = kmsClient.encrypt(EncryptRequest.builder()
                .keyId(keyId)
                .plaintext(SdkBytes.fromByteArray(content))
                .build());
        return response.ciphertextBlob().asByteArray();
    }

    private static String getRandomId() {
        // Generate 16 random bytes
        byte[] randBytes = new byte[16];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randBytes);

        // Convert to hex string
        StringBuilder hexString = new StringBuilder();
        for (byte b : randBytes) {
            hexString.append(String.format("%02x", b));
        }

        return hexString.toString();
    }

    private static void uploadEncryptedFile(String uploadBucket, String fileId, byte[] content) {
        s3Client.putObject(PutObjectRequest.builder()
                .bucket(uploadBucket)
                .key(fileId)
                .build(), RequestBody.fromBytes(content));
    }

    public String handleRequest(Context context) {
        String fileLocationBucket = System.getenv("FILE_LOCATION_BUCKET");
        String fileName = System.getenv("FILE_NAME");
        String keyId = System.getenv("KEY_ID");
        String uploadBucket = System.getenv("UPLOAD_BUCKET");

        try {
            // Fetch the file from s3 bucket.
            byte[] fileByte = fetchFileFromS3(fileLocationBucket, fileName);
            // Encrypt the file from keyId
            byte[] encryptedFile = encryptFile(keyId, fileByte);
            // Random id for every upload
            String randomId = getRandomId();
            // Upload the encrypted file to upload bucket.
            uploadEncryptedFile(uploadBucket, randomId, encryptedFile);
            return randomId;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failure while executing lambda");
        }
    }
}
```
</details>



### Cold Start Time Values

<div class="table-scroll-container">

| Type                                | Invocations | Cold Start Count | Average Init Duration (in ms) | Minimum Init Duration (in ms) | Maximum Init Duration (in ms) |
| :---------------------------------- | ----------: | ---------------: | ----------------------------: | ----------------------------: | ----------------------------: |
| Golang (128 MB, 3 second timeout)   |        1621 |                4 |                       141.035 |                        136.61 |                        145.25 |
| Golang (256 MB, 3 second timeout)   |        1614 |                5 |                        141.57 |                        138.41 |                        145.36 |
| Golang (512 MB, 3 second timeout)   |        1601 |                9 |                       142.089 |                        137.27 |                        149.58 |
| Golang (1024 MB, 3 second timeout)  |        1633 |                6 |                       140.905 |                        137.27 |                        149.62 |
| Golang (2048 MB, 3 second timeout)  |        1494 |                8 |                       134.963 |                        128.73 |                        140.55 |
| Golang (128 MB, 60 second timeout)  |        1553 |               12 |                       140.097 |                        134.12 |                        146.12 |
| Golang (256 MB, 60 second timeout)  |        1646 |                5 |                       140.308 |                        136.87 |                        144.53 |
| Golang (512 MB, 60 second timeout)  |        1644 |                5 |                        140.33 |                        134.86 |                        144.32 |
| Golang (1024 MB, 60 second timeout) |        1637 |                4 |                        138.42 |                        133.78 |                        147.45 |
| Golang (2048 MB, 60 second timeout) |        1633 |                4 |                        139.71 |                        134.78 |                        146.33 |
| Java (128 MB, 60 second timeout)    |        1278 |               11 |                       1650.81 |                       1612.64 |                       1687.69 |
| Java (256 MB, 60 second timeout)    |        1493 |                7 |                       1712.04 |                       1588.02 |                       1794.87 |
| Java (512 MB, 60 second timeout)    |        1576 |                7 |                       1707.03 |                       1601.66 |                       1770.89 |
| Java (1024 MB, 60 second timeout)   |        1610 |                5 |                       1735.72 |                       1703.04 |                       1766.08 |
| Java (2048 MB, 60 second timeout)   |        1496 |                9 |                       1504.65 |                       1453.95 |                       1556.83 |

</div>

#### Insights around Cold Start Times

1. **Golang has a significantly lower and more stable cold start times** (regardless of memory or timeout) as compared to Java.
1. **Java has much higher cold start times**, averaging over 1500 ms, and these times increase with memory, though they slightly decrease at higher memory settings.
1. Memory does not affect Golang cold starts much, but in **Java, cold start times are noticeably impacted by memory size**.
1. Function timeout does not have any impact on the cold start times.

### Maximum Memory Consumption

<div class="table-scroll-container">

| Type                                | Invocations | Provisioned Memory MB | Smallest Memory Request MB | Avg Memory Used MB | Max Memory Used MB | Over Provisioned MB |
| :---------------------------------- | ----------: | --------------------: | -------------------------: | -----------------: | -----------------: | ------------------: |
| Golang (128 MB, 3 second timeout)   |        1621 |                122.07 |                     41.008 |            43.3136 |             43.869 |             78.2013 |
| Golang (256 MB, 3 second timeout)   |        1614 |               244.141 |                     41.008 |            42.9815 |             43.869 |             200.272 |
| Golang (512 MB, 3 second timeout)   |        1601 |               488.281 |                    44.8227 |            50.1087 |            52.4521 |             435.829 |
| Golang (1024 MB, 3 second timeout)  |        1633 |               976.562 |                    44.8227 |            49.8118 |            52.4521 |              924.11 |
| Golang (2048 MB, 3 second timeout)  |        1494 |               1953.12 |                     43.869 |            49.6064 |            51.4984 |             1901.63 |
| Golang (128 MB, 60 second timeout)  |        1553 |                122.07 |                     41.008 |            42.7416 |             43.869 |             78.2013 |
| Golang (256 MB, 60 second timeout)  |        1646 |               244.141 |                     41.008 |            43.1564 |             43.869 |             200.272 |
| Golang (512 MB, 60 second timeout)  |        1644 |               488.281 |                     43.869 |            49.6328 |            52.4521 |             435.829 |
| Golang (1024 MB, 60 second timeout) |        1637 |               976.562 |                     43.869 |            49.9721 |            52.4521 |              924.11 |
| Golang (2048 MB, 60 second timeout) |        1633 |               1953.12 |                    44.8227 |             51.176 |            53.4058 |             1899.72 |
| Java (128 MB, 60 second timeout)    |        1278 |                122.07 |                    114.441 |            116.374 |            118.256 |              3.8147 |
| Java (256 MB, 60 second timeout)    |        1493 |               244.141 |                    159.264 |            164.164 |            166.893 |             77.2476 |
| Java (512 MB, 60 second timeout)    |        1576 |               488.281 |                     158.31 |            168.201 |            173.569 |             314.712 |
| Java (1024 MB, 60 second timeout)   |        1610 |               976.562 |                    161.171 |            170.339 |            175.476 |             801.086 |
| Java (2048 MB, 60 second timeout)   |        1496 |               1953.12 |                    169.754 |            176.334 |            182.152 |             1770.97 |

</div>

#### Insights around Memory Consumption

1. **Java has much higher memory usage**, with a noticeable increase in memory usage as memory provisioned increases. This is expected as there is JVM's inherent overhead.
1. **Golang uses significantly less memory** than it is allocated. It more or less uses the same amount of memory across varied memory settings.
1. **Java average memory usage increases linearly** as the amount of memory provisioned increases.

### Billed Duration

<div class="table-scroll-container">

| Type                                | Invocations | Max Billd Duration ms | Min Billed Duration ms | Avg Billed Duration ms | p99 Billed Duration ms | p95 Billed Duration ms | p50 Billed Duration ms |
| :---------------------------------- | ----------: | --------------------: | ---------------------: | ---------------------: | ---------------------: | ---------------------: | ---------------------: |
| Golang (128 MB, 3 second timeout)   |        1621 |                  1783 |                     38 |                64.8723 |                195.852 |                95.9396 |                54.9815 |
| Golang (256 MB, 3 second timeout)   |        1614 |                   898 |                     38 |                58.1524 |                    122 |                     91 |                     48 |
| Golang (512 MB, 3 second timeout)   |        1601 |                   553 |                     37 |                61.2573 |                131.968 |                101.971 |                50.9597 |
| Golang (1024 MB, 3 second timeout)  |        1633 |                   371 |                     39 |                59.4403 |                    124 |                     98 |                     51 |
| Golang (2048 MB, 3 second timeout)  |        1494 |                   425 |                     37 |                57.7142 |                    124 |                     94 |                     49 |
| Golang (128 MB, 60 second timeout)  |        1553 |                  1681 |                     36 |                71.9581 |                271.836 |                95.9396 |                51.9886 |
| Golang (256 MB, 60 second timeout)  |        1646 |                   840 |                     38 |                 55.791 |                    117 |                     86 |                     47 |
| Golang (512 MB, 60 second timeout)  |        1644 |                   482 |                     35 |                54.6296 |                    110 |                     84 |                     48 |
| Golang (1024 MB, 60 second timeout) |        1637 |                   379 |                     37 |                57.1539 |                122.927 |                95.9396 |                47.9935 |
| Golang (2048 MB, 60 second timeout) |        1633 |                   346 |                     37 |                57.4091 |                    118 |                     92 |                     49 |
| Java (128 MB, 60 second timeout)    |        1278 |                 14418 |                    123 |                363.793 |                1360.21 |                466.812 |                201.814 |
| Java (256 MB, 60 second timeout)    |        1493 |                  6642 |                     49 |                134.787 |                489.754 |                202.825 |                85.9507 |
| Java (512 MB, 60 second timeout)    |        1576 |                  3137 |                     46 |                87.4061 |                273.744 |                122.927 |                64.9692 |
| Java (1024 MB, 60 second timeout)   |        1610 |                  1549 |                     45 |                69.7478 |                143.957 |                101.971 |                57.9726 |
| Java (2048 MB, 60 second timeout)   |        1496 |                   828 |                     46 |                 71.607 |                149.979 |                 104.97 |                60.9434 |

</div>

#### Insights around Billed Duration

1. **Golang billed durations are much lower** as compared to Java's across all the memory configurations.
1. **Memory scaling affects Java's performance** more significantly than Golang's. Java's billed durations decrease with higher memory allocations.
1. **Max billed duration in Java is very high** compared to Golang, which is expected due to overhead of JVM initialization, garbage collection, and other internal processes.

### Cost

<div class="table-scroll-container">

| Configuration                       | Invocations | Avg Billed Duration (ms) | Memory (MB) | Cost for Requests (USD) | Cost for Duration (USD) | Total Cost (USD) |
| :---------------------------------- | ----------: | -----------------------: | ----------: | ----------------------: | ----------------------: | ---------------: |
| Golang (128 MB, 3 second timeout)   |        1621 |                    64.87 |         128 |               0.0003242 |                0.000137 |        0.0004612 |
| Golang (256 MB, 3 second timeout)   |        1614 |                    58.15 |         256 |               0.0003228 |                0.000147 |        0.0004698 |
| Golang (512 MB, 3 second timeout)   |        1601 |                    61.26 |         512 |               0.0003202 |                0.000214 |        0.0005342 |
| Golang (1024 MB, 3 second timeout)  |        1633 |                    59.44 |        1024 |               0.0003266 |                0.000341 |        0.0006676 |
| Golang (2048 MB, 3 second timeout)  |        1494 |                    57.71 |        2048 |               0.0002988 |                 0.00052 |        0.0008188 |
| Golang (128 MB, 60 second timeout)  |        1553 |                    71.96 |         128 |               0.0003106 |                0.000147 |        0.0004576 |
| Golang (256 MB, 60 second timeout)  |        1646 |                    55.79 |         256 |               0.0003292 |                0.000147 |        0.0004762 |
| Golang (512 MB, 60 second timeout)  |        1644 |                    54.63 |         512 |               0.0003288 |                0.000213 |        0.0005418 |
| Golang (1024 MB, 60 second timeout) |        1637 |                    57.15 |        1024 |               0.0003274 |                0.000339 |        0.0006664 |
| Golang (2048 MB, 60 second timeout) |        1633 |                    57.41 |        2048 |               0.0003266 |                0.000518 |        0.0008446 |
| Java (128 MB, 60 second timeout)    |        1278 |                   363.79 |         128 |               0.0002556 |                0.001936 |        0.0021916 |
| Java (256 MB, 60 second timeout)    |        1493 |                   134.79 |         256 |               0.0002986 |                0.000687 |        0.0009865 |
| Java (512 MB, 60 second timeout)    |        1576 |                    87.41 |         512 |               0.0003152 |                0.000766 |        0.0010812 |
| Java (1024 MB, 60 second timeout)   |        1610 |                    69.75 |        1024 |                0.000322 |                0.001142 |        0.0014642 |
| Java (2048 MB, 60 second timeout)   |        1496 |                    71.61 |        2048 |               0.0002992 |                0.001532 |        0.0018312 |

</div>

#### Insights around Cost

1. **Golang incurs much lower cost as compared to Java**, while maintaining greater throughput as compared to Java.
1. **Java cost decreases with increasing memory**, which is expected as more resources are available to JVM for optimal usage and performance.

## Conclusion

Benchmarking shows that **Golang** offers a **better performance-to-cost** ratio than Java for AWS Lambda functions, with faster execution, lower memory usage, and more consistent performance.

However, the JVM ecosystem has introduced improvements like GraalVM’s AOT Compilation and SnapStart, which address Java's cold start issues. I plan to explore these advancements further to evaluate their impact on Java's performance and competitiveness with Golang in serverless environments.