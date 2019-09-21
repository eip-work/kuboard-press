---
description: 使用Kuboard管理Kubernetes名称空间。
---

# 名称空间管理

## 创建名称空间

### 前提

必须具备如下条件：

* Kubernetes 集群
* 已在集群中安装 Kuboard
* 已进入 Kuboard 操作界面 [安装并进入 Kuboard](/install/install-dashboard.html)



假设您已经进入了 Kuboard 界面，如下图所示：

![Kubernetes教程：Kuboard界面](./namespace-create.assets/image-20190723105606081.png)



### 准备

* 点击 ***创建*** 按钮，创建名称空间

并填写：

| 字段名称 | 填写内容 | 说明                         |
| -------- | -------- | ---------------------------- |
| 名称     | example  | Kubernetes 的 namespace 名称 |

![Kubernetes教程：Kuboard创建名称空间](./namespace-create.assets/image-20190723105644937.png)

* 点击 ***保存*** 

![Kubernetes教程：Kuboard保存名称空间](./namespace-create.assets/image-20190723105722999.png)

* 点击 ***应用***

![Kubernetes教程：Kuboard保存名称空间-应用](./namespace-create.assets/image-20190723105748435.png)

* 点击 ***完成***

  此时可在名称空间列表中查看到刚刚创建好的名称空间 *example*

![Kubernetes教程：Kuboard创建名称空间完成](./namespace-create.assets/image-20190723105809872.png)

* 点击 *example* 名称空间

  点击 *example* 名称空间后，可进入该名称空间的页面。刚刚初始化的名称空间的界面布局如下图所示：

![Kubernetes教程：Kuboard进入名称空间页](./namespace-create.assets/image-20190723105830318.png)
