<template>
  <div class="hy-recharge">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">会员卡充值</a>
      <img @click="jumpTo({name: 'mallRechargeList', query: {spid: spid}})" class="recharge-img" src="../../../assets/mall/img/under/czList.png" alt="">
    </x-header>
    <div class="hy-body" v-if="isShow">
      <div v-if="!cardList" style="margin-top: 4rem">
        <img src="../../../assets/mall/img/kong.png" alt="" style="width: 40%;margin-left: 30%;">
        <p style="text-align: center;">亲，该商家暂时没有会员卡充值套餐哦</p>
      </div>
      <div class="hy-item" v-for="(items,i) in cardList" :key="i">
        <div class="hy-info">
          <div>
            <span>{{items.title}}</span>
            <p>￥ <span>{{items.price}}</span></p>
            <p v-if="items.give > 0">充{{items.price}}送{{items.give}}元</p>
          </div>
          <span class="recharge" @click="handlePay(items.id)">立即充值</span>
        </div>
        <div class="hy-note" v-if="items.couponInfo">
          <div class="note-itm" v-for="(item,i) in items.couponInfo" :key="i">
            <div>
              <p>{{item.title}}</p>
              <span>{{item.typesInfo}}</span>
            </div>
            <div>
              <p>{{item.descs}}</p>
              <span>x{{item.num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
export default {
  name: 'rechargeCard.vue',
  data () {
    return {
      cardList: {},
      isShow: false,
      spid: this.$route.query.spid,
      listShow: false
    }
  },
  mounted () {
    apiHttp.undexCardFund(this.spid).then(res => {
      if (res.code == 0) {
        this.isShow = true
        this.cardList = res.data.list
      }
    })
  },
  methods: {
    // 立即充值
    handlePay (id) {
      apiHttp.underCardPay(this.$route.query.spid, 'save', id).then(res => {
        if (res.code === 0) {
          this.$router.push({name: 'mallCardPayment', query: {spidOrder: res.data, spid: this.$route.query.spid}})
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.hy-recharge{
  .recharge-img{
    position: absolute;
    top: .3rem;
    right: .3rem;
    width: .3rem;
  }
  .hy-body{
    margin-top: @margin-top;
    .hy-item{
      background: #ffffff;
      padding: 0 0.3rem .2rem;
      margin-bottom: .2rem;
      .hy-info{
        height: 1.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        div{
          p{
            color: @main-red-color;
            span{
              color: @main-red-color;
              font-size: 0.4rem;
            }
          }
          p:first-child{
            margin: .1rem 0;
            font-size: @font-big;
          }
          p:last-child{
            margin: .05rem 0;
            font-size: @font-nomal;
          }
          span{
            color: @font-main-color;
            font-size: @font-big;
            margin-top: .1rem;
            display: inline-block;
          }
        }
        .recharge{
          width: 1.72rem;
          height: .66rem;
          color: #ffffff;
          background: @main-btn1-color;
          text-align: center;
          line-height: .66rem;
          border-radius: .5rem;
          font-size: @font-big;
        }
      }
      .hy-note{
        background: #ffedf0;
        border-radius: .1rem;
        margin-top: .1rem;
        .note-itm{
          padding: 0 .3rem;
          border-bottom: 1px solid #ffffff;
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: 1.2rem;
          div{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          div:first-child{
            p{
              color: #ff8226;
              font-size: @font-big;
            }
            span{
              color: @font-main-color;
            }
          }
          div:last-child{
            p{
              color: #666666;
              font-size: @font-small;
            }
            span{
              color: @font-main-color;
            }
          }
        }
      }
    }
  }
}
</style>
