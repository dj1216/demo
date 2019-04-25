<template>
  <div class="payMent yuWithdraw">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        {{titleInfo.credit2}}充值
        <a slot="right" @click="jumpTo({name:'mallBalancelist'})">记录</a>
      </x-header>
    </div>
    <div class="content">
      <div class="payMent_yu">
        <table></table>
        <div class="title">
          充值金额
        </div>
        <div class="input_box">
          <span>¥</span>
          <input type="text" placeholder="请输入买入金额" v-model="price">
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">
          选择支付方式
        </div>
        <div class="list" @click="handChange('alipay')">
          <div class="img_box">
            <img src="../../../../assets/mall/img/home/apliy.png" alt="">
            <span>支付宝</span>
          </div>
          <div class="checkbox">
            <img :src="active == 'alipay' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
          </div>
        </div>
        <div class="list" @click="handChange('wechat')">
          <div class="img_box">
            <img src="../../../../assets/mall/img/home/wheat.png" alt="">
            <span>微信</span>
          </div>
          <div class="checkbox">
            <img :src="active == 'wechat' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="handSubmit">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../../api/index'
import * as utils from '../../../../utils'
export default {
  data () {
    return {
      active: 'alipay',
      rcInfo: {},
      data: {},
      price: '',
      titleInfo: utils.storage.get('titleInfo')
    }
  },
  mounted () {
    // 删除
    apiHttp.rechargeInfo().then(res => {
      if (res.code === 0) {
        this.rcInfo = res.data
      }
    })
  },
  methods: {
    handChange (key) {
      this.active = key
    },
    getWay (type) {
      this.$http.post('/amoy/user/upgrade-agent', {
        id: this.index,
        upgrade_type: 1,
        type: type
      }, true).then(res => {
        this.dialog = false
        if (res.code === 0) {
          if (type === 'alipay') {
            this.plusReady(1, res.data.payOrder)
          } else {
            this.plusReady(0, res.data.payOrder)
          }
        }
      })
    },
    // 获取支付通道
    plusReady (index, data) {
      console.log(encodeURI(data))
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
    handBuy (data) {
      if (this.active === 'alipay') {
        apiHttp.paymentPayType(data, this.active).then(response => {
          if (response.code === 0) {
            this.plusReady(1, response.data.payOrder)
          }
        })
      } else {
        apiHttp.paymentPayType(data, this.active).then(response => {
          if (response.code === 0) {
            // this.$vux.toast.text('暂未开放该支付通道')
            this.plusReady(2, response.data.payOrder)
          }
        })
      }
    },
    handSubmit () {
      apiHttp.rechargeSub('save', this.price).then(response => {
        if (response.code === 0) {
          this.handBuy(response.data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
