# 查看 Kuboard 日志

## 日志输出位置

Kuboard 日志输出到两个位置：
- 控制台（全量日志），查看方式如下
  ```sh
  docker logs -f kuboard
  ```
- `kuboard-log/${hostname}/` 路径（容器内路径为 `/app/logs/${hostname}/`）：
  - `api/kuboard-log.log` 调用 Kuboard 接口的日志信息
  - `audit/kuboard-audit.log` Kuboard 审计日志（需在 Kuboard 界面的 `设置/系统设置` 菜单启用）
  - `sync/${clusterId}.log` 同步集群缓存的日志信息
  - `health.log` 检查集群连接状态的日志信息
  - `main.log` Kuboard Server 启动的日志信息

## 日志级别设置

在 Kuboard 界面的 `设置` - `系统设置` - `日志参数设置` 菜单，可以设置日志的级别，设置界面如下图所示：

![日志参数设置](./trace.assets/trace.png)

## 按请求 ID 查找日志

为了更便捷地定位生产环境中的问题，Kuboard 允许用户为每个请求设置日志级别。具体的方法是：在请求报文头中增加 `kb-log-level` 报文头，可选值有 `ERROR`、`WARN`、`INFO`、`DEBUG`、`TRACE`。

例如，下面的请求中，增加了报文头 `kb-log-level: TRACE`

```sh {3}
curl -v 'https://demo.kuboard.cn/api/cluster.kuboard.cn/v4/cluster?pageNum=1&pageSize=20' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOi[ENCRYPTED]' \
  -H 'kb-log-level: TRACE'
```

该请求的响应报文如下所示，响应报文头中包含一个 `kb-request-id` 字段，样例中的值为 `1qZPF6iNMvC`：

```log {18}
...

> GET /api/cluster.kuboard.cn/v4/cluster?pageNum=1&pageSize=20 HTTP/2
> Host: demo.kuboard.cn
> User-Agent: curl/8.7.1
> Accept: */*
> authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOi[ENCRYPTED]
> kb-log-level: TRACE
> 

* Request completely sent off

< HTTP/2 200 
< cache-control: no-cache, no-store, max-age=0, must-revalidate
< content-type: application/json;charset=UTF-8
< date: Sat, 03 Jan 2026 01:44:18 GMT
< expires: 0
< kb-request-id: 1qZPF6iNMvC
< pragma: no-cache
...

{ [838 bytes data]
100   838    0   838    0     0  12940      0 --:--:-- --:--:-- --:--:-- 13093
* Connection #0 to host 127.0.0.1 left intact
{
  "code": 200,
  "data": {
    "list": [
      {
        "metadata": {
          "name": "default",
          "uid": "1kCOcn5JKGk",
          "resourceVersion": 0,
          "createTime": "2025-05-10T09:39:37.000+08:00",
          "updateTime": "2025-05-10T09:39:37.000+08:00"
        },
        "spec": {
          "description": "",
          "importType": "kubeconfig",
          "apiServerUrl": "https://10.0.8.11:6443",
          "apiServerSkipVerifyHostname": false
        },
...
}
```

使用 `docker logs kuboard | grep 1qZPF6iNMvC` 命令，可以查看到改请求的所有日志信息，如下所示：

```log
2026-01-03 09:44:18.056 INFO  io-80-exec-5826 1qZPF6iNMvC cn.kuboard.config.MdcFilter.processFactChain():81                                - 【请求处理开始】>>>>>>>>
2026-01-03 09:44:18.056 INFO  io-80-exec-5826 1qZPF6iNMvC cn.kuboard.config.MdcFilter.processFactChain():92                                - 将请求【1qZPF6iNMvC】的日志级别调整为【TRACE】
2026-01-03 09:44:18.057 INFO  io-80-exec-5826 1qZPF6iNMvC cn.kuboard.config.MdcFilter.processFactChain():95                                - GET: /api/cluster.kuboard.cn/v4/cluster?pageNum=1&pageSize=20
2026-01-03 09:44:18.057 DEBUG io-80-exec-5826 1qZPF6iNMvC enticationManagerResolverConfig.lambda$tokenAuthenticationManagerResolver$0():36 - 使用 KuboardAccessKeyAuthenticationManager 认证
2026-01-03 09:44:18.058 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardAuthorizationManagerUrl.check():31                    - check if user [admin/00000000001] can GET /api/cluster.kuboard.cn/v4/cluster, tokenId: 1qZOOF138v6
2026-01-03 09:44:18.058 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUrlAnalyzeUtil.analyzePathPatternAtRuntime():185      - apiResource: {"scopeType":"kuboard","group":"cluster.kuboard.cn","resource":"cluster","containsUid":false,"verb":"list","path":"/api/cluster.kuboard.cn/v4/cluster","acceptable":true}, pathPattern: /api/cluster.kuboard.cn/v4/cluster
2026-01-03 09:44:18.059 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUserAuthorityFactory.getKuboardUserAuthority():104    - 未找到 Kb-Auth-Time 请求头
2026-01-03 09:44:18.059 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUserAuthority.logDecision():186                       - 【Grant】[admin/00000000001] to list [cluster.kuboard.cn->cluster] in scope kuboard
2026-01-03 09:44:18.059 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardAuthorizationManagerUrl.checkAuthority():74           - 【Grant】user [admin/00000000001] to GET /api/cluster.kuboard.cn/v4/cluster
2026-01-03 09:44:18.059 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUserAuthorityFactory.getKuboardUserAuthority():104    - 未找到 Kb-Auth-Time 请求头
2026-01-03 09:44:18.059 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUserAuthHeaderFilter.doFilterInternal():34            - Add header Kb-Auth-Time=2026-01-03T09:32:27.929+08:00#ecc1ac76048dbb1796fd6b3965c618bf#68c58c3c30652891ab64dc472ae90b41
2026-01-03 09:44:18.060 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.security.KuboardUrlAnalyzeUtil.analyzePathPatternAtRuntime():185      - apiResource: {"scopeType":"kuboard","group":"cluster.kuboard.cn","resource":"cluster","containsUid":false,"verb":"list","path":"/api/cluster.kuboard.cn/v4/cluster","acceptable":true}, pathPattern: /api/cluster.kuboard.cn/v4/cluster
2026-01-03 09:44:18.060 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.ClusterService.listClusters():136                             - listUser - pageNum: 1, pageSize: 20, uid: null, name: null, importStatus: null, healthStatus null, startTime: null, endTime null
2026-01-03 09:44:18.061 DEBUG io-80-exec-5826 1qZPF6iNMvC org.mybatis.spring.SqlSessionUtils.debug():49                                    - Creating a new SqlSession
2026-01-03 09:44:18.061 DEBUG io-80-exec-5826 1qZPF6iNMvC org.mybatis.spring.SqlSessionUtils.debug():49                                    - SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@79979743] was not registered for synchronization because synchronization is not active
2026-01-03 09:44:18.062 DEBUG io-80-exec-5826 1qZPF6iNMvC org.mybatis.spring.transaction.SpringManagedTransaction.debug():49               - JDBC Connection [HikariProxyConnection@676782725 wrapping org.mariadb.jdbc.Connection@58144423] will not be managed by Spring
2026-01-03 09:44:18.063 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList_mpCount.debug():135           - ==>  Preparing: SELECT COUNT(*) AS total FROM kb_cluster
2026-01-03 09:44:18.063 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList_mpCount.debug():135           - ==> Parameters: 
2026-01-03 09:44:18.064 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList_mpCount.trace():141           - <==    Columns: total
2026-01-03 09:44:18.064 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList_mpCount.trace():141           - <==        Row: 1
2026-01-03 09:44:18.064 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList_mpCount.debug():135           - <==      Total: 1
2026-01-03 09:44:18.065 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList.debug():135                   - ==>  Preparing: SELECT id,name,description,import_type,import_status,api_server_url,proxy_url,cache_k8s_version,cache_health_status,cache_health_status_reason,cache_health_status_last_check_time,cache_last_update_time,create_time,update_time FROM kb_cluster ORDER BY name ASC LIMIT ?
2026-01-03 09:44:18.065 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList.debug():135                   - ==> Parameters: 20(Long)
2026-01-03 09:44:18.066 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList.trace():141                   - <==    Columns: id, name, description, import_type, import_status, api_server_url, proxy_url, cache_k8s_version, cache_health_status, cache_health_status_reason, cache_health_status_last_check_time, cache_last_update_time, create_time, update_time
2026-01-03 09:44:18.066 TRACE io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList.trace():141                   - <==        Row: 1kCOcn5JKGk, default, , kubeconfig, success, https://10.0.8.11:6443, null, {  "major": "1",  "minor": "25",  "gitVersion": "v1.25.7+k3s1",  "gitCommit": "f7c20e237d0ad0eae83c1ce60d490da70dbddc0e",  "gitTreeState": "clean",  "buildDate": "2023-03-10T22:16:07Z",  "goVersion": "go1.19.6",  "compiler": "gc",  "platform": "linux/amd64"}, ready, ok, 2025-05-10 09:39:58, null, 2025-05-10 09:39:37, 2025-05-10 09:39:37
2026-01-03 09:44:18.067 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.mapper.ClusterMapper.selectList.debug():135                   - <==      Total: 1
2026-01-03 09:44:18.067 DEBUG io-80-exec-5826 1qZPF6iNMvC org.mybatis.spring.SqlSessionUtils.debug():49                                    - Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@79979743]
2026-01-03 09:44:18.067 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.ClusterService.printPage():9                                  - PageNum: 1, pageSize: 20, total: 1
2026-01-03 09:44:18.067 DEBUG io-80-exec-5826 1qZPF6iNMvC cn.kuboard.cluster.ClusterService.printPage():13                                 -     1.1  ClusterEntity(id=1kCOcn5JKGk, name=default, description=, importType=kubeconfig, importSecretInfo=null, importStatus=success, apiServerUrl=https://10.0.8.11:6443, apiServerSkipVerifyHostname=false, apiServerReversePort=0, proxyUrl=null, cacheK8sVersion={  "major": "1",  "minor": "25",  "gitVersion": "v1.25.7+k3s1",  "gitCommit": "f7c20e237d0ad0eae83c1ce60d490da70dbddc0e",  "gitTreeState": "clean",  "buildDate": "2023-03-10T22:16:07Z",  "goVersion": "go1.19.6",  "compiler": "gc",  "platform": "linux/amd64"}, cacheLastUpdateTime=null, cacheHealthStatus=ready, cacheHealthStatusReason=ok, cacheHealthStatusLastCheckTime=Sat May 10 09:39:58 CST 2025, createTime=Sat May 10 09:39:37 CST 2025, updateTime=Sat May 10 09:39:37 CST 2025, deleted=null, resourceVersion=0)
2026-01-03 09:44:18.068 INFO  io-80-exec-5826 1qZPF6iNMvC cn.kuboard.config.MdcFilter.doFilterInternal():124                               - 【请求处理结束】<<<<<<<<
```

::: tip Note
对于容器组日志查看界面和命令行终端界面，如果需要调整其日志级别，需要添加 `kb_log_level` 请求参数，例如：
`https://demo.kuboard.cn/k8s/1kCOcn5JKGk/api/v1/namespaces/default/pods/web-nginx-74f97b56db-gf4vp/log?container=nginx&kb_charset=UTF-8&kb_log_level=TRACE`
:::