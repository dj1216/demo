<template>
  <div class="my-city">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的区域
    </x-header>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="city-body">
          <div class="city-info">
            <div class="info-one">
              <div>
                <img v-if="info.birthLevel == 1" src="../../../assets/mall/img/under/u4.png" alt="">
                <img v-if="info.birthLevel == 2" src="../../../assets/mall/img/under/u5.png" alt="">
                <img v-if="info.birthLevel == 3" src="../../../assets/mall/img/under/u9.png" alt="">
                <p>{{levelInfo[info.birthLevel]}}</p>
              </div>
              <div class="two">
                <p>{{data.price}}</p>
                <span>{{info.province}}{{info.city}}{{info.district}}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="city-list" v-for="(item,i) in list" :key="i">
              <div class="list-one">
                <img v-lazy="item.logo" alt="">
                <p>{{item.title}}</p>
              </div>
              <div class="list-two">
                <p>日销售额：</p>
                <span>{{item.trade1}}</span>
              </div>
              <div class="list-two">
                <p>周销售额：</p>
                <span>{{item.trade2}}</span>
              </div>
              <div class="list-two">
                <p>月销售额：</p>
                <span>{{item.trade3}}</span>
              </div>
              <div class="list-two">
                <p>日收益：</p>
                <span>{{item.profit1}}</span>
              </div>
              <div class="list-two">
                <p>周收益：</p>
                <span>{{item.profit2}}</span>
              </div>
              <div class="list-two">
                <p>月收益：</p>
                <span>{{item.profit3}}</span>
              </div>
            </div>
            <div id="19"></div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import * as apiHttp from '../../../api/index'
  export default {
    name: 'myCity.vue',
    components: {
      MescrollVue
    },
    data () {
      return {
        page: 1,
        data: {},
        info: {},
        list: [],
        levelInfo: {},
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
            warpId: 'd19',
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
        apiHttp.underMyCity(page.num).then(res => {
          if (res.code === 0) {
            this.data = res.data
            this.info = res.data.info
            this.levelInfo = res.data.info.levelInfo
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
.my-city{
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 0;
    height: auto !important;
  }
  .city-body{
    .city-info{
      .info-one{
        margin-bottom: .2rem;
        background: #ffffff;
        height: 1.2rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
          display: flex;
          align-items: center;
          img{
            width: 0.5rem;
            height: .5rem;
          }
          p{
            color: @font-main-color;
            font-size: @font-more-big;
            margin-left: .2rem;
          }
        }
        .two{
          display: flex;
          justify-content: center;
          flex-direction: column;
          p{
            color: @main-red-color;
            font-size: @font-more-big;
          }
          span{
            color: @font-light-color;
            font-size: @font-small;
          }
        }
      }

    }
    .city-list{
      background: #ffffff;
      padding: 0 .3rem;
      border-bottom: 2px solid @border-color;
      .list-one{
        height: 1.2rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid @border-color;
        img{
          width: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
        }
        p{
          margin-left: .2rem;
          font-size: @font-big;
          color: @font-main-color;
        }
      }
      .list-two{
        height: .7rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @border-color;
        p{
          font-size: @font-nomal;
          color: @font-main-color;
        }
        span{
          font-size: @font-nomal;
          color: @main-red-color;
        }
      }
    }
  }
}
</style>
