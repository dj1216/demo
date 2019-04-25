<template>
    <div id="my" v-if="showInfo">
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
        <x-header :left-options="{showBack: false}" class="cart-head" >
          <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
          <!-- <i data-v-afc99ee4="" class="iconfont icon-back"></i> -->
          <a  class="head-right">个人中心</a>
          <!-- // <a slot="right" :class="{'head-right':true,'font-color':!showFoot}" @click="footShow" v-if="list">管理</a> -->
        </x-header>
          <div class="my-head">
            <img src="../../../assets/mall/img/my/bg.png" alt="">
            <div class="box">
              <!--<div class="box-one">-->
              <!--<i class="iconfont icon-back" @click="goBack()"></i>-->
              <!--<p>我的</p>-->
              <!--</div>-->
              <p style="text-align: right;color: #ffffff;font-size: .28rem;position: absolute;right: .3rem;top: .8rem;" @click="applyDe()"  v-if="$store.state.global.firstNav !== '/home'">退出</p>
              <div class="box-two">
                <img :src="data.avatar || userInfo.avatar || './static/libs/img/touxiang.png'" alt="">
                <div>
                  <p>{{data.mobile || '未设置'}}</p>
                  <span>UID:{{data.uid}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content-item" @click="jumpTo({name:'mallShops'})">
              <p>{{info.shopsNum ? info.shopsNum : 0}}</p>
              <span>店铺收藏</span>
            </div>
            <div class="content-item" @click="jumpTo({name:'mallCollection'})">
              <p>{{info.goodsNum ? info.goodsNum : 0}}</p>
              <span>商品收藏</span>
            </div>
            <div class="content-item" @click="jumpTo({name:'mallFootprit'})">
              <p>{{info.goodsClick ? info.goodsClick : 0}}</p>
              <span>我的足迹</span>
            </div>
          </div>
          <div class="my-jilu">
            <div class="jilu-item" @click="jumpTo({name:'mallBalance'})" >
              <img src="../../../assets/mall/img/my/yue.png" alt="">
              <p>{{titleInfo.credit2 || '我的余额'}}</p>
            </div>
            <div class="jilu-item"  @click="jumpTo({name:'mallMyPoints'})">
              <img src="../../../assets/mall/img/my/jifen.png" alt="">
              <p>{{titleInfo.credit1 || '我的积分'}}</p>
            </div>
            <div class="jilu-item" @click="jumpTo({name: 'mallCommission'})">
              <img src="../../../assets/mall/img/my/yongjin.png" alt="">
              <p>{{titleInfo.credit3 || '我的佣金'}}</p>
            </div>
          </div>
          <div class="order">
            <div class="order-title">
              <p>我的订单</p>
              <span  @click="handDetail(0)">查看全部订单 <img src="../../../assets/mall/img/my/right.png" alt=""></span>
            </div>
            <div class="order-list1">
              <div class="list-item1" @click="handDetail(1)">
                <img src="../../../assets/mall/img/my/daifukuan.png" alt="">
                <span v-show="orderNum.num1 > 0">{{orderNum.num1}}</span>
                <p>待付款</p>
              </div>
              <div class="list-item1" @click="handDetail(2)">
                <img src="../../../assets/mall/img/my/daifahuo.png" alt="">
                <span v-show="orderNum.num2 > 0">{{orderNum.num2}}</span>
                <p>待发货</p>
              </div>
              <div class="list-item1" @click="handDetail(3)">
                <img src="../../../assets/mall/img/my/daishouhuo.png" alt="">
                <span v-show="orderNum.num3 > 0">{{orderNum.num3}}</span>
                <p>待收货</p>
              </div>
              <div class="list-item1" @click="handDetail(4)">
                <img src="../../../assets/mall/img/my/daipingjia.png" alt="">
                <span v-show="orderNum.num4 > 0">{{orderNum.num4}}</span>
                <p>待评价</p>
              </div>
              <div class="list-item1" @click="handDetail(5)">
                <img src="../../../assets/mall/img/my/tuihuanhuo.png" alt="">
                <span v-show="orderNum.num5 > 0">{{orderNum.num5}}</span>
                <p>退换货</p>
              </div>
            </div>
            <div class="list" v-show="expressList.length>0">
              <swiper :options="swiperOption4" ref="mySwiper1">
                <swiperSlide v-for="(item,index) in expressList" :key="index">
                  <div class="list-text" @click="jumpTo({name: 'mallLogistics',query: {orderSn:item.orderSn}})">
                    <img :src="item.goods.thumb || './static/img/under/111.png'" alt="">
                    <div>
                      <div>
                        <img src="../../../assets/mall/img/my/yunshuzhong.png" alt="">
                        <span style="color: #fc3357;font-size: 0.3rem;width: 50%;" v-if="item.orderStatus == 1">运输中</span>
                        <span style="color: #fc3357;font-size: 0.3rem;width: 50%;" v-if="item.orderStatus == 2">完成中</span>
                        <span>{{item.list.time}}</span>
                      </div>
                      <span class="text-overflow_1">{{item.list.context}}</span>
                    </div>
                  </div>
                </swiperSlide>
              </swiper>
              <!--<div class="swiper-pagination" slot="pagination"></div>-->
            </div>
          </div>
          <div class="my-foot">
            <div @click="jumpTo({name:'mallAddress'})">
              <img src="../../../assets/mall/img/my/tubiao/2.png" alt="">
              <p>收货地址</p>
            </div>
            <div @click="jumpTo({name:'mallShopCenter'})" v-show="shopInfo && shopInfo.status == 1 && info.isShop > 0">
              <img src="../../../assets/mall/img/my/tubiao/4.png" alt="">
              <p v-if="shopInfo">{{shopInfo.title || '商家中心'}}</p>
            </div>
            <div @click="jumpTo({name: 'mallUnderOrderList'})" v-if="$isMallUnderShop">
              <img src="../../../assets/mall/img/my/tubiao/7.png" alt="">
              <p>线下订单</p>
            </div>
            <div @click="jumpTo({name: 'mallUnderGoodsList'})" v-if="$isMallUnderShop">
              <img src="../../../assets/mall/img/my/tubiao/8.png" alt="">
              <p>线下商品订单</p>
            </div>
            <div @click="jumpTo({name:'mallGrade'})" v-show="(isDisUser && isDisUser.status === '1') || disUserInfo.type == 0">
              <img src="../../../assets/mall/img/my/tubiao/1.png" alt="">
              <p>{{titleInfo.agent || '代理中心'}}</p>
            </div>
            <div @click="jumpTo({name: 'mallMyClub'})" v-if="$isMallUnderShop">
              <img src="../../../assets/mall/img/my/tubiao/3.png" alt="">
              <p>我的会员卡</p>
            </div>
            <div @click="jumpTo({name: 'mallMyCoupon'})" v-if="$isMallUnderShop">
              <img src="../../../assets/mall/img/my/tubiao/9.png" alt="">
              <p>我的优惠券</p>
            </div>
            <div @click="jumpTo({name:'mallApplyShop'})" v-show="info.isShop <= 0">
              <img src="../../../assets/mall/img/my/tubiao/6.png" alt="">
              <p>申请商家</p>
            </div>
            <div @click="jumpTo({name:'mallDistributor'})" v-show="!isDisUser && disUserInfo.type == 3">
              <img src="../../../assets/mall/img/my/tubiao/5.png" alt="">
              <p>申请{{titleInfo.disUser || '分销商'}}</p>
            </div>
          </div>

        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import './my.less'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Marquee, MarqueeItem } from 'vux'
import * as apiHttp from '../../../api/index'
import * as utils from '../../../utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
  components: {
    Marquee,
    MarqueeItem,
    swiper,
    swiperSlide,
    MescrollVue
  },
  inject: ['reload'],
  data () {
    return {
      swiperOption4: {
        direction: 'vertical',
        autoplay: {
          delay: 3000,
          waitForTransition: true
        }
      },
      data: this.$store.state.user.userInfo,
      info: {},
      userInfo: {},
      shopInfo: {},
      expressList: {},
      finish: false,
      orderNum: {},
      titleInfo: {},
      isDisUser: {},
      disUserInfo: {},
      showInfo: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      }
    }
  },
  mounted () {
    this.getMyInfo()
  },
  methods: {
    eventFun () {
      alert(123)
      this.$router.go(-1)
    },
    getMyInfo () {
      apiHttp.personInfo().then(res => {
        if (res.code === 0) {
          this.showInfo = true
          this.info = res.data
          this.userInfo = res.data.userInfo
          this.shopInfo = res.data.shopInfo
          this.expressList = res.data.expressList
          this.orderNum = res.data.orderNum
          this.titleInfo = res.data.titleInfo.alias
          utils.storage.set('titleInfo', this.titleInfo)
          this.isDisUser = res.data.isDisUser
          this.disUserInfo = res.data.disUserInfo
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(this.info, false)
        })
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh (done) {
      this.finish = false
      this.getMyInfo()
    },
    handDetail (key) {
      utils.storage.set('orderId', key)
      this.$router.push({
        name: 'mallFixing_order',
        query: {
          id: key
        }
      })
    },
    applyDe () {
      this.$store.commit('logout')
      this.reload()
      this.$router.replace('/wechatLogin')
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  #my{
    text-align: center;
    .mescrollBox {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0px;
      height: auto !important;
      .my-foot{
        margin-top: .2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: .2rem .3rem;
        background: #ffffff;
        flex-direction: row;
        flex-wrap: wrap;
        div{
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 1.5rem;
          align-items: center;
          width: 25%;
          img{
            height: 0.45rem;
            width: 0.45rem;
          }
          p{
            margin-top: .15rem;
            font-size: @font-nomal;
            color: @font-main-color;
          }
        }
      }
    }
  }

</style>
