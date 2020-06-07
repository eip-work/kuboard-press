<template>
  <div style="height: 100%;">
    <iframe :id="frameId" ref="iframe" class="frame" :src="`${url}`" :style="height ? 'height: ' + height : `height: ${frameHeight}px;`"></iframe>
  </div>
</template>

<script>

function randomString(len) {
  　　len = len || 5;
  　　var $chars = 'abcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  }


export default {
  props: {
    src: { type: String, required: true },
    commands: { type: Object, required: false, default: _ => {} },
    height: { type: String, required: false, default: undefined },
  },
  data () {
    return {
      frameId: randomString(12),
      frameHeight: 300,
    }
  },
  computed: {
    url () {
      let append = `KUBOARD_FRAME_ID=${this.frameId}&KUBOARD_ACCESS_ENDPOINT=kuboard.cn`
      if (this.height) {
        append = append + '&KUBOARD_FRAME_FIXED_HEIGHT=true'
      }
      if (this.src.indexOf('?') > 0) {
        return `${this.src}&${append}`
      } else {
        return `${this.src}?${append}`
      }
    },
    cmds () {
      let _this = this
      let cmds = {
        message (params) {
          _this.$message(params)
        },
        iframeSize (params) {
          // console.log('iframe 的高度', params.height)
          _this.frameHeight = params.height
        },
      }
      Object.assign(cmds, this.commands)
      return cmds
    }
  },
  mounted () {
    window.addEventListener('message', this.onMessageFromIframe, false);
  },
  methods: {
    sendMessage(command, params) {
      this.$refs.iframe.contentWindow.postMessage({
        kuboardCommandToIframe: 'kuboard.cn:' + this.frameId + ':' + command,
        params: params
      }, '*')
    },
    onMessageFromIframe (event) {
      if (event.data.kuboardCommandToParent) {
        let tmp = event.data.kuboardCommandToParent.split(':')
        if (tmp[0] !== this.frameId) {
          // console.log('忽略发送给其他 iframe 的消息', event.data)
          return
        }
        if (tmp[1] && this.cmds[tmp[1]]) {
          this.cmds[tmp[1]](event.data.params)
        } else {
          console.log('不能响应来自 iframe 的消息', event.data.kuboardCommandToParent, event.data.params)
        }
      }
    },
    $message(msg) {
      console.log(msg)
      this.$bvToast.toast(msg.message, {
        title: '提 示',
        autoHideDelay: 5000,
        appendToast: false,
        variant: msg.type
      })
    }
  },

}
</script>

<style scoped>
.frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
