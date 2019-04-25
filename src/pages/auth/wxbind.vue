<template>
  <div id="register1">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back1"></i>
      </a>
      {{$route.meta.title}}
    </x-header>
    <div v-if="show">
      <div class="register_list input_list">
        <div class="label1">
          <input type="tel" placeholder="请输入手机号" v-model="mobile">
        </div>
        <div class="label2">
          <input type="text" placeholder="请输入验证码" v-model="smsCode">
          <span @click="handSmsCode">{{getCode}}</span>
        </div>
        <div class="label5" v-if="invite">
          <input type="text" placeholder="请输入邀请码" v-model="invite_code">
          <span @click="clip" :style="{background: $store.state.global.theme.mainColor}" class="clip">一键粘贴</span>
        </div>
        <p>
          <img :src="imgSrc" @click="onPitch">
          登录注册即表示同意
          <span @click="jumpTo('/about?title=用户使用协议&type=7')">《用户使用协议》</span>
        </p>
      </div>
      <div class="edit_button">
        <button class="btn_bright_red" @click="login" :disabled="smsCode === ''" :style="{background: $store.state.global.theme.mainColor}">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      imgSrc: './static/img/auth/pitch_on.png',
      pitchOn: './static/img/auth/pitch_on.png',
      unPitchOn: './static/img/auth/un_pitch_on.png',
      imgSrcFlag: false,
      getCode: '获取验证码',
      timerFlag: false,
      mobile: '',
      smsCode: '',
      invite_code: '',
      password: '',
      re_password: '',
      show: true,
      code: '',
      invite: false
    }
  },
  inject: ['reload'],
  methods: {
    clip () {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.get(function (ret, err) {
        if (ret) {
          if (ret.value !== '') {
            that.invite_code = ret.value
          } else {
            this.$vux.toast.text('请复制邀请码')
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    login () {
      if (this.imgSrcFlag) {
        this.$vux.toast.text('请先勾选用户使用协议')
        return
      }
      let info = {
        mobile: this.mobile,
        sms_code: this.smsCode,
        invite_code: this.invite_code,
        access_token: this.$route.query.token,
        openid: this.$route.query.openid
      }
      this.$http.post('/amoy/auth/we-login', info, true, true).then(res => {
        if (res.code === 0) {
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('setUserInfo', res.data)
          this.reload()
          this.$router.push(this.$store.state.global.firstNav)
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    // 是否选中服务条款
    onPitch () {
      this.imgSrcFlag = !this.imgSrcFlag
      if (this.imgSrcFlag === true) {
        this.imgSrc = this.unPitchOn
      } else {
        this.imgSrc = this.pitchOn
      }
    },
    // 点击获取验证码
    handSmsCode () {
      if (!/[0-9]{11}/.test(this.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return
      }
      if (this.timerFlag === false) {
        this.$http.post('/amoy/auth/sms-verifycode', {
          mobile: this.mobile,
          type: 'bind'
        }, true, true).then(res => {
          if (res.code === 0) {
            this.invite = res.data.isShowInvite
            this.timerFlag = !this.timerFlag
            this.$vux.toast.text(res.msg)
            this.countDown(60)
          } else {
            this.$vux.toast.text(res.msg)
          }
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
  },
  mounted () {
    // 删除
  }
}
</script>

<style scoped>
  #register1{
    overflow-x: hidden;
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
</style>
