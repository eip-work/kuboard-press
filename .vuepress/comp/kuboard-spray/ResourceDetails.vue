<template>
  <el-form class="app_form_mini" label-position="left" label-width="200px" size="mini">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template #title>
          <span class="package_title">kuboardspray</span>
        </template>
        <div class="package_info">
          <PackageContentField :holder="resourcePackage.metadata" fieldName="version" label="资源包版本"></PackageContentField>
          <PackageContentField :holder="resourcePackage.metadata" fieldName="issue_date" label="发布时间"></PackageContentField>
          <PackageContentField :holder="resourcePackage.data" fieldName="kubespray_version"></PackageContentField>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <span class="package_title">kubernetes</span>
        </template>
        <div class="package_info">
          <el-form-item label="操作系统">
            <div v-for="(item, key) in resourcePackage.metadata.supported_os" :key="'os' + key">
              <el-tag effect="dark" size="mini">{{item.distribution}}</el-tag>
              <el-tag style="margin-left: 10px;" size="mini" v-for="(version, i) in item.versions" :key="'v' + key + '' + i">{{version}}</el-tag>
            </div>
          </el-form-item>
          <PackageContentField :holder="resourcePackage.data.kubernetes" fieldName="image_arch"></PackageContentField>
          <PackageContentField :holder="resourcePackage.data.kubernetes" fieldName="gcr_image_repo"></PackageContentField>
          <PackageContentField :holder="resourcePackage.data.kubernetes" fieldName="kube_image_repo"></PackageContentField>
          <PackageContentField :holder="resourcePackage.data.kubernetes" fieldName="kube_version"></PackageContentField>
          <el-form-item label="容器引擎">
            <div v-for="(engine, index) in resourcePackage.data.container_engine" :key="'ce' + index">
              <el-tag size="mini">
                <span class="app_text_mono">{{engine.container_manager}}_{{engine.params.containerd_version || engine.params.docker_version}}</span>
              </el-tag>
            </div>
          </el-form-item>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <span class="package_title">etcd</span>
        </template>
        <div class="package_info">
          <PackageContentField :holder="resourcePackage.data.etcd" fieldName="etcd_version"></PackageContentField>
          <el-form-item label="etcd_deployment_type">
            <div v-for="(item, key) in resourcePackage.data.etcd.etcd_deployment_type" :key="'k' + key">
              <el-tag size="mini">{{item}}</el-tag>
            </div>
          </el-form-item>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          <span class="package_title">网络插件</span>
        </template>
        <div class="package_info">
          <div v-for="(item, index) in resourcePackage.data.network_plugin" :key="index + 'network_plugin'">
            <div style="font-weight: bolder;">{{item.name}}</div>
            <div class="package_info">
              <el-form-item v-for="(value, key) in item.params" :key="index + 'p' + key" :label="key" label-width="180px">
                <div class="app_text_mono" style="font-size: 13px" >
                  {{value}}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template #title>
          <span class="package_title">依赖组件</span>
        </template>
        <div class="package_info">
          <div v-for="(item, index) in resourcePackage.data.dependency" :key="index + 'dependency'">
            <el-form-item :label="item.target">
              <div class="app_text_mono" style="font-size: 13px">
                {{item.version}}
              </div>
            </el-form-item>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template #title>
          <span class="package_title">可选组件</span>
        </template>
        <div class="package_info">
          <div v-for="(item, index) in resourcePackage.data.addon" :key="index + 'addons'">
            <el-form-item>
              <template #label>
                <div style="font-weight: bolder;">{{item.name}}</div>
              </template>
              <div class="app_text_mono">
                <el-tag type="success" size="mini" v-if="item.included">已包含</el-tag>
                <el-tag type="info" size="mini" v-else>未包含</el-tag>
              </div>
            </el-form-item>
            <div class="package_info">
              <template v-for="(value, key) in item.params">
                <el-form-item :label="key" label-width="280px" v-if="value.indexOf('{{') < 0" :key="key + 'addons' + index">
                  <template #label>
                    <div style="font-size: 12px">{{key}}</div>
                  </template>
                  <div class="app_text_mono" style="font-size: 12px">
                    {{value}}
                  </div>
                </el-form-item>
              </template>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
import PackageContentField from './PackageContentField.vue'
import {Form, FormItem, Collapse, CollapseItem, Tag} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

export default {
  props: {
    resourcePackage: { type: Object, required: true },
    expandAll: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      activeNames: this.expandAll ? ['1','2','3','4','5','6'] : ['2'],
    }
  },
  computed: {
  },
  components: { 
    PackageContentField,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-collapse': Collapse,
    'el-collapse-item': CollapseItem,
    'el-tag': Tag,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="css">
.package_title {
  font-weight: bolder;
  font-family: Consolas,Menlo,Bitstream Vera Sans Mono,Monaco,"微软雅黑",monospace;
}
.package_info {
  margin-left: 20px;
  font-family: Consolas,Menlo,Bitstream Vera Sans Mono,Monaco,"微软雅黑",monospace;
}
</style>
