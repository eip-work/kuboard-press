<template>
  <div>
    <b-alert title="资源包列表" type="default" :closable="false" show>
      <div class="description">
        <li>Kuboard 提供一组经过预先测试验证的资源包列表，可以帮助您快速完成集群安装</li>
        <li>您也可以参考项目 https://github.com/eip-work/kuboard-spray-resource 自己创建资源包</li>
      </div>
    </b-alert>
    <div class="contentList">
      <b-table striped hover v-if="mergedPackageList" :items="mergedPackageList" :fields="fields" head-variant="dark" table-variant="light" small>
        <template #cell(version)="data">
          <div class="app_text_mono">{{data.item.version}}</div>
        </template>
        <template #cell(container_engine)="data">
          <div v-if="data.item.package">
            <div v-for="(engine, key) in data.item.package.data.container_engine" :key="`c${data.index}_${key}`">
              <b-badge>{{ engine.container_manager }}_{{ engine.params[engine.container_manager + '_version'] }}</b-badge>
            </div>
          </div>
        </template>
        <template #cell(supported_os)="data">
          <div v-if="data.item.package">
            <div v-for="(os, key) in data.item.package.metadata.supported_os" :key="`os${data.index}_${key}`">
              <b-badge>
                {{ os.distribution }}<span 
                v-for="(v, i) in os.versions" :key="key + 'v' + i">_{{v}}</span>
              </b-badge>
            </div>
          </div>
        </template>
        <template #cell(package.metadata.kuboard_spray_version.min)="data">
          <div v-if="data.item.package" class="app_text_mono">{{data.item.package.metadata.kuboard_spray_version.min}}</div>
        </template>
        <template #cell(action)="data">
          <b-button variant="primary" size="sm" @click="showVersion(data.item)">离线导入</b-button>
        </template>
      </b-table>
    </div>

    <b-modal id="version-modal" centered scrollable size="xl" class="app_form_mini">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name="details" label="资源包内容">
          <div class="resource_tab_pane">
            <ResourceDetails v-if="currentVersion" ref="details" expandAll :resourcePackage="currentVersion"></ResourceDetails>
          </div>
        </el-tab-pane>
        <el-tab-pane name="offline" label="离线导入">
          <div class="resource_tab_pane" v-if="activeName == 'offline'">
            <ResourceOffline v-if="currentVersion" :resourcePackage="currentVersion"></ResourceOffline>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #modal-title>
        离线导入资源包
      </template>
      <template #modal-footer>
        <b-button @click="$bvModal.hide('version-modal')">关闭对话框</b-button>
        <b-button variant="primary" @click="activeName = 'offline'">离线导入</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import yaml from 'js-yaml'
import ResourceDetails from './ResourceDetails.vue'
import ResourceOffline from './ResourceOffline.vue'
import { Tabs, TabPane } from 'element-ui'

export default {
  props: {
  },
  data () {
    return {
      availablePackageList: undefined,
      packageMap: {},
      importedPackageMap: {},
      fields: [
        { key: 'version', label: '版 本' },
        // { key: 'package.data.kubespray_version', label: 'Kubespray' },
        { key: 'package.data.kubernetes.kube_version', label: 'Kubernetes' },
        { key: 'container_engine', label: '容器引擎'},
        { key: 'supported_os', label: '操作系统'},
        { key: 'package.metadata.kuboard_spray_version.min', label: 'KuboardSpray最低版本'},
        { key: 'action', label: '操 作'},
      ],
      currentVersion: undefined,
      activeName: 'details',
    }
  },
  computed: {
    mergedPackageList () {
      let result = []
      for (let i in this.availablePackageList) {
        result.push(this.availablePackageList[i])
      }
      return result
    }
  },
  components: { 
    ResourceDetails,
    ResourceOffline,
    'el-tabs': Tabs,
    'el-tab-pane': TabPane,
  },
  mounted () {
    this.refresh()
  },
  methods: {

    async refresh () {
      this.importedPackageMap = {}
      this.packageMap = {}
      this.availablePackageList = undefined
      await axios.get('https://addons.kuboard.cn/v-kuboard-spray/package-list.yaml?nocache=' + new Date().getTime()).then(resp => {
        this.availablePackageList = yaml.load(resp.data).items
      }).catch(e => {
        console.log(e)
        this.$message.error('离线环境')
      })

      for (let i in this.mergedPackageList) {
        let packageVersion = this.mergedPackageList[i]
        this.loadPackageFromRepository(packageVersion)
      }
    },
    loadPackageFromRepository (packageVersion) {
      axios.get(`https://addons.kuboard.cn/v-kuboard-spray/${packageVersion.version}/package.yaml?nocache=${new Date().getTime()}`).then(resp => {
        setTimeout(() => {
          this.$set(packageVersion, 'package', yaml.load(resp.data))
          this.$set(packageVersion, 'loaded', true)
          // this.packageMap[packageVersion.version].loaded = true
        }, 500)
      }).catch(e => {
        this.$message.error(e + '')
        this.packageMap[packageVersion.version].loaded = false
      })
    },
    showVersion (version) {
      this.currentVersion = version.package
      this.$bvModal.show('version-modal')
    }
  }
}
</script>

<style>
.app_form_mini .el-form-item {
  margin-bottom: 0px !important;
}
.app_form_mini .el-form-item__label {
  margin-bottom: 0px !important;
}
</style>

<style scoped lang="css">
.description {
  line-height: 28px;
}
.contentList {
  width: 100%;
}
.app_text_mono {
  font-family: Consolas,Menlo,Bitstream Vera Sans Mono,Monaco,"微软雅黑",monospace !important;
}
.resource_tab_pane {
  height: calc(100vh - 300px);
  overflow: hidden;
  overflow-y: auto;
}
</style>

