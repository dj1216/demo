<template>
  <div class="under-buy" v-if="isShow">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">提交订单</a>
    </x-header>
    <div class="under-body">
      <div class="under-title">
        <div class="title-one">
          <div>
            <img v-lazy="shopInfo.logo" alt="">
            <p>{{shopInfo.title}}</p>
          </div>
        </div>
        <div class="title-two">
          <div>
            <img v-lazy="detail.thumb" alt="">
            <div>
              <p>{{detail.goodsName}}</p>
              <span><span v-for="(item,i) in equityInfo" :key="i" v-if="item.status == 1" style="margin-left: .1rem">{{item.title}}</span></span>
            </div>
          </div>
          <p>￥{{detail.spe_price}}</p>
        </div>
        <div class="title-one">
          <p>购买数量</p>
          <div class="handle-count">
            <img src="../../../assets/mall/img/under/desc.png" alt="" @click.stop="handleDesc()">
            <input type="text" v-model="count">
            <img src="../../../assets/mall/img/under/add.png" alt="" @click.stop="handleAdd()">
          </div>
        </div>
        <div class="title-one">
          <p>实付款</p>
          <span>￥{{data.goodsPrice}}</span>
        </div>
      </div>
      <div class="details">
        <div class="one">
          <span>留言：</span>
        </div>
        <div class="two">
          <textarea name="site" v-model="note" id="" cols="42" rows="3" placeholder="亲，您可以给商家留言哦！"></textarea>
        </div>
      </div>
      <div class="goPay1">
        <div>
          <p>合计：<span>￥</span><span>{{data.goodsPrice}}</span></p>
        </div>
        <div @click="promptlyBuy()">
          <span>立即购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './underLess.less'
  import * as apiHttp from '../../../api/index'
  export default {
    data () {
      return {
        count: 1,
        data: {},
        detail: {},
        equityInfo: {},
        shopInfo: {},
        isShow: false,
        goodsInfo: null,
        notes:[],
        note: null
      }
    },
    mounted () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        apiHttp.underShopGoodsDetails(this.$route.query.goodsId, this.count).then(res => {
          if (res.code === 0) {
            this.isShow = true
            this.data = res.data
            this.equityInfo = res.data.equityInfo
            this.detail = res.data.detail
            this.count = res.data.goodsNum
            this.shopInfo = res.data.shopInfo
            this.goodsInfo = res.data.goodsInfo
          }
        })
      },
      handleDesc () {
        if (this.count > 1) {
          this.count--
          this.getInfo()
        }
      },
      handleAdd () {
        this.count++
        this.getInfo()
      },
      promptlyBuy () {
        if (this.note) {
          this.notes[this.shopInfo.id] = this.note
        }
        apiHttp.underShopGoodBuy('oto', this.goodsInfo, this.notes).then(res => {
          if (res.code === 0) {
            this.$router.push({name: 'mallUnderpayMent', query: {spidInfo: res.data, goodsId: this.data.goodsId}})
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.under-buy{
  .under-body{
    margin-top: @margin-top;
    .details{
      padding: 0 .3rem .4rem;
      background: #ffffff;
      .one{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1rem;
        color: @font-middle-color;
        font-size: @font-big;
      }
      .two{
        width: 94%;
        height: 1.5rem;
        margin: 0 auto;
        border-radius: 0.1rem;
        background: #F7F7F7;
        display: flex;
        justify-content: center;
        align-items: center;
        textarea{
          border:none;
          resize: none;
          background: #F7F7F7;
          outline: none;
          font-size: @font-nomal;
        }
      }
    }
    .goPay1{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.1rem;
      background-color: #fff;
      box-shadow: 0 2px 1px 1px #b6b6b6;
      display: flex;
      align-items: center;
      padding: 0 .3rem;
      justify-content: space-between;
      box-sizing: border-box;
      div:first-child{
        p{
          color:@font-light-color;
          font-size: @font-nomal;
          span:first-child{
            color: @main-red-color;
          }
          span:nth-child(2){
            color:@main-red-color;
            font-size: .33rem;
            font-weight: 600;
          }
        }
      }
      div:last-child{
        background: @main-red-color;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        height: 0.75rem;
        width: 30%;
        span{
          display: inline-block;
          line-height: 0.8rem;
          margin-left: 0;
          font-size: @font-more-big;
        }
      }
    }
  }
}
</style>
