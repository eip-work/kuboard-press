---
layout: LearningLayout
description: Kubernetes教程_使用Kuboard在Kubernetes上部署Spring_Cloud微服务平台SpringBlade
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes微服务,Kubernetes Spring Cloud
---

# 部署 saber-db

<AdSenseTitle/>

::: tip 前提条件

* 部署 `saber-db` 之前，请确保您的环境已经满足 [环境准备](../prepare/prepare.html) 中的要求；
* `saber-db` 的部署并不依赖于 `nacos`、`redis`、`sentinel`，您也可以先部署 `saber-db` 再部署   `nacos`、`redis`、`sentinel`。

:::

## 创建 StatefulSet

按照如下步骤创建 `saber-db` StatefulSet：

* 在 Kuboard 界面进入名称空间 `spring-blade` 之后，点击菜单 ***名称空间*** -> ***spring-blade*** -> ***常用操作*** -> ***创建工作负载*** ，如下图所示：

  并填写表单：

  | 字段名称     | 字段值        | 备注                                         |
  | ------------ | ------------- | -------------------------------------------- |
  | 工作负载类型 | `StatefulSet` |                                              |
  | 工作负载分层 | `持久层`      | 填写后将自动添加 `k8s.kuboard.cn/layer` 标签 |
  | 工作负载名称 | `saber-db`       | 填写后将自动添加 `k8s.kuboard.cn/name` 标签  |
  | 副本数       | `1`           |                                              |

  ![image-20210503194614214](./m-saber-db.assets/image-20210503194614214.png)

  

* 切换到 ***容器信息*** 标签，如下图所示：

  点击左侧的 ***添加工作容器*** 按钮，添加一个工作容器，并填写表单：

  | 字段名称                    | 字段值                                                       | 备注                                          |
  | --------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
  | 名称                        | `saber-db`                                                   |                                               |
  | 容器镜像                    | `从其他镜像仓库加载镜像（不使用用户名密码）`                 |                                               |
  | 容器镜像-->镜像仓库         | `swr.cn-east-2.myhuaweicloud.com`                            |                                               |
  | 容器镜像-->镜像路径         | `blade/saber-db`                                             |                                               |
  | 容器镜像-->镜像标签         | `3.0.3`                                                      |                                               |
  | 镜像拉取策略                | `始终拉取新镜像（Always）`                                   |                                               |
  | 环境变量                    | `MYSQL_ALLOW_EMPTY_PASSWORD`=`1`<br />`MYSQL_ROOT_PASSWORD`=`root` | 类型为 `值`，点击 ***名值对*** 按钮可添加一组 |
  | 资源请求/限制               | 内存资源请求：`200Mi`<br />内存资源限制：`2048Mi`            |                                               |
  | 容器端口                    | `mysql`<br />`3306`                                          |                                               |
  | 健康检查-->容器启动检查探针 | 探测方式： `命令行`<br />执行命令： `mysql -uroot -proot -e 'select 1'`<br />初始延迟：`30`<br />不健康阈值：`20` |                                               |
  | 健康检查-->容器存活检查探针 | 探测方式： `命令行`<br />执行命令： `mysqladmin -uroot -proot ping` |                                               |
  | 健康检查-->容器就绪检查探针 | 探测方式： `命令行`<br />执行命令： `mysql -uroot -proot -e 'select 1'`<br /><div style="width: 400px;"></div> |                                               |

  ![image-20210503204714644](./m-saber-db.assets/image-20210503204714644.png)

* 切换到 ***存储挂载*** 标签页，并点击其中的 ***添加存储卷声明模板*** 按钮，如下图所示：

  填写表单：

  | 字段名称              | 字段值             | 备注                                                         |
  | --------------------- | ------------------ | ------------------------------------------------------------ |
  | 名称                  | `data`             |                                                              |
  | 存储类                | `cephfs-raspberry` | * 下拉选择，根据您集群环境的不同，此参数的值可以<br />不一样，但是对应的存储类必须为有效的存储类，并<br />能够动态提供存储卷 |
  | 分配模式              | `动态分配`         |                                                              |
  | 读写模式              | `可被多节点读写`   |                                                              |
  | 总量                  | `2Gi`              |                                                              |
  | mysql 容器中的挂载类型 | `读写`             |                                                              |
  | mysql 容器中的挂载路径 | `/var/lib/mysql` |                                                              |

  > * 要完成这一步骤，您必须有一个有效的存储类，关于存储类的介绍请参考 [StorageClass](/learning/k8s-intermediate/persistent/storage-class.html)
  > * 如果您的集群中尚未配置存储类，请参考如下三种存储类配置中的任意一种：
  >   * [使用 CephFS 作为存储类](/learning/k8s-intermediate/persistent/ceph/k8s-config.html)
  >   * [使用 CephFS 作为存储类 - Rook](/learning/k8s-intermediate/persistent/ceph/rook-config.html)
  >   * [使用 NFS 作为存储类](/learning/k8s-intermediate/persistent/nfs.html)

  ![image-20210503200618642](./m-saber-db.assets/image-20210503200618642.png)



* 切换到 ***高级设置*** 标签页，如下图所示：

  并填写表单：

  | 字段名称       | 字段值                      | 备注                                                         |
  | -------------- | --------------------------- | ------------------------------------------------------------ |
  | 容器组管理策略 | `Parallel`                  | 不按容器组的序号顺序更新容器组。（此为测试环境，mysql 只部署<br />一个副本，不考虑主从的情况，否则此参数不能选择  `Parallel`） |
  | 历史版本数量   | `10`                        |                                                              |
  | 更新策略       | `滚动更新（RollingUpdate）` |                                                              |
  | 分割点         | `0`                         | 从序号为 `0` 的容器组开始更新 StatefulSet 中的所有容器组     |

  ![image-20210501192537254](./m-redis.assets/image-20210501192537254.png)



* 切换到 ***服务/应用路由*** 标签页，如下图所示：

  并填写表单：

  | 字段名称 | 字段值                                     | 备注                                              |
  | -------- | ------------------------------------------ | ------------------------------------------------- |
  | 服务类型 | `Headless`                                 | 无头 Service，专用于 StatefulSet                  |
  | 端口     | `mysql`<br />`TCP`<br />`3306`<br />`3306` | 将容器的 `3306` 端口映射到 Service 的 `3306` 端口 |

  ![image-20210503200837429](./m-saber-db.assets/image-20210503200837429.png)



* 点击 ***保存*** 按钮，完成 `saber-db` StatefulSet 的创建



## 验证部署结果

* 在上面的步骤中，完成 StatefulSet 的保存以后，将会进入该 StatefulSet 的详情页面，如下图所示：
  * 启动过程中，会看到一个 `FailedSchedule` 事件，是因为 StatefulSet ***存储卷声明模板*** 指定的 ***存储卷声明*** 尚未成功创建和绑定，只要对应的存储类是没有问题的，稍等片刻即可；
  * `Unhealthy` 事件，启动过程中尝试校验，但是未能成功，继续等候，待数据库初始化成功以后，***容器启动检查探针*** 和 ***容器就绪检查探针成功*** 就可以执行成功，容器组进入就绪状态，如下图所示：
  
  ![image-20210503202925230](./m-saber-db.assets/image-20210503202925230.png)



* 点击上图中的 ***sh*** 按钮，可以进入 saber-db 容器的命令行终端界面，如下图所示：
  执行命令：

  ```sh
  mysql -uroot -proot
  show databases;
  use blade;
  show tables;
  ```
  ![image-20210503203333701](./m-saber-db.assets/image-20210503203333701.png)

  如果能够显示数据库 `blade` 中的表结构，则我们可以认为 `saber-db` 部署成功。

  下一步，请 [部署接口网关](./m-gateway.html)
