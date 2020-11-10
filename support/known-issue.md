---
vssueId: 188
description: 本文描述了 Kuboard 的一些已知问题
---

# 已知问题

## SSE4.2 compatible

Kuboard 自 v1.0.7 开始，使用 [OpenResty](https://hub.docker.com/r/openresty/openresty) 提供的基础镜像，该镜像存在的一个问题是：CPU 必须兼容 SSE4.2。这意味着，一部分 2007 年以前的 CPU 可能无法兼容。请参考 [https://github.com/openresty/docker-openresty/issues/39](https://github.com/openresty/docker-openresty/issues/39)

> Kuboard v3.0.x 不再使用 OpenResty，因此也不存在此问题。

出现此问题时，通过 kubectl 命令查看 Kuboard 日志
``` sh
kubectl logs -f -l k8s.eip.work/name=kuboard -n kube-system
```


错误提示如下所示：
```
Illegal instruction     (core dumped) nginx -g "daemon off;"
```
