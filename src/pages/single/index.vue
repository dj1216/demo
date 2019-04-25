<template>
  <div class="no_single">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      免单福利
      <p style="position: absolute;right: .3rem;top: 0;color: rgba(153,153,153,1);font-size:.28rem;" @click="jumpTo('/welfare')">我的福利</p>
    </x-header>
    <div class="single_content">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="single_banner">
          <swiper :options="swiperOption" ref="mySwiper" style="border-radius:.1rem;">
            <swiperSlide v-for="(item,i) in free" :key="i">
              <img v-lazy="item.img" alt="" @click="jumpTo('/singleWeal')">
            </swiperSlide>
            <div class="swiper-banner" slot="pagination"></div>
          </swiper>
        </div>
        <div class="single_body">
          <div class="single_list" v-for="(item,i) in list" :key="i">
            <img v-lazy="item.img" alt="" :key="item.img">
            <img class="single_img" src="../../assets/img/single/5.png" alt="" v-if="item.remanent <= 0">
            <div class="single_item">
              <p class="single_item_one">
                <img src="../../assets/img/tb.png" alt="" v-if="item.type == 1">
                <img src="../../assets/img/jd.png" alt="" v-else-if="item.type == 2">
                <img src="../../assets/img/pddlogo.png" alt="" v-else="item.type == 3">
                <img src="../../assets/img/tmlogo.png" alt="" v-else="item.type == 4">
                {{item.title}}
              </p>
              <p class="single_item_two">￥<span>{{parseFloat(item.price-item.free_money)}}</span><span>￥{{item.price}}</span></p>
              <p class="single_item_three" @click="instantly(item.active_id, item.type)" v-if="item.remanent > 0">立即领取</p>
              <p class="single_item_three" style="background: #D5D5D5" v-else>立即领取</p>
            </div>
          </div>
        </div>
        <!--<div class="single_right">-->
          <!--<span>规则详情</span>-->
        <!--</div>-->
      </mescroll-vue>
    </div>
    <div class="single_get" v-if="show">
      <div class="get_info">
        <p>您暂时未获得免单奖励</p>
        <p>快去邀请朋友成为会员吧</p>
        <div class="get_confirm">
          <span @click="show = false">取消</span>
          <span @click="jumpTo('/invite')">确定</span>
        </div>
      </div>
    </div>
    <div class="single_get" v-if="show1">
      <div class="get_info">
        <p>确认领取该商品，将消耗您的免单资格</p>
        <div class="get_confirm">
          <span @click="show1 = false">取消</span>
          <span @click="getSingle()">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index.vue',
  components:{
    swiper,
    swiperSlide,
    MescrollVue
  },
  data () {
    return {
      swiperOption: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        disabledClass: 'my-button-disabled',
        hiddenClass: 'my-button-hidden',
        spaceBetween: 5,
        autoplay:true,
        pagination: {
          el: '.swiper-banner'
        }
      },
      show: false,
      show1: false,
      data: '',
      list: '',
      free: '',
      number: '',
      id: '',
      coupon_url: '',
      type: '',
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
        htmlNodata: '<p class="upwarp-nodata"></p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: '',
          icon: '',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  mounted () {
    this.$http.post('/amoy/home/slides').then(res => {
      if (res.code === 0) {
        this.free = res.data.free_71
      }
    })
  },
  methods: {
    instantly (id, type) {
      if (this.number > 0) {
        this.id = id
        this.show1 = true
        // this.coupon_url = coupon_url
        this.type = type
      } else {
        this.show = true
      }
    },
    getSingle () {
      let that = this
      this.$http.post('/amoy/home/free-get',{active_id: this.id}).then(res => {
        if (res.code === 0) {
          that.$vux.toast.text(res.msg)
          that.mescrollUp.page.num = 1
          that.upCallback(this.mescrollUp.page, this.mescroll)
          that.show1 = false
          if (res.data.url) {
            if (that.type == 1 || that.type == 4) {
              if (that.$aliPay === 1) {
                let that = this
                let aliBC = api.require('aliBC')
                aliBC.asyncInit({
                }, function (ret, err) {
                  if (ret.status) {
                    aliBC.showLogin(function (ret, err) {
                      if (ret.status) {
                        aliBC.showPageByUrl({
                          url: res.data.url,
                          openType: 'native'
                        })
                      } else {
                        that.$vux.toast.text(err.message)
                      }
                    })
                  }
                })
              } else {
                let browser = api.require('webBrowser')
                browser.open({
                  url: res.data.url,
                  titleBar: {
                    textColor: '#333',
                    bg: '#fff'
                  }
                })
              }
            } else if (this.type === '2') {
              if (api.systemType === 'ios') {
                api.appInstalled({
                  appBundle: 'openApp.jdMobile://'
                }, function (ret, err) {
                  if (ret.installed) {
                    window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + res.data.url + '"}')
                  } else {
                    let browser = api.require('webBrowser')
                    browser.open({
                      url: res.data.url,
                      titleBar: {
                        textColor: '#333',
                        bg: '#fff'
                      }
                    })
                  }
                })
              } else {
                let browser = api.require('webBrowser')
                browser.open({
                  url: res.data.url,
                  titleBar: {
                    textColor: '#333',
                    bg: '#fff'
                  }
                })
                window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + res.data.url + '"}')
              }
            } else {
              let browser = api.require('webBrowser')
              browser.open({
                url: that.coupon_url,
                titleBar: {
                  textColor: '#333',
                  bg: '#fff'
                }
              })
            }
          } else {
            that.$vux.toast.text('优惠券链接获取失败')
          }
        }
      })
    },
    upCallback (page, mescroll) {
      this.$http.post('/amoy/home/free-order', {page: page.num}).then(res => {
        if (res.code === 0) {
          this.number = res.data.number
          let arr = res.data.data === '' ? [] : res.data.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.data.length, true)
          })
        } else {
          mescroll.endSuccess()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/mall/style/_Variables";
.no_single{
  .single_content{
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
    .single_banner{
      padding: 0.15rem;
      width: 100%;
      box-sizing: border-box;
      .swiper-banner{
        bottom: 10px;
        position: absolute;
        z-index: 333;
        width: 100%;
        text-align: center;
      }
      .swiper-pagination-bullet-active{
        background: #ffffff;
      }
    }
    .single_body{
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 .1rem;
      box-sizing: border-box;
      align-items: center;
      flex-wrap: wrap;
      .single_list{
        width: 3.57rem;
        background: #ffffff;
        margin-bottom: .1rem;
        position: relative;
        img{
          width: 3.57rem;
          height: 3.57rem;
        }
        .single_img{
          width: 3.57rem;
          height: 3.57rem;
          position: absolute;
          top: 0;
          left: 0;
        }
        .single_item{
          width: 100%;
          padding: 0 0.15rem .3rem;
          box-sizing: border-box;
          .single_item_one{
            color: #333333;
            font-size: .26rem;
            max-height: .8rem;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-top: .1rem;
            img{
              width: .28rem;
              height: .28rem;
              margin-right: .1rem;
            }
          }
          .single_item_two{
            color:rgba(255,37,86,1);
            font-size: .28rem;
            margin: 0.15rem 0;
            span:first-child{
              font-size: .36rem;
              font-weight:bold;
              color:rgba(255,37,86,1);
            }
            span:last-child{
              font-size: .24rem;
              font-weight:500;
              text-decoration:line-through;
              color:rgba(153,153,153,1);
              margin-left: .1rem;
            }
          }
          .single_item_three{
            width: 3.22rem;
            height: .48rem;
            background:linear-gradient(90deg,#FB2F74,#FF7E7E);
            border-radius: .1rem;
            color: #ffffff;
            text-align: center;
            line-height: .48rem;
            font-size: .26rem;
          }
        }
      }
    }
    .single_right{
      position: absolute;
      top: 3.5rem;
      right: 0;
      background: #ffffff;
      color: #FF2556;
      width: 1.92rem;
      box-shadow:0 0 .43rem 0 rgba(169,168,168,1);
      border-radius:.33rem 0 0 .33rem;
      height: .66rem;
      span{
        display: inline-block;
        width: 100%;
        height: .66rem;
        text-align: center;
        line-height: .66rem;
        font-size: .28rem;
      }
    }
  }
  .single_get{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .get_info{
      width: 6.38rem;
      position: absolute;
      top:4.66rem;
      left: 50%;
      margin-left: -3.19rem;
      background: #ffffff;
      border-radius: .16rem;
      padding-bottom: .5rem;
      p:first-child{
        font-size: .28rem;
        color: #666666;
        text-align: center;
        margin-top: .68rem;
        font-weight:500;
      }
      p:nth-child(2){
        color: #333333;
        font-size: .32rem;
        text-align: center;
        margin-top: .26rem;
        font-weight:500;
      }
      .get_confirm{
        padding: 0 .74rem;
        box-sizing: border-box;
        height: .7rem;
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        span{
          display: inline-block;
          width: 1.9rem;
          height: .7rem;
          border-radius:.35rem;
          font-size: .28rem;
          font-weight:500;
          text-align: center;
          line-height: .7rem;
        }
        span:first-child{
          background: #F0F0F0;
          color: #898787;
        }
        span:last-child{
          background: #FF2556;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
