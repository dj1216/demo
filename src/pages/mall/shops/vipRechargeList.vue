<template>
  <div class="expList">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">会员卡充值记录</a>
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="expList-body" v-if="isShow">
          <div id="d14">
            <div class="expList-list">
              <div class="expList-item" v-for="(item,i) in yueList" :key="i">
                <span>{{formatDate(item.created_at)}}</span>
                <span>+{{item.payPrice}}</span>
                <span>{{payTypeInfo[item.payType]}}</span>
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components: {
      MescrollVue
    },
    data () {
      return {
        finish: false,
        page: 1,
        yueList: [],
        payTypeInfo: [],
        isShow: false,
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
            warpId: 'd14',
            icon: './static/img/auth/kong.png',
            tip: '暂无相关数据~'
          }
        }
      }
    },
    methods: {
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.underCardFund(page.num).then(res => {
          if (res.code === 0) {
            this.isShow = true
            this.payTypeInfo = res.data.payTypeInfo
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.yueList = []
            this.yueList = this.yueList.concat(arr)
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
  .expList{
    .mescrollBox {
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
    }
    .expList-body{
      .expList-list{
        background: #ffffff;
        padding: 0 .3rem;
        .expList-item{
          height: 1.2rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid @border-color;
          font-size: @font-nomal;
          span:first-child{
            color: @font-light-color;
          }
          span:nth-child(2){
            color: @main-red-color;
            font-size: @font-big;
          }
          span{
            color: @font-main-color;
          }
        }
      }
    }
  }
</style>
