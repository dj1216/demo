<template>
  <div id="withdraw" v-if="isShow">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      提现中心
    </x-header>
    <div class="wd-body">
      <div class="item">
        <p>可提现金额：</p>
        <span>￥{{wdInfo.shopPrice}}</span>
      </div>
      <div class="item">
        <p>提现最小金额：</p>
        <span>￥{{withdraw.min}}</span>
      </div>
      <div class="item">
        <p>手续费：</p>
        <span>{{withdraw.percent}}%</span>
      </div>
      <div class="item">
        <p>提现整数倍：</p>
        <span>{{withdraw.zheng}}</span>
      </div>
      <div class="item">
        <p>姓名：</p>
        <input type="text" placeholder="请输入真实姓名" v-model="info.username">
      </div>
      <div class="item">
        <p>联系电话：</p>
        <input type="text" placeholder="请输入联系电话" v-model="info.mobile">
      </div>
      <div class="item">
        <p>提现金额：</p>
        <input type="text" placeholder="请输入提现金额" v-model="info.price">
      </div>
      <div class="item">
        <p>提现方式：</p>
        <span style="color: #a1a1a1" @click="show=true">{{text}}<img v-if="text == '请选择'" style="width: 10%;margin-left: .1rem;" src="../../../assets/mall/img/my/left.png" alt=""></span>
      </div>
      <div class="item" v-if="text == wdType.alipay">
        <p>支付宝账号：</p>
        <input type="text" placeholder="请输入支付宝账号" v-model="info.alipay">
      </div>
      <div class="item" v-if="text == wdType.bankCard">
        <p>开户行：</p>
        <input type="text" placeholder="请输入开户行" v-model="info.bankName">
      </div>
      <div class="item" v-if="text == wdType.bankCard">
        <p>支行：</p>
        <input type="text" placeholder="请输入支行" v-model="info.bankNameNo">
      </div>
      <div class="item" v-if="text == wdType.bankCard">
        <p>银行卡账号：</p>
        <input type="text" placeholder="请输入银行卡账号" v-model="info.bankCard">
      </div>
      <div class="confirm1" @click="wdSumbit()">
        <button>确认提现</button>
      </div>
      <div v-transfer-dom>
        <popup v-model="show">
          <div class="refund-foot">
            <div class="title">
              <span>选择提现方式</span>
            </div>
            <div class="list" @click="handChange('1')">
              <p>{{wdType.alipay}}</p>
              <div class="checkbox">
                <img :src="active == '1' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
              </div>
            </div>
            <div class="list" @click="handChange('2')">
              <p>{{wdType.bankCard}}</p>
              <div class="checkbox">
                <img :src="active == '2' ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
              </div>
            </div>
            <div class="confirm1" @click="confirm">
              <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;">确定</button>
            </div>
          </div>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
import './shops.less'
import '../my/my.less'
import * as apiHttp from '../../../api/index'
import { XHeader, Popup } from 'vux'
export default {
  name: 'withdraw',
  components: {
    XHeader,
    Popup
  },
  data () {
    return {
      info: {
        username: null,
        mobile: null,
        price: null,
        alipay: null,
        bankName: null,
        bankNameNo: null,
        bankCard: null,
        withdrawType: null
      },
      show: false,
      active: 1,
      text: '支付宝',
      wdInfo: {},
      wdType: {},
      withdraw: {},
      isShow: false
    }
  },
  mounted () {
    // 删除
    apiHttp.withdraw().then(res => {
      this.isShow = true
      this.wdInfo = res.data
      this.wdType = res.data.withdrawType
      this.withdraw = res.data.data.shopInfo.withdraw
    })
  },
  methods: {
    refund () {
      this.show = true
    },
    handChange (key) {
      this.active = key
      if (this.active === '1') {
        this.text = '支付宝'
      } else if (this.active === '2') {
        this.text = '银行卡'
      }
    },
    confirm () {
      this.show = false
    },
    wdSumbit () {
      if (!this.info.username) {
        this.$vux.toast.text('用户名不能为空')
        return
      }
      if (!this.info.mobile) {
        this.$vux.toast.text('手机号不能为空')
        return
      }
      let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      if (!reg.test(this.info.mobile)) {
        this.$vux.toast.text('手机号格式不对')
        return
      }
      if (!this.info.price) {
        this.$vux.toast.text('提现金额不能为空')
        return
      }
      if (this.text === '支付宝') {
        this.info.withdrawType = 'alipay'
      } else if (this.text === '银行卡') {
        this.info.withdrawType = 'bankCard'
      }
      apiHttp.withdrawSub('save', this.info).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'mallWithdrawList'})
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
