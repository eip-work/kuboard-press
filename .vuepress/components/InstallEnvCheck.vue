<template>
  <div style="border: solid 1px #E6A23C; background-color: rgb(253, 246, 236); padding: 1rem;">
    <div v-show="!envOk" key="not">

    <!-- <grid :rwd="{compact: 'stack'}">
      <grid-item size="2/3" :rwd="{tablet: '1/1', compact: '1/1'}" style="padding: 1rem 0 1rem 1rem;"> -->

    <div>

      <p style="color: red">必须选中下面的 {{envCount}} 个勾选框才能继续</p>
      <p>选中后显示 安装 docker/kubelet 的文档</p>

      <div style="display: inline-block; width: 520px; max-width: calc(100vw - 100px); overflow: hidden; line-height: 40px; background-color: rgba(255,229,100,0.3); padding: 20px 0 0 20px; margin-bottom: 20px; border: 1px solid #d7dae2;">
      <el-form :model="form" ref="envForm" :rules="rules" style="text-align: left;">
      <el-form-item prop="checked" class="env-form-item">
      <el-checkbox-group v-model="form.checked">
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="centos">我的任意节点 centos 版本在兼容列表中</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="cpu">我的任意节点 CPU 内核数量大于等于 2</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="hostname">我的任意节点 hostname 不是 localhost，且不包含下划线、小数点、大写字母</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="ipaddress">我的任意节点都有固定的内网 IP 地址</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="networkcard">我的任意节点只有一块网卡（可以在完成K8S安装后再添加网卡）</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="nat">如果我直接使用vmware等创建虚拟机，我使用NAT网络，而不是桥接网络</el-checkbox> </li>
        <li style="height: 40px;"> <el-checkbox style="width: 300px; max-width: calc(100vw - 100px); text-align: left;" label="docker">我的任意节点不会直接使用 docker run 或 docker-compose 运行容器</el-checkbox> </li>
      </el-checkbox-group>
      </el-form-item>
      </el-form>
      </div>

      </div>

      <!-- </grid-item>
      <grid-item size="1/3" :rwd="{tablet: '1/1', compact: '0/1'}" style="padding: 2rem 1rem 1rem 1rem;">
        <AdSenseSquare/>
      </grid-item>
    </grid> -->

    </div>
    <el-collapse-transition>
    <div v-show="envOk" key="ok">
      <el-button style="margin-top: 10px;" @click="review" type="text">再看看我是否符合安装条件</el-button>
      <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
const ENV_COUNT = 7

export default {
  props: {
    type: {type: String, required: true}
  },
  data () {
    let validateEnv = (rule, value, callback) => {
      if (value.length < ENV_COUNT) {
        callback(new Error('请确认您的环境符合上述条件'));
      } else {
        callback();
      }
    };
    return {
      form: {
        checked: []
      },
      envCount: ENV_COUNT,
      rules: {
        checked: [{validator: validateEnv, trigger: 'change'}]
      }
    }
  },
  computed: {
    envOk () {
      if (this.form.checked.length === ENV_COUNT) {
        return true
      }
      return false
    }
  },
  mounted () {
  },
  watch: {
    'form.checked' () {
      if (this.form.checked.length === ENV_COUNT) {
        
      }
    },
    envOk () {
      if (this.envOk) {
        this.$message.success(`如果您符合刚才 ${ENV_COUNT} 个条件，请继续安装`)
        this.$sendGaEvent('install-' + this.type, 'envOk-' + this.type, '已确认环境符合条件-' + this.type)
      }
    }
  },
  methods: {
    canSlideNext (currentName) {
      if (currentName === 'step1' && this.form.checked.length < ENV_COUNT) {
        this.$refs.envForm.validate(valid => {
          
        })
        return { flag: false, message: '请翻到本页最下方，并确认您的环境符合要求的条件' }
      }
      return { flag: true, message: 'can slide next' }
    },
    review () {
      this.form.checked = []
      this.$sendGaEvent('install-' + this.type, 'envReview-' + this.type, '回顾安装条件-' + this.type)
    }
  }
}
</script>

<style>

</style>
