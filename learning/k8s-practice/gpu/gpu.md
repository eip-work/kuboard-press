---
layout: LearningLayout
lessAds: false
description: Kubernetes教程_本文描述了如何在K8S上调度一个GPU资源相关的工作负载
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,GPU
---

# 调度 GPU

版本要求 <Badge>Kubernetes v1.10</Badge>，此特性尚处于 beta 阶段。

Kubernetes 中已经实验性地支持管理多个节点上的 AMD / NVIDIA GPU (显卡)。 本文描述了用户应该如何为应用分配 GPU 资源，并且阐述了当前的一些限制条件。

## 使用设备插件（Device Plugin）

Kubernetes 包含了设备插件（Device Plugin），以允许 Pod 访问特殊的硬件资源，例如 GPU。

为了达成此目的，集群管理员必须在节点上安装对硬件厂商提供的 GPU 驱动程序，并且运行该厂商提供的对应的设备插件（Device Plugin）。

* [AMD](#部署-AMD-GPU-设备插件)
* [NVIDIA](#部署-NVIDIA-GPU-设备插件)

当上述设备插件已安装之后，Kubernetes 可以将 `amd.com/gpu` 或 `nvidia.com/gpu` 当做一种可调度的资源。此时，您可以像请求 `cpu` 或 `memory` [资源](/learning/k8s-intermediate/config/computing-resource.html#容器组及容器的计算资源请求及限制) 那样请求 GPU 资源 `amd.com/gpu` 或 `nvidia.com/gpu`。使用 GPU 资源时，有如下一些限制：
* GPU 资源只能在 `limits` 中指定，即：
  * 您可以只指定 GPU `limits` 而不指定 `requests`，因为 Kubernetes 会默认使用 GPU `limits` 的值作为 GPU `requests` 的值；
  * 您可以同时指定 GPU `limits` 和 `requests`，但是两者必须相等；
  * 您不能只指定 GPU `requests` 而不指定 GPU `limits`；
* 容器（容器组）不能共享 GPU。GPU 也不能超售（GPU `limits` 的总和不能超过实际 GPU 资源的总和）；
* 每个容器可以请求一个或多个 GPU，不能请求一个 GPU 的一部分（例如 0.5 个 GPU）。

样例如下：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cuda-vector-add
spec:
  restartPolicy: OnFailure
  containers:
    - name: cuda-vector-add
      # https://github.com/kubernetes/kubernetes/blob/v1.7.11/test/images/nvidia-cuda/Dockerfile
      # image: "k8s.gcr.io/cuda-vector-add:v0.1"
      image: "eipsample/cuda-vector-add:v0.1"
      resources:
        limits:
          nvidia.com/gpu: 1 # requesting 1 GPU
```

## 部署 AMD GPU 设备插件

部署 [官方 AMD GPU 设备插件](https://github.com/RadeonOpenCompute/k8s-device-plugin) 时，有如下前提条件：
* Kubernetes 节点已经预先安装了 AMD GPU Linux 驱动程序。

如果上述条件满足，可以执行如下指令部署 AMD GPU 设备插件：
```sh
kubectl create -f https://raw.githubusercontent.com/RadeonOpenCompute/k8s-device-plugin/v1.10/k8s-ds-amdgpu-dp.yaml
```

如果碰到与此设备插件相关的问题，请到其 GITHUB 仓库 [RadeonOpenCompute/k8s-device-plugin](https://github.com/RadeonOpenCompute/k8s-device-plugin) 提交 ISSUE。

## 部署 NVIDIA GPU 设备插件

当前有两种 NVIDIA GPU 的设备插件可供选择：

### 官方 NVIDIA GPU 设备插件

部署 [官方 NVIDIA GPU 设备插件](https://github.com/NVIDIA/k8s-device-plugin) 时，有如下前提条件：
* Kubernetes 节点已经预先安装了 NVIDIA 驱动程序；
* Kubernetes 节点已经预先安装了 [nvidia-docker 2.0](https://github.com/NVIDIA/nvidia-docker)；
* Kubelet 必须使用 Docker 作为其容器运行时；
* Docker 的 [默认运行时](https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes) 必须配置为 `nvidia-container-runtime`，而不是 `runc`；
* NVIDIA 驱动程序的版本必须满足限定条件 `~= 384.81`。

如果上述条件都满足，可以执行如下指令部署 官方 NVIDIA GPU 设备插件：
``` sh
kubectl create -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/1.0.0-beta4/nvidia-device-plugin.yml
```

如果碰到与此设备插件相关的问题，请到其 GITHUB 仓库 [NVIDIA/k8s-device-plugin](https://github.com/NVIDIA/k8s-device-plugin) 提交 ISSUE。

### GCE 使用的 NVIDIA GPU 设备插件

[GCE 使用的 NVIDIA GPU 设备插件](https://github.com/GoogleCloudPlatform/container-engine-accelerators/tree/master/cmd/nvidia_gpu) 不需要用到 nvidia-docker，并且可以兼容 Kubernetes Container Runtime Interface（CRI）支持的任意容器运行时（docker / containerd / CRI-O）。该设备插件可以兼容 [CONTAINER-OPTIMIZED OS](https://cloud.google.com/container-optimized-os/) ，并且实验性地兼容 ubuntu。

执行如下指令可以安装 GCE 使用的 NVIDIA GPU 设备插件：

```sh
# Install NVIDIA drivers on Container-Optimized OS:
kubectl create -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/daemonset.yaml

# Install NVIDIA drivers on Ubuntu (experimental):
kubectl create -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/nvidia-driver-installer/ubuntu/daemonset.yaml

# Install the device plugin:
kubectl create -f https://raw.githubusercontent.com/kubernetes/kubernetes/release-1.14/cluster/addons/device-plugins/nvidia-gpu/daemonset.yaml
```

如果碰到与此设备插件相关的问题，请到其 GITHUB 仓库 [GoogleCloudPlatform/container-engine-accelerators](https://github.com/GoogleCloudPlatform/container-engine-accelerators) 提交 ISSUE。

更多信息请参考 Google 提供的文档 [如何在 GKE 上使用 NVIDIA GPU](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus)

## 在集群中包含不同类型的 GPU

如果你的集群中，不同节点使用了不同类型的 GPU，您可以使用 [节点选择器](/learning/k8s-intermediate/config/assign-pod-node.html#节点选择器-nodeselector) 把对应的 Pod 调度到合适的节点上。例如：

```sh
# Label your nodes with the accelerator type they have.
kubectl label nodes <node-with-k80> accelerator=nvidia-tesla-k80
kubectl label nodes <node-with-p100> accelerator=nvidia-tesla-p100
```

## 自动标记节点

如果您使用的是 AMD GPU，您可以部署 [Node Labeller](https://github.com/RadeonOpenCompute/k8s-device-plugin/tree/master/cmd/k8s-node-labeller)。Node Labeller 是一个控制器，该控制器可以根据 GPU 设备的属性自动为您的节点做标记。

当前，该控制器可以为如下属性添加标签：
* Device ID (-device-id)
* VRAM Size (-vram)
* Number of SIMD (-simd-count)
* Number of Compute Unit (-cu-count)
* Firmware and Feature Versions (-firmware)
* GPU Family, in two letters acronym (-family)
  * SI - Southern Islands
  * CI - Sea Islands
  * KV - Kaveri
  * VI - Volcanic Islands
  * CZ - Carrizo
  * AI - Arctic Islands
  * RV - Raven

```sh
kubectl describe node cluster-node-23
```

```
    Name:               cluster-node-23
    Roles:              <none>
    Labels:             beta.amd.com/gpu.cu-count.64=1
                        beta.amd.com/gpu.device-id.6860=1
                        beta.amd.com/gpu.family.AI=1
                        beta.amd.com/gpu.simd-count.256=1
                        beta.amd.com/gpu.vram.16G=1
                        beta.kubernetes.io/arch=amd64
                        beta.kubernetes.io/os=linux
                        kubernetes.io/hostname=cluster-node-23
    Annotations:        kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                        node.alpha.kubernetes.io/ttl: 0
    …
```

如果使用了 Node Labeller，您可以在 Pod 定义中指定 GPU 类型，以便确保该 Pod 被调度到具备指定类型 GPU 的节点上，如下所示：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cuda-vector-add
spec:
  restartPolicy: OnFailure
  containers:
    - name: cuda-vector-add
      # https://github.com/kubernetes/kubernetes/blob/v1.7.11/test/images/nvidia-cuda/Dockerfile
      # image: "k8s.gcr.io/cuda-vector-add:v0.1"
      image: "eipsample/cuda-vector-add:v0.1"
      resources:
        limits:
          nvidia.com/gpu: 1
  nodeSelector:
    accelerator: nvidia-tesla-p100 # or nvidia-tesla-k80 etc.
```
