<template>
  <div>
    <el-form label-position="left" label-width="120px" @click.prevent.stop>
      <el-form-item>
        <template #label>
          <b-badge variant="primary">步骤一</b-badge>
          选择镜像
        </template>
        <div style="line-height: 28px; padding: 10px 20px 0px 20px; background-color: #eee;">
          <el-radio-group v-model="downloadFrom">
            <div v-for="(item, index) in resourcePackage.metadata.available_at" :key="'aa' + index">
              <el-radio :label="item"></el-radio>
            </div>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
        <template #label>
          <b-badge variant="primary">步骤二</b-badge>
          下载镜像
        </template>
        <codemirror :value="loadShell" :options="cmShellOptions" class="create_resource_offline_shell_codemirror"></codemirror>
      </el-form-item>
      <el-form-item>
        <template #label>
          <b-badge variant="primary">步骤三</b-badge>
          导入到 Kuboard-Spray
        </template>
        <div style="margin-bottom: 10px">
          <li>复制下面的 YAML 内容到粘贴板； <el-button icon="el-icon-thumb" type="primary" plain @click="selectAll">全 选</el-button> 然后在代码上点鼠标右键 --> 选择复制</li>
          <li>在 Kuboard-Spray 界面中导航到 “系统设置” --> “资源包管理” 菜单，点击 “离线加载资源包”，按界面提示操作，即可完成资源包的离线导入。</li>
        </div>
        <codemirror ref="cm" :value="loadYaml" :options="cmYamlOptions" class="app_codemirror_auto_height"></codemirror>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, RadioGroup, Radio, Button } from 'element-ui'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/darcula.css"
import "codemirror/mode/yaml/yaml.js"
import "codemirror/mode/shell/shell.js"
import yaml from 'js-yaml'

export default {
  props: {
    resourcePackage: { type: Object, required: true }
  },
  data() {
    return {
      downloadFrom: undefined,
      showCm: false,
      showPopover: false,
      cmShellOptions: {
        mode: "shell", // Language mode
        theme: "darcula", // Theme
        lineNumbers: true, // Show line number
        lineWrapping: true,
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
      cmYamlOptions: {
        mode: "yaml", // Language mode
        theme: "darcula", // Theme
        lineNumbers: true, // Show line number
        lineWrapping: true,
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
    }
  },
  computed: {
    loadShell: {
      get () {
        return `# 1. 在一台可以联网的机器上执行
docker pull ${this.downloadFrom}:${this.resourcePackage.metadata.version}
docker save ${this.downloadFrom}:${this.resourcePackage.metadata.version} > kuboard-spray-resource.tar 

# 2. 将 kuboard-spray-resource.tar 复制到 kuboard-spray 所在的服务器（例如：10.99.0.11 的 /root/kuboard-spray-resource.tar）
scp ./kuboard-spray-resource.tar root@10.99.0.11:/root/kuboard-spray-resource.tar

# 3. 在 kuboard-spray 所在的服务器上执行，（例如：10.99.0.11）
docker load < /root/kuboard-spray-resource.tar
`
      },
      set () {}
    },
    loadYaml: {
      get () {
        return yaml.dump({
          downloadFrom: this.downloadFrom,
          package: this.resourcePackage,
        })
      },
      set () {},
    }
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-radio-group': RadioGroup,
    'el-radio': Radio,
    'el-button': Button,
    codemirror,
  },
  watch: {
    resourcePackage (newValue) {
      console.log(newValue.metadata.available_at[0])
      this.downloadFrom = newValue.metadata.available_at[0]
      setTimeout(_ => {
        this.showCm = true
      }, 300)
    }
  },
  mounted () {
    this.downloadFrom = this.resourcePackage.metadata.available_at[0]
  },
  methods: {
    copySuccess () {
      this.$bvToast.toast(`已复制到粘贴板`, {
        title: '已复制',
        autoHideDelay: 5000,
        appendToast: true,
        variant: "success",
      })
    },
    copyError () {
      console.log('error')
    },
    selectAll () {
      this.$refs.cm.codemirror.execCommand('selectAll')
    }
  }
}
</script>

<style>
.create_resource_offline_shell_codemirror .CodeMirror {
  height: 210px !important;
  line-height: 18px;
  font-size: 13px;
  font-family: Consolas,Menlo,Bitstream Vera Sans Mono,Monaco,"微软雅黑",monospace !important;
}

.create_resource_offline_shell_codemirror .CodeMirror-wrap pre.CodeMirror-line, .CodeMirror-wrap pre.CodeMirror-line-like {
  word-break: break-all;
}

.create_resource_offline_shell_codemirror .CodeMirror-scroll {
  height: 210px !important;
  overflow-y: hidden;
  overflow-x: auto;
}


.app_codemirror_auto_height .CodeMirror {
  height: auto;
  font-size: 13px;
  line-height: 18px;
  font-family: Consolas,Menlo,Bitstream Vera Sans Mono,Monaco,"微软雅黑",monospace !important;
}

.app_codemirror_auto_height .CodeMirror-wrap pre.CodeMirror-line, .CodeMirror-wrap pre.CodeMirror-line-like {
  word-break: break-all;
}

.app_codemirror_auto_height .CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>
<style scoped lang="scss">

</style>
