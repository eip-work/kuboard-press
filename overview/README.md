## Kuboard
A cool Kubernetes dashboard.

Kuboard 可以有效降低 Kubernetes 初学者的学习门槛，对于有经验的用户，也是非常顺手的一款运维工具。已在多个项目中投产使用。

Kuboard 的主要特点：
* 场景化设计
* 微服务分层显示
* 微服务上下文监控

![image-20190716234146419](./README.assets/image-20190716234146419.png)




## Demo

[Kuboard 在线体验](http://demo.eip.work/#/login?isReadOnly=true&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXZpZXdlci10b2tlbi02djZiZiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJvYXJkLXZpZXdlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjhiYTU3YmI1LWFiMTctNDM1NS1hNTM0LTQ0Njk4NGY0NzFlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprdWJvYXJkLXZpZXdlciJ9.DcXNIp0RKha1zkV4ga_QlGfcvMLGx2LOyzX-0VeboC3FojKFhxnfBeoda-zTeh6ugJlSM4kQYrRcof1Kx8Mg3-UgofNmgRySbDEVKtJZyMUoHqLmySKUIn8sbX8q83RNcqwcvY-fM8-w8HSuzU7Td7WWNuZrlCL4q_LQDYIBet1nlQ83YsENKNE8rsZQFDw8YM0MH6BEZLdwyhaboy_jjYbsU7kv8gks3aIX4lh1Fs9ZFQpC_6B0_MZvb7rEeG2M8QWXoUkDoL5JCKu6Wot5GlWf0kDMxIsViggP0NmSDTKh6kIvCkT2FZ2I4guEcjE_EjBpdOS6Abta22tzLlPKhg)
为保证环境的稳定性，在线 Demo 中只提供只读权限。<span style="color: #F56C6C; font-weight: 500;">（请在PC浏览器中打开）</span>

<p>
  <a target="_blank" href="http://demo.eip.work/#/login?isReadOnly=true&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrdWJvYXJkLXZpZXdlci10b2tlbi02djZiZiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrdWJvYXJkLXZpZXdlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjhiYTU3YmI1LWFiMTctNDM1NS1hNTM0LTQ0Njk4NGY0NzFlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprdWJvYXJkLXZpZXdlciJ9.DcXNIp0RKha1zkV4ga_QlGfcvMLGx2LOyzX-0VeboC3FojKFhxnfBeoda-zTeh6ugJlSM4kQYrRcof1Kx8Mg3-UgofNmgRySbDEVKtJZyMUoHqLmySKUIn8sbX8q83RNcqwcvY-fM8-w8HSuzU7Td7WWNuZrlCL4q_LQDYIBet1nlQ83YsENKNE8rsZQFDw8YM0MH6BEZLdwyhaboy_jjYbsU7kv8gks3aIX4lh1Fs9ZFQpC_6B0_MZvb7rEeG2M8QWXoUkDoL5JCKu6Wot5GlWf0kDMxIsViggP0NmSDTKh6kIvCkT2FZ2I4guEcjE_EjBpdOS6Abta22tzLlPKhg">
    <img src="./README.assets/image-20190723104717575.png"></img>
  </a>
</p>




## Get Started



## Kubernetes 初学者

单纯地按章节学习 Linux 基础知识、网络知识、容器技术等，每一块儿的基础入门书籍就有几百页之多。

最好的学习方法是在 **实践中学习**，碰到问题时去寻求答案，**解决问题** 后去 **总结反思**。这种学习方法趣味性强，得来的知识也最为牢靠，如果选对了方向，所学知识通常也是工作中实用性最高的知识。

<span style="color: red; font-weight: 500;">读100页 K8S 文档，不如把 K8S 安装一遍</span>

Kuboard 为初学者学习 Kubernetes 时设计了如下学习路径：

* [安装 Kubernetes 单Master节点](/install/install-k8s) （初学者也许要花费1小时或更多）

* [安装 Kuboard](/install/install-dashboard) （5分钟）

* 使用 Kuboard 工作负载编辑器 [创建 busybox](/guide/example/busybox) （10分钟）

* 尝试 Kuboard 设计的其他 example [使用 Kuboard](/guide/index)



## Kubernetes 有经验者

作为资深的 Kubernetes 用户，您一定有如下痛苦：

* YAML 文件越来越多，越来越复杂，编写和维护 YAML 文件耗费了大量的时间
* 准备了开发环境，又要维护测试环境、准上线环境、生产环境
* kubectl 反复执行 kubectl 命令，与集群的交互界面始终处于片段化的信息中，需要连续好几个命令才能诊断问题

Kuboard 为您的这些痛苦提供了极佳的解决方案，Wanna feel cool ? Start with:  

* [安装 Kuboard](/install/install-dashboard) （5分钟）

- 使用 Kuboard 工作负载编辑器 [创建 busybox](/guide/example/busybox) （10分钟）

- 尝试 Kuboard 设计的其他 example [使用 Kuboard](/guide/index)



## 在线提问

![Kuboard 兴趣群二维码](./README.assets/kuboard_qq.png)