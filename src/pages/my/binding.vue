<template>
    <div class="binding">
      <div class="box">
        <img src="../../assets/img/my/weixin.png" alt="">
      </div>
      <div class="primary_btn" :style="{background: $store.state.global.theme.mainColor}" @click="wechatLogin">绑定微信</div>
    </div>
</template>
<script>
export default {
  name: 'binding',
  components: {},
  data () {
    return {
      data: '',
      auth: {},
      auths: {},
      authBtns: ['weixin'],
      loading: false
    }
  },
  methods: {
    wechatLogin () {
      let that = this
      let wx = api.require('wx')
      wx.auth({
        apiKey: ''
      }, function (ret, err) {
        if (ret.status) {
          that.$http.post('/amoy/user/bind-wx', {
            code: ret.code,
            type: 'bind'
          }, true).then((res) => {
            console.log(JSON.stringify(res, null, 2))
            that.$vux.toast.text(res.msg)
            // that.$store.commit('setToken', res.data.token)
            let info = that.$store.state.user.userInfo
            info.nickname = res.data.nickname
            info.wechat_openid = res.data.wechat_openid
            info.avatar = res.data.avatar
            that.$store.commit('setUserInfo', info)
            that.$router.go(-1)
          })
        } else {
          console.log(err.code)
        }
      })
    }
  },
  mounted () {
    // 删除
  }
}
</script>
<style scoped lang="less">
@import "../../assets/less/common";
.binding{
  background: #fff;
  height: 100%;
  overflow-y: auto;
  .box{
    padding: .8rem 0 1rem;
    text-align: center;
    img{
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>
