<template>
  <div class="home_detail">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        评论
      </x-header>
    </div>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="comment_main" style="margin-top: 0">
          <div class="comment_main_productReview">
            <div class="list pinglun" >
              <ul>
                <table></table>
                <li v-for="(item,index) in list" :key="index">
                  <div class="titleList">
                    <div class="userName">
                      <img v-lazy="item.userInfo.avatar" alt="">
                      <span>{{item.userInfo.nickname || '未设置'}}</span>
                    </div>
                    <div class="time">
                      {{formatDate(parseInt(item.created_at))}}
                    </div>
                  </div>
                  <div class="count">{{item.info}}</div>
                  <div class="img" v-if="item.thumbs">
                    <img :src="item.thumbs || './static/img/under/111.png'" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="d18"></div>
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
          warpId: 'd18',
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
  mounted: function () {
    // 删除
  },
  methods: {
    handDetail (item) {
      this.$router.push({
        name: 'articleInfo',
        query: item
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.goodsDiscuss(page.num, this.$route.query.id).then(res => {
        if (res.code === 0) {
          this.isShow = true
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
.home_detail{
  .mescrollBox {
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
  }
}
</style>
