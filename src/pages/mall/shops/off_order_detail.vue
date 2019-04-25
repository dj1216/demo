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
            <img src="../../../assets/mall/img/cart/13.png" alt="">
            <p>{{data.shopName}}</p>
          </div>
          <p style="color: #fc3357; font-size: .24rem" v-if="data.orderStatus == 0">未使用</p>
          <p style="color: #333333; font-size: .24rem" v-if="data.orderStatus == 2">已使用</p>
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
        <div class="title-three" v-if="data.orderStatus == 0">
          <div>
            <p>核销码：</p>
            <input type="text" placeholder="请输入核销码!" v-model="bdelete">
          </div>
          <p class="is_use" @click="handleQrcode()">确认核销</p>
        </div>
      </div>
      <div class="order_list">
        <div class="list_item">
          <p>小计</p>
          <p>￥{{data.orderPrice}}</p>
        </div>
        <div class="list_item">
          <p>实付款</p>
          <p style="color: #fc3357">￥{{data.payPrice}}</p>
        </div>
        <div class="list_item">
          <div>
            <span>交易号：</span>
            <span>{{data.transaction_id}}</span>
          </div>
          <span class="copy_order" @click="onCopy(data.transaction_id)">复制</span>
        </div>
        <div class="list_item">
          <div>
            <span>下单编号：</span>
            <span>{{data.orderSn}}</span>
          </div>
          <span class="copy_order" @click="onCopy(data.orderSn)">复制</span>
        </div>
        <div class="list_item">
          <div>
            <span>下单时间：</span>
            <span>{{data.created_at | formatDate}}</span>
          </div>
        </div>
        <div class="list_item">
          <div>
            <span>支付时间：</span>
            <span>{{data.paytime | formatDate}}</span>
          </div>
        </div>
        <!--<div class="list_item" v-if="order.endtime > 0">-->
          <!--<div>-->
            <!--<span>结束时间：</span>-->
            <!--<span>{{order.endtime | formatDate}}</span>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import {formatDate} from '../../../plugin/data'
  import Clipboard from 'clipboard'
  import '../underShop/underLess.less'
  export default {
    data () {
      return {
        data: {},
        goodsList: {},
        isShow: false,
        bdelete: this.$route.query.bdelete ? this.$route.query.bdelete : ''
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
      apiHttp.onOrderDetails(this.$route.query.orderId).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data.detail
          this.goodsList = res.data.detail.goodsList
        }
      })
    },
    methods: {
      handleQrcode () {
        apiHttp.onOrderDetailsTy(this.$route.query.orderId, 'save', this.bdelete).then(res => {
          if (res.code === 0) {
            this.$router.push({name: 'mallOffGoodsOrders'})
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
            input{
              outline: none;
              border: none;
              height: 1rem;
              line-height: 1rem;
              margin-left: .2rem;
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
            font-size: @font-nomal;
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
            font-size: @font-nomal;
          }
        }
      }
    }
  }
</style>
