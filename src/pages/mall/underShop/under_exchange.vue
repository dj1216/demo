<template>
  <div class="under_exchange">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">申请退款</a>
    </x-header>
    <div class="under_ex" v-if="isShow">
      <div class="under-title">
        <div class="title-one">
          <div>
            <img src="../../../assets/mall/img/cart/13.png" alt="">
            <p>{{shopInfo.title}}</p>
          </div>
        </div>
        <div class="title-two" v-for="(item,i) in goodsList" :key="i">
          <div>
            <img v-lazy="item.thumb" alt="">
            <div>
              <p>{{item.goodsName}}</p>
              <span>共 {{item.goodsNum}} 件</span>
            </div>
          </div>
          <p>￥{{item.goodsPrice}}</p>
        </div>
        <div class="title-one">
          <span style="color: #333333">退款金额</span>
          <p style="color: #fc3357">￥{{order.payPrice}}</p>
        </div>
        <div class="title-one">
          <span style="color: #5AC8AA;font-size: .24rem">*仅退还您的实际支付金额，具体以退款结果为准</span>
        </div>
      </div>
      <div class="exchange_list">
        <div class="list_item">
          <p>退款原因 <span>（必选）</span></p>
        </div>
        <div class="list_item" v-for="(item,i) in returnInfo" :key="i"  @click="handleSelect(i,item)">
          <p>{{item}}</p>
          <img :src="active == i ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
        </div>
      </div>
      <div class="confirm" @click="handleSubmit()">
        <button>提交</button>
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
        active: 0,
        shopInfo: {},
        returnInfo: {},
        goodsList: [],
        order: {},
        goodsInfo: null,
        isShow: false
      }
    },
    mounted () {
      apiHttp.returnInfo(this.$route.query.orderSn, 'oto').then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.shopInfo = res.data.shopInfo
          this.returnInfo = res.data.returnInfo
          this.goodsList = res.data.goodsList
          this.order = res.data.order
          this.goodsInfo = res.data.returnInfo[0]
        }
      })
    },
    methods: {
      handleSelect (val,item) {
        this.active = val
        this.goodsInfo = item
      },
      handleSubmit () {
        apiHttp.submitInfo('save', 'oto' , this.order.orderSn, this.goodsInfo, this.order.payPrice).then(res => {
          if (res.code === 0) {
            this.$router.push({name: 'mallUnderGoodsList'})
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.under_exchange{
  .under_ex{
    margin-top: @margin-top;
    .exchange_list{
      background: #ffffff;
      margin-top: .2rem;
      padding: 0 .3rem;
      .list_item{
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @border-color;
        p{
          color: @font-main-color;
          font-size: @font-nomal;
        }
        img{
          width: .4rem;
          height: .4rem;
        }
      }
      div:first-child{
        p{
          font-size: @font-big;
          span{
            color: @font-light-color;
            font-size: @font-nomal;
          }
        }
      }
    }
    .confirm{
      width: 84%;
      height: .9rem;
      margin: 1rem 8% 0;
      padding-bottom: .5rem;
      button{
        background: @main-red-color;
        width: 100%;
        height: 100%;
        border:none;
        color: #ffffff;
        font-size: 0.4rem;
        border-radius: .2rem;
        outline:none;
      }
    }
  }
}
</style>
