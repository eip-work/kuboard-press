
# 在树莓派4B上安装CentOS

## 烧录镜像

* 从华为镜像服务下载 RaspberryPI 的 CentOS 镜像，下载地址为：
  
  http://mirrors.huaweicloud.com/centos-altarch/7.7.1908/isos/armhfp/CentOS-Userland-7-armv7hl-RaspberryPI-Minimal-4-1908-sda.raw.xz

* 从 raspberrypi 官网下载镜像烧录工具 Raspberry Pi Imager

  https://www.raspberrypi.org/downloads/

* 将 raspberrypi 连接到路由器（有线）
* ssh 登录，默认密码为 centos

## 扩展磁盘

* 执行 `df -h` 可以看到，系统只有 2G 的存储空间，TF 卡上的剩余空间未被利用

* 在 /root 目录下执行：
  ```sh
  cat README
  ```
  结果为
  ```
  == CentOS 7 userland ==

  If you want to automatically resize your / partition, just type the following (as root user):
  rootfs-expand
  ```
* echo $LANG，如果结果为 `zh_CN.UTF-8`，执行 rootfs-expand 命令将失败
* 执行命令
  ``` sh
  export LANG="en_US.UTF-8"
  ```
* 执行命令
  ``` sh
  rootfs-expand
  ```
  执行成功
* 查看磁盘情况
  ``` sh
  [root@localhost ~]# df -h
  Filesystem      Size  Used Avail Use% Mounted on
  /dev/root        57G  1.2G   56G   2% /
  devtmpfs        1.9G     0  1.9G   0% /dev
  tmpfs           2.0G     0  2.0G   0% /dev/shm
  tmpfs           2.0G   17M  1.9G   1% /run
  tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
  /dev/mmcblk0p1  286M   53M  234M  19% /boot
  tmpfs           391M     0  391M   0% /run/user/0
  ```

## 修改 hostname

```sh
# 修改 hostname
hostnamectl set-hostname your-new-host-name
# 查看修改结果
hostnamectl status
# 设置 hostname 解析
echo "127.0.0.1   $(hostname)" >> /etc/hosts
```

## 设置国内yum镜像源

建议使用 [华为开源镜像站](https://mirrors.huaweicloud.com/)

选择 `CentOS-AltArch` 按照其提供的步骤设置 yum 镜像源。


## 安装 Docker

```sh
yum install docker
```

## 安装 nodejs

必须下载源代码编译

* 以 `root` 用户登录系统

* 安装编译工具
  ``` sh
  yum install -y gcc gcc-c++ make
  ```

* 下载源代码并编译
  ``` sh
  wget https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1.tar.gz
  tar -xvf node-v12.16.1.tar.gz
  cd node-v12.16.1
  ./configure
  make
  make install
  ```
* 重启
  ```sh
  reboot
  ```
* 检查安装结果
  ``` sh
  node -v
  npm -v
  ```
