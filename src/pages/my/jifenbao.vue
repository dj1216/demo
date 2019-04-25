<template>
  <div class="withdraw">
    <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"   class="backBox">
      <i class="iconfont icon-back"></i></a>
      {{signInfo}}提现
      <span class="save" slot="right" @click="jumpTo('/JifenbaoList')">明细</span>
    </x-header>
    <div class="box" v-if="isShow">
      <div class="head">
        <p>账户{{signInfo}} <span>(个)</span></p>
        <p class="money">{{parseInt(user.credit4) || '0'}}</p>
      </div>
      <div class="high"></div>
      <div class="info">
        <div>
          <span>可提现{{signInfo}}（个）</span>
          <span :style="{color: $store.state.global.theme.mainColor}" >{{parseInt(user.credit4) || '0'}}</span>
        </div>
        <div>
          <span>提现中{{signInfo}}（个）</span>
          <span :style="{color: $store.state.global.theme.mainColor}" >{{data.creditIng || '0'}}</span>
        </div>
      </div>
      <div class="high"></div>
      <div class="account" v-if="data">
        <p class="t">提现到</p>
        <div class="number" @click="add">
          <img src="../../assets/img/my/zfb.png" alt="" @click.stop="change" v-if="way === 'alipay'">
          <img src="../../assets/img/my/weixin.png" alt="" @click.stop="change" v-else>
          <div class="info" >
            <p class="name" v-if="data.alipay === '1' && way === 'alipay'">支付宝</p>
            <p class="name" v-else-if="data.wxpay === '1'">微信</p>
            <p class="mobile" v-if="way === 'alipay' && user.withdraw_to">{{user.withdraw_to}}</p>
            <p class="mobile" v-else-if="way === 'alipay'">还没有支付宝账号，去添加</p>
          </div>
        </div>
      </div>
      <div class="inputBox">
        <input type="number" :placeholder="'请输入提取' + signInfo" v-model="money">
        <span @click="money = parseInt(user.credit4)" :style="{color: $store.state.global.theme.mainColor}" >全部</span>
      </div>
      <div class="hint">
        <span>*{{data.attorn}}{{signInfo}} = 1元，最小提现金额为{{data.min}}个{{signInfo}},手续费为{{data.percent}}%,提现必须是{{data.zheng}}的倍数</span>
      </div>
      <div class="primary_btn" :style="{background: $store.state.global.theme.mainColor}" @click="widthdraw">提现</div>
      <div class="explain" v-html="data.info" v-if="data.info != 0"></div>
    </div>
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="ways"></actionsheet>
  </div>
</template>

<script>
import {Group, XInput, XHeader, Actionsheet} from 'vux'
import * as utils from '../../utils'
export default {
  name: 'withdraw',
  components: {
    Group, XInput, XHeader, Actionsheet
  },
  data () {
    return {
      show: false,
      type: this.$route.query.type,
      menus: {},
      money: '',
      frozen: '',
      data: '',
      // info: this.$store.state.user.userInfo,
      way: 'alipay',
      isShow: false,
      user: {},
      signInfo: utils.storage.get('signInfo')
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
        if (this.user.withdraw_to) {
          this.$router.push('/add?title=修改账号')
        } else {
          this.$router.push('/add?title=添加账号')
        }
      } else if (this.user.wechat_openid) {
        this.$vux.toast.text('已经绑定过微信')
      } else {
        this.$router.push('/binding')
      }
    },
    // 提现
    widthdraw () {
      if (!this.user.withdraw_to) {
        this.$vux.toast.text('请先绑定账户')
        return
      }
      if (Number(this.money) < Number(this.data.min)) {
        this.$vux.toast.text('最小提现金额为' + this.data.min)
        return
      }
      if (Number(this.money) > Number(this.user.credit4)) {
        this.$vux.toast.text('账户金额不足')
        return
      }
      this.$http.post('/amoy/task/withdraw', {
        type: 'save',
        credit: this.money,
        withdrawType: this.way
      }, true).then(res => {
        this.$vux.toast.text(res.msg)
        this.data.creditIng = (Number(this.money) + Number((this.data.creditIng || 0))).toFixed(2)
        this.user.credit4 = (this.user.credit4 - this.money).toFixed(2)
        this.user.credit4 = this.user.credit4
        this.$store.commit('setUserInfo', this.user)
        this.money = ''
      })
    },
    getInfo () {
      this.$http.post('/amoy/task/withdraw', {}, true).then(res => {
        this.isShow = true
        this.data = res.data
        this.user = res.data.user
        if (this.data.alipay === '1') {
          this.way = 'alipay'
        } else if (this.data.wxpay === '1') {
          this.way = 'wxpay'
        }
        if (this.data.alipay === 1) {
          this.menus.menu1 = '支付宝'
        }
        if (this.data.wxpay === 1) {
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
