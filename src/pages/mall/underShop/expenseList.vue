<template>
  <div class="expList">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">我的消费记录</a>
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="expList-body" v-if="isShow">
          <div id="d14">
            <div class="expList-list">
              <div class="expList-item" v-for="(item,i) in yueList" :key="i">
                <div>
                  <p>{{item.remark}}</p>
                  <span> {{formatDate(item.created_at)}}</span>
                </div>
                <span v-if="item.price > 0">+{{item.price}}</span>
                <span v-if="item.price < 0">{{item.price}}</span>
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
  name: 'expenseList.vue',
  components: {
    MescrollVue
  },
  data () {
    return {
      finish: false,
      page: 1,
      yueList: [],
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
      apiHttp.underexpenseList(this.$route.query.spid, this.$route.query.card, 'consume', page.num).then(res => {
        if (res.code === 0) {
          this.isShow = true
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
    .expList-header{
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      height: 1.2rem;
      background: #ffffff;
      padding: 0 .3rem;
      margin-bottom: .2rem;
      span{
        width: 50%;
        text-align: center;
        height: 100%;
        line-height: 1.2rem;
        color: @font-main-color;
        font-size: @font-more-big;
      }
      span:first-child{
        border-right: 1px solid @border-color;
      }
      .active{
        color: @main-red-color !important;
        border-bottom: 1px solid @main-red-color;
      }
    }
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
        div{
          width: 60%;
          p{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #6A6A6A;
            font-size: @font-nomal;
          }
          span{
            font-size: @font-small;
            color: @font-light-color;
          }
        }
        span{
          color: @main-red-color;
          font-size: @font-big;
        }
      }
    }
  }
}
</style>
