---
layout: "../../layouts/BlogPost.astro"
title: "Personal Development Environment using Docker and Neovim"
description: "Discover how to set up a consistent and efficient personal development environment using Docker and Neovim. Learn to overcome environment issues and leverage containerization and a preferred code editor for a seamless coding experience."
pubDate: "Sep 09 2022"
---

On Mac, I ran into an issue with `bits/stdc++.h` not being natively available. To fix it, I'd have to use awkward workarounds like copying or symlinking the file - it got the job done, but wasn't ideal.

I've noticed many inconsistencies when developing on an environment that isn't consistent. To work around this, I started using VSCode's Remote Docker extension, which lets me access and edit files in any Docker container from within the editor. It's really convenient! As someone who prefers Neovim for daily use, I thought it would be awesome to bring a similar experience to my go-to editor.

> ### How to achieve this?
>
> Technically, we can execute any shell program inside Docker container, even `neovim`

<img class="bg-clip-border rounded-lg" width="720" height="360" src="/blog-assets/neovim-blog-pde/container-explanation.png" />

### Step 1: Select Appropriate Image for use

First, pick an image for your dev container - popular options are standard Linux choices like Ubuntu or Alpine. We'll stick with Ubuntu here since it includes everything needed for a competitive coding setup.

After we have selected the image, let's create a `Dockerfile` in preferred directory of your choice. Update the contents of `Dockerfile` with following content.
```docker
# Dockerfile
FROM ubuntu:18.04
```


### Step 2: Install necessary dependencies

At this point, the container only contains the image. For competitive coding, we require to install some other necessary dependencies like compiler (clang), LSP for sweet auto-completion and neovim for editing.

Append the following commands in the `Dockerfile`.

```docker
#  Dockerfile

RUN apt-get update && apt-get install -y \
  xz-utils \
  build-essential \
  curl \
  && rm -rf /var/lib/apt/lists/* \
  && curl -SL https://github.com/llvm/llvm-project/releases/download/llvmorg-14.0.0/clang+llvm-14.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz \
  | tar -xJC . && \
  mv clang+llvm-14.0.0-x86_64-linux-gnu-ubuntu-18.04 clang_10.0.0 && \
  echo 'export PATH=/clang_10.0.0/bin:$PATH' >> ~/.bashrc && \
  echo 'export LD_LIBRARY_PATH=/clang_10.0.0/lib:$LD_LIBRARY_PATH' >> ~/.bashrc

# Install neovim and other necessary deps for use
RUN apt-get update && apt-get install -y python3.6 git locales neovim python3-neovim
```

At this stage, your `Dockerfile` should see something like this.

```docker
FROM ubuntu:18.04

# Make sure the image is updated, install some prerequisites,
# Download the latest version of Clang (official binary) for Ubuntu
# Extract the archive and add Clang to the PATH
RUN apt-get update && apt-get install -y \
  xz-utils \
  build-essential \
  curl \
  && rm -rf /var/lib/apt/lists/* \
  && curl -SL https://github.com/llvm/llvm-project/releases/download/llvmorg-14.0.0/clang+llvm-14.0.0-x86_64-linux-gnu-ubuntu-18.04.tar.xz \
  | tar -xJC . && \
  mv clang+llvm-14.0.0-x86_64-linux-gnu-ubuntu-18.04 clang_10.0.0 && \
  echo 'export PATH=/clang_10.0.0/bin:$PATH' >> ~/.bashrc && \
  echo 'export LD_LIBRARY_PATH=/clang_10.0.0/lib:$LD_LIBRARY_PATH' >> ~/.bashrc

RUN apt-get update && apt-get install -y python3.6 git locales
```

Now you can build the `Dockerfile` using the following command. You can execute this in terminal of your choice.

```bash
# Make sure to be in the same directory as the `Dockerfile`.
# It will build the image from Dockerfile.
docker build -t competitive .
```

### Step 3: Mount the directories

Your environment is ready for usage, only thing remaining now is to mount the file system to container so that we can share the output file generated inside the container to the host machine.

To perform this, we can use [`volumes`](https://docs.docker.com/storage/volumes/) to attach directories from the host system to the Docker container.

This can be done via the following command, which will run the container from `competitive` image.

```bash
docker run \
    -e TERM=screen-256color \
    -v $(pwd):/app/competitive \
    -v $HOME/.dotfiles/nvim/.config/nvim:/root/.config/nvim \
    --name competitive -dit competitive
```

Above command will run the image `competitive` in a container name `competitive`, and attach the directories from the host
operating system to the Docker container.

### Step 4: Ready

Now that the setup is almost done, you can `exec` into the container and start working on the files. You will get the exact
libs for work which you require from the comfort of the different host operating system.

```bash
docker exec -it competitive bash
```

### Gotcha

When you restart the system, Docker containers will be stopped. You need to explicitly start the container
using container id next time.

To solve this repetitive action, I created a small script to find the container with the name `competitive` and
start the container if ti is not already present.

```bash
#!/bin/sh

containerId=`docker ps -a -f 'name=competitive' --format "{{.ID}}"`
if [ ! -z "$containerId" ]; then
    echo "Found existing container, Starting it"
    docker start $containerId
else
    echo "Container not found with name competitive, creating one"
    docker run \
        -e TERM=screen-256color \
        -v $(pwd):/app/competitive \
        -v $HOME/.dotfiles/nvim/.config/nvim:/root/.config/nvim \
        --name competitive -dit competitive
fi

echo "Starting container"
docker exec -it competitive bash
```

In the above snippet, we are first checking if there is any container with the name _competitive_. If there is, then it fetches the
container ID and starts it, else it creates a new container and `exec` into it.

I had a great time exploring [`docker`](https://www.docker.com/) and what we can achieve via some simple scripts.
