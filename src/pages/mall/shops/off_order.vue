<template>
  <div class="under_order">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        线下商品订单
      </x-header>
      <div class="tab">
        <tab :line-width=2 active-color='#fc3357' height="700px" custom-bar-width=".8rem"  v-model="index">
          <tab-item class="vux-center"   :selected="index===i" v-for="(item, i) in tab"
                    @on-item-click="getListIn(item.sort)" :key="i">{{item.title}}
          </tab-item>
        </tab>
      </div>
    </div>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="order-body">
          <div id="d22"></div>
          <div class="under-title" v-for="(items,i) in shopList" :key="i" @click="handleJump(items.orderStatus, items.orderId)">
            <div class="title-one">
              <div>
                <p>{{items.orderId}}</p>
              </div>
              <p class="no-use" :style="{'color': items.orderStatus == 0 ? '#fc3357' : '#333333'}">{{items.statusInfo}}</p>
            </div>
            <div class="title-two" v-for="(item,i) in items.goodsList" :key="i">
              <div>
                <img v-lazy="item.thumb" alt="">
                <div>
                  <p>{{item.goodsName}}</p>
                  <span>共 {{item.goodsNum}} {{item.unit}}</span>
                </div>
              </div>
              <p>￥{{item.goodsPrice}}</p>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    Confirm
  } from 'vux'
  import '../underShop/underLess.less'
  import * as apiHttp from '../../../api/index'
  import '../../../assets/mall/style/mixin.less'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    data () {
      return {
        tab: [{sort: 0, title: '全部'}, {sort: 1, title: '待消费'}, {sort: 2, title: '已消费'}, {sort: 3, title: '已退款'}],
        sort: 0,
        index: 0,
        shopList: [],
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
            warpId: 'd22',
            icon: './static/img/auth/wudingdan.png',
            tip: '暂无相关订单~'
          }
        }
      }
    },
    components: {
      Tab,
      TabItem,
      Confirm,
      MescrollVue
    },
    mounted: function () {

    },
    methods: {
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.offOrderList(page.num, this.sort).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.shopList = []
            this.shopList = this.shopList.concat(arr)
            console.log(this.shopList)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      },
      refresh: function () {
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      getListIn (type) {
        this.shopList = []
        this.mescrollUp.page.num = 1
        this.sort = type
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      handleJump (orderStatus, orderId) {
        if (orderStatus >= 0) {
          this.$router.push({name: 'mallOff_order_detail', query: {orderId: orderId}})
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  .under_order{
    .tab{
      padding:0;
      height:1rem;
      background: #fff;
      position:absolute;
      width: 100%;
      top:@margin-top;
      z-index:999;
      .scrollable .vux-tab-item{
        flex: 0 0 16.66%;
        align-items: center;
        line-height: 1rem;
        font-size:@font-big;
      }
      .vux-tab-container{
        height:1rem;
      }
      .vux-tab{
        height:1rem;
        bottom:0;
      }
    }
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 2.1rem;
      bottom: 0;
      height: auto !important;
      .order-body{
        .under-title{
          margin-bottom: .1rem;
          .title-one{
            .no-use{
              font-size: @font-nomal;
            }
            .is-use{
              width: 1.8rem;
              height: .6rem;
              display: inline-block;
              background: @main-btn1-color;
              color: #ffffff;
              line-height: .6rem;
              text-align: center;
              border-radius: .3rem;
            }
          }
        }
      }
    }
  }
</style>
