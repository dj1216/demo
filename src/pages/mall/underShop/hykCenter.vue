<template>
  <div class="hykCenter">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="jumpTo({name: 'mallUnderdetail', query: {spid: spid}})" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">会员卡中心</a>
    </x-header>
    <div class="hyk-body" v-if="isShow">
      <div class="hyk-info">
        <div class="hyk-card">
          <img :src="card.cardInfo.thumb || './static/img/under/bg.png'" alt="">
          <div class="list-text">
            <div>
              <p>{{cardInfo.shopName}}</p>
              <span>{{card.card}}</span>
              <p v-if="card.starttime > 0 && card.endtime > 0">有效日期：{{parseInt(card.starttime) | formatDate}}-{{parseInt(card.endtime) | formatDate}}</p>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="info-list">
            <p>会员当前状态</p>
            <span v-if="card.status == 1">正常</span>
            <span v-if="card.status == 0">禁用</span>
            <span v-if="card.status == 9">过期</span>
          </div>
          <div class="info-fund">
            <div>
              <p>当前卡内余额</p>
              <p class="info-price">￥<a>{{card.credit}}</a></p>
            </div>
            <span @click="jumpTo({name: 'mallRechargeCard', query: {spid: spid}})">立即充值</span>
          </div>
        </div>
      </div>
      <div class="hyk-foot" @click="jumpTo({name: 'mallExpenseList', query: {spid: spid, card: card.card}})">
        <div>
          <img src="../../../assets/mall/img/under/xiaofei.png" alt="">
          <p>我的消费记录</p>
        </div>
        <img src="../../../assets/mall/img/my/left.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
export default {
  name: 'hykCenter.vue',
  data () {
    return {
      cardInfo: {},
      card: {},
      spid: this.$route.query.spid,
      isShow: false
    }
  },
  mounted () {
    apiHttp.undexCardCenter(this.spid).then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.card = res.data.card
        this.cardInfo = res.data.card.cardInfo
      }
    })
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd')
    }
  },
}
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.hykCenter{
  .hyk-body{
    .hyk-info{
      width: 94%;
      height: 4rem;
      margin: 3rem auto 0;
      background: #ffffff;
      border-radius: .2rem;
      position: relative;
      .hyk-card{
        width: 94%;
        position: absolute;
        top: -1.9rem;
        left: 3%;
        img{
          width: 7rem;
          height: 2.8rem;
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
              top: .4rem;
              left: 1.5rem;
            }
            p:last-child{
              position: absolute;
              bottom: 0.3rem;
              right: .3rem;
              font-size: @font-small;
            }
          }
        }
      }
      .card-info{
        position: absolute;
        top: .8rem;
        padding: 0 0.3rem;
        height: 3rem;
        width: 92%;
        .info-list{
          height: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid @border-color;
          p{
            color: @font-main-color;
            font-size: @font-big;
          }
          span{
            color: @main-red-color;
            font-size: @font-big;
          }
        }
      }
      .info-fund{
        height: 1.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
          p{
            color: @font-main-color;
            font-size: @font-big;
          }
          .info-price{
            color: @main-red-color;
            margin-top: .1rem;
            a{
              font-size: .32rem;
            }
          }
        }
        span{
          width: 1.8rem;
          height: 0.7rem;
          background: @main-btn1-color;
          color: #ffffff;
          border-radius: 0.5rem;
          line-height: 0.7rem;
          text-align: center;
          font-size: @font-big;
        }
      }
    }
    .hyk-foot{
      width: 94%;
      height: 1.2rem;
      background: #ffffff;
      margin: .2rem auto 0;
      border-radius: .2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 15%;
          margin-left: .3rem;
          margin-right: 0;
        }
        p{
          color: @font-middle-color;
          font-size: @font-big;
        }
      }
      img{
        width: 2%;
        margin-right: .3rem;
      }
    }
  }
}
</style>
