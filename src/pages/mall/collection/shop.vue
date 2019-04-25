<template>
    <div class="collection">
      <x-header :left-options="{showBack: false}" class="collection-head" >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        <a  class="head-right">店铺收藏</a>
      </x-header>
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div v-if="isShow" id="d1">
            <Business :showCancel=true :list="suggest" @jump="seller" @f5="f5"></Business>
          </div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import './collection.less'
import Business from '../business/business'
import '../../../assets/mall/style/mixin.less'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
  components: {Business, MescrollVue},
  data () {
    return {
      showBorder: true,
      showFoot: false,
      selectAll: false,
      suggest: [],
      page: 1,
      finish: false,
      loading: false,
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
          warpId: 'd1',
          icon: './static/img/auth/wushoucang.png',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  methods: {
    setBorder (type) {
      this.showBorder = !this.showBorder
    },
    footShow () {
      this.showFoot = !this.showFoot
    },
    seller (id) {
      console.log(id)
      this.$router.push({
        name: 'seller',
        query: {
          id: id
        }
      })
    },
    selectItem (type) {
      this.selectAll = !this.selectAll
    },
    f5 () {
      this.$http.post('/mall/users/shops-care-list').then(res => {
        if (res.code === 0) {
          this.suggest = res.data.list
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.$http.post('/mall/users/shops-care-list', {page: page.num}).then(res => {
        if (res.code === 0) {
          this.isShow = true
          let arr = res.data.list
          if (page.num === 1) this.suggest = []
          this.suggest = this.suggest.concat(arr)
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
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.collection{
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
  }
}
</style>
