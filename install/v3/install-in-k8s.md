---
lessAds: false
description: 在 Kubernetes 集群中安装 Kuboard_V3
meta:
  - name: keywords
    content: Kubernetes Dashboard安装,Kuboard安装,K8S Dashboard安装
---

# 在 K8S 中安装 Kuboard v3

<AdSenseTitle/>

在 K8S 中安装 Kuboard，主要考虑的问题是，如何提供 etcd 的持久化数据卷。建议的两个选项有：
1. 使用 hostPath 提供持久化存储，将 kuboard 所依赖的 Etcd 部署到 Master 节点，并将 etcd 的数据目录映射到 Master 节点的本地目录；<badge>推荐</badge>
2. 使用 StorageClass 动态创建 PV 为 etcd 提供数据卷；<badge type="error">不推荐</badge>

## 方法一：使用 hostPath 提供持久化

### 安装

* 执行 Kuboard v3 在 K8S 中的安装

  <b-card no-body>
  <b-tabs content-class="mt-3" card pills>
  <b-tab title="在线安装" active>

  ```sh
  kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
  # 您也可以使用下面的指令，唯一的区别是，该指令使用华为云的镜像仓库替代 docker hub 分发 Kuboard 所需要的镜像
  # kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3-swr.yaml
  ```

  ::: tip 定制参数
  如果您想要定制 Kuboard 的启动参数，请将该 YAML 文件下载到本地，并修改其中的 ConfigMap
  :::

  </b-tab>
  <b-tab title="离线安装（K8S服务器不能访问公网）">

  * 在您的镜像仓库服务中创建一个名为 `kuboard` 的 repository（harbor 中称之为项目、华为镜像仓库中称之为组织）
  * 输入您镜像仓库地址及 repository 名称（替换输入框中 `registry.mycompayn.com` 为你的镜像仓库服务地址即可）：
    <b-input size="sm" v-model="privateRegistry" placeholder="例如：registry.mycompany.com/kuboard"></b-input>
  * 将所需镜像导入到您的私有镜像仓库
    <div class="language-sh line-numbers-mode" v-if="privateRegistry">
      <pre class="language-sh">
        <code>{{dockerPull}}</code>
      </pre> 
      <div class="line-numbers-wrapper">
        <span class="line-number">1</span><br>
        <span class="line-number">2</span><br>
        <span class="line-number">3</span><br>
        <span class="line-number">4</span><br>
        <span class="line-number">5</span><br>
        <span class="line-number">6</span><br>
        <span class="line-number">7</span><br>
        <span class="line-number">8</span><br>
        <span class="line-number">9</span><br>
        <span class="line-number">10</span><br>
        <span class="line-number">11</span><br>
        <span class="line-number">12</span><br>
      </div>
    </div>
    <b-alert v-else show variant="warning">请先输入私有镜像仓库</b-alert>

  * 在您的镜像仓库设置导入的镜像为公开可访问（无需镜像仓库的用户名密码）
  * 获取 YAML 文件，并将该文件保存到集群 master 节点（或者 kubectl 客户端所在机器，假设文件名为 `kuboard-v3.yaml`）

    <b-button variant="primary" @click="save">保存 YAML 到文件</b-button>
    <b-button variant="outline-primary" v-clipboard:copy="resultYaml"
      v-clipboard:success="onCopy">复制 YAML 到粘贴板</b-button>
  * 执行安装指令
    ```sh
    kubectl apply -f kuboard-v3.yaml
    ```

  </b-tab>
  </b-tabs>
  </b-card>

<script>
import axios from 'axios'

function fakeClick(obj) {
   var ev = document.createEvent("MouseEvents");
   ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
}

export default {
  data () {
    return {
      privateRegistry: 'registry.mycompany.com/kuboard',
      originalYaml: '',
    }
  },
  computed: {
    dockerPull () {
      return `docker pull eipwork/kuboard-agent:v3
docker pull eipwork/etcd-host:3.4.16-1
docker pull eipwork/kuboard:v3
docker pull questdb/questdb:6.0.4
docker tag eipwork/kuboard-agent:v3 ${this.privateRegistry}/kuboard-agent:v3
docker tag eipwork/etcd-host:3.4.16-1 ${this.privateRegistry}/etcd-host:3.4.16-1
docker tag eipwork/kuboard:v3 ${this.privateRegistry}/kuboard:v3
docker tag questdb/questdb:6.0.4 ${this.privateRegistry}/questdb:6.0.4
docker push ${this.privateRegistry}/kuboard-agent:v3
docker push ${this.privateRegistry}/etcd-host:3.4.16-1
docker push ${this.privateRegistry}/kuboard:v3
docker push ${this.privateRegistry}/questdb:6.0.4
`
    },
    resultYaml () {
      let result = ''
      if (typeof window !== 'undefined') {
        result = this.originalYaml.replace(/eipwork\//g, this.privateRegistry + '/')
        result = result.replaceAll(/questdb\//g, this.privateRegistry + '/')
      }
      return result
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      axios.get('https://addons.kuboard.cn/kuboard/kuboard-v3.yaml', {}).then(resp => {
        this.originalYaml = resp.data
      }).catch(e => {
        console.log(e)
      })
    }
  },
  methods: {
    save () {
      exportRaw('kuboard-v3.yaml', this.resultYaml)
    },
    onCopy () {
      this.$bvToast.toast(`已将 YAML 复制到粘贴板`, {
          title: '已复制',
          variant: 'success',
          autoHideDelay: 5000,
          solid: true,
          append: true,
          toaster: 'b-toaster-top-center'
        })
    }
  }
}
</script>

* 等待 Kuboard v3 就绪

  执行指令 `watch kubectl get pods -n kuboard`，等待 kuboard 名称空间中所有的 Pod 就绪，如下所示，

  > 如果结果中没有出现 `kuboard-etcd-xxxxx` 的容器，请查看本章节稍后面的内容中关于 `托管的 K8S` 的描述。

  ```sh
  [root@node1 ~]# kubectl get pods -n kuboard
  NAME                               READY   STATUS    RESTARTS   AGE
  kuboard-agent-2-65bc84c86c-r7tc4   1/1     Running   2          28s
  kuboard-agent-78d594567-cgfp4      1/1     Running   2          28s
  kuboard-etcd-fh9rp                 1/1     Running   0          67s
  kuboard-etcd-nrtkr                 1/1     Running   0          67s
  kuboard-etcd-ader3                 1/1     Running   0          67s
  kuboard-v3-645bdffbf6-sbdxb        1/1     Running   0          67s
  ```

  ::: tip CrashLoopBackOff
  过程中 kuboard-agent 可能出现 CrashLoopBackOff 的状态，这是因为其依赖的 kuboard-v3 尚未就绪，请耐心等候一会儿即可（根据您的服务器下载镜像速度的不同，大约 3-5 分钟）。
  :::

  ::: danger 托管的 K8S
  * 当您在 ***阿里云、腾讯云（以及其他云）托管*** 的 K8S 集群中以此方式安装 Kuboard 时，您的集群中将 ***看不到 master 节点***，此时，您也可以为一个或者三个 worker 节点添加 `k8s.kuboard.cn/role=etcd` 的标签，来增加 kuboard-etcd 的实例数量；
  * 执行如下指令，可以为 `your-node-name` 节点添加所需要的标签
    ```sh
    kubectl label nodes your-node-name k8s.kuboard.cn/role=etcd
    ```
  :::

  ::: tip etcd
  * Kuboard V3 依赖于 etcd 提供数据的持久化服务，在当前的安装方式下，kuboard-etcd 的存储卷被映射到宿主机节点的 hostPath (/usr/share/kuboard/etcd 目录)；
  * 为了确保每次重启，etcd 能够加载到原来的数据，以 DaemonSet 的形式部署 kuboard-etcd，并且其容器组将始终被调度到 master 节点，因此，您有多少个 master 节点，就会调度多少个 kuboard-etcd 的实例；
  * 某些情况下，您的 master 节点只有一个或者两个，却仍然想要保证 kubuoard-etcd 的高可用，此时，您可以通过为一到两个 worker 节点添加 `k8s.kuboard.cn/role=etcd` 的标签，来增加 kuboard-etcd 的实例数量；
    * 如果您已经安装了 Kuboard V3，通过此方式调整 etcd 数量时，需要按照如下步骤执行，否则 etcd 将不能正常启动：
      1. 执行 `kubectl delete daemonset kuboard-etcd -n kuboard` 
      2. 为节点添加标签
      3. 执行 `kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml`
  * 建议 etcd 部署的数量为 [奇数](https://etcd.io/docs/v3.4/faq/#what-is-failure-tolerance)
  :::

### 访问 Kuboard

* 在浏览器中打开链接 `http://your-node-ip-address:30080`
* 输入初始用户名和密码，并登录
  
  * 用户名： `admin`
  * 密码：  `Kuboard123`

::: tip 浏览器兼容性

<li>请使用 Chrome / FireFox / Safari / Edge 等浏览器</li>
<li>不兼容 IE 以及以 IE 为内核的浏览器</li>

:::

::: tip 添加新的集群
* Kuboard v3 是支持 Kubernetes 多集群管理的，在 Kuboard v3 的首页里，点击 ***添加集群*** 按钮，在向导的引导下可以完成集群的添加；
* 向 Kuboard v3 添加新的 Kubernetes 集群时，请确保：
  * 您新添加集群可以访问到当前集群 Master 节点 `内网IP` 的 `30080 TCP`、`30081 TCP`、`30081 UDP` 端口；
  * 如果您打算新添加到 Kuboard 中的集群与当前集群不在同一个局域网，请咨询 Kuboard 团队，帮助您解决问题。
:::

### 卸载

* 执行 Kuboard v3 的卸载

  ```sh
  kubectl delete -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
  ```
* 清理遗留数据

  在 master 节点以及带有 `k8s.kuboard.cn/role=etcd` 标签的节点上执行
  ```sh
  rm -rf /usr/share/kuboard
  ```

## 方法二：使用 StorageClass 提供持久化

::: danger 注意事项

刚接触 K8S 的同学，强烈建议您使用 [内建用户库](./install-built-in.html) 的方式安装 Kuboard-v3，在 K8S 中安装 Kuboard v3 时，需要理解更复杂的端口映射方式、存储卷声明/存储类等概念。

:::

### 安装

* 获取部署 Kuboard 所需的 YAML 文件：

  ```sh
  curl -o kuboard-v3.yaml https://addons.kuboard.cn/kuboard/kuboard-v3-storage-class.yaml
  ```

* 编辑 `kuboard-v3.yaml` 文件中的配置，该部署文件中，有两处配置必须修改：

  * KUBOARD_ENDPOINT

    ```yaml {10}
    ---
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: kuboard-v3-config
      namespace: kuboard
    data:
      # 关于如下参数的解释，请参考文档 https://kuboard.cn/install/v3/install-built-in.html
      # [common]
      KUBOARD_ENDPOINT: 'http://your-node-ip-address:30080'
      KUBOARD_AGENT_SERVER_UDP_PORT: '30081'
      KUBOARD_AGENT_SERVER_TCP_PORT: '30081'
    ```
  * storageClassName

    ``` yaml {6}
      volumeClaimTemplates:
      - metadata:
          name: data
        spec:
          # 请填写一个有效的 StorageClass name
          storageClassName: please-provide-a-valid-StorageClass-name-here
          accessModes: [ "ReadWriteMany" ]
          resources:
            requests:
              storage: 5Gi
    ```

* 部署到 Kubernetes 集群

  ```sh
  kubectl create -f kuboard-v3.yaml
  ```

### 访问 Kuboard

* 在浏览器中打开链接 `http://your-node-ip-address:30080`
* 输入初始用户名和密码，并登录
  
  * 用户名： `admin`
  * 密码：  `Kuboard123`

::: tip 浏览器兼容性

<li>请使用 Chrome / FireFox / Safari / Edge 等浏览器</li>
<li>不兼容 IE 以及以 IE 为内核的浏览器</li>

:::


### 卸载

* 执行 Kuboard v3 的卸载

  ```sh
  kubectl delete -f https://addons.kuboard.cn/kuboard/kuboard-v3-storage-class.yaml
  ```

### 备注

此 YAML 文件向 Kubernetes 中部署了一个三副本的 StatefulSet `kuboard-etcd` 和一个单副本的 Deployment `kuboard-v3`；其中 Deployment `kuboard-v3` 暂时不支持多副本，请保持其 replicas 字段为 1，将在后续的版本升级中解决 `kuboard-v3` 多副本部署的问题。
