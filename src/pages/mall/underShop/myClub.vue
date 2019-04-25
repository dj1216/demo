<template>
  <div class="my-club">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">我的会员卡</a>
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="club-body">
          <div id="d13">
            <div class="club-list" v-for="(item,i) in yueList" :key="i" @click="jumpTo({name: 'mallHykCenter', query: {spid: item.spid}})">
              <img :src="item.cardInfo.thumb || thumb" alt="">
              <div class="list-text">
                <div>
                  <p>{{item.cardInfo ? item.cardInfo.shopName : ''}}</p>
                  <span>{{item.card}}</span>
                  <p v-if="item.starttime > 0 && item.endtime > 0">有效日期：{{parseInt(item.starttime) | formatDate}}-{{parseInt(item.endtime) | formatDate}}</p>
                </div>
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
  import {formatDate} from '../../../plugin/data'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components: {
      MescrollVue
    },
    data () {
      return {
        finish: false,
        page: 1,
        yueList: [],
        thumb: './static/img/under/bg.png',
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
            warpId: 'd13',
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
        return formatDate(date, 'yyyy.MM.dd')
      }
    },
    methods: {
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        apiHttp.underCardList(page.num).then(res => {
          if (res.code === 0) {
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
        this.finish = false
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.my-club{
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
  }
  .club-body{
    .club-list{
      height: 3.38rem;
      background: #ffffff;
      padding: 0 .3rem;
      position: relative;
      margin-bottom: .2rem;
      img{
        width: 94%;
        height: 2.7rem;
        margin: .34rem 3%;
      }
      .list-text{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        div{
          color: #fff;
          font-size: @font-big;
          p:first-child{
            position: absolute;
            top: .7rem;
            left: 2rem;
          }
          p:last-child{
            position: absolute;
            bottom: .5rem;
            right: .8rem;
            font-size: @font-small;
          }
        }
      }
    }
  }
}
</style>
