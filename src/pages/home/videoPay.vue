<template>
    <div class="videoPay">
      <div class="list" @click="way = 1">
        <div class="select">
          <i class="iconfont icon-duihao2 selected" v-if="way === 1" :style="{color: $store.state.global.theme.mainColor}" ></i>
          <i class="iconfont icon-circle2yuanquan" v-else></i>
        </div>
        <img src="../../assets/img/home/videoAli.png" alt="">
      </div>
      <div class="list" @click="way = 2">
        <div class="select">
          <i class="iconfont icon-duihao2 selected" v-if="way === 2" :style="{color: $store.state.global.theme.mainColor}" ></i>
          <i class="iconfont icon-circle2yuanquan" v-else></i>
        </div>
        <img src="../../assets/img/home/videoWx.png" alt="">
      </div>
      <p class="info">本次购买需支付<span :style="{color: $store.state.global.theme.mainColor}" >{{$route.query.price}}</span>元</p>
      <div class="btn" @click="pay" :style="{background: $store.state.global.theme.mainColor}">去支付</div>
    </div>
</template>

<script>
export default {
  name: 'videoPay',
  components: {},
  data () {
    return {
      way: 1
    }
  },
  methods: {
    pay () {
      this.$http.post('/amoy/movie/movie-agent-pay', {
        type: this.way === 1 ? 'alipay' : 'wxpay'
      }, true).then(res => {
        if (res.code === 0) {
          if (this.way === 1) {
            this.plusReady(1, res.data.payOrder)
          } else {
            this.plusReady(0, res.data.payOrder)
          }
        }
      })
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
                that.$router.go(-1)
              }, 2000)
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
      } else {
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
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.videoPay{
  height: 100%;
  .list{
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0 .3rem;
    background: #fff;
    .select{
      margin-right: .3rem;
    }
    img{
      height: .4rem;
    }
  }
  .info{
    padding: .3rem;
    span{
      font-size: .3rem;
    }
  }
  .btn{
    position: absolute;
    bottom: 1rem;
    left: .5rem;
    width: 6.5rem;
    height: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .34rem;
    border-radius: .2rem;
  }
}
</style>
