<template>
  <div id="mobile_login">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div class="input_list mobile_input">
      <div class="label1">
        <input type="tel" placeholder="请输入手机号" v-model="mobile">
      </div>
      <div class="label2">
        <input type="text" placeholder="请输入验证码" v-model="smsCode" @keyup.enter="send">
        <span @click="handSmsCode">{{getCode}}</span>
      </div>
    </div>
    <div class="edit_button">
      <button class="btn_bright_red" :style="{background: $store.state.global.theme.mainColor}" @click="send">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile_login',
  data () {
    return {
      data: '',
      getCode: '获取验证码',
      timerFlag: false,
      smsCode: '',
      mobile: ''
    }
  },
  inject: ['reload'],
  mounted: function () {
    // 删除
  },
  methods: {
    send () {
      this.$http.post('/amoy/auth/login', {
        mobile: this.mobile,
        sms_code: this.smsCode,
        registration_id: this.$store.state.global.registrationId
      }, true).then(res => {
        // let ajpush = api.require('ajpush')
        // let param = {alias: res.data.uid}
        // ajpush.bindAliasAndTags(param, function (ret) {
        // })
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setUserInfo', res.data)
        this.reload()
        this.$router.push(this.$store.state.global.firstNav)
      })
    },
    // 点击获取验证码
    handSmsCode () {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      if (this.timerFlag === false) {
        this.$http.post('/amoy/auth/sms-verifycode', {
          type: 'login',
          mobile: this.mobile
        }, true).then(res => {
          this.timerFlag = !this.timerFlag
          this.$vux.toast.text(res.msg)
          this.countDown(60)
        })
      } else {
        return ''
      }
    },
    // 每秒执行
    countDown (time) {
      let count = time
      setTimeout(() => {
        count--
        if (time <= 0) {
          this.getCode = '获取验证码'
          this.timerFlag = false
        } else if (count !== time) {
          this.getCode = '重新获取' + count
          this.countDown(count)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
#mobile_login{
  height: 100%;
  overflow-y: auto;
  background: #fff;
}
.vux-header{
  position: relative !important;
}
</style>
