---
lessAds: false
description: 在 Kubernetes 集群中安装 Kuboard_V3
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 在 K8S 中安装 Kuboard v3

<AdSenseTitle/>

::: danger

刚接触 K8S 的同学，强烈建议您使用 [内建用户库](./install-built-in.html) 的方式安装 Kuboard-v3，在 K8S 中安装 Kuboard v3 时，需要理解更复杂的端口映射方式、存储卷声明/存储类等概念。

:::
## 安装步骤

* 获取部署 Kuboard 所需的 YAML 文件：

  ```sh
  curl -o kuboard-v3.yaml https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
  ```

* 编辑 `kuboard-v3.yaml` 文件中的配置，该部署文件中，有两处配置必须修改：

  * KUBOARD_ENDPOINT

    ```yaml {10}
    ---
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: kuboard-v3-config
      namespace: kuboard
    data:
      # 关于如下参数的解释，请参考文档 https://kuboard.cn/install/v3/install-built-in.html
      # [common]
      KUBOARD_ENDPOINT: 'http://your-node-ip-address:30080'
      KUBOARD_AGENT_SERVER_UDP_PORT: '30081'
      KUBOARD_AGENT_SERVER_TCP_PORT: '30081'
    ```
  * storageClassName

    ``` yaml {6}
      volumeClaimTemplates:
      - metadata:
          name: data
        spec:
          # 请填写一个有效的 StorageClass name
          storageClassName: please-provide-a-valid-StorageClass-name-here
          accessModes: [ "ReadWriteMany" ]
          resources:
            requests:
              storage: 5Gi
    ```

* 部署到 Kubernetes 集群

  ```sh
  kubectl create -f kuboard-v3.yaml
  ```

## 访问 Kuboard

* 在浏览器中打开链接 `http://your-node-ip-address:30080`
* 输入初始用户名和密码，并登录
  
  * 用户名： `admin`
  * 密码：  `Kuboard123`

## 备注

此 YAML 文件向 Kubernetes 中部署了一个三副本的 StatefulSet `kuboard-etcd` 和一个单副本的 Deployment `kuboard-v3`；其中 Deployment `kuboard-v3` 暂时不支持多副本，请保持其 replicas 字段为 1，将在后续的版本升级中解决 `kuboard-v3` 多副本部署的问题。
