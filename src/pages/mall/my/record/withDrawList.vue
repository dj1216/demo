<template>
  <div class="mallBalancelist">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      提现记录
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="content">
          <div id="d3">
            <div class="header">
              <div style="width: 40%;text-align: center;">时间</div>
              <div style="width: 20%;text-align: center;">金额</div>
              <div style="width: 15%;text-align: center;">状态</div>
            </div>
            <div class="listBox1">
              <div class="b_list" v-for="(item,i) in yueList" :key="i">
                <div class="list1">
                  <div style="width: 40%;text-align: left;">{{formatDate(item.created_at)}}</div>
                  <div style="color: #fc3357;width: 20%;text-align: center;">{{item.price}}</div>
                  <div :style="{'width': '15%','text-align': 'right','color': item.status == 9 ? '#fc3357' : '#333333'}">{{status[parseInt(item.status)]}}</div>
                </div>
                <div class="l_list">{{item.info}}</div>
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import * as apiHttp from '../../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'balance',
  components: {
    XHeader,
    MescrollVue
  },
  data () {
    return {
      finish: false,
      page: 1,
      yueList: [],
      status: {},
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
          warpId: 'd3',
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
      apiHttp.yuewithdraw(page.num).then(res => {
        if (res.code === 0) {
          this.status = res.data.status
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
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style lang="less">
  @import '../../../../assets/mall/style/_Variables';
  .mallBalancelist{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
      .listBox1{
        padding:0 0.3rem;
        background:#fff;
        .b_list{
          border-bottom:1px solid @border-color;
          position: relative;
          .list1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:@font-nomal;
            height: 1rem;
          }
          .l_list{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            text-align: right;
          }
        }
      }
    }
  }
</style>
