<template>
    <div class="withdraw">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"   class="backBox">
        <i class="iconfont icon-back"></i></a>
        提现
        <span class="save" slot="right" @click="jumpTo('/withdrawlist')">明细</span>
      </x-header>
      <div class="box">
        <div class="head">
          <p>账户余额 <span>(元)</span></p>
          <p class="money"><span>¥</span>{{data.credit3 || '0.00'}}</p>
        </div>
        <div class="high"></div>
        <div class="info">
          <div>
            <span>可提现金额（元）</span>
            <span :style="{color: $store.state.global.theme.mainColor}" >{{data.credit3 || '0.00'}}</span>
          </div>
          <div>
            <span>提现中金额（元）</span>
            <span :style="{color: $store.state.global.theme.mainColor}" >{{data.withdrawal || '0.00'}}</span>
          </div>
        </div>
        <div class="high"></div>
        <div class="account" v-if="data">
          <p class="t">提现到 <span  @click.stop="change">切换</span></p>
          <div class="number" @click="add">
            <img src="../../assets/img/my/zfb.png" alt="" v-if="way === 'alipay'">
            <img src="../../assets/img/my/weixin.png" alt="" v-else>
            <div class="info" >
              <p class="name" v-if="data.alipay === '1' && way === 'alipay'">支付宝</p>
              <p class="name" v-else-if="data.wxpay === '1'">微信</p>
              <p class="mobile" v-if="way === 'alipay' && info.withdraw_to">{{info.withdraw_to}}</p>
              <p class="mobile" v-else-if="way === 'alipay'">还没有支付宝账号，去添加</p>
            </div>
          </div>
        </div>
        <div class="inputBox">
          <input type="number" placeholder="请输入提取金额" v-model="money">
          <span @click="money = data.credit3" :style="{color: $store.state.global.theme.mainColor}" >全部</span>
        </div>
        <div class="hint" v-if="data">
          <!--<span v-if="type== 1">最小提现金额为100元，且为100倍数，手续费为0</span>-->
          <span>最小提现金额为{{data.withdraw_size}}元,手续费为{{data.withdraw_charge}}%</span><span v-if="data.withdraw_multiple">,且必须为{{data.withdraw_multiple}}倍数</span>
          <!--<span v-if="data.withdraw_charge == 0">手续费为 {{data.withdraw_charge * 100}}</span>-->
          <!--<span v-else>手续费为 {{data.withdraw_charge * 100}}%</span>-->
        </div>
        <div class="primary_btn" :style="{background: $store.state.global.theme.mainColor}" @click="widthdraw">提现</div>
        <div class="explain" v-html="data.remark"></div>
      </div>
      <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="ways"></actionsheet>
      <div class="single_get" v-if="show1">
        <div class="get_info">
          <p>{{text}}</p>
          <p>快去邀请朋友成为会员吧</p>
          <div class="get_confirm">
            <span @click="show1 = false">取消</span>
            <span @click="jumpTo('/invite')">确定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Group, XInput, XHeader, Actionsheet} from 'vux'
export default {
  name: 'withdraw',
  components: {
    Group, XInput, XHeader, Actionsheet
  },
  data () {
    return {
      text: '',
      show1: false,
      show: false,
      type: this.$route.query.type,
      menus: {},
      money: '',
      frozen: '',
      data: '',
      info: this.$store.state.user.userInfo,
      way: 'alipay'
    }
  },
  methods: {
    ways (key) {
      if (key === 'menu1') {
        this.way = 'alipay'
      } else {
        this.way = 'wxpay'
      }
    },
    change () {
      this.show = true
    },
    add () {
      if (this.way === 'alipay') {
        if (this.info.withdraw_to) {
          this.$router.push('/add?title=修改账号')
        } else {
          this.$router.push('/add?title=添加账号')
        }
      } else if (this.info.wechat_openid) {
        this.$vux.toast.text('已经绑定过微信')
      } else {
        this.$router.push('/binding')
      }
    },
    // 提现
    widthdraw () {
      if (!this.info.withdraw_to) {
        this.$vux.toast.text('请先绑定账户')
        return
      }
      if (Number(this.money) < Number(this.data.withdraw_size)) {
        if (this.$bizId === 9) {
          this.text = '最小提现金额为' + this.data.withdraw_size
          this.show1 = true
        } else {
          this.$vux.toast.text('最小提现金额为' + this.data.withdraw_size)
        }
        return
      }
      if (Number(this.money) > Number(this.data.credit3)) {
        this.$vux.toast.text('账户金额不足')
        return
      }
      this.$http.post('/amoy/user/withdraw', {
        money: this.money,
        type: this.way
      }, true).then(res => {
        this.$vux.toast.text(res.msg)
        this.data.withdrawal = (Number(this.money) + Number((this.data.withdrawal || 0))).toFixed(2)
        this.data.credit3 = (this.data.credit3 - this.money).toFixed(2)
        this.info.credit3 = this.data.credit3
        this.$store.commit('setUserInfo', this.info)
        this.money = ''
      })
    },
    getInfo () {
      this.$http.post('/amoy/user/withdraw', {
        type: 1
      }, true).then(res => {
        this.data = res.data
        if (this.data.alipay === '1') {
          this.way = 'alipay'
        } else if (this.data.wxpay === '1') {
          this.way = 'wxpay'
        }
        if (this.data.alipay === '1') {
          this.menus.menu1 = '支付宝'
        }
        if (this.data.wxpay === '1') {
          this.menus.menu2 = '微信'
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>
<style lang="less">
  .withdraw{
    .vux-header{
      position: absolute !important;
    }
    .weui-cells{
      margin-top: 0;
      font-size: 12px;
      .weui-cell:before{
        right: 15px;
      }
      .weui-input{
        font-size: 14px;
        color: #999;
      }
      .weui-label{
        font-size: 14px;
      }
      /*.weui-cell__bd{*/
      /*display: flex;*/
      /*}*/
    }
    .weui-cells:after,.weui-cells:before{
      left: 15px;
      right: 15px;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.4);
    }
    .weui-actionsheet_toggle{
      bottom: 30px;
      width: 90%;
      left: 5%;
      background: none;
      .weui-actionsheet__menu{
        border-radius: 5px;
      }
      .weui-actionsheet__action{
        border-radius: 5px;
      }
      .vux-actionsheet-menu-default{
        color: #666;
        font-size: .28rem;
      }
      .weui-actionsheet__cell{
        font-size: .3rem;
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .hint{
    font-size: 0.22rem;
    padding-left: 0.4rem;
    color: #666;
  }
.withdraw{
  height: 100%;
  background: #fff;
  overflow-y: auto;
  position: relative;
  .single_get{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .get_info{
      width: 6.38rem;
      position: absolute;
      top:4.66rem;
      left: 50%;
      margin-left: -3.19rem;
      background: #ffffff;
      border-radius: .16rem;
      padding-bottom: .5rem;
      p:first-child{
        font-size: .28rem;
        color: #666666;
        text-align: center;
        margin-top: .68rem;
        font-weight:500;
      }
      p:nth-child(2){
        color: #333333;
        font-size: .32rem;
        text-align: center;
        margin-top: .26rem;
        font-weight:500;
      }
      .get_confirm{
        padding: 0 .74rem;
        box-sizing: border-box;
        height: .7rem;
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        span{
          display: inline-block;
          width: 1.9rem;
          height: .7rem;
          border-radius:.35rem;
          font-size: .28rem;
          font-weight:500;
          text-align: center;
          line-height: .7rem;
        }
        span:first-child{
          background: #F0F0F0;
          color: #898787;
        }
        span:last-child{
          background: #FF2556;
          color: #ffffff;
        }
      }
    }
  }
  .save{
    color: #666;
  }
  .box{
    position: absolute;
    left: 0;
    top: .88rem;
    bottom: 0;
    width: 100%;
    .head{
      width: 100%;
      height: 2.2rem;
      background: url("../../assets/img/my/withdraw.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p{
        font-size: .3rem;
        color: #fff;
        span{
          margin: 0 .1rem;
        }
      }
      .money{
        margin-top: .2rem;
        font-size: .4rem;
        margin-right: .3rem;
        span{
          font-size: .34rem;
        }
      }
    }
    .info{
      display: flex;
      div{
        position: relative;
        flex: 1;
        height: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span{
          font-size: .24rem;
          color: #666;
        }
        span:last-of-type{
          font-size: .32rem;
        }
      }
      div:first-of-type:after{
        content: '';
        position: absolute;
        top: .2rem;
        height: 1rem;
        right: 0;
        width: 1px;
        border-right: 1px solid #dedede;
        transform-origin: 0 0;
        transform: scaleX(.5);
      }
    }
    .high{
      overflow: hidden;
      width: 100%;
      height: .1rem;
      background: #f4f4f4;
    }
    .account{
      padding: .3rem;
      .t{
        color: #333;
        font-size: .3rem;
        margin-bottom: .2rem;
        span{
          float: right;
          font-size: .26rem;
        }
      }
      .number{
        display: flex;
        align-items: center;
        position: relative;
        padding-bottom: .3rem;
        img{
          width: .85rem;
          height: .85rem;
          margin-right: .25rem;
        }
        .info{
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;
          .name{
            font-size: .3rem;
            color: #666;
          }
          .mobile{
            color: #999;
            font-size: .24rem;
          }
        }
      }
      .number:before{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
        transform: matrix(.71,.71,-.71,.71,0,0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 2px;
      }
      .number:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        border-bottom: 1px solid #e9e8e8;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
    }
    .inputBox{
      background: #f4f4f4;
      border-radius: .05rem;
      display: flex;
      padding-right: .2rem;
      align-items: center;
      height: .9rem;
      margin: .2rem;
      input{
        flex: 1;
        height: .6rem;
        line-height: .6rem;
        padding-left: .2rem;
        background: #f4f4f4;
        border: none;
        outline: none;
      }
      span{
        font-size: .3rem;
      }
    }
    .explain{
      padding: .3rem;
    }
  }
}
</style>
