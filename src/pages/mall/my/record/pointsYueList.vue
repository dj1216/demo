<template>
  <div class="mallBalancelist">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      兑换记录
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="content" v-if="isShow">
          <div id="d23">
            <div class="header">
              <div style="width: 20%;text-align: center;">额度</div>
              <div style="width: 15%;text-align: center;">手续费</div>
              <div style="width: 40%;text-align: center;">时间</div>
            </div>
            <div class="listBox">
              <div class="list" v-for="(item,i) in yueList" :key="i">
                <div style="color: #fc3357;width: 20%;text-align: center;">{{item.price}}</div>
                <div style="width: 15%;text-align: center;">{{item.poundage}}</div>
                <div style="width: 40%;text-align: center;">{{formatDate(item.created_at)}}</div>
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
        apiHttp.jifenYueList(page.num).then(res => {
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
    }
  }
</style>
