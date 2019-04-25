<template>
  <div class="vip-order">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">直属会员订单</a>
    </x-header>
    <div class="vip-body">
      <div class="vip-head">
        <span :class="active == 'bbc' ? 'active' : ''" @click="handleType('bbc')">线上</span>
        <span :class="active == 'recharge' ? 'active' : ''" @click="handleType('recharge')">会员卡充值</span>
        <span :class="active == 'oto' ? 'active' : ''" @click="handleType('oto')">线下</span>
      </div>
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="wdL-list" v-for="(item,i) in list" :key="i">
            <div class="wdL-item">
              <p>UID：<span style="color: #fc3357;">{{item.uid}}</span></p>
              <span style="font-size: .24rem">{{formatDate(item.created_at)}}</span>
            </div>
            <div class="wdL-item" style="margin: .1rem 0">
              <p>订单号：{{item.orderId}}</p>
              <span>{{payTypeInfo[item.payType]}}</span>
            </div>
          </div>
          <div id="d20"></div>
        </mescroll-vue>
      </div>
    </div>
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import * as apiHttp from '../../../api/index'
  export default {
    name: 'vipOrderList.vue',
    data () {
      return {
        active: 'bbc',
        list: [],
        payTypeInfo: {},
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
            warpId: 'd20',
            icon: './static/img/auth/kong.png',
            tip: '暂无相关数据~'
          }
        }
      }
    },
    components: {
      MescrollVue
    },
    methods: {
      handleType (val) {
        this.active = val
        this.mescrollUp.page.num = 1
        this.list = []
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.underVipOrder(page.num, this.active).then(res => {
          if (res.code === 0) {
            this.payTypeInfo = res.data.payTypeInfo
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
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.vip-order{
  .vip-body{
    margin-top: @margin-top;
    .vip-head{
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
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 2.2rem;
      bottom: 0;
      height: auto !important;
      .wdL-list{
        height: 1.5rem;
        padding: 0 0.3rem;
        margin-bottom: .1rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .wdL-item{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          p{
            color: @font-main-color;
            font-size: @font-big;
            span{
              font-size: @font-more-big;
              color: @font-main-color;
            }
          }
          span{
            color: @font-light-color;
            font-size: @font-big;
          }
        }
      }
    }
  }
}
</style>
