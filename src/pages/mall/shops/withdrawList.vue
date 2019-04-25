<template>
  <div id="wdL">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      提现记录
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="wdL-body" id="d11">
          <div v-if="wdList.length !== 0">
            <div class="wdL-list" v-for="(item,i) in wdList" :key="i">
              <div class="wdL-item">
                <p>手机号：<span>{{item.mobile}}</span></p>
                <span>{{withdrawType[item.withdrawType]}}</span>
              </div>
              <div class="wdL-item" style="margin: .1rem 0">
                <p>提现金额：<span style="color: #fc3357;">￥{{item.price}}</span></p>
                <span style="color: #fc3357;">{{statusInfo[parseInt(item.status)]}}</span>
              </div>
              <div class="wdL-item">
                <p>手续费：<span>{{item.poundage}}</span></p>
                <span>{{formatDate(item.created_at)}}</span>
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
import './shops.less'
export default {
  components: {
    MescrollVue
  },
  data () {
    return {
      finish: false,
      page: 1,
      wdList: [],
      statusInfo: {},
      withdrawType: {},
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
          warpId: 'd11',
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
      apiHttp.withdrawList(page.num).then(res => {
        if (res.code === 0) {
          this.statusInfo = res.data.statusInfo
          this.withdrawType = res.data.withdrawType
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.wdList = []
          this.wdList = this.wdList.concat(arr)
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
