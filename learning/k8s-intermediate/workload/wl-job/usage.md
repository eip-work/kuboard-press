---
vssueId: 151
layout: LearningLayout
description: Kubernetes中的Job对象将创建一个或多个Pod_并确保指定数量的Pod可以成功执行到进程正常结束_本文描述Job相关的特殊操作
meta:
  - name: keywords
    content: Kubernetes培训,K8S教程,K8S培训,Kubernetes Job
---

# Job的特殊操作

<AdSenseTitle>

</AdSenseTitle>

在创建 Job 时，系统默认将为其指定一个 `.spec.selector` 的取值，并确保其不会与任何其他 Job 重叠。

在少数情况下，您仍然可能需要覆盖这个自动设置 `.spec.selector` 的取值。在做此项操作时，您必须十分小心：
* 如果指定的 `.spec.selector` 不能确定性的标识出该 Job 的 Pod，并可能选中无关的 Pod （例如，selector 可能选中其他控制器创建的 Pod），则：
  * 与该 Job 不相关的 Pod 可能被删除
  * 该 Job 可能将不相关的 Pod 纳入到 `.spec.completions` 的计数
  * 一个或多个 Job 可能不能够创建 Pod，或者不能够正常结束
* 如果指定的 `.spec.selector` 不是唯一的，则其他控制器（例如，Deployment、StatefulSet 等）及其 Pod 的行为也将难以预测

在 Kubernetes 中，系统并不能帮助你避免此类型的错误，您需要自己关注所指定的 `.spec.selector` 的取值是否合理。

让我们来看一个实际使用 `.spec.selector` 的例子：假设 Job `old` 已经运行，您希望已经创建的 Pod 继续运行，但是您又想要修改该 Job 的 名字，同时想要使该 Job 新建的 Pod 使用新的 template。此时您不能够修改已有的 Job 对象，因为这些字段都是不可修改的。此时，您可以执行命令 `kubectl delete jobs/old --cascade=false`，以删除 Job `old` 但是保留其创建的 Pod。

* 在删除之前，先记录 Job `old` 的 selector，执行命令：
  ``` sh
  kubectl get job old -o yaml
  ```
  输出结果如下所示：
  ``` yaml {8}
  kind: Job
  metadata:
    name: old
    ...
  spec:
    selector:
      matchLabels:
        controller-uid: a8f3d00d-c6d2-11e5-9f87-42010af00002
    ...
  ```

* 创建新的 Job `new`，并使用已有的 selector。由于已创建的 Pod 带有标签 `controller-uid=a8f3d00d-c6d2-11e5-9f87-42010af00002`，这些 Pod 也将被新的 Job `new` 所管理。使用类似如下的 yaml 文件创建 Job `new`：
  ``` yaml {6,9}
  kind: Job
  metadata:
    name: new
    ...
  spec:
    manualSelector: true
    selector:
      matchLabels:
        controller-uid: a8f3d00d-c6d2-11e5-9f87-42010af00002
    ...
  ```
  ::: tip
  * 当您不使用系统自动创建的 `.spec.selector` 时，需要在 Job `new` 中指定 `.spec.manualSelector: true`
  * 新建的 Job `new` 其 uid 将不同于 `a8f3d00d-c6d2-11e5-9f87-42010af00002`。设置 `.spec.manualSelector: true` 意味着，您知道这个设定是有意为之，系统将使用您指定的 `.spec.selector`，而不是使用 Job `new` 的 uid 作为 `.spec.selector` 的取值
  :::
