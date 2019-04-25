<template>
    <div class="paySuccess_main">
      <div class="header">
        <x-header
          slot="header"
          :left-options="{showBack: false}"
        >
          <!--<a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>-->
          支付成功
        </x-header>
      </div>
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="content_main">
            <div class="content">
              <img src="../../../assets/mall/img/home/paySuccess.png" alt="">
              <p>支付成功</p>
            </div>
            <div class="btns">
              <div class="left" @click="jumpTo({name:'mallHome'})">返回商城</div>
              <div class="right" @click="handOrder">查看订单</div>
            </div>
            <div class="home_header">
              <img src="../../../assets/mall/img/home/list_header2.png" alt="">
            </div>
            <list :list="shopList"></list>
          </div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import list from '../../../components/list'
import * as apiHttp from '../../../api/index'
import * as utils from '../../../utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'paySuccess',
  data () {
    return {
      shopList: [],
      page: 1,
      loading: false,
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
          warpId: '',
          icon: '',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  components: {
    list,
    MescrollVue
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.indexList(page.num).then(res => {
        if (res.code === 0) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.shopList = []
          this.shopList = this.shopList.concat(arr)
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
    handOrder () {
      utils.storage.set('orderId', 0)
      this.$router.push({
        name: 'mallFixing_order',
      })
    }
  }
}
</script>

<style lang="less">
  .paySuccess_main{
    text-align: center;
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: .9rem;
      bottom: 0;
      height: auto !important;
    }
  }
</style>
