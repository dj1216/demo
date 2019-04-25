<template>
  <div class="partnership">
    <div class="bottomBox">
      <div class="bottom">
        <div class="option" v-html="datas[0].descs">
        </div>
      </div>
      <span @click="dialog = true">立即升级</span>
    </div>
    <div class="box" v-if="dialog">
      <div class="dialog" @click="dialog = false"></div>
      <div class="way">
        <p class="t">选择支付方式</p>
        <p class="ways" @click="getWay('wxpay')"><img src="../../assets/img/my/wx.png" alt="">微信支付</p>
        <p @click="getWay('alipay')"><img src="../../assets/img/my/zfb.png" alt="">支付宝支付</p>
        <i class="iconfont icon-close" @click="dialog = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircle, Range, Icon, Flow, FlowState, FlowLine } from 'vux'
export default {
  name: 'upgrade-agency',
  data () {
    return {
      opposite: true,
      percent: 70,
      chang: 0,
      grow: 20,
      sum: 100,
      datas: '',
      index: 1,
      dialog: false,
      key: 'year'
    }
  },
  methods: {
    getlist () {
      this.$http.get('/amoy/user/operator').then((res) => {
        if (res.code === 0) {
          this.datas = res.data
        }
      })
    },
    radio (type) {
      if (type === 'year') {
        this.index = 1
        this.key = 'year'
      } else if (type === 'month') {
        this.index = 2
        this.key = 'month'
      } else {
        this.index = 3
        this.key = 'permanent'
      }
      console.log(this.index)
    },
    getWay (type) {
      this.$http.get('/amoy/user/upgrade-agent', {
        key: this.key,
        type: type
      }, true).then(res => {
        this.dialog = false
        if (res.code === 0) {
          if (type === 'alipay') {
            this.plusReady(1, res.data.orderStr)
          } else {
            this.plusReady(0, res.data.orderStr)
          }
        }
      })
    },
    // 获取支付通道
    plusReady (index, data) {
      // 获取支付通道
      plus.payment.getChannels((channels) => {
        // this.channel = channels[index]
        console.log(JSON.stringify(channels))
        if (index === 1) {
          for (var x in channels) {
            if (channels[x].id === 'alipay') {
              this.channel = channels[x]
            }
          }
          this.pay('alipay', data)
        } else {
          for (var y in channels) {
            if (channels[y].id === 'wxpay') {
              this.channel = channels[y]
            }
          }
          this.pay('wxpay', data)
        }
      }, function (e) {
        this.$vux.toast.text('获取支付通道失败：' + e.toString())
      })
    },
    pay (id, data) {
      console.log(data.toString())
      console.log(this.channel)
      plus.payment.request(this.channel, data, (result) => {
        this.$vux.toast.show('支付成功')
      }, (error) => {
        console.log(error.toString())
        if (error.message && (error.message.indexOf('canceled') > -1 || error.message.indexOf('取消') > -1)) {
          this.$vux.toast.text('支付已取消')
        } else {
          this.$vux.toast.text('支付失败：' + error.message)
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getlist()
  },
  components: {
    XCircle,
    Range,
    Icon,
    Flow,
    FlowState,
    FlowLine
  },
  directives: {
    focus: {
      inserted (el, bindings) {
        let ratio = bindings.value
        el.style.width = ratio + '%'
      }
    }
  }
}
</script>

<style scoped lang="less">
  .active{
    background-color: #FFF;
  }
  .partnership{
    height: 100%;
    background-image: url('../../assets/img/my/bj.png');
    -webkit-background-size: 100%;
    background-size: 100%;
    padding-top: 3.7rem;
    box-sizing: border-box;
    padding-bottom: 0.4rem;
    .box{
      border-radius: 5px;
      margin: 0 .2rem;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 0.5rem;
      font-size: 0.26rem;
      color: #666666;
      padding: 0.4rem 0.2rem;
      box-sizing: border-box;
      padding-bottom: 0.24rem;
      p{
        margin-bottom: 0.16rem;
      }
    }
    .bottomBox{
      background-color: #fff;
      margin: 0 .2rem;
      padding-bottom: 0.8rem;
      border-radius: 6px;
      border: 1px solid #fff;
      >p{
        font-size: 0.24rem;
        text-align: center;
        color: #999999;
      }
      .standardBox{
        background: #fff url('../../assets/img/my/beijing.png') 0 0 no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        margin: 0.2rem;
        font-size: 0.28rem;
        padding: 0.2rem 0;
        box-sizing: border-box;
        height: 2rem;
        .title{
          text-align: center;
          font-size: 0.3rem;
          font-weight: 700;
        }
        .standard{
          display: flex;
          margin-top: 0.2rem;
          div{
            position: relative;
            flex: 1;
            text-align: center;
            padding-right: 0.2rem;
            span{
              color: #fb3458;
            }
          }
          .radio{
            position: absolute;
            width: 0.14rem;
            height: 0.14rem;
            border-radius: 50%;
            border: 2px solid black;
            top: 0.11rem;
            right: 0.22rem;
          }
        }
      }
      >span{
        display: block;
        margin: 0 0.2rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        background-color: #fc3357;
        font-size: 0.32rem;
        color: #fff;
        border-radius: 24px;
        margin-top: 0.6rem;
      }
    }
  }
  .bottom{
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    .header{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      text-align: center;
      position: relative;
    }
    .header:before{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ebebeb;
    }
    .option{
      width: 100%;
      .row{
        display: flex;
        position: relative;
        >div{
          flex: 1;
          height: 3.2rem;
          div{
            font-size: 0.28rem;
          }
          .texts{
            span{
              display: block;
              text-align: center;
            }
            .people{
              display: inline-block;
              color: #f93f60;
            }
          }
        }
        >div:nth-child(1){
          position: relative;
        }
        >div:nth-child(1):before{
          content: '';
          position: absolute;
          width: 1px;
          height: 70%;
          background-color: #ebebeb;
          right: 0;
          top: 0.36rem;
        }
      }
      .row:nth-child(1):before{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #ebebeb;
        left: 0;
        bottom: 0;
      }
    }
  }
  .box{
    .dialog{
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .way{
      background: #fff;
      border-radius: .1rem;
      position: absolute;
      left: .3rem;
      top: 50%;
      margin-top: -1.75rem;
      width: 6.9rem;
      font-size: .3rem;
      .icon-close{
        position: absolute;
        right: .3rem;
        top: .25rem;
        font-size: .4rem;
      }
      p{
        text-align: center;
        height: 1.15rem;
        line-height: 1.15rem;
        justify-content: center;
        display: flex;
        align-items: center;
        position: relative;
        img{
          width: .4rem;
          margin-right: .1rem;
        }
      }
      .t:after{
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .ways:after{
        content: '';
        width: 90%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 5%;
        border-bottom: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
    }
  }
</style>
