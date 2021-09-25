---
lessAds: false
description: 一行命令开启Kubernetes多集群管理之路
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 升级Kuboard v3

<AdSenseTitle/>

点击此处，查看 [版本更新说明](/support/change-log/v3.0.x.html)


## 如果以 docker run 运行 Kuboard

按照如下步骤，可以将 kuboard v3 更新到最新版本。

1. 停止已有 kuboard 容器

  ``` sh
  docker stop $(docker ps -a | grep "eipwork/kuboard" | awk '{print $1 }')
  docker rm $(docker ps -a | grep "eipwork/kuboard" | awk '{print $1 }')
  ```

2. 使用新版本的镜像启动 kuboard

  ``` sh {11}
  sudo docker run -d \
    --restart=unless-stopped \
    --name=kuboard \
    -p 80:80/tcp \
    -p 10081:10081/udp \
    -p 10081:10081/tcp \
    -e KUBOARD_ENDPOINT="http://kuboard.my-company.com:80" \
    -e KUBOARD_AGENT_SERVER_UDP_PORT="10081" \
    -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
    -v /root/kuboard-data:/data \
    eipwork/kuboard:v3.1.7.1
  ```

  ::: danger 请注意
  * 除了镜像标签之外，请确保命令行中所有其他参数与最初安装 Kuboard 时的参数一致；
  * 如果您修改此处宿主机端口号，则需要您在 Kuboard 中删除已经导入了的 Kubernetes 集群，并重新导入。
  * 从 kuboard-v3.0.0.alpha.3 及以下版本升级过来的用户，请留意第 7、8、9 三行，是 v3.0.0.alpha.4 版本开始必须设置的新增参数；
  :::

## 如果将 kuboard 安装在 K8S 中

直接修改 `kuboard` 名称空间下名称为 `kuboard-v3` 的 Deployment 的镜像版本号为最新的版本号，然后等待片刻即可。