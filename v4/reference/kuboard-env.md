# Kuboard v4 环境变量

 部署 Kuboard v4 时，主要使用环境变量对其进行配置。Kuboard v4 支持的环境变量如下所示：

## 数据库连接参数

### DB_DRIVER

Kuboard 连接数据库时使用的驱动程序，可选值有：
- `com.mysql.cj.jdbc.Driver` 对应 mysql 数据库
- `org.mariadb.jdbc.Driver` 对应 MariaDB 数据库
- `org.postgresql.Driver` 对应 Postgre / OpenGauss 数据库

### DB_URL

Kuboard 连接数据库时使用的连接参数，例如：
- MYSQL: `jdbc:mysql://10.99.0.8:3306/kuboard?serverTimezone=Asia/Shanghai`
- MariaDB: `jdbc:mariadb://10.99.0.8:3306/kuboard?&timezone=Asia/Shanghai`
- OpenGauss `jdbc:postgresql://localhost:5432/kuboard?currentSchema=kuboard&characterEncoding=UTF8`

### DB_USERNAME

Kuboard 连接数据库时使用的连接参数。

### DB_PASSWORD

Kuboard 连接数据库时使用的连接参数。


## 高可用相关参数

### KUBOARD_CACHE_PROVIDER

用于指定缓存提供方式，有如下可选值，非必填：
  - `caffeine`，默认值，使用 Caffeine 内存缓存，只能用在 Kuboard 的单副本模式下；
  - `redis`，使用分布式缓存 Redis

### KUBOARD_CACHE_REDIS_MODE

用于指定 Redis 的连接模式，有如下可选值，非必填：
  - `standalone`，默认值，Redis Standalone 模式
  - `sentinel`，Redis 哨兵模式
  - `cluster`，Redis 集群模式

### KUBOARD_CACHE_REDIS_NODES

用于指定 Redis 节点信息，多个节点时用 `,` 分割，非必填，默认值为 `localhost:6379`，如果填写，可参考如下例子：
  - `standalone` 模式下，只填一个端口地址，例如 `10.99.0.8:6379`
  - `sentinel` 模式下，填写 Redis 所有哨兵的端口地址，例如： `10.99.0.10:6379,10.99.0.11:6379,10.99.0.12:6379`
  - `cluster` 模式下，填写 Redis 所有节点的端口地址，例如： `10.99.0.20:6379,10.99.0.21:6379,10.99.0.22:6379`

### KUBOARD_CACHE_REDIS_SENTINEL_MASTER

用于指定 Redis Sentinel 模式下 master 名称，非必填，默认值为 `master`

### KUBOARD_CACHE_REDIS_PASSWORD

用于指定连接 Redis 时的密码，非必填，默认值为空字符串

### KUBOARD_CACHE_REDIS_DATABASE

用于指定连接 Redis 时的 Redis 数据库编号，非必填，默认值为 `0`

## 其他参数

### TZ

Kuboard 程序使用的时区，默认值为 `Asia/Shanghai`

### KUBOARD_SWAGGER_ENABLED

是否启用 SWAGGER 查看 Kuboard 提供的 api 文档。

- 默认值为 `true`，此时用户可以通过链接 `http://your-kuboard:port/swagger-ui/index.html` 查看 Swagger UI；
- 如果设置为 `false`，则禁用 Swagger，部分客户要求禁用此功能以符合安全扫描的要求。