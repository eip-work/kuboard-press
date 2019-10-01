---
vssueId: 79
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_使用kubectl解码和编辑Secret
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门,Secret编码解码
---

# 解码和编辑Secret

## 解码Secret

Secret 中的信息可以通过 `kubectl get secret` 命令获取。例如，执行命令 `kubectl get secret mysecret -o yaml
` 可获取前面章节中所创建的 Secret，输出信息如下：

```
apiVersion: v1
kind: Secret
metadata:
  creationTimestamp: 2016-01-22T18:41:56Z
  name: mysecret
  namespace: default
  resourceVersion: "164619"
  uid: cfee02d6-c137-11e5-8d73-42010af00002
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

执行命令 `echo 'MWYyZDFlMmU2N2Rm' | base64 --decode` 可解码密码字段，输出结果如下：

```
1f2d1e2e67df
```

执行命令 `echo 'YWRtaW4=' | base64 --decode` 可解码用户名字段，输出结果如下：

```
admin
```

## 编辑Secret

执行命令 `kubectl edit secrets mysecret` 可以编辑已经创建的 Secret，该命令将打开一个类似于 `vi` 的文本编辑器，您可以直接编辑已经进行 base64 编码的字段，如下所示：

``` yaml {7,8}
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
kind: Secret
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: { ... }
  creationTimestamp: 2016-01-22T18:41:56Z
  name: mysecret
  namespace: default
  resourceVersion: "164619"
  uid: cfee02d6-c137-11e5-8d73-42010af00002
type: Opaque
```
