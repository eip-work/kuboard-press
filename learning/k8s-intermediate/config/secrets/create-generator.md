---
vssueId: 83
layout: LearningLayout
description: Kubernetes教程_在Kubernetes中_使用kubectl创建Secret_Generator
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Secret,Kubernetes Generator
---

# 创建Secrets（使用Generator）

从 kubernetes v1.14 开始，kubectl 集成了 [Kustomize](https://kustomize.io/)。通过 Kustomize，您可以使用 generator（Kustomize 的概念）创建 Secret，并保存到 API Server。Generator 必须在 `kustomization.yaml` 文件中指定。

::: tip
需要结合 [Kustomize](https://kustomize.io/) 一起使用，在您决定采纳 Kustomize 之前，可以暂时不看这篇文章的内容
:::

## 从文件生成 Secret

例如，如果想从 `./username.txt` 和 `./password.txt` 文件生成（generate）一个 Secret，则可以：

* 执行如下指令创建 `kustomization.yaml` 文件

``` sh
# Create a kustomization.yaml file with SecretGenerator
cat <<EOF >./kustomization.yaml
secretGenerator:
- name: db-user-pass
  files:
  - username.txt
  - password.txt
EOF
```

* 执行指令 `kubectl apply -k .` 以创建 Secret 对象，输出结果如下所示：

  ```
  secret/db-user-pass-96mffmfh4k created
  ```

* 执行指令 `kubectl get secrets` 以检查创建结果，输出结果如下所示：

  ```
  NAME                             TYPE                                  DATA      AGE
  db-user-pass-96mffmfh4k          Opaque                                2         51s
  ```

* 执行指令 `kubectl describe secrets/db-user-pass-96mffmfh4k` 以查看 Secret 详情（请使用您自己的 Secret 名字），输出结果如下所示：

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
  生成的 Secret 的名字包含一个 hash 值（Secret 内容的 hash）做为后缀，这种做法可以确保每次修改 Secret 的内容时，都将产生新的 Secret 对象
  :::

## 从明文生成 Secret

例如，如果要从明文 `username=admin` 和 `password=secret`，您可以：

* 通过如下指令创建 secret generator 的 `kustomization.yaml` 文件：

  ``` sh
  # Create a kustomization.yaml file with SecretGenerator
  cat <<EOF >./kustomization.yaml
  secretGenerator:
  - name: db-user-pass
    literals:
    - username=admin
    - password=secret
  EOF
  ```

* 然后执行指令 `kubectl apply -k .` 创建 Secret 对象，输出结果如下所示：

  ```
  secret/db-user-pass-dddghtt9b5 created
  ```
