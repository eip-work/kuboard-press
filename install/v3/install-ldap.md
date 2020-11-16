---
lessAds: false
description: 一行命令开启Kubernetes多集群管理之路_Kuboard_V3安装
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 安装 Kuboard v3 - ldap

<AdSenseTitle/>


Kuboard 支持多种认证方式：

* 内建用户库
* GitLab Community Edition / GitLab Enterprise Edition / gitlab.com
* GitHub Enterprise / github.com
* LDAP

本文描述了如何配置 Kuboard v3 使用 LDAP 实现用户登录。

## 前提条件

* 用于安装 Kuboard v3.0 的机器已经安装了 docker，并且版本不低于 docker 19.03
* 您已经有自己的 Kubernetes 集群，并且版本不低于 Kubernetes v1.13

## 部署计划

在正式安装 kuboard v3 之前，需做好一个简单的部署计划的设计，在本例中，各组件之间的连接方式，如下图所示：


* 用户通过 http://kuboard.mycompany.com 访问 Kuboard v3；

* Kuboard 通过 `localhost:389` 和 `localhost:636` 访问 LDAP；

* 安装在 Kubernetes 中的 Kuboard Agent 通过 `kuboard.mycompany.com` 访问 Kuboard 的 Web 服务端口 80 / 443 和 Kuboard Agent Server 端口 10081。


![image-20201115230620704](install-ldap.assets/image-20201115230620704.png)

本例子中，假设：

* 您已经准备好了一个 Linux 服务器用于安装 Kuboard-V3

## 准备 LDAP

> 本章节将引导您搭建一个测试用的 LDAP，如果您使用已经有的 LDAP，可跳过本章节。

* 启动 Open LDAP

  > 下面启动 Open LDAP 的脚本仅用于测试，未考虑如何持久化，如何设置 TLS 等，更多信息请参考该脚本中所用容器的 [帮助文档](https://github.com/osixia/docker-openldap)
  ``` sh
  docker run -p 389:389 -p 636:636 --name my-openldap-container --detach osixia/openldap:1.4.0
  ```
  
* 启动 phpLDAPadmin

  ```sh
  docker run -p 6443:443 \
    --env PHPLDAPADMIN_LDAP_HOSTS=host.docker.internal \
    --detach osixia/phpldapadmin:0.9.0
  ```
  
* 登录 phpLDAPadmin
  
  在浏览器输入 `https://kuboard.mycompany.com:6443` ，按下图所示步骤登录 phpLDAPadmin：
  
  | 字段名称 | 字段值                     | 字段描述       |
  | -------- | -------------------------- | -------------- |
  | Login DN | cn=admin,dc=example,dc=org | 默认管理员用户 |
  | Password | admin                      | 管理员密码     |
  
  ![image-20201114175421773](./install-ldap.assets/image-20201114175421773.png)

* 添加用户组

  登录成功后，按照下图所示步骤，进入添加分组的表单：

  ![image-20201114180239080](./install-ldap.assets/image-20201114180239080.png)

  在表单中填写 `mygroup` 然后点击 ***Create Object*** 按钮，创建 `mygroup` 用户组，如下图所示：

  ![image-20201114182400836](./install-ldap.assets/image-20201114182400836.png)

  > 点击 ***Create Object*** 之后的界面中再次点击 ***Commit*** 按钮，才能完成对象的创建。

* 添加用户

  按照下图所示步骤，进入添加用户的表单：

  ![image-20201114182716704](./install-ldap.assets/image-20201114182716704.png)

  表单各字段填写说明：

  | 字段名称       | 字段值             |
  | -------------- | ------------------ |
  | First name     | Huanqing           |
  | Last name      | Shao               |
  | Common Name    | Huanqing Shao      |
  | User ID        | shaohq             |
  | Password       | 123456             |
  | GID Number     | mygroup            |
  | Home Directory | /home/users/shaohq |

  表单界面如下所示：

  ![image-20201114183112103](./install-ldap.assets/image-20201114183112103.png)

  点击上图中的 ***Create Object*** 按钮，然后再点击 ***Commit*** 按钮，将成功创建用户，并进入如下界面。按照如下步骤在该界面中为用户添加邮箱地址字段：

  * 点击 Add new attribute
  * 选择 Email 字段类型
  * 填写电子邮箱地址
  * 点击 Update Object 按钮

  ![image-20201114183716496](./install-ldap.assets/image-20201114183716496.png)

::: tip LDAP Demo

此时我们已经准备好了用于演示的 LDAP 环境：

* 快速安装了一个 LDAP 服务实例
* 创建了一个用户组 `mygroup`
* 创建了一个用户 `shaohq`，该用户归属于用户组 `mygroup`，其密码为 `123456`

:::

## 启动 Kuboard

使用如下命令启动 Kuboard v3：
``` sh
sudo docker run -d \
  --restart=unless-stopped \
  --name=kuboard \
  -p 80:80/tcp \
  -p 10081:10081/udp \
  -p 10081:10081/tcp \
  -v /Users/shaohuanqing/temp/kuboard-data:/data \
  -e KUBOARD_LOGIN_TYPE="ldap" \
  -e KUBOARD_ENDPOINT="http://kuboard.mycompany.com" \
  -e KUBOARD_ROOT_USER="shaohq" \
  -e LDAP_HOST="host.docker.internal:389" \
  -e LDAP_BIND_DN="cn=admin,dc=example,dc=org" \
  -e LDAP_BIND_PASSWORD="admin" \
  -e LDAP_BASE_DN="dc=example,dc=org" \
  -e LDAP_FILTER="(objectClass=posixAccount)" \
  -e LDAP_USER_NAME="uid" \
  -e LDAP_ID_ATTRIBUTE="uid" \
  -e LDAP_EMAIL_ATTRIBUTE="mail" \
  -e LDAP_DISPLAY_NAME_ATTRIBUTE="cn" \
  -e LDAP_GROUP_SEARCH_BASE_DN="dc=example,dc=org" \
  -e LDAP_GROUP_SEARCH_FILTER="(objectClass=posixGroup)" \
  -e LDAP_USER_MACHER_USER_ATTRIBUTE="gidNumber" \
  -e LDAP_USER_MACHER_GROUP_ATTRIBUTE="gidNumber" \
  -e LDAP_GROUP_NAME_ATTRIBUTE="cn" \
  eipwork/kuboard:v3-alpha
```


::: tip 参数说明
* 建议将此命令保存为一个 shell 脚本，例如 `start-kuboard.sh`，后续升级 Kuboard 或恢复 Kuboard 时，需要通过此命令了解到最初安装 Kuboard 时所使用的参数；
* 第 4 行，Kuboard v3.0 需要暴露 `80` 端口，如安装指令的第三行所示，默认映射到了宿主机的 `80` 端口，您可以根据自己的情况选择宿主机的其他端口；
* 第 5、6 行，Kuboard v3.0 需要暴露 `10081` 端口 TCP / UDP，默认映射到了宿主机的 `10081` 端口，您可以根据自己的情况选择宿主机的其他端口；
* 第 7 行，Kuboard v3.0 的持久化数据存储在 `/data` 目录，默认映射到了宿主机的 `/root/kuboard-data` 路径，请根据您自己的情况进行调整；
* 第 8 行，将 Kuboard v3.0 与 GitLab 进行单点登录集成时，必须指定环境变量 `KUBOARD_LOGIN_TYPE` 为 `gitlab` （适用于 gitlab.com / gitlab-ee / gitlab-ce）；
* 第 9 行，必须指定 `KUBOARD_ENDPOINT` 环境变量为访问 Kuboard 界面的 URL；（如 [部署计划](#部署计划) 中所描述，本例子中，使用 `http://kuboard.mycompany.com` 作为通过执行此命令启动的 Kuboard 的访问 URL）；此参数不能以 `/` 结尾；
* 第 10 行，必须指定 `KUBOARD_ROOT_USER`，使用该 GitLab 用户登录到 Kuboard 以后，该用户具备 Kuboard 的所有权限；
* 第 11 行，指定 `GIBLAB_BASE_URL`，（如 [部署计划](#部署计划) 中所描述，本例子中，使用 `http://gitlab.mycompany.com` 作为通过作为 GitLab 的访问 URL，并假设 GitLab 已经事先准备就绪，如果不指定，该参数默认值为 `https://gitlab.com`）；此参数不能以 `/` 结尾；
* 第 12 行，必须指定 `GITLAB_APPLICATION_ID`，该参数来自于 [准备 GitLab](#准备-gitlab) 步骤中创建的 GitLab  Application 的 `Application ID` 字段
* 第 13 行，必须指定 `GITLAB_CLIENT_SECRET`，该参数来自于 [准备 GitLab](#准备-gitlab) 步骤中创建的 GitLab  Application 的 `Secret` 字段
:::

## 访问 Kuboard 界面

* 在浏览器中输入 `http://kuboard.mycompany.com`，您将被重定向到 GitLab 登录界面；
* 在 GitLab 登录界面使用 docker run 命令中 `KUBOARD_ROOT_USER` 参数指定的用户完成登录后，GitLab 将提示您是否授权访问 Kuboard，如下图所示：

  ![image-20201113215827177](./install-gitlab.assets/image-20201113215827177.png)

* 点击上图中的 ***Authorize*** 按钮后，您将成功登录 Kuboard 界面，第一次登录时，界面显示如下所示：

  根据 [部署计划](#部署计划) 的设想，如下表单的填写内容为：

  | 参数名称                                             | 参数值                                                       | 参数说明                                                     |
  | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | <div style="width: 170px;">Kuboard UI 访问地址</div> | <div style="width: 130px;">http://kuboard.mycompany.com</div> | 根据 [部署计划](#部署计划) ，安装在 Kubernetes 中的 Kuboard Agent 通过 http://kuboard.mycompany.com 这个 URL 访问 Kuboard Web 界面，此处为 Kubernetes 集群和 Kuboard 浏览器端用户设定了不同的访问域名（在 docker run 命令的 `KUBOARD_ENDPOINT` 参数指定）。 |
  | Agent Server Host                                    | kuboard.mycompany.com                                        | 根据 [部署计划](#部署计划) ，安装在 Kubernetes 中的 Kuboard Agent 通过 kuboard.mycompany.com 解析到 Kuboard 所在宿主机的 IP 地址 |
  | Agent Server UDP 端口                                | 10081                                                        | 此端口必须与 docker run 命令中映射的 10081/udp 端口一致      |
  | Agent Server TCP 端口                                | 10081                                                        | 此端口必须与 docker run 命令中映射的 10081/tcp 端口一致      |
  
  
  ![image-20201115230236714](./install-gitlab.assets/image-20201115230236714.png)
  
* 点击上图中的 ***保存*** 按钮，您将进入 Kuboard 集群列表页，此时，您可以向 Kuboard 添加 Kubernetes 集群，如下图所示：

  ![image-20201113221543277](./install-gitlab.assets/image-20201113221543277.png)

## 授权用户访问 Kuboard

默认情况下，只有 `KUBOARD_ROOT_USER` 参数指定的用户可以执行 Kuboard 中的所有操作，其他用户通过单点登录进入 Kuboard 系统后，除了退出系统，几乎什么事情也做不了。为了让单点登录的用户获得合适的权限，您需要在 Kuboard 中为对应的用户/用户组授权。请参考 [为单点登录的用户/用户组授权](./auth-user-sso.html)
