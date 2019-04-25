<template>
  <div id="login">
    <x-header :left-options="{showBack: false}">
      <a slot="left" class="backBox" @click="goBack()">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div class="login_img">
      <img :src="$logo" v-if="$logo" alt="">
    </div>
    <div class="input_list login_input">
      <div class="label1">
        <input type="tel" placeholder="请输入手机号" v-model="mobile">
      </div>
      <div class="label2">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
      </div>
    </div>
    <div class="edit_button btn_login">
      <button class="btn_bright_red" :style="{background: $store.state.global.theme.mainColor}" @click="login">登录</button>
    </div>
    <div class="edit_button btn_register">
      <button class="btn_bright_red" @click="jumpTo('/register')" :style="{borderColor: $store.state.global.theme.mainColor}">注册</button>
    </div>
    <div class="login_enroll_div">
      <ul class="login_enroll">
        <li class="li1" @click="jumpTo('/forget')" :style="{color: $store.state.global.theme.mainColor}" >忘记密码?</li>
        <span :style="{color: $store.state.global.theme.mainColor}" >|</span>
        <li class="li2" :style="{color: $store.state.global.theme.mainColor}"  @click="jumpTo('/mobileLogin')">验证码登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wechat_login',
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  inject: ['reload'],
  methods: {
    login () {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      let that = this
      this.$http.post('/amoy/auth/login', {
        mobile: this.mobile,
        password: this.password,
        registration_id: that.$store.state.global.registrationId
      }, true).then(res => {
        // if (res.code === 0) {
        //   let ajpush = api.require('ajpush')
        //   ajpush.getRegistrationId(function (ret) {
        //     let registrationId = ret.id
        //     let param = {alias: registrationId}
        //     ajpush.bindAliasAndTags(param, function (ret) {
        //     })
        //     that.$http.post('/amoy/auth/bind-regid', {
        //       registration_id: registrationId
        //     }, false).then(res => {
        //     })
        //   })
        // }
        this.$store.commit('setToken', res.data.token)
        // this.$store.commit('setUserInfo', res.data)
        this.$store.commit('setUserInfo', res.data)
        this.reload()
        this.$router.push(this.$store.state.global.firstNav)
      })
    }
  },
  mounted: function () {
    // 删除
  }
}
</script>

<style scoped lang="less">
  #login{
    overflow-x: hidden;
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
</style>
<!--<style lang="less">-->
  <!--#login{-->
    <!--.vux-header {-->
      <!--.vux-header-left {-->
        <!--left: 0;-->
        <!--top: 0;-->
        <!--.backBox {-->
          <!--display: block;-->
          <!--height: 0.88rem;-->
          <!--line-height: .88rem;-->
          <!--padding: 0 .2rem;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
