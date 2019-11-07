---
# vssueId: 66
layout: LearningLayout
description: Kubernetes教程_配置kubelet垃圾回收_Garbage_Collection
---

# 配置Kubelet的垃圾回收

<AdSenseTitle>

Kubelet的垃圾回收功能可以清理不再使用的容器和镜像，kubelet对容器进行垃圾回收的频率是每分钟一次，对镜像进行垃圾回收的频率是每五分钟一次。

不推荐使用外部的垃圾回收工具，因为这些工具有可能会删除 kubelet 仍然需要的容器或者镜像。

[[TOC]]

</AdSenseTitle>

## 镜像回收

Kubernetes 通过 imageManager 配合 cadvisor 管理所有镜像的生命周期。

镜像的垃圾回收策略主要考虑两方面因素： `HighThresholdPercent` 和 `LowThresholdPercent`。
* 磁盘利用率超过 `high threshold` 将触发垃圾回收动作
* 垃圾回收功能将删除最近最少使用的镜像，直到磁盘利用率低于 `low threshold`

## 容器回收

容器的垃圾回收侧率主要考虑三个用户自定义的变量：
* `MinAge`： 容器创建到现在的最小时长，低于此时长的不能被垃圾回收；如果设置为 0，则禁用该选项
* `MaxPerPodContainer`：以 `Pod UID` + `容器名` 作为组合键，`MaxPerPodContainer` 指定了同一个 `Pod UID` + `容器名` 组合键下可以包含的已停止容器的最大数量。如果设置为小于 0 的数值，则禁用该选项
* `MaxContainers`： 指定了最大的已停止容器的数量。如果设置为小于 0 的数值，则禁用该选项

Kubelet 将对满足上述三个条件，且已经停止的容器执行垃圾回收的动作。通常，创建时间最长的容器将被最早移除。 `MaxPerPodContainer` 和 `MaxContainer` 这两个参数可能会相互冲突，例如， 如果要为每个 Pod 保存 `MaxPerPodContainer` 个已停止容器的话，可能最终总的已停止的容器的数量要超过 `MaxContainers` 的定义。 此时，优先保证 `MaxContainers` 的限定， `MaxPerPodContainer` 将被重新调整：最坏的情况下，kubelet 将 `MaxPerPodContainer` 的要求降低到 1，并删除创建时间最久的已停止的容器。此外，当 Pod 的已停止容器创建时长超过 `MinAge` 时，该容器将被即刻删除。

对于那些不是通过 kubelet 创建的容器，kubelet 不能对其进行垃圾回收操作。

## 配置

通过以下 kubelet 启动参数，可以调整镜像垃圾回收的变量：
* `image-gc-high-threshold`，磁盘利用率高于此参数时，将触发镜像的垃圾回收。默认值为  85%
* `iamge-gc-low-threshold`，磁盘利用率低于此参数时，镜像的垃圾回收将停止。默认值为 80%

通过以下 kubelet 启动参数，可以调整容器的垃圾回收的变量：
* `minimum-container-ttl-duration`，容器创建到现在的最小时长，低于此时长的不能被垃圾回收。默认值为 0 分钟，即，每一个已停止的容器都可以被垃圾回收
* `maximum-dead-containers-per-container`，对于每个容器的旧实例，最多可以保留的个数。默认值为 1
* `maximum-dead-containers`，全局最大可以保留的已停止的容器数量。默认值为 -1，即，不做全局性限制

容器在被垃圾回收时，也许仍然是有用的。例如，这些容器可能包含了对于问题诊断（trouble shooting）来说非常有用的日志和数据。强烈建议将 `maximum-dead-containers-per-container` 设置为足够大的数值，至少不能小于1，以便为每一个容器至少保留一个已停止的容器。同样的，也建议为 `maximum-dead-containers` 设置一个比较大的数值。 参考 [issue #13287](https://github.com/kubernetes/kubernetes/issues/13287)

## Deprecation

此文档的某些特性已经不推荐使用，未来将被 kubelet eviction 替代。

包括：

| Existing Flag                             | New Flag                                | Rationale                                                    |
| ----------------------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| `--image-gc-high-threshold`               | `--eviction-hard` or `--eviction-soft`  | 已有的 eviction 信号可以触发镜像的垃圾回收                   |
| `--image-gc-low-threshold`                | `--eviction-minimum-reclaim`            | eviction reclaims 可实现相同的效果                           |
| `--maximum-dead-containers`               |                                         | 如果日志被存储在容器外部，就不推荐使用此特性                 |
| `--maximum-dead-containers-per-container` |                                         | 如果日志被存储在容器外部，就不推荐使用此特性                 |
| `--minimum-container-ttl-duration`        |                                         | 如果日志被存储在容器外部，就不推荐使用此特性                 |
| `--low-diskspace-threshold-mb`            | `--eviction-hard` or `eviction-soft`    | eviction 通过其他资源判断是否要垃圾回收，而不再通过磁盘利用率这个参数 |
| `--outofdisk-transition-frequency`        | `--eviction-pressure-transition-period` | eviction generalizes disk pressure transition to other resources |

