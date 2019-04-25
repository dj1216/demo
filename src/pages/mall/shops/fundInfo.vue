<template>
  <div id="fund" v-if="isShow">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      资金信息
    </x-header>
    <div class="fund-body">
      <div class="fund-item">
        <img src="../../../assets/mall/img/shop/zijinxinxi1.png" alt="">
        <p>我的资金信息</p>
      </div>
      <div class="item">
        <p>待发货：</p>
        <span>￥{{fundInfo.price1}}</span>
      </div>
      <div class="item">
        <p>待付款：</p>
        <span>￥{{fundInfo.price2}}</span>
      </div>
      <div class="item">
        <p>已收货：</p>
        <span>￥{{fundInfo.price3}}</span>
      </div>
      <div class="item">
        <p>已退款：</p>
        <span>￥{{fundInfo.price4}}</span>
      </div>
      <div class="item">
        <p>已完成：</p>
        <span>￥{{fundInfo.price5}}</span>
      </div>
      <div class="item">
        <p>已提现：</p>
        <span>￥{{fundInfo.price6}}</span>
      </div>
      <div class="item">
        <p>总收入：</p>
        <span>￥{{fundInfo.price7}}</span>
      </div>
      <div class="item">
        <p>未提现：</p>
        <span>￥{{fundInfo.price8}}</span>
      </div>
      <div class="item">
        <p>提现中：</p>
        <span>￥{{fundInfo.price9}}</span>
      </div>
      <div class="item">
        <p>物流费：</p>
        <span>￥{{fundInfo.price10}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import './shops.less'
import * as apiHttp from '../../../api/index'
export default {
  name: 'fundInfo',
  data () {
    return {
      fundInfo: {},
      isShow: false
    }
  },
  mounted () {
    // 删除
    apiHttp.fund().then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.fundInfo = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
