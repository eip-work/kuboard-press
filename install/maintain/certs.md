---
description: Kubernete安装文档_更新 kubernetes 证书文件
meta:
  - name: keywords
    content: 更新 kubernetes 证书文件
---

# 更新 Kubernetes 证书文件

<AdSenseTitle/>

> 参考文档： [Certificate Management with kubeadm](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/)

**FEATURE STATE:** Kubernetes v1.15 \[stable\]

通过 kubeadm 安装集群时，所生成的客户端证书的有效期为一年。本文讲述了如何使用 kubeadm 更新证书（只适用于通过 kubeadm 安装的集群，如果使用其他方式或工具安装的集群，请参考对应工具的文档）。

kubernetes 1.15以下的版本可以用openssl命令来检查证书日期，例如：
在证书路径执行命令
openssl x509 -in apiserver.crt  -noout -text  |grep Not
或者在master节点执行命令
#查看api-server证书
echo -n | openssl s_client -connect localhost:6443 2>&1 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' | openssl x509 -text -noout | grep Not
#查看controller manager证书
echo -n | openssl s_client -connect localhost:10257 2>&1 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' | openssl x509 -text -noout | grep Not
#scheduler证书
echo -n | openssl s_client -connect localhost:10259 2>&1 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' | openssl x509 -text -noout | grep Not

从kubernetes 1.15版本开始，kubeadm提供了检查全部证书到期日的命令，如下：
kubeadm alpha certs check-expiration
同时也提供了一键更新证书的命令
kubeadm alpha certs renew all --config 集群config文件路径

实际操作如下命令所示，示例中为三master节点高可用集群：
1）先驱逐第一台master节点上的普通pod：
kubectl drain k8s-master-01 --ignore-daemonsets
2）导出集群备份文件，这个很重要，后面更新证书要使用
kubeadm config view > /tmp/cluster.yaml
3）更新证书一定要指定--config，否则会默认更新到最新版的证书，集群版本不是最新的话，会百分百崩溃
kubeadm alpha certs renew all --config=/tmp/cluster.yaml
4）更新完了一定要重新init指定集群使用此证书
kubeadm init phase certs all  --config=/tmp/cluster.yaml
kubeadm init phase kubeconfig all --config=/tmp/cluster.yaml
5）实际操作中发现上述操作用处不大，一般都还需要执行如下命令（有部分机器无需执行，重启也正常）
cd /etc/kubernetes
mkdir bak
cp *.conf bak
#注意如下命令只输出结果，需要手动编辑kubelet.conf文件，diff对比一下，也可以只粘贴差异情况
kubeadm alpha kubeconfig user --org system:nodes --client-name system:node:$(hostname)
将所得结果写入/etc/kubernetes/kubelet.conf（运维注意备份），否则节点重启后就歇菜了；
6）再次运行命令，检查确认全部证书均已刷新有效期
kubeadm alpha certs check-expiration
7）官方文档说无需reboot，但非常建议reboot一下，确保所有pod都使用到了新证书
reboot
8）重启后检查该master节点状态，如无异常，则重新加入调度（有钱的情况下，master不参与调度是最稳定的）
kubectl uncordon k8s-master-01
9）如果有多台master，则重复如上操作即可

其他提示
#证书升级后要清空/root/.kube再拷贝
cd /root/.kube
rm -rf cache/ http-cache/
cp -i /etc/kubernetes/admin.conf /root/.kube/config
... 正在更新


::: tip
apiserver 访问 kubelet 时，并不校验 kubelet 的服务端证书，kubeadm 也并不提供更新 kubelet 服务端证书的办法。
:::
