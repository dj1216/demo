<template>
  <div id="onOrders">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      线上订单
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="on-body" id="d10">
          <div v-if="shopList.length !== 0">
            <div class="list-item" v-for="(item,i) in shopList" :key="i" @click="jumpTo({name: 'mallOnOrderDetails', query: {orderId: item.orderId}})">
              <div>
                <p>订单号:{{item.orderId}}</p>
                <span v-if="item.orderStatus === '0'" style="text-align: right;">未发货</span>
                <span v-if="item.orderStatus === '1'" style="text-align: right;">待收货</span>
                <span v-if="item.orderStatus === '2'" style="text-align: right;">已完成</span>
              </div>
              <div>
                <p>价格： <span>￥{{item.payPrice}}</span></p>
                <span style="width: 30%;">{{formatDate(item.created_at)}}</span>
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import './shops.less'
import * as apiHttp from '../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'onOrders',
  data () {
    return {
      finish: false,
      page: 1,
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
          warpId: 'd10',
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
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.onOrderList(page.num).then(res => {
        if (res.code === 0) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.shopList = []
          this.shopList = this.shopList.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.finish = false
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style scoped>

</style>
