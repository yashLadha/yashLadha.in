---
layout: "../../layouts/BlogPost.astro"
title: "Lambda Performance Comparison Go vs Java"
description: "Compare performance of AWS Lambda with Golang vs Java."
pubDate: "Jan 07 2025"
---

# Introduction

# AWS Lambda Overview

# Key Performance Metrics

# Golang for AWS Lambda

# Java for AWS Lambda

# Performance Comparison: Golang vs Java

# Best practices for performance optimisation

# Conclusion

# Golang lambda performance (128 MB)
```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 390 kB 2.8 kB/s
     data_sent......................: 70 kB  500 B/s
     http_req_blocked...............: avg=1.63ms   min=0s      med=2µs      max=228.3ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=709.48µs min=0s      med=0s       max=89.64ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=124.87ms min=87.05ms med=114.18ms max=1.93s   p(90)=140.82ms p(95)=152.21ms
       { expected_response:true }...: avg=124.87ms min=87.05ms med=114.18ms max=1.93s   p(90)=140.82ms p(95)=152.21ms
     http_req_failed................: 0.00%  0 out of 1622
     http_req_receiving.............: avg=211.01µs min=10µs    med=147µs    max=18.71ms p(90)=296µs    p(95)=466.84µs
     http_req_sending...............: avg=448.54µs min=23µs    med=344µs    max=15.47ms p(90)=761.1µs  p(95)=1.17ms
     http_req_tls_handshaking.......: avg=808.94µs min=0s      med=0s       max=94.88ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=124.21ms min=86.9ms  med=113.53ms max=1.93s   p(90)=140.2ms  p(95)=151.53ms
     http_reqs......................: 1622   11.550727/s
     iteration_duration.............: avg=1.12s    min=1.08s   med=1.11s    max=3.17s   p(90)=1.14s    p(95)=1.16s
     iterations.....................: 1622   11.550727/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.4s), 00/20 VUs, 1622 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Golang lambda performance (256 MB)
```

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 390 kB 2.8 kB/s
     data_sent......................: 70 kB  500 B/s
     http_req_blocked...............: avg=1.78ms   min=0s      med=1µs      max=253.18ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=730.56µs min=0s      med=0s       max=89.88ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=124.69ms min=90.55ms med=115.91ms max=1.14s    p(90)=143.85ms p(95)=171.12ms
       { expected_response:true }...: avg=124.69ms min=90.55ms med=115.91ms max=1.14s    p(90)=143.85ms p(95)=171.12ms
     http_req_failed................: 0.00%  0 out of 1623
     http_req_receiving.............: avg=180.67µs min=9µs     med=83µs     max=19.92ms  p(90)=201.8µs  p(95)=315.89µs
     http_req_sending...............: avg=276.13µs min=22µs    med=196µs    max=6.93ms   p(90)=455.8µs  p(95)=615.19µs
     http_req_tls_handshaking.......: avg=940.96µs min=0s      med=0s       max=187.42ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=124.24ms min=90.22ms med=115.53ms max=1.14s    p(90)=143.44ms p(95)=170.43ms
     http_reqs......................: 1623   11.548803/s
     iteration_duration.............: avg=1.12s    min=1.09s   med=1.11s    max=2.33s    p(90)=1.14s    p(95)=1.18s
     iterations.....................: 1623   11.548803/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.5s), 00/20 VUs, 1623 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Golang lambda performance (512 MB)
```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 394 kB 2.8 kB/s
     data_sent......................: 71 kB  505 B/s
     http_req_blocked...............: avg=1.5ms    min=0s      med=1µs      max=182.27ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=636.44µs min=0s      med=0s       max=70.11ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=112.74ms min=87.46ms med=107.91ms max=687.93ms p(90)=128.33ms p(95)=136.9ms
       { expected_response:true }...: avg=112.74ms min=87.46ms med=107.91ms max=687.93ms p(90)=128.33ms p(95)=136.9ms
     http_req_failed................: 0.00%  0 out of 1644
     http_req_receiving.............: avg=154.71µs min=11µs    med=115µs    max=3.92ms   p(90)=215µs    p(95)=327.24µs
     http_req_sending...............: avg=344.67µs min=20µs    med=285µs    max=7.34ms   p(90)=510µs    p(95)=735.64µs
     http_req_tls_handshaking.......: avg=755.83µs min=0s      med=0s       max=84.57ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=112.24ms min=87.26ms med=107.32ms max=687.77ms p(90)=127.9ms  p(95)=135.99ms
     http_reqs......................: 1644   11.701927/s
     iteration_duration.............: avg=1.11s    min=1.08s   med=1.1s     max=1.87s    p(90)=1.13s    p(95)=1.14s
     iterations.....................: 1644   11.701927/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.5s), 00/20 VUs, 1644 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Golang lambda performance (1024 MB)
```

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 392 kB 2.8 kB/s
     data_sent......................: 71 kB  501 B/s
     http_req_blocked...............: avg=1.48ms   min=0s      med=1µs      max=162.63ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=651.61µs min=0s      med=0s       max=63.33ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=115.92ms min=89.91ms med=111.99ms max=616.29ms p(90)=131.29ms p(95)=139.56ms
       { expected_response:true }...: avg=115.92ms min=89.91ms med=111.99ms max=616.29ms p(90)=131.29ms p(95)=139.56ms
     http_req_failed................: 0.00%  0 out of 1635
     http_req_receiving.............: avg=163.92µs min=13µs    med=119µs    max=12.47ms  p(90)=225.6µs  p(95)=329.79µs
     http_req_sending...............: avg=376.9µs  min=24µs    med=294µs    max=13.65ms  p(90)=550.6µs  p(95)=937.79µs
     http_req_tls_handshaking.......: avg=763.92µs min=0s      med=0s       max=72.04ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=115.38ms min=89.3ms  med=111.42ms max=615.93ms p(90)=130.65ms p(95)=138.88ms
     http_reqs......................: 1635   11.59171/s
     iteration_duration.............: avg=1.11s    min=1.09s   med=1.11s    max=1.78s    p(90)=1.13s    p(95)=1.14s
     iterations.....................: 1635   11.59171/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m21.0s), 00/20 VUs, 1635 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Golang lambda performance (2048 MB)
```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 393 kB 2.8 kB/s
     data_sent......................: 71 kB  502 B/s
     http_req_blocked...............: avg=1.65ms   min=0s      med=1µs      max=195.66ms p(90)=2µs      p(95)=2µs
     http_req_connecting............: avg=706.16µs min=0s      med=0s       max=81.15ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=115.38ms min=85.89ms med=112.63ms max=576.11ms p(90)=130.92ms p(95)=139.2ms
       { expected_response:true }...: avg=115.38ms min=85.89ms med=112.63ms max=576.11ms p(90)=130.92ms p(95)=139.2ms
     http_req_failed................: 0.00%  0 out of 1639
     http_req_receiving.............: avg=149.92µs min=12µs    med=76µs     max=22.87ms  p(90)=171µs    p(95)=235.09µs
     http_req_sending...............: avg=232.58µs min=15µs    med=172µs    max=4.53ms   p(90)=396µs    p(95)=486.09µs
     http_req_tls_handshaking.......: avg=853.34µs min=0s      med=0s       max=127.98ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=115ms    min=85.69ms med=112.23ms max=575.15ms p(90)=130.61ms p(95)=138.8ms
     http_reqs......................: 1639   11.624688/s
     iteration_duration.............: avg=1.11s    min=1.08s   med=1.11s    max=1.76s    p(90)=1.13s    p(95)=1.14s
     iterations.....................: 1639   11.624688/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m21.0s), 00/20 VUs, 1639 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

----

# Java lambda performance (128 MB)
```

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 318 kB 2.3 kB/s
     data_sent......................: 59 kB  415 B/s
     http_req_blocked...............: avg=1.89ms   min=0s       med=2µs      max=190.11ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=858.51µs min=0s       med=0s       max=133.2ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=394.55ms min=66.42ms  med=240.78ms max=16.92s   p(90)=416.35ms p(95)=473.11ms
       { expected_response:true }...: avg=395.03ms min=144.91ms med=240.91ms max=16.92s   p(90)=416.36ms p(95)=473.14ms
     http_req_failed................: 0.15%  2 out of 1309
     http_req_receiving.............: avg=171.32µs min=10µs     med=137µs    max=4.67ms   p(90)=258.2µs  p(95)=375.39µs
     http_req_sending...............: avg=400.34µs min=26µs     med=344µs    max=10.79ms  p(90)=600µs    p(95)=993.19µs
     http_req_tls_handshaking.......: avg=907.51µs min=0s       med=0s       max=81.22ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=393.98ms min=66.15ms  med=240.12ms max=16.92s   p(90)=415.96ms p(95)=472.75ms
     http_reqs......................: 1309   9.270924/s
     iteration_duration.............: avg=1.39s    min=1.14s    med=1.24s    max=18.11s   p(90)=1.41s    p(95)=1.47s
     iterations.....................: 1309   9.270924/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m21.2s), 00/20 VUs, 1309 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Java lambda performance (256 MB)
```

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 354 kB 2.5 kB/s
     data_sent......................: 66 kB  471 B/s
     http_req_blocked...............: avg=1.86ms   min=0s       med=1µs      max=236.89ms p(90)=2µs      p(95)=3µs
     http_req_connecting............: avg=827.96µs min=0s       med=0s       max=132.57ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=201.52ms min=100.94ms med=148.95ms max=8.58s    p(90)=226.16ms p(95)=258.9ms
       { expected_response:true }...: avg=201.52ms min=100.94ms med=148.95ms max=8.58s    p(90)=226.16ms p(95)=258.9ms
     http_req_failed................: 0.00%  0 out of 1520
     http_req_receiving.............: avg=138.49µs min=12µs     med=74µs     max=28.04ms  p(90)=163µs    p(95)=216.04µs
     http_req_sending...............: avg=239.77µs min=32µs     med=166.5µs  max=7.13ms   p(90)=396µs    p(95)=504.19µs
     http_req_tls_handshaking.......: avg=908.66µs min=0s       med=0s       max=88.55ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=201.15ms min=100.82ms med=148.64ms max=8.58s    p(90)=225.99ms p(95)=258.55ms
     http_reqs......................: 1520   10.825307/s
     iteration_duration.............: avg=1.2s     min=1.1s     med=1.15s    max=9.72s    p(90)=1.22s    p(95)=1.26s
     iterations.....................: 1520   10.825307/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.4s), 00/20 VUs, 1520 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Java lambda performance (512 MB)
```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 367 kB 2.6 kB/s
     data_sent......................: 69 kB  489 B/s
     http_req_blocked...............: avg=1.66ms   min=0s      med=2µs      max=247.42ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=776.2µs  min=0s      med=0s       max=182.6ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=147.66ms min=99.83ms med=123.72ms max=5.12s    p(90)=157.43ms p(95)=177.98ms
       { expected_response:true }...: avg=147.66ms min=99.83ms med=123.72ms max=5.12s    p(90)=157.43ms p(95)=177.98ms
     http_req_failed................: 0.00%  0 out of 1592
     http_req_receiving.............: avg=158.15µs min=10µs    med=128µs    max=4.67ms   p(90)=220µs    p(95)=311.69µs
     http_req_sending...............: avg=365.6µs  min=20µs    med=310µs    max=7.21ms   p(90)=547.4µs  p(95)=861.89µs
     http_req_tls_handshaking.......: avg=807.72µs min=0s      med=0s       max=86.79ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=147.13ms min=99.14ms med=123.04ms max=5.12s    p(90)=156.92ms p(95)=177.55ms
     http_reqs......................: 1592   11.318342/s
     iteration_duration.............: avg=1.15s    min=1.1s    med=1.12s    max=6.28s    p(90)=1.16s    p(95)=1.18s
     iterations.....................: 1592   11.318342/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.7s), 00/20 VUs, 1592 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Java lambda performance (1024 MB)
```
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 369 kB 2.6 kB/s
     data_sent......................: 69 kB  492 B/s
     http_req_blocked...............: avg=1.64ms   min=0s       med=2µs      max=219.08ms p(90)=3µs      p(95)=4µs
     http_req_connecting............: avg=724.47µs min=0s       med=0s       max=88.15ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=135.01ms min=100.38ms med=120.61ms max=3.6s     p(90)=142.52ms p(95)=154.56ms
       { expected_response:true }...: avg=135.01ms min=100.38ms med=120.61ms max=3.6s     p(90)=142.52ms p(95)=154.56ms
     http_req_failed................: 0.00%  0 out of 1607
     http_req_receiving.............: avg=208.99µs min=11µs     med=144µs    max=5.72ms   p(90)=306.8µs  p(95)=545.89µs
     http_req_sending...............: avg=440.05µs min=25µs     med=348µs    max=11.7ms   p(90)=731.2µs  p(95)=1.11ms
     http_req_tls_handshaking.......: avg=812.42µs min=0s       med=0s       max=76.56ms  p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=134.36ms min=99.84ms  med=119.87ms max=3.6s     p(90)=141.81ms p(95)=153.96ms
     http_reqs......................: 1607   11.407552/s
     iteration_duration.............: avg=1.13s    min=1.1s     med=1.12s    max=4.82s    p(90)=1.14s    p(95)=1.16s
     iterations.....................: 1607   11.407552/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.9s), 00/20 VUs, 1607 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```

# Java lambda performance (2048 MB)
```

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: index.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 2m50s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 2m20s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 372 kB 2.6 kB/s
     data_sent......................: 70 kB  497 B/s
     http_req_blocked...............: avg=1.52ms   min=0s      med=1µs      max=189.3ms p(90)=3µs      p(95)=3µs
     http_req_connecting............: avg=654.35µs min=0s      med=0s       max=77.93ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=127.41ms min=98.2ms  med=119.42ms max=2.66s   p(90)=138.96ms p(95)=145.96ms
       { expected_response:true }...: avg=127.41ms min=98.2ms  med=119.42ms max=2.66s   p(90)=138.96ms p(95)=145.96ms
     http_req_failed................: 0.00%  0 out of 1620
     http_req_receiving.............: avg=171.44µs min=7µs     med=133µs    max=8.23ms  p(90)=237.1µs  p(95)=352.24µs
     http_req_sending...............: avg=401.1µs  min=26µs    med=301µs    max=8.5ms   p(90)=603.4µs  p(95)=1.1ms
     http_req_tls_handshaking.......: avg=782.25µs min=0s      med=0s       max=82.67ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=126.83ms min=97.98ms med=118.88ms max=2.66s   p(90)=138.45ms p(95)=144.91ms
     http_reqs......................: 1620   11.537018/s
     iteration_duration.............: avg=1.13s    min=1.09s   med=1.12s    max=3.84s   p(90)=1.14s    p(95)=1.15s
     iterations.....................: 1620   11.537018/s
     vus............................: 1      min=1         max=20
     vus_max........................: 20     min=20        max=20


running (2m20.4s), 00/20 VUs, 1620 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  2m20s
```