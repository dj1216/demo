<template>
  <div class="payMent UnderpayMent_main">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        确认支付
      </x-header>
    </div>
    <div class="content" v-if="isShow">
      <div class="UnderpayMent">
        <table></table>
        <div class="UnderpayMent_box" style="text-align: center;">
          <div>需支付</div>
          <div class="price">
            <span>¥</span>
            {{order.payPrice}}
          </div>
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">
          选择支付方式
        </div>
        <div class="list" v-for="(item,index) in payType" @click="handChange(index)" v-if="item.status == 1">
          <div class="img_box">
            <img v-if="index == 'credit'" src="../../../assets/mall/img/home/yue.png" alt="">
            <img v-if="index == 'alipay'" src="../../../assets/mall/img/home/apliy.png" alt="">
            <img v-if="index == 'wechat'" src="../../../assets/mall/img/home/wheat.png" alt="">
            <span>{{item.title}}</span>
          </div>
          <div class="checkbox">
            <img :src="active == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
          </div>
        </div>
      </div>
      <div class="btns" @click="handBuy">
        <div class="btn">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import './underLess.less'
  import * as apiHttp from '../../../api/index'
  export default {
    data(){
      return {
        active: 'credit',
        order: {},
        payType: {},
        userInfo: {},
        selectDis: 1,
        count: 1,
        isShow: false
      }
    },
    mounted: function () {
      // 删除
      apiHttp.paymentDisplay(this.$route.query.spidOrder).then(response => {
        if (response.code === 0) {
          this.isShow = true
          this.order = response.data.order
          this.payType = response.data.payType
          this.userInfo = response.data.userInfo
          console.log(response)
        }
      })
    },
    methods :{
      // 支付方式的选择
      handChange (key) {
        this.active = key
        console.log(key)
      },
      // 优惠券的选择
      handleSelect (val) {
        this.selectDis = val
      },
      // 优惠券 --减
      handleDesc () {
        if (this.count > 0) {
          this.count--
        }
      },
      // 优惠券 --加
      handleAdd () {
        this.count++
      },
      // 获取支付通道
      plusReady (index, data) {
        let that = this
        if (index === 1) {
          let aliPayPlus
          if (this.$aliPay === 1) {
            aliPayPlus = api.require('aliPayTradePlus')
          } else {
            aliPayPlus = api.require('aliPayPlus')
          }
          aliPayPlus.payOrder({
            orderInfo: data
          }, function (ret, err) {
            console.log(JSON.stringify(err))
            switch (ret.code) {
              case '9000':
                that.$vux.toast.text('支付成功')
                setTimeout(() => {
                  that.$router.push({
                    name: 'mallHykCenter',
                    query: {
                      spid: that.$route.query.spid
                    }
                  })
                }, 1000)
                break
              case '6001':
                that.$vux.toast.text('取消支付')
                break
              case '8000':
                that.$vux.toast.text('正在处理中')
                break
              default:
                that.$vux.toast.text('支付失败')
            }
          })
        }else if (index === 2) {
          console.log(JSON.stringify(data))
          let wxPay = api.require('wxPay')
          let info = {
            apiKey: data.appid,
            orderId: data.prepayid,
            mchId: data.partnerid,
            nonceStr: data.noncestr,
            timeStamp: data.timestamp,
            sign: data.sign
          }
          wxPay.payOrder(info, function (ret, err) {
            if (ret.status) {
              that.$vux.toast.text('支付成功')
              setTimeout(() => {
                that.$router.push({
                  name: 'mallHykCenter',
                  query: {
                    spid: that.$route.query.spid
                  }
                })
              }, 1000)
            } else {
              console.log(JSON.stringify(err))
              if (err.code === -2) {
                that.$vux.toast.text('取消支付')
              } else {
                that.$vux.toast.text('支付失败')
              }
            }
          })
        }
      },
      handBuy () {
        if (this.active === 'credit') {
          apiHttp.paymentPayType(this.$route.query.spidOrder, this.active).then(response => {
            if (response.code === 0) {
              // axios.post(response.data.notify)
              this.$vux.toast.text(response.msg)
              setTimeout(() => {
                this.$router.push({
                  name: 'mallHykCenter',
                  query: {
                    spid: this.$route.query.spid
                  }
                })
              }, 1000)
            }
          })
        } else if (this.active === 'alipay') {
          apiHttp.paymentPayType(this.$route.query.spidOrder, this.active).then(response => {
            if (response.code === 0) {
              this.plusReady(1, response.data.payOrder)
            }
          })
        } else {
          apiHttp.paymentPayType(this.$route.query.spidOrder, this.active).then(response => {
            if (response.code === 0) {
              // this.$vux.toast.text('暂未开放该支付通道')
              this.plusReady(2, response.data.payOrder)
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  .discount-list{
    padding: 0 .3rem;
    background: #ffffff;
    margin: .1rem 0;
    .discount-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      div{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        img{
          width: .4rem;
          height: .4rem;
        }
        p{
          color: @main-red-color;
          font-size: @font-nomal;
          margin-left: .3rem;
        }
        input{
          outline: none;
          border: none;
          width: .5rem;
          text-align: center;
        }
      }
    }
  }
</style>
