<template>
  <div id="article">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      文章列表
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="article-body" id="d8">
          <div class="arti-item" v-for="(item,i) in list" :key="i" @click="handDetail(item)">
            <p>{{item.title}}</p>
            <span>发布时间：{{parseInt(item.created_at) | formatDate}}</span>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'articleList',
  components: {
    MescrollVue
  },
  data () {
    return {
      page: 1,
      loading: false,
      finish: false,
      list: [],
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
          warpId: 'd8',
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
      apiHttp.articleList(page.num).then(res => {
        if (res.code === 0) {
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
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    handDetail (item) {
      this.$router.push({
        name: 'mallArticleInfo',
        query: item
      })
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/mall/style/_Variables";
#article{
  .mescrollBox {
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
  }
  .article-body{
    .arti-item{
      height: 1.5rem;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 .3rem;
      margin-bottom: .1rem;
      p{
        color: @font-main-color;
        font-size: @font-big;
        margin-bottom: .1rem;
      }
      span{
        color: @font-light-color;
        font-size: @font-nomal;
      }
    }
  }
}

</style>
