<template>
  <div class="payMent yuWithdraw">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        {{titleInfo.credit2}}提现
        <a slot="right" @click="jumpTo({name:'mallWithDrawList'})">记录</a>
      </x-header>
    </div>
    <div class="content" v-if="isShow">
      <div class="headerList">
        <div class="list">
          <div>总{{titleInfo.credit2}}</div>
          <div class="red">￥{{data.userInfo ? data.userInfo.credit2 : 0}}</div>
        </div>
        <div class="list">
          <div>提现最小提额</div>
          <div>￥{{min}}</div>
        </div>
        <div class="list">
          <div>提现最大提额</div>
          <div>￥{{max}}</div>
        </div>
        <div class="list list3">
          <div>提现将收取{{data.creditInfo ? data.creditInfo.percent : ''}}%的手续费,必须为{{zheng}}的整数倍</div>
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">
          选择支付方式
        </div>
        <div class="list" v-for="(item,index) in withdrawType" @click="handChange(index)" v-if="item.status">
          <div class="img_box">
            <img v-if="index == 'credit'" src="../../../../assets/mall/img/home/yue.png" alt="">
            <img v-if="index == 'alipay'" src="../../../../assets/mall/img/home/apliy.png" alt="">
            <img v-if="index == 'wechat'" src="../../../../assets/mall/img/home/wheat.png" alt="">
            <img v-if="index == 'bankCard'" src="../../../../assets/mall/img/my/hang.png" alt="">
            <span>{{item.title}}</span>
          </div>
          <div class="checkbox">
            <img :src="active == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
          </div>
        </div>
      </div>
      <div class="payMent_yu">
        <table></table>
        <div class="title">
          {{titleInfo.credit2}}金额
        </div>
        <div class="input_box">
          <span>¥</span>
          <input type="text" placeholder="请输入提现金额" v-model="price">
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="handShow">确定提现</div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="dialog_box">
          <div class="dialog_title">支付宝账号</div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入姓名" v-model="username">
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入电话" v-model="mobile">
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入支付宝账号" v-model="alipay" readonly @click="handleInput()">
          </div>
          <div class="dialog_btn">
            <button @click="showHideOnBlur=false">取消</button>
            <button class="btn1" @click="handSubmit1">确定</button>
          </div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlurCard" class="dialog-demo" hide-on-blur>
        <div class="dialog_box">
          <div class="dialog_title">银行卡号</div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入姓名" v-model="username">
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入银行卡号" v-model="bankCard" readonly v-if="this.data.withdrawType && this.data.withdrawType.bankCard.cardInfo && this.data.withdrawType.bankCard.cardInfo.bankCard">
            <input type="text" placeholder="请输入银行卡号" v-model="bankCard" v-else>
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入开户行" v-model="bankName" readonly v-if="this.data.withdrawType && this.data.withdrawType.bankCard.cardInfo && this.data.withdrawType.bankCard.cardInfo.bankName">
            <input type="text" placeholder="请输入开户行" v-model="bankName" v-else>
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入支行" v-model="bankNameNo" readonly v-if="this.data.withdrawType && this.data.withdrawType.bankCard.cardInfo && this.data.withdrawType.bankCard.cardInfo.bankNameNo">
            <input type="text" placeholder="请输入支行" v-model="bankNameNo" v-else>
          </div>
          <div class="dialog_input">
            <input type="text" placeholder="请输入电话" v-model="mobile">
          </div>
          <div class="dialog_btn">
            <button @click="showHideOnBlurCard=false">取消</button>
            <button class="btn1" @click="handSubmit2">确定</button>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../../api/index'
import {TransferDomDirective as TransferDom, XDialog} from 'vux'
import * as utils from '../../../../utils'
export default {
  data () {
    return {
      active: 'alipay',
      showHideOnBlur: false,
      data: {},
      username: '',
      bankCard: '',
      bankName: '',
      bankNameNo: '',
      mobile: '',
      alipay: '',
      min: '',
      max: '',
      zheng: '',
      withdrawType: {},
      price: '',
      isShow: false,
      showHideOnBlurCard: false,
      titleInfo: utils.storage.get('titleInfo')
    }
  },
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  mounted () {
    // 删除
    this.getNew()
  },
  methods: {
    handChange (key) {
      this.active = key
    },
    getNew () {
      apiHttp.creditNew().then(response => {
        if (response.code === 0) {
          this.isShow = true
          this.data = response.data
          this.withdrawType = response.data.withdrawType
          if (this.data.creditInfo) {
            this.min = response.data.creditInfo.min
            this.max = response.data.creditInfo.max
            this.zheng = response.data.creditInfo.zheng
          }
        }
      })
    },
    handShow () {
      if (!this.price) {
        this.$vux.toast.text('提现金额不能为空')
        return
      }
      if (parseFloat(this.price) < parseFloat(this.min)) {
        this.$vux.toast.text('提现金额不能小于' + this.min)
        return
      }
      if (parseFloat(this.price) > parseFloat(this.max)) {
        this.$vux.toast.text('提现金额不能大于' + this.max)
        return
      }
      if (parseFloat(this.price) % parseFloat(this.zheng) !== 0) {
        this.$vux.toast.text('提现金额必须为' + this.zheng + '的整数倍')
        return
      }
      if (this.data.history.username) {
        this.username = this.data.history.username
      }
      if (this.data.history.mobile) {
        this.mobile = this.data.history.mobile
      }
      if (this.data.withdrawType.alipay.no) {
        this.alipay = this.data.withdrawType.alipay.no
      }
      if (this.data.withdrawType.bankCard.cardInfo.bankCard) {
        this.bankCard = this.data.withdrawType.bankCard.cardInfo.bankCard
      }
      if (this.data.withdrawType.bankCard.cardInfo.bankName) {
        this.bankName = this.data.withdrawType.bankCard.cardInfo.bankName
      }
      if (this.data.withdrawType.bankCard.cardInfo.bankNameNo) {
        this.bankNameNo = this.data.withdrawType.bankCard.cardInfo.bankNameNo
      }
      if (this.active === 'alipay') {
        this.showHideOnBlur = true
      } else {
        this.showHideOnBlurCard = true
      }
    },
    handSubmit1 () {
      if (!this.username) {
        this.$vux.toast.text('姓名不能为空')
        return
      }
      if (!this.alipay) {
        this.$vux.toast.text('支付宝账号不能为空')
        return
      }
      if (!this.mobile) {
        this.$vux.toast.text('手机号不能为空')
        return
      }
      apiHttp.creditWithdraw('save', this.price, this.username, this.mobile, this.alipay, this.active).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text('提现成功')
          this.showHideOnBlur = false
          this.getNew()
        }
      })
    },
    handleInput () {
      if (this.alipay) {
        this.$router.push('/add?title=修改账号')
      } else {
        this.$router.push('/add?title=添加账号')
      }
    },
    handSubmit2 () {
      if (!this.username) {
        this.$vux.toast.text('姓名不能为空')
        return
      }
      if (!this.bankCard) {
        this.$vux.toast.text('银行卡号不能为空')
        return
      }
      if (!this.bankName) {
        this.$vux.toast.text('bankName不能为空')
        return
      }
      if (!this.bankNameNo) {
        this.$vux.toast.text('支行不能为空')
        return
      }
      if (!this.mobile) {
        this.$vux.toast.text('手机号不能为空')
        return
      }
      apiHttp.creditCard('save', this.price, this.username, this.mobile, this.bankCard, this.bankName, this.bankNameNo, this.active).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text('提现成功')
          this.showHideOnBlurCard = false
          this.getNew()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
