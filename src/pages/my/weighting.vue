<template>
  <div class="weighting" v-if="isShow">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      {{data.title}}
      <a slot="right" @click="jumpTo('/weightingHelp')"><i class="iconfont icon-bangzhu"></i></a>
    </x-header>
    <div class="mescrollBoxWe">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="we-content" style="margin-top: 0">
          <div class="header">
            <p>当前股份</p>
            <span>{{data.shares}}</span>
          </div>
          <div class="we-middle">
            <p>股份记录</p>
          </div>
          <div id="d26">
            <div class="we-list" v-for="(item,i) in whList" :key="i">
              <div class="list_box">
                <p>{{parseInt(item.created_at) | formatDate}}</p>
                <span>+{{item.price}}</span>
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
  import * as apiHttp from '../../api/index'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {formatDate} from '../../plugin/data'
  export default {
    components: {
      XHeader,
      MescrollVue
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    data () {
      return {
        data: {},
        whList: [],
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
            warpId: 'd26',
            icon: './static/img/auth/kong.png',
            tip: '暂无相关数据~'
          }
        }
      }
    },
    mounted () {
      this.$http.post('amoy/task/shares-info', {}, true).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
        }
      })
    },
    methods: {
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        this.$http.post('amoy/task/shares-rebate', {page: page.num}).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.whList = []
            this.whList = this.whList.concat(arr)
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
  @import '../../assets/mall/style/_Variables';
  .weighting{
    .mescrollBoxWe{
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
      .we-content{
        .header{
          height:2.2rem;
          width:100%;
          background:url("../../assets/img/auth/bg.png");
          background-size:cover;
          color:#fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom:0.1rem;
          p{
            font-size:@font-more-big;
          }
          span{
            font-size: 0.35rem;
            margin-top: 0.2rem;
            font-weight: 600;
          }
        }
        .we-middle{
          height: 1rem;
          padding:0 0.2rem;
          p{
            font-size: @font-big;
            color: @main-red-color;
            line-height: 1rem;
          }
        }
        .we-list{
          padding:0 0.2rem;
          height:1rem;
          background:#fff;
          border-bottom:1px solid @border-color;
          .list_box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height:100%;
            span{
              font-size: @font-nomal;
              color: @main-red-color;
            }
            p{
              font-size: @font-nomal;
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
