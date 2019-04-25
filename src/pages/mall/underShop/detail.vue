<template>
    <div class="under_detail" v-if="isShow">
      <x-header :left-options="{showBack: false}" class="collection-head" >
        <a @click="jumpTo({name: 'mallUnderShop'})" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        <a  class="head-right">店铺详情</a>
        <div class="mall-saoma" @click="handleQrcode(shopInfo.id)" style="top: 0;right: .4rem;">
          <i class="iconfont icon-qrcode"></i>
        </div>
      </x-header>
      <div class="mescrollBox">
        <div class="under-body" style="margin-bottom: 1.3rem">
          <div class="swiper">
            <swiper auto v-model="index" @on-index-change="onIndexChange" :show-dots='false' height="5.5rem">
              <swiper-item v-for="(item,i) in slides" :key="i"><img v-lazy="item.thumb" alt="" style="height: 100%;width: 100%"></swiper-item>
            </swiper>
            <p class="number">
              <span>{{index+1}}</span>
              <span> /{{slides.length}}</span>
            </p>
          </div>
          <div class="detail_header">
            <div>
              <p>{{shopInfo.title}}</p>
              <p>人气 <span>{{shopInfo.look}}</span></p>
            </div>
            <div class="open-time" style="border:none;padding: .2rem 0 0">
              <p>
                <span>评分:</span>
                <img v-for="i in 5" :key="i" :src=" i<=parseInt(shopInfo.score) ? './static/libs/img/xing_hover.png' : './static/libs/img/xing_.png'" alt="">
              </p>
            </div>
            <div class="open-time">
              <p v-if="shopInfo.category">{{shopInfo.category}}</p>
              <div>
                <img :src="'./static/libs/img/shijian.png'" alt="">
                <span v-if="shopInfo.isHoursStop == 0">营业时间: {{shopInfo.hoursInfo ? shopInfo.hoursInfo.starttime : ''}}-{{shopInfo.hoursInfo ? shopInfo.hoursInfo.endtime : ''}}</span>
                <span v-if="shopInfo.isHoursStop == 1">{{shopInfo.hoursInfo ? shopInfo.hoursInfo.status : ''}}<span style="margin-left: 0" v-if="shopInfo.hoursInfo.starttime && shopInfo.hoursInfo.endtime">(营业时间:{{shopInfo.hoursInfo ? shopInfo.hoursInfo.starttime : ''}}-{{shopInfo.hoursInfo ? shopInfo.hoursInfo.endtime : ''}})</span></span>
              </div>
            </div>
            <div class="ding-wei">
              <div>
                <img :src="'./static/libs/img/dingwei.png'" alt="">
                <span>{{shopInfo.birth || shopInfo.address}}</span>
              </div>
              <div>
                <p v-if="data.addressUrl" @click="handleGo(data.addressUrl)"><img src="../../../assets/mall/img/under/dingwei.png" alt=""></p>
                <p @click="handleCall(shopInfo.mobile)"><img :src="'./static/libs/img/dianhua.png'" alt=""></p>
              </div>
            </div>
          </div>
          <div class="detail-huiyuan" style="margin-top: .05rem;" @click="jumpTo({name: 'mallUnderShopInfo', query: {spid: shopInfo.id}})">
            <img src="../../../assets/mall/img/under/shopInfo.png" alt="">
            <div style="margin-left: -4.8rem;">
              <p>商家信息</p>
            </div>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
          <div class="detail-youhuijuan" @click="jumpTo({name: 'mallDrawYhj', query: {spid: shopInfo.id}})" v-if="couponList">
            <div class="youhuijuan-one">
              <div>
                <p>优惠</p>
                <span>店铺优惠券</span>
              </div>
              <div>
                <p style="color: #333333">领券</p>
                <img src="../../../assets/mall/img/my/left.png" alt="" style="width: 0.14rem;height: 0.24rem;">
              </div>
            </div>
            <div class="youhuijuan-one" style="overflow: hidden;">
              <div v-for="(item,i) in couponList" :key="i" v-if="i < 3">
                <img src="../../../assets/mall/img/under/youhuijuan.png" alt="">
                <div>
                  <p>{{item.title}}</p>
                </div>
              </div>
              <span v-for="(item,i) in couponList" :key="i" v-if="i === 3 && couponList.length > 3">......</span>
            </div>
          </div>
          <div class="detail-huiyuan" @click="jumpTo({name: 'mallMyCoupon', query: {spid: shopInfo.id}})">
            <img src="../../../assets/mall/img/under/yhj.png" alt="">
            <div style="margin-left: -4.5rem;">
              <p>我的<span>优惠券</span></p>
            </div>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
          <div class="detail-huiyuan" @click="handlehuk(shopInfo.id)" v-if="!userCard && (shopInfo.cardInfo && shopInfo.cardInfo.status == 1)">
            <img src="../../../assets/mall/img/under/card.png" alt="">
            <div style="margin-left: -4rem;align-items: flex-start;">
              <p>领取<span>会员卡</span></p>
              <span>领取可享最高折扣</span>
            </div>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
          <div class="detail-huiyuan" @click="jumpTo({name: 'mallHykCenter', query: {spid: shopInfo.id}})" v-if="userCard">
            <img src="../../../assets/mall/img/under/card.png" alt="">
            <div style="margin-left: -4.3rem;align-items: flex-start;">
              <p>我的<span>会员卡</span></p>
              <span>可享最高折扣</span>
            </div>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
          <div class="detail-huiyuan" @click="jumpTo({name: 'mallUnderOrderList', query: {spid: shopInfo.id}})">
            <img src="../../../assets/mall/img/under/u1.png" alt="">
            <div style="margin-left: -4.8rem;">
              <p>我的<span>订单</span></p>
            </div>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
          <div class="detail-goods" v-if="goodsList">
            <div class="goods-header">
              <p>本店在售</p>
            </div>
            <div class="goods-item" v-for="(item,i) in goodsList" :key="i" @click="jumpTo({name: 'mallUnderGoodsDetails', query: {goodsId: item.id}})">
              <img v-lazy="item.thumb" alt="">
              <div>
                <p>{{item.goodsName}}</p>
                <p v-if="item.sales > 0">已售 {{item.sales}} {{item.unit}}</p>
                <p><span>￥</span><span>{{item.spe_price}}</span><span><s>￥{{item.marketprice}}</s></span></p>
              </div>
              <span class="goods-buy">购买</span>
            </div>
          </div>
        </div>
      </div>
      <div class="goPay">
        <!--<div>-->
        <!--<img :src="'./static/libs/img/jinggao.png'" alt="">-->
        <!--<span class="jubao">举报商家</span>-->
        <!--</div>-->
        <div @click="jumpTo({name: 'mallPayUnder', query: {spid: shopInfo.id}})" v-if="shopInfo.isHoursStop == 0">
          <span>我要买单</span>
        </div>
        <div v-if="shopInfo.isHoursStop == 1" style="background: #a1a1a1">
          <span>我要买单</span>
        </div>
      </div>
      <!--显示二维码-->
      <div v-if="isShowQrcode">
        <div class="mall-sq-body">
          <div class="sq-content">
            <div class="sq-one">
              <img src="../../../assets/mall/img/under/erweima.png" alt="">
            </div>
            <div class="sq-two">
              <img :src="qrcodeInfo.qrcode" alt="">
            </div>
            <img class="close" src="../../../assets/img/sign/close.png" alt="" @click="handleClose()">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import './detail.less'
import { Swiper,SwiperItem } from 'vux'
import * as apiHttp from '../../../api/index'
export default {
  name: "detail",
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return{
      index:0,
      shopInfo: {},
      addressUrl: {},
      slides: [],
      userCard: {},
      isShow: false,
      couponList: {},
      data: {},
      isShowQrcode: false,
      qrcodeInfo: {},
      goodsList: []
    }
  },
  mounted () {
    apiHttp.underShopGoodsList(this.$route.query.spid).then(res => {
      if (res.code === 0) {
        this.goodsList = res.data.list
      }
    })
    this.getInfo()
  },
  methods: {
    getInfo () {
      apiHttp.underShopInfo(this.$route.query.spid).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
          this.shopInfo = res.data.shopInfo
          this.addressUrl = res.data.addressUrl
          this.slides = res.data.slides
          this.userCard = res.data.userCard
          this.couponList = res.data.couponList
        }
      })
    },
    onIndexChange (index) {
      this.index = index
    },
    handlehuk (spid) {
      apiHttp.underHyCard(spid).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'mallHykCenter', query: {spid: spid}})
          }, 1500)
        }
      })
    },
    // 打电话
    handleCall (mobile) {
      api.call({
        type: 'tel_prompt',
        number: mobile
      });
    },
    // 去那里
    handleGo (addressUrl) {
      this.$router.push({
        name: 'mallUnderAddress',
        query: {
          url: addressUrl
        }
      })
    },
    // 二维码
    handleQrcode (id) {
      apiHttp.underShopQrcodeCon(id).then(res => {
        if (res.code === 0) {
          this.isShowQrcode = true
          this.qrcodeInfo = res.data
        }
      })
    },
    handleClose () {
      this.isShowQrcode = false
    }
  }
}
</script>

<style lang="less">
.under_detail{
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: 0.88rem;
    bottom: 1.2rem;
    height: auto !important;
  }
}
</style>
