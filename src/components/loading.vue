<template>
    <div>
      <div v-transfer-dom>
        <x-dialog v-model="loading" class="dialog-demo">
          <div style="padding:15px; text-align: left;font-size:16px;font-family: '微软雅黑';">
            <spinner type="bubbles" size='30px'></spinner> <span style="padding-left:10px;">{{text}}...</span>
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
import { XDialog, Spinner, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'loading',
  directives: {
    TransferDom
  },
  props: ['loading', 'text'],
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch,
    Spinner
  },
  methods: {
    doShowToast () {
      this.$vux.toast.show({
        text: 'toast'
      })
    }
  },
  data () {
    return {
      showToast: false
    }
  }
}
</script>

<style scoped>

</style>
