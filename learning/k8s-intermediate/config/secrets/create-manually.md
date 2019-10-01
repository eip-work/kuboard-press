---
vssueId: 82
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_使用kubectl手工创建Secret
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,创建Secret
---

# 创建Secrets（手动）

和创建其他类型的 API 对象（Pod、Deployment、StatefulSet、ConfigMap 等）一样，您也可以先在 yaml 文件中定义好 Secret，然后通过 `kubectl apply -f` 命令创建。此时，您可以通过如下两种方式在 yaml 文件中定义 Secret：
* **data**：使用 data 字段时，取值的内容必须是 base64 编码的
* **stringData**：使用 stringData 时，更为方便，您可以直接将取值以明文的方式写在 yaml 文件中

## 在 yaml 中定义 data

* 假设您要保存 `username=admin` 和 `password=1f2d1e2e67df` 到 Secret 中，请先将数据的值转化为 base64 编码，执行如下命令：
  ```sh
  echo -n 'admin' | base64
  YWRtaW4=
  echo -n '1f2d1e2e67df' | base64
  MWYyZDFlMmU2N2Rm
  ```
* 创建 secret.yaml 文件，内容如下所示：
  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: mysecret
  type: Opaque
  data:
    username: YWRtaW4=
    password: MWYyZDFlMmU2N2Rm
  ```
* 执行命令 `kubectl apply -f ./secret.yaml` 输出结果如下所示：
  ```
  secret "mysecret" created
  ```
  此时 Secret 创建成功

## 在 yaml 中定义 stringData

有时，您并不想先将用户名和密码转换为 base64 编码之后再创建 Secret，则，您可以通过定义 stringData 来达成，此时 stringData 中的取值部分将被 apiserver 自动进行 base64 编码之后再保存。

* 创建文件 secret.yaml，内容如下所示：
  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: mysecret
  type: Opaque
  stringData:
    username: admin
    password: 1f2d1e2e67df
  ```
* 执行命令 `kubectl apply -f ./secret.yaml` 输出结果如下所示：
  ```
  secret "mysecret" created
  ```
  此时 Secret 创建成功

* 执行命令 `kubectl get -f ./secret.yaml -o yaml` 输出结果如下所示：
  ``` yaml
  apiVersion: v1
  data:
    password: MWYyZDFlMmU2N2Rm
    username: YWRtaW4=
  kind: Secret
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"v1","kind":"Secret","metadata":{"annotations":{},"name":"mysecret","namespace":"default"},"stringData":{"password":"1f2d1e2e67df","username":"admin"},"type":"Opaque"}
    creationTimestamp: "2019-09-23T14:16:56Z"
    name: mysecret
    namespace: default
    resourceVersion: "10318365"
    selfLink: /api/v1/namespaces/default/secrets/mysecret
    uid: 24602031-e18d-467a-b7fe-0962af8ec8b8
  type: Opaque
  ```
  ::: tip 注意
  * 此时 annotation 中可以看到 password 的明文，这也许并不是您所期望的
  * 输出的 Secret 对象中，stringData 字段不再出现
  :::

## 同时定义了 data 和 stringData

::: tip
如果您同时定义了 data 和 stringData，对于两个对象中 key 重复的字段，最终将采纳 stringData 中的 value
:::

* 创建文件 secret.yaml，该文件同时定义了 data 和 stringData，内容如下所示：
  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: mysecret
  type: Opaque
  data:
    username: YWRtaW4=
  stringData:
    username: administrator
  ```
* 执行命令 `kubectl apply -f ./secret.yaml` 输出结果如下所示：
  ```
  secret "mysecret" created
  ```
  此时 Secret 创建成功

* 执行命令 `kubectl get -f ./secret.yaml -o yaml` 输出结果如下所示：
  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    creationTimestamp: 2018-11-15T20:46:46Z
    name: mysecret
    namespace: default
    resourceVersion: "7579"
    uid: 91460ecb-e917-11e8-98f2-025000000001
  type: Opaque
  data:
    username: YWRtaW5pc3RyYXRvcg==
  ```
  ::: tip
  此处 `YWRtaW5pc3RyYXRvcg==` 解码后的值是 `administrator`
  :::

## 将配置文件存入 Secret

假设您的某个应用程序需要从一个配置文件中读取敏感信息，此时，您可以将该文件的内容存入 Secret，再通过数据卷的形式挂载到容器。[挂载方式未完待续]

例如，您的应用程序需要读取如下配置文件内容：

```
apiUrl: "https://my.api.com/api/v1"
username: user
password: password
```

您可以使用下面的 secret.yaml 创建 Secret

``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
stringData:
  config.yaml: |-
    apiUrl: "https://my.api.com/api/v1"
    username: user
    password: password
```

* 执行命令 `kubectl apply -f ./secret.yaml` 输出结果如下所示：
  ```
  secret "mysecret" created
  ```
  此时 Secret 创建成功

* 执行命令 `kubectl get -f ./secret.yaml -o yaml` 输出结果如下所示：
  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    creationTimestamp: 2018-11-15T20:40:59Z
    name: mysecret
    namespace: default
    resourceVersion: "7225"
    uid: c280ad2e-e916-11e8-98f2-025000000001
  type: Opaque
  data:
    config.yaml: YXBpVXJsOiAiaHR0cHM6Ly9teS5hcGkuY29tL2FwaS92MSIKdXNlcm5hbWU6IHt7dXNlcm5hbWV9fQpwYXNzd29yZDoge3twYXNzd29yZH19
  ```
