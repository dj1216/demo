<template>
    <div class="profit">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        预估收益
        <!--<span class="save" slot="right" @click="jumpTo('/withdraw')">提现</span>-->
      </x-header>
      <tab :line-width="2" custom-bar-width=".4rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type">
        <tab-item @on-item-click="reset(0)">淘宝</tab-item>
        <tab-item @on-item-click="reset(1)">京东</tab-item>
        <tab-item @on-item-click="reset(2)">拼多多</tab-item>
      </tab>
      <div class="head">
        <p>累计收益（元）</p>
        <p><span>￥</span>{{data.sum_price}}</p>
      </div>
      <div class="list">
        <div class="title">结算预估收益</div>
        <div class="info">
          <div>
            <p>￥{{data.thismonth_Settlement}}</p>
            <p>本月预估收益</p>
          </div>
          <div>
            <p>￥{{data.last_month_Settlement}}</p>
            <p>上月预估收益</p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">付款预估收益</div>
        <div class="info">
          <div>
            <p>￥{{data.thismonth_payment}}</p>
            <p>本月预估收益</p>
          </div>
          <div>
            <p>￥{{data.last_month_payment}}</p>
            <p>上月预估收益</p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title other"><img src="../../assets/img/my/today.png" alt="">今日</div>
        <div class="info">
          <div>
            <p>{{data.today_payment}}</p>
            <p>付款笔数</p>
          </div>
          <div>
            <p>￥{{data.today_payment_share}}</p>
            <p>预估收益</p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title other"><img src="../../assets/img/my/yes.png" alt="">昨日</div>
        <div class="info">
          <div>
            <p>{{data.yesterday_payment}}</p>
            <p>付款笔数</p>
          </div>
          <div>
            <p>￥{{data.yesterday_share}}</p>
            <p>预估收益</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
export default {
  name: 'profit',
  components: {
    Tab, TabItem
  },
  data () {
    return {
      data: '',
      type: 0
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    reset (type) {
      this.type = type
      this.getInfo()
    },
    getInfo () {
      this.$http.post('/amoy/user/total-income', {
        order_type: Number(this.type) + 1
      }, true).then((res) => {
        this.data = res.data
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>
<style lang="less">
  .profit{
    .vux-header{
      position: absolute !important;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.profit{
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .vux-tab-wrap{
    margin-top: 0.88rem;
  }
  .head{
    margin-top: .1rem;
    width: 100%;
    height: 2.14rem;
    background: url("../../assets/img/my/profigbg.png");
    background-size: cover;
    p{
      color: #fff;
      font-size: .3rem;
      text-align: center;
      padding-top: .3rem;
    }
    p:last-of-type{
      padding-top: .2rem;
      font-size: .46rem;
      span{
        font-size: .26rem;
      }
    }
  }
  .list{
    background: #fff;
    margin: .1rem 0;
    .title{
      position: relative;
      line-height: 1rem;
      height: 1rem;
      padding: 0 .3rem;
      font-size: .3rem;
      color: #333;
    }
    .title:after{
      content: '';
      height: 1px;
      position: absolute;
      bottom: 0;
      left: .2rem;
      right: .2rem;
      border-bottom: 1px solid #dadada;
      transform-origin: 0 0;
      transform: scaleY(.5);
    }
    .other{
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: .34rem;
        height: .34rem;
        margin-right: .2rem;
      }
    }
    .info{
      display: flex;
      div{
        flex: 1;
        text-align: center;
        padding-bottom: .2rem;
        position: relative;
        p{
          padding-top: .2rem;
          color: #333;
          font-size: .28rem;
        }
        p:last-of-type{
          color: #666;
          font-size: .24rem;
        }
      }
      div:after{
        content: '';
        height: 60%;
        position: absolute;
        bottom: 0;
        top: 20%;
        left: 0;
        border-left: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleX(.5);
      }
    }
  }
}
</style>
