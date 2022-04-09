---
layout: LearningLayout
description: Kubernetes教程_本文阐述了管理员如何重置用户的 MFA 多因子认证
meta:
  - name: keywords
    content: Kubernetes教程,K8S教程,Kubernetes Service
---

# 重置 MFA 多因子认证

## 方法一


进入 Kuboard 的容器命令行界面，例如：
```sh
docker exec -it kuboard /bin/bash
```

直接删除 etcd 中的这个对象，命令如下：
> 其中 `abc` 为用户名，替换成你自己的用户名
```sh
etcdctl del /kind/KuboardUserGlobalPreference/cluster/abc/abc
```

## 方法二

进入 Kuboard 的容器命令行界面，例如：
```sh
docker exec -it kuboard /bin/bash
```

执行如下命令
> 其中 `abc` 为用户名，替换成你自己的用户名，用户名要写两次
```sh
etcdctl get --prefix /kind/KuboardUserGlobalPreference/cluster/abc/abc
```

输出结果如下所示
> 以下结果为了便于阅读，对 json 进行了格式化，实际结果为一行 json 串。
```json {14,15,18,19,20}
/kind/KuboardUserGlobalPreference/cluster/abc/abc
{
  "kind":"KuboardUserGlobalPreference",
  "metadata":{
    "name":"abc",
    "cluster":"abc",
    "createTime":"2022-04-05T21:05:39.308+08:00",
    "resourceVersion":44937,
    "uid":"515391272765100032",
    "updateTime":"2022-04-05T21:06:59.182983+08:00"
  },
  "spec":{
    "defaultPage":"",
    "mfaSecret":"AQMOP5MTHYNQALOXCFALZKMALJPWTGH6",
    "mfaRecoveryCode":"ZCZLRZHCZL4YN55CSNGW\nJ4ENPRQ9VRMVM32KM7ET\n3CFZZQZSNNBL8GW2KHP7\n8KP4F5ZEWJ2E9D67XZXJ\nCSJGTQVC39BR5T6BMCM7"
  },
  "status":{
    "mfaEnabled":true,
    "mfaEnableTime":"2022-04-05T21:06:59.182979+08:00",
    "mfaDisableTime":"2022-04-05T21:05:51.551567+08:00"
  }
}
```

取上一个步骤中的 json 结果，删除所有 `mfa` 开头的字段，其他内容不变，执行如下命令：
> 其中 `abc` 为用户名，替换成你自己的用户名
```sh
etcdctl put /kind/KuboardUserGlobalPreference/cluster/abc/abc {"kind":"KuboardUserGlobalPreference","metadata":{"name":"abc","cluster":"abc","createTime":"2022-04-05T21:05:39.308+08:00","resourceVersion":44937,"uid":"515391272765100032","updateTime":"2022-04-05T21:06:59.182983+08:00"},"spec":{"defaultPage":""},"status":{}}
```

