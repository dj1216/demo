<template>
  <div id="underOrders">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的线下订单
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="off-body">
          <div class="list-item" v-for="(item,i) in list" :key="i" @click="jumpTo({name: 'mallUnderOrderDetails', query: {orderId: item.orderId}})">
            <div>
              <p>UID：{{item.uid}}</p>
              <span>{{payTypeInfo[item.payType]}}</span>
            </div>
            <div>
              <p style="margin: .1rem 0;">价格： <span>￥{{item.payPrice}}</span></p>
              <span>{{formatDate(item.created_at)}}</span>
            </div>
          </div>
          <div id="d23"></div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import '../shops/shops.less'
  import { XHeader } from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import * as apiHttp from '../../../api/index'
  export default {
    name: 'offOrders',
    components: {
      XHeader,
      MescrollVue
    },
    data () {
      return {
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
            warpId: 'd23',
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
        apiHttp.underShopOrder(this.$route.query.spid, page.num).then(res => {
          if (res.code === 0) {
            this.payTypeInfo = res.data.payTypeInfo
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
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

<style>

</style>
