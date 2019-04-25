<template>
  <div class="my-coupon">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">我的优惠券</a>
    </x-header>
    <div class="yhj-body">
      <div class="yhj-head">
        <span :class="active == 1 ? 'active' : ''" @click="handleType(1)">满减</span>
        <span :class="active == 2 ? 'active' : ''" @click="handleType(2)">折扣</span>
        <span :class="active == 3 ? 'active' : ''" @click="handleType(3)">赠送</span>
      </div>
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div id="d12">
            <div class="yhj-list" v-for="(item,i) in list" :key="i" :style="{'margin-top': item.isShowShop == 1 ? '.2rem' : '0'}">
              <div class="coupon-shop" v-if="item.isShowShop == 1 && spid == ''">
                <div>
                  <img :src="item.logo || '../../../assets/mall/img/cart/13.png'" alt="">
                  <p>{{item.shopName}}</p>
                </div>
                <img src="../../../assets/mall/img/my/left.png" alt="">
              </div>
              <div class="coupon-item" @click="handleUse(item.id)">
                <img src="../../../assets/mall/img/under/yhj-bg.png" alt="">
                <div class="item-text">
                  <div>
                    <p v-if="active == 1">￥<span>{{item.coupinInfo ? item.coupinInfo.price: ''}}</span></p>
                    <p v-if="active == 2">折扣</p>
                    <p v-if="active == 3">赠送</p>
                    <span>店铺优惠券</span>
                  </div>
                  <div>
                    <p>{{item.coupinInfo ? item.coupinInfo.descs : ''}}</p>
                    <span v-if="parseInt(item.coupinInfo.starttime) > 0 && parseInt(item.coupinInfo.endtime) > 0">有效期：{{parseInt(item.coupinInfo.starttime) | formatDate}}-{{parseInt(item.coupinInfo.endtime) | formatDate}}</span>
                    <span v-if="active == 3" style="position: absolute;top: 0.3rem;right: .2rem;"><i class="iconfont icon-qrcode"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </div>
      <div class="sq-body" v-if="isUse">
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
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {formatDate} from '../../../plugin/data'
  import * as apiHttp from '../../../api/index'
  export default {
    components: {
      MescrollVue
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy.MM.dd')
      }
    },
    data () {
      return {
        active: 1,
        list:[],
        shopName: '',
        isUse: false,
        qrcodeInfo: {},
        spid: this.$route.query.spid ? this.$route.query.spid : '',
        mescroll: null,
        mescrollDown: {
          auto: false,
          callback: this.refresh
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0
          },
          htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
          noMoreSize: 5,
          toTop: {
            src: './static/img/auth/back_top.png',
            offset: 1000
          },
          empty: {
            warpId: 'd12',
            icon: './static/img/auth/kong.png',
            tip: '暂无相关数据~'
          }
        }
      }
    },
    methods: {
      handleType (val) {
        this.active = val
        this.mescrollUp.page.num = 1
        this.list = []
        this.shopName = ''
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.underCouponList(this.active, page.num, this.spid ,this.shopName).then(res => {
          if (res.code === 0) {
            this.shopName = res.data.shopName
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      },
      refresh: function () {
        this.finish = false
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      handleUse (id) {
        if (this.active == 3) {
          apiHttp.underYhjQrcode(id).then(res => {
            if (res.code === 0) {
              this.isUse = true
              this.qrcodeInfo = res.data
            }
          })
        }
      },
      handleClose () {
        this.isUse = false
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.my-coupon{
  .yhj-body{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 2.1rem;
      bottom: 0;
      height: auto !important;
    }
      margin-top: @margin-top;
    .yhj-head{
      height: 1.2rem;
      background: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 .3rem;
      span{
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 .2rem;
        color: @font-main-color;
        font-size: @font-big;
      }
      .active{
        color: @main-red-color !important;
        border-bottom: 1px solid @main-red-color;
      }
    }
    .sq-body{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      .sq-content{
        width: 80%;
        margin: 3rem 10% 0;
        background: #ffffff;
        border-radius: 0.2rem;
        .close{
          position: absolute;
          width: .5rem;
          left: 46%;
          margin-top: .5rem;
        }
        .sq-one{
          width: 100%;
          height: 1.75rem;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .sq-two{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 5.25rem;
          img{
            width: 3.6rem;
            height: 3.6rem;
          }
        }
      }
    }
    .yhj-list{
      background: #ffffff;
      padding: 0 0.3rem;
      .coupon-shop{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid @border-color;
        div{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img{
            width: .3rem;
            height: .3rem;
          }
          p{
            color: @font-main-color;
            font-size: @font-big;
            margin-left: .2rem;
          }
        }
        img{
          width: .13rem;
          height: .22rem;
        }
      }
      .coupon-item{
        height: 1.8rem;
        position: relative;
        img{
          width:100%;
          margin-top: .12rem;
        }
        .item-text{
          position: absolute;
          top:0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          div{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100%;
            color: @main-red-color;
            font-size: @font-nomal;
          }
          div:first-child{
            width: 2.8rem;
            p{
              span{
                font-size: @font-more-big;
              }
            }
          }
          div:last-child{
            width: 4.2rem;
            p{
              font-size: @font-small;
            }
            span{
              color: @font-light-color;
            }
          }
        }
      }
    }
  }
}
</style>
