<template>
    <div class="index">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        交易大厅<span class="save" slot="right" @click="jumpTo('/blockList')">交易记录</span>
      </x-header>
      <div class="box">
        <div class="myBox">
          <p class="title">我的区块币价值</p>
          <p class="money"><span>￥</span>{{data.coinValue}}</p>
          <div class="out"   :style="{background: $store.state.global.theme.mainColor}" @click="jumpTo('/turnOut')">转出</div>
          <p class="info">我的区块币价值＝今日区块币价X我的区块币个数</p>
          <div class="change"><span>我的集分宝{{data.credit4}}个</span><span @click="jumpTo('/exchange')" :style="{color: $store.state.global.theme.mainColor}">兑换区块币</span></div>
        </div>
        <div class="today">
          <div>
            <p class="t"><span>￥</span>{{data.price}}</p>
            <p class="b">今日区块币价格（个）</p>
          </div>
          <div>
            <p class="t">{{data.coinNum}}</p>
            <p class="b">我的区块币数量</p>
          </div>
        </div>
        <div style="background: #fff;position: relative">
          <p style="text-align: center; font-size: .3rem; color: #FF2557; position: absolute; top: .3rem;width: 100%;">区块币走势</p>
          <ve-line :data="chartData"  :settings="chartSettings" :extend="chartExtend" :data-zoom="dataZoom" :colors="colors" :legend-visible="false"></ve-line>
        </div>
        <div class="answer">
          <p class="title"><span  :style="{background: $store.state.global.theme.mainColor}"></span>如何获得区块币</p>
          <div class="content" v-html='data.get_coin_desc'></div>
        </div>
        <div class="answer">
          <p class="title"><span  :style="{background: $store.state.global.theme.mainColor}"></span>如何使我的区块币增值</p>
          <div class="content" v-html="data.increment_coin_desc"></div>
        </div>
        <div class="answer">
          <p class="title"><span  :style="{background: $store.state.global.theme.mainColor}"></span>区块币的走势规则</p>
          <div class="content" v-html="data.trend_coin_desc"></div>
        </div>
      </div>
    </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import 'echarts/lib/component/dataZoom'
export default {
  name: 'index',
  components: {
    VeLine
  },
  data () {
    this.chartSettings = {
      // stack: { '用户': ['访问用户', '下单用户'] },
      area: true
    }
    this.colors = ['#FF2D5E']
    this.dataZoom = [
      {
        type: 'inside'
      }, {
        type: 'slider',
        bottom: '5%',
        top: '92%',
        left: '10%',
        right: '10%',
        showDataShadow: false,
        backgroundColor: 'rgba(246, 246, 246, 1)',
        borderColor: 'rgba(246, 246, 246, 1)',
        fillerColor: 'rgba(214, 219, 231, 1)',
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '150%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }
    ]
    this.chartExtend = {
      series: {
        itemStyle: {
          color: '#FF3E6B'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0.5,
            y: 1,
            x2: 0.5,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#fff' // 0% 处的颜色
            }, {
              offset: 1, color: '#FF3E6B' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    }
    return {
      data: '',
      chartData: {
        columns: ['日期', '参考币价'],
        rows: []
      }
    }
  },
  methods: {},
  activated () {
    this.$http.post('/amoy/blockchain/trade-hall', {}, true).then((res) => {
      this.data = res.data
      this.chartData.rows = res.data.trendData
      this.$store.commit('setBlock', res.data)
    })
  }
}
</script>

<style scoped lang="less">
.index{
  position: relative;
  height: 100%;
  .save{
    color: #999;
  }
  .box{
    position: absolute;
    top: 0.88rem;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
  }
  .myBox{
    background: url("../../assets/img/block/bg.png") no-repeat;
    background-size: 100% 100%;
    height: 5.21rem;
    width: 100%;
    text-align: center;
    position: relative;
    .title{
      padding-top: .56rem;
      font-size: .26rem;
      color: #333333;
    }
    .money{
      margin-top: .36rem;
      font-size: .36rem;
      font-weight: bold;
      span{
        font-size: .3rem;
      }
    }
    .out{
      width: 1.6rem;
      height: .6rem;
      border-radius: .3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: .3rem;
      margin: .4rem auto 0;
    }
    .info{
      font-size: .22rem;
      color: #666;
      margin-top: .44rem;
    }
    .change{
      background: #fff;
      position: absolute;
      bottom: 0;
      left: .2rem;
      width: 7.1rem;
      height: 1.1rem;
      border-radius: .2rem;
      box-shadow: 1px 1px 10px #CFCFCF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 .26rem;
    }
  }
  .today{
    display: flex;
    position: relative;
    width: 7.1rem;
    height: 1.6rem;
    margin: .2rem auto;
    background: #fff;
    div{
      border-radius: .2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background: #ffff;
      .t{
        font-weight: bold;
        font-size: .24rem;
        color: #333;
        span{
          font-size: .2rem;
        }
      }
      .b{
        font-size: .24rem;
        color: #6666;
      }
    }
  }
  .answer{
    padding: .2rem .3rem;
    background: #fff;
    .title{
      color: #333;
      font-size: .3rem;
      span{
        display: inline-block;
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
        margin-right: .16rem;
      }
    }
    .content{
      margin-top: .2rem;
      padding-left: .36rem;
      color: #666;
      img{
        max-width: 100% !important;
      }
    }
  }
}
</style>
