<template>
  <el-form-item
    v-if="dependon === undefined || holder[dependon]"
    :label="label || fieldName">
    <div v-if="holder">
      <template v-if="isBoolean">
        <el-switch disabled v-model="value"></el-switch>
      </template>
      <span v-else class="app_text_mono" style="font-size: 13px;">
        {{holder[fieldName]}}
      </span>
    </div>
  </el-form-item>
</template>

<script>
import { FormItem, Switch } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

export default {
  props: {
    holder: { type: Object, required: false, default: () => {} },
    fieldName: { type: String, required: true },
    dependon: { type: String, required: false, default: undefined },
    isBoolean: { type: Boolean, required: false, default: false },
    label: { type: String, required: false, default: undefined },
  },
  computed: {
    value: {
      get () {
        if (this.holder) {
          return this.holder[this.fieldName]
        }
        return undefined
      },
      set (v) {
        console.log(v)
      }
    }
  },
  components: {
    'el-form-item': FormItem,
    'el-switch': Switch,
  }
}
</script>

<style>

</style>