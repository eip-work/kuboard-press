---
vssueId: 78
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_使用kubectl创建Secret
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes入门,K8S入门
---

# 创建Secret（使用kubectl）

<AdSenseTitle/>

假设某个 Pod 需要访问数据库。在您执行 kubectl 命令所在机器的当前目录，创建文件 `./username.txt` 文件和 `./password.txt` 暂存数据库的用户名和密码，后续我们根据这两个文件配置 kubernetes secrets。

```sh
echo -n 'admin' > ./username.txt
echo -n '1f2d1e2e67df' > ./password.txt
```

执行命令 `kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt` 在 Kubernetes APIServer 中创建 Secret 对象，并将这两个文件中的内容存储到该 Secret 对象中，输出结果如下所示：

```
secret "db-user-pass" created
```

::: tip
* 上述命令的执行效果与此命令执行效果相同：
  `kubectl create secret generic db-user-pass –from-literal=username=admin –from-literal=password=1f2d1e2e67df`
* 如果您的密码中包含特殊字符需要转码（例如 `$`、`*`、`\`、`!`），请使用 `\` 进行转码。例如：实际密码为 `S!B\*d$zDsb`，kubectl 命令应该写成 `kubectl create secret generic dev-db-secret –from-literal=username=devuser –from-literal=password=S\!B\\*d\$zDsb`。如果通过文件创建（--from-file），则无需对文件中的密码进行转码。
:::

执行命令 `kubectl get secrets`，检查 Secret 的创建结果，输出信息如下所示：

```
NAME                  TYPE                                  DATA      AGE
db-user-pass          Opaque                                2         51s
```

执行命令 `kubectl describe secrets/db-user-pass`，查看 Secret 详情，输出信息如下所示：

```
Name:            db-user-pass
Namespace:       default
Labels:          <none>
Annotations:     <none>

Type:            Opaque

Data
====
password.txt:    12 bytes
username.txt:    5 bytes
```

::: tip
默认情况下，`kubectl get` 和 `kubectl describe` 命令都避免展示 Secret 的内容。这种做法可以避免密码被偷窥，或者被存储到终端的日志中
:::

参考 [解码](./decode-edit.html) 了解如何查看 Secret 中存储的内容
