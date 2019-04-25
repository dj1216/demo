<template>
<div id="foot">
  <x-header
    slot="header"
    :left-options="{showBack: false}"
  >
    <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
    我的足迹
  </x-header>
  <div class="mescrollBox">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="foot-body" id="d1">
        <div class="foot-item" v-for="(item,index) in shopList" :key="index">
          <img :src="item.goodsInfo.thumb || './static/img/under/111.png'" alt="">
          <div class="details">
            <p>{{item.goodsInfo.goodsName}}</p>
            <span>￥{{item.goodsInfo.spe_price}}</span>
            <div>
              <p>{{parseInt(item.updated_at) | formatDate}}</p>
              <img src="../../../assets/mall/img/my/shanchu.png" alt="" @click="detailDelete(index,item.id)">
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
  <confirm
    v-model="show"
    :close-on-confirm="false"
    @on-confirm="confirm">
    <p style="text-align:center;">确定删除该足迹</p>
  </confirm>
</div>
</template>

<script>
import './my.less'
import { XHeader, Confirm, TransferDomDirective as TransferDom } from 'vux'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default{
  name: 'footprint',
  components: {
    XHeader,
    Confirm,
    MescrollVue
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      finish: false,
      page: 1,
      shopList: [],
      show: false,
      id: null,
      index: null,
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
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.goodsClick(page.num).then(res => {
        if (res.code === 0) {
          let arr = res.data.list
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
      this.finish = false
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    detailDelete (index, id) {
      this.show = true
      this.id = id
      this.index = index
    },
    confirm () {
      apiHttp.goodsClickDelete(this.id).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text('删除成功')
          this.show = false
          this.shopList.splice(this.index, 1)
        } else {
          this.$vux.toast.text(response.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  #foot{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
    }
  }

</style>
