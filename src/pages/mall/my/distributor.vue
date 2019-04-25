<template>
  <div class="disbt">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      申请分销商
    </x-header>
    <div class="disbt-body">
      <div class="disbt-one">
        <p>手动成为分销商</p>
      </div>
      <div class="disbt-two">
        <div>
          <p>姓名：</p>
          <input type="text" placeholder="请输入姓名" v-model="username">
        </div>
        <div>
          <p>手机号：</p>
          <input type="text" placeholder="请输入手机号" v-model="mobile">
        </div>
      </div>
      <div class="confirm" @click="confirmSub()">
        <button>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import './my.less'
  import * as apiHttp from '../../../api/index'
  export default {
    data () {
      return {
        username: null,
        mobile: null
      }
    },
    methods: {
      confirmSub () {
        if (!this.username) {
          this.$vux.toast.text('请输入姓名')
          return
        }
        if (!this.mobile) {
          this.$vux.toast.text('手机号不能为空')
          return
        }
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (!reg.test(this.mobile)) {
          this.$vux.toast.text('手机号格式不对')
          return
        }
        apiHttp.applyDistri('save', this.username, this.mobile).then(res => {
          if (res.code === 0) {
            this.$vux.toast.text(res.msg)
            setTimeout(() => {
              this.$router.push({name: 'mallMy'})
            }, 1000)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/mall/style/_Variables";
  .disbt{
    .disbt-body{
      margin-top: @margin-top;
      .disbt-one{
        height: 1rem;
        padding: 0 .3rem;
        line-height: 1rem;
        p{
          color: @font-light-color;
          font-size: @font-more-big;
        }
      }
      .disbt-two{
        padding: 0 .3rem;
        background: #ffffff;
        div{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 1rem;
          border-bottom: 1px solid @border-color;
          p{
            color: @font-main-color;
            font-size: @font-more-big;
          }
          input{
            outline: none;
            border:0;
            width: 80%;
          }
        }
      }
    }
  }
</style>
