
# 在树莓派上安装 Ceph

## 安装 ubuntu



## 安装 docker

```sh
wget https://repo.huaweicloud.com/docker-ce/linux/ubuntu/dists/focal/pool/stable/arm64/containerd.io_1.3.7-1_arm64.deb
wget https://repo.huaweicloud.com/docker-ce/linux/ubuntu/dists/focal/pool/stable/arm64/docker-ce-cli_19.03.13~3-0~ubuntu-focal_arm64.deb
wget https://repo.huaweicloud.com/docker-ce/linux/ubuntu/dists/focal/pool/stable/arm64/docker-ce_19.03.13~3-0~ubuntu-focal_arm64.deb
dpkg -i containerd.io_1.3.7-1_arm64.deb docker-ce-cli_19.03.13~3-0~ubuntu-focal_arm64.deb docker-ce_19.03.13~3-0~ubuntu-focal_arm64.deb
```

```sh
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker 
docker run hello-world
```


* 设置镜像地址

  ```sh
  sudo vim /etc/docker/daemon.json
  ```
  * 添加 registry-mirrors 字段
  ``` json
  {
  "registry-mirrors": ["https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com"]
  }
  ```
  ```sh
  systemctl restart docker
  ```

## 安装 ceph

``` yaml
[ceph]
name=Ceph packages for $basearch
baseurl=https://download.ceph.com/rpm-octopus/el7/$basearch
enabled=1
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc


[ceph-noarch]
name=Ceph noarch packages
baseurl=https://download.ceph.com/rpm-octopus/el7/noarch
enabled=1
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc


[ceph-source]
name=Ceph source packages
baseurl=https://download.ceph.com/rpm-octopus/el7/SRPMS
enabled=0
priority=2
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc
```



重置磁盘
``` sh
sgdisk --zap-all /dev/sda
```
