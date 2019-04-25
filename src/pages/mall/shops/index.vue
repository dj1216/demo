<template>
<div id="center" v-if="isShow">
  <x-header
    slot="header"
    :left-options="{showBack: false}">
    <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
    {{shopInfo.title}}
  </x-header>
  <div class="center-body">
    <div class="item" @click="jumpTo({name:'mallOffOrders'})" v-if="shop.model === 'oto' && $isMallUnderShop">
      <img src="../../../assets/mall/img/shop/xinxiadingdan.png" alt="">
      <p>线下订单</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name:'mallOffGoodsOrders'})" v-if="shop.model === 'oto' && $isMallUnderShop">
      <img src="../../../assets/mall/img/shop/xinxiadingdan.png" alt="">
      <p>线下商品订单</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name:'mallOnOrders'})" v-if="shop.model === 'bbc'">
      <img src="../../../assets/mall/img/shop/xianshangdingdan.png" alt="">
      <p>线上订单</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name:'mallWithdraw'})">
      <img src="../../../assets/mall/img/shop/tixian.png" alt="">
      <p>提现中心</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name: 'mallWithdrawList'})">
      <img src="../../../assets/mall/img/shop/tixianjilu.png" alt="">
      <p>提现记录</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name:'mallFundInfo'})">
      <img src="../../../assets/mall/img/shop/zijinxinxi.png" alt="">
      <p>资金信息</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name:'mallVipRechargeList'})" v-if="shop.model === 'oto' && $isMallUnderShop">
      <img src="../../../assets/mall/img/shop/xinxiadingdan.png" alt="">
      <p>会员卡充值记录</p>
      <i class="iconfont icon-right"></i>
    </div>
    <div class="item" @click="jumpTo({name: 'mallShopQrcode'})" v-if="shop.model === 'oto' && $isMallUnderShop">
      <img src="../../../assets/mall/img/shop/erweima.png" alt="">
      <p>我的二维码</p>
      <i class="iconfont icon-right"></i>
    </div>
  </div>
</div>
</template>

<script>
import './shops.less'
import { XHeader } from 'vux'
import * as apiHttp from '../../../api/index'
export default {
  name: 'index',
  components: {
    XHeader
  },
  data () {
    return {
      shop: {},
      shopInfo: {},
      isShow: false
    }
  },
  mounted () {
    apiHttp.shopCenterInfo().then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.shop = res.data.shops
        this.shopInfo = res.data.shopInfo
      }
    })
  }
}
</script>

<style scoped>

</style>
