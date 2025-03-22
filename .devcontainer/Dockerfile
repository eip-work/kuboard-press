FROM ubuntu:24.04

RUN sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/g' /root/.bashrc \
  && sed -i 's/ports\.ubuntu\.com/mirrors\.tuna\.tsinghua\.edu\.cn/g' /etc/apt/sources.list.d/ubuntu.sources\
  && apt update \
  && DEBIAN_FRONTEND=noninteractive apt install -y --no-install-recommends tzdata \
  && apt upgrade -y \
  && ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && apt install openjdk-17-jdk maven -y \
  && echo "JAVA_HOME=/usr/lib/jvm/java-17-openjdk-$(dpkg --print-architecture)" > /etc/environment \
  && apt install curl git vim wget -y 

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
  && bash nodesource_setup.sh \
  && apt-get install -y nodejs \
  && wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - \
  && useradd -D

RUN wget https://download.docker.com/linux/ubuntu/dists/focal/pool/stable/$(dpkg --print-architecture)/docker-ce-cli_20.10.24~3-0~ubuntu-focal_$(dpkg --print-architecture).deb \
&& dpkg -i docker-ce-cli_20.10.24~3-0~ubuntu-focal_$(dpkg --print-architecture).deb \
&& rm docker-ce-cli_20.10.24~3-0~ubuntu-focal_$(dpkg --print-architecture).deb