<template>
  <div class="under_order">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">订单详情</a>
    </x-header>
    <div class="under_body" v-if="isShow">
      <div class="under-title">
        <div class="title-one">
          <div>
            <img v-lazy="shopInfo.logo" alt="">
            <p>{{shopInfo.title}}</p>
          </div>
          <p :style="{'color': order.orderStatus == 0 ? '#fc3357' : '#333333','fontSize': '.24rem'}">{{orderStatusInfo[order.orderStatus]}}</p>
        </div>
        <div class="title-two" v-for="(item,i) in goodsList" :key="i">
          <div>
            <img v-lazy="item.thumb" alt="">
            <div>
              <p>{{item.goodsName}}</p>
              <span>共 {{item.goodsNum}} {{item.unit}}</span>
            </div>
          </div>
          <p>￥{{item.goodsPrice}}</p>
        </div>
        <div class="title-three">
          <div @click="onCopy(order.bdelete)" class="copy_order">
            <p>核销码：</p>
            <span>{{order.bdelete.replace(/\s/g,'').replace(/(.{4})/g,"$1 ")}}</span>
          </div>
          <p class="is_use" @click="handleQrcode(order.orderSn)" v-if="order.orderStatus == 0"><i class="iconfont icon-qrcode"></i> 出示二维码使用</p>
        </div>
      </div>
      <div class="order_list">
        <div class="list_item">
          <p>小计</p>
          <p>￥{{order.orderPrice}}</p>
        </div>
        <div class="list_item">
          <p>实付款</p>
          <p style="color: #fc3357">￥{{order.payPrice}}</p>
        </div>
        <div class="list_item">
          <div>
            <span>交易号：</span>
            <span>{{order.transaction_id}}</span>
          </div>
          <span class="copy_order" @click="onCopy(order.transaction_id)">复制</span>
        </div>
        <div class="list_item">
          <div>
            <span>下单编号：</span>
            <span>{{order.orderSn}}</span>
          </div>
          <span class="copy_order" @click="onCopy(order.orderSn)">复制</span>
        </div>
        <div class="list_item">
          <div>
            <span>下单时间：</span>
            <span>{{order.created_at | formatDate}}</span>
          </div>
        </div>
        <div class="list_item">
          <div>
            <span>支付时间：</span>
            <span>{{order.paytime | formatDate}}</span>
          </div>
        </div>
        <div class="list_item" v-if="order.endtime > 0">
          <div>
            <span>结束时间：</span>
            <span>{{order.endtime | formatDate}}</span>
          </div>
        </div>
        <div class="list_foot" @click="jumpTo({name: 'mallUnder_exchange', query: {orderSn: order.orderSn}})" v-if="order.orderStatus == 1 || order.orderStatus == 0">
          <span>申请退款</span>
        </div>
      </div>
      <!--显示二维码-->
      <div v-if="isShowQrcode">
        <div class="mall-sq-body">
          <div class="sq-content">
            <div class="sq-one">
              <img src="../../../assets/mall/img/under/erweima.png" alt="">
            </div>
            <div class="sq-two">
              <img :src="qrcodeInfo.qrcode" alt="">
            </div>
            <img class="close" src="../../../assets/img/sign/close.png" alt="" @click="handleClose()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import {formatDate} from '../../../plugin/data'
  import Clipboard from 'clipboard'
  import './underLess.less'
  export default {
    data () {
      return {
        data: {},
        goodsList: {},
        order: {},
        shopInfo: {},
        isShow: false,
        isShowQrcode: false,
        qrcodeInfo: {},
        orderStatusInfo: []
      }
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    mounted () {
      apiHttp.orderDetaiil(this.$route.query.orderSn).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
          this.goodsList = res.data.goodsList
          this.order = res.data.order
          this.shopInfo = res.data.shopInfo
          this.orderStatusInfo = res.data.orderStatusInfo
        }
      })
    },
    methods: {
      // 二维码
      handleQrcode (orderSn) {
        apiHttp.underOrderQrcodeCon(orderSn).then(res => {
          if (res.code === 0) {
            this.isShowQrcode = true
            this.qrcodeInfo = res.data
          }
        })
      },
      // 复制
      onCopy (val) {
        let that = this
        let clipBoard = api.require('clipBoard')
        clipBoard.set({
          value: val
        }, function (ret, err) {
          if (ret) {
            that.$vux.toast.text('复制成功')
          } else {
            that.$vux.toast.text('请重试')
          }
        })
      },
      handleClose () {
        this.isShowQrcode = false
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.under_order{
  .under_body{
    margin-top: @margin-top;
    .under-title{
      .title-three{
        flex-direction: column;
        padding-bottom: .2rem;
        div{
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 1rem;
          border-bottom: 1px solid @border-color;
          margin-bottom: .2rem;
          p{
            font-size: @font-nomal;
            color: @font-main-color;
          }
          span{
            color: @font-light-color;
            font-size: @font-nomal;
          }
        }
        .is_use{
          width: 3.8rem;
          height: .7rem;
          background: @main-btn1-color;
          color: #ffffff;
          text-align: center;
          line-height: .7rem;
          border-radius: .4rem;
          font-size: @font-big;
        }
      }
    }
    .order_list{
      padding: 0 .3rem;
      background: #ffffff;
      margin-top: .2rem;
      .list_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @border-color;
        height: 1rem;
        p{
          color: @font-main-color;
          font-size: @font-big;
        }
        p:last-child{
          font-size: @font-nomal;
        }
        span{
          font-size: @font-nomal;
          color: @font-light-color;
        }
        .copy_order{
          width: .9rem;
          height: .5rem;
          border: 1px solid #f2f2f2;
          border-radius: .4rem;
          line-height: .5rem;
          text-align: center;
        }
        div{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span:nth-child(2){
            margin-left: .3rem;
          }
        }
      }
      .list_foot{
        height: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          width: 3.8rem;
          height: .7rem;
          border: 1px solid @main-red-color;
          border-radius: .4rem;
          text-align: center;
          line-height: .7rem;
          color: @main-red-color;
          font-size: @font-big;
        }
      }
    }
  }
}
</style>
