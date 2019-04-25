<template>
  <div id="center1">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      拓店者
    </x-header>
    <div class="center-body">
      <div class="item" @click="jumpTo({name:'mallVipOrderList'})">
        <img src="../../../assets/mall/img/under/u10.png" alt="">
        <p>直属会员订单</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="item" @click="jumpTo({name:'mallTransactions'})">
        <img src="../../../assets/mall/img/under/u2.png" alt="">
        <p>店面交易额</p>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import '../shops/shops.less'
  import { XHeader } from 'vux'
  export default {
    name: 'index',
    components: {
      XHeader
    }
  }
</script>

<style scoped>

</style>
