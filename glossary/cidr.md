---
description: CIDR Classless Inter-Domain Routing 概念解析
---

# CIDR

CIDR（无类别域间路由，Classless Inter-Domain Routing）是一个在Internet上创建附加地址的方法，这些地址提供给服务提供商（ISP），再由ISP分配给客户。CIDR将路由集中起来，使一个IP地址代表主要骨干提供商服务的几千个IP地址，从而减轻Internet路由器的负担。

CIDR 地址中包含标准的32位IP地址和有关网络前缀位数的信息。以CIDR地址222.80.18.18/25为例，其中“/25”表示其前面地址中的前25位代表网络部分，其余位代表主机部分。

例如IP号段125.203.96.0 - 125.203.127.255转化为CIDR格式就是：

125.203.0110 0000.0000 0000到125.203.0111 1111.1111 1111，也可以写成125.203.96.0/19。

## 参考文档

* [CIDR 计算](https://cloud.tencent.com/developer/article/1151790)
* [CIDR to IPv4 Conversion](https://www.ipaddressguide.com/cidr)
