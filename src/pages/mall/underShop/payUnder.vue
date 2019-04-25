<template>
  <div class="payUnder">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        确认支付
      </x-header>
    </div>
    <div class="payUnder_content">
      <div class="payUnder_box">
          <div class="img_box">
            <img v-lazy="shopInfo.logo" alt="">
          </div>
          <div class="text">
            <p>{{shopInfo.title}}</p>
          </div>
        <div>
        </div>
      </div>
      <div class="input_title">选择支付金额</div>
      <div class="input_box">
        <div class="left">
          ¥
        </div>
        <div class="right">
          <input type="text" placeholder="请输入支付金额" v-model="price">
        </div>
      </div>
    </div>
    <div class="btns" @click="handleBuy(shopInfo.id)">
      <div class="btn">立即购买</div>
    </div>
  </div>
</template>

<script>
  import './underLess.less'
  import * as apiHttp from '../../../api/index'
  export default {
    name: "payMent",
    data(){
      return {
        active: 'alipay',
        shopInfo: {},
        price: this.$route.query.price ? this.$route.query.price : null
      }
    },
    mounted:function(){
      apiHttp.underPaymentBe(this.$route.query.spid).then(res => {
        if (res.code === 0) {
          this.shopInfo = res.data.shopInfo
        }
      })
    },
    methods :{
      handChange (key) {
        this.active = key
      },
      handleBuy (id) {
        if (!this.price) {
          this.$vux.toast.text('请填写金额!')
          return
        }
        apiHttp.underPayInfo('save', id, this.price).then(res => {
          if (res.code === 0) {
            this.$router.push({name: 'mallUnderpayMent', query: {spidInfo: res.data, spid: this.$route.query.spid}})
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
