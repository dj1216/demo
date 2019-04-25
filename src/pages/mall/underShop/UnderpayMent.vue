<template>
  <div class="payMent UnderpayMent_main" v-if="isShow">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
       确认支付
      </x-header>
    </div>
    <div class="content">
      <div class="UnderpayMent">
        <table></table>
        <div class="UnderpayMent_box" style="text-align: center;">
          <div>需支付</div>
          <div class="price" v-if="couponTypes != 1 && couponTypes != 2">
            <span>¥</span>
            {{order.payPrice}}
          </div>
          <div class="price" v-if="couponTypes == 1">
            <span>¥</span>
            {{parseFloat(order.payPrice-parseFloat(this.price).toFixed(2)*parseInt(this.count1)).toFixed(2)}}
          </div>
          <div class="price" v-if="couponTypes == 2">
            <span>¥</span>
            {{parseFloat(order.payPrice*(this.price/100)).toFixed(2)}}
          </div>
        </div>
      </div>
      <div class="discount-list" v-if="showYouhui">
        <div class="list-yhj" v-for="(items,i) in arr" :key="i" v-if="items.list">
          <div class="discount-item" @click="handleSelect(i,items.title)">
            <div>
              <img :src="selectDis == i && items.check ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
              <p>{{items.title}}</p>
            </div>
            <div>
              <img src="../../../assets/mall/img/under/desc.png" alt="" @click.stop="handleDesc(i)">
              <input type="text" v-model="count[i]">
              <img src="../../../assets/mall/img/under/add.png" alt="" @click.stop="handleAdd(i)">
              <i class="iconfont icon-unfold" style="margin-left: .2rem;"></i>
            </div>
          </div>
          <div class="hy-note" v-show="items.check">
            <div v-for="(item,j) in items.list" :key="j" @click="checkYhj(i, item.couponId, item.nums, item.price, items.title)">
              <div class="note-itm" :style="{'background': selectId == item.couponId && showToast ? '#FAD1D6' : '#ffedf0'}">
                <div>
                  <p>{{item.title}}</p>
                  <span>{{items.title}}</span>
                </div>
                <div>
                  <p>{{item.descs}}</p>
                  <span>x{{item.nums}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="payMent_list">
        <div class="list_title">
          选择支付方式
        </div>
        <div class="list" v-for="(item,index) in payType" @click="handChange(index)" v-if="item.status">
          <div class="img_box">
            <img v-if="index == 'alipay'" src="../../../assets/mall/img/home/apliy.png" alt="">
            <img v-if="index == 'wechat'" src="../../../assets/mall/img/home/wheat.png" alt="">
            <img v-if="index == 'card'" src="../../../assets/mall/img/home/card.png" alt="">
            <img v-if="index == 'credit'" src="../../../assets/mall/img/home/yue.png" alt="">
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
import Vue from 'vue'
export default {
  name: "payMent",
  data(){
    return {
      active: '',
      order: {},
      payType: {},
      otoInfo: {},
      selectDis: null,
      count: [1, 1],
      count1: 1,
      nums: null,
      selectId: null,
      couponTypes: null,
      couponId: null,
      price: 0,
      arr: [],
      isShow: false,
      showToast: false,
      showYouhui: true
    }
  },
  mounted () {
    apiHttp.paymentDisplay(this.$route.query.spidInfo).then(response => {
      if (response.code === 0) {
        this.isShow = true
        this.order = response.data.order
        this.payType = response.data.payType
        this.otoInfo = response.data.userInfo.otoInfo
        let list = response.data.userInfo.otoInfo.coupon
        let arr = []
        for (let i in list){
          arr.push(list[i])
        }
        for (let i = 0; i < arr.length; i++) {
          arr[i].check = false
        }
        this.arr = arr
      }
    })
  },
  methods :{
    // 支付方式的选择
    handChange (key) {
      this.active = key
      console.log(key)
      if (this.otoInfo.cardInfo.isMerge == 0) {
        if (key == 'card') {
          this.showYouhui = false
        } else {
          this.showYouhui = true
        }
      } else {
        this.showYouhui = true
      }
    },
    // 优惠券的选择
    handleSelect (i,val) {
      console.log(this.couponTypes)
      this.showToast = false
      this.count = [1, 1]
      this.selectDis = i
      this.price = 0
      // this.arr[i].check = !this.arr[i].check
      Vue.set(this.arr, i, this.arr[i])
      if (val == '满减券') {
        this.couponTypes = 1
        this.count1 = this.count[0]
      } else if (val == '折扣券') {
        this.couponTypes = 2
        this.count1 = this.count[1]
      }
      for (let j = 0; j < this.arr.length; j++){
        if(j == i){
          this.arr[i].check = !this.arr[i].check
        } else {
          this.arr[j].check = false
          this.couponTypes = null
        }
      }
    },
    // 优惠券的选择--下级
    checkYhj (i, id, nums, price, title) {
      if (this.selectDis === i) {
        this.count = [1, 1]
        this.selectId = id
        this.couponId = id
        this.nums = nums
        this.price = price
        if (parseInt(this.price) <= parseInt(this.order.payPrice)) {
          this.showToast = true
          if (title == '满减券') {
            this.couponTypes = 1
            this.count1 = this.count[0]
          } else if (title == '折扣券') {
            this.couponTypes = 2
            this.count1 = this.count[1]
          }
        } else {
          this.showToast = false
        }
      }
    },
    // 优惠券 --减
    handleDesc (i) {
      if (this.count[i] > 0) {
        this.count[i]--
        this.count1 = this.count[i]
      }
    },
    // 优惠券 --加
    handleAdd (i) {
      if(i == 0){
        if (this.count[0] < this.nums) {
          this.count[0]++
          console.log(this.count[0])
          this.count1 = this.count[0]
        }
      }
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
                if (that.$route.query.spid) {
                  that.$router.push({
                    name: 'mallUnderdetail',
                    query: {
                      spid: that.$route.query.spid
                    }
                  })
                } else if (that.$route.query.goodsId) {
                  that.$router.push({
                    name: 'mallUnderGoodsDetails',
                    query: {
                      goodsId: that.$route.query.goodsId
                    }
                  })
                }
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
              if (that.$route.query.spid) {
                that.$router.push({
                  name: 'mallUnderdetail',
                  query: {
                    spid: that.$route.query.spid
                  }
                })
              } else if (that.$route.query.goodsId) {
                that.$router.push({
                  name: 'mallUnderGoodsDetails',
                  query: {
                    goodsId: that.$route.query.goodsId
                  }
                })
              }
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
      if (!this.active) {
        this.$vux.toast.text('请选择支付方式')
      }
      if(this.couponTypes == 1){
        this.count1 = this.count[0]
      } else if (this.couponTypes == 2){
        this.count1 = 1
      }
      if (this.active === 'card') {
        apiHttp.underPaymentPayType(this.$route.query.spidInfo, this.couponTypes, this.couponId, this.count1, this.active).then(response => {
          if (response.code === 0) {
            // axios.post(response.data.notify)
            this.$vux.toast.text(response.msg)
            setTimeout(() => {
              if (this.$route.query.spid) {
                this.$router.push({
                  name: 'mallUnderdetail',
                  query: {
                    spid: this.$route.query.spid
                  }
                })
              } else if (this.$route.query.goodsId) {
                this.$router.push({
                  name: 'mallUnderGoodsDetails',
                  query: {
                    goodsId: this.$route.query.goodsId
                  }
                })
              }
            }, 1000)
          }
        })
      } else if (this.active === 'credit') {
        apiHttp.underPaymentPayType(this.$route.query.spidInfo, this.couponTypes, this.couponId, this.count1, this.active).then(response => {
          if (response.code === 0) {
            // axios.post(response.data.notify)
            this.$vux.toast.text(response.msg)
            setTimeout(() => {
              if (this.$route.query.spid) {
                this.$router.push({
                  name: 'mallUnderdetail',
                  query: {
                    spid: this.$route.query.spid
                  }
                })
              } else if (this.$route.query.goodsId) {
                this.$router.push({
                  name: 'mallUnderGoodsDetails',
                  query: {
                    goodsId: this.$route.query.goodsId
                  }
                })
              }
            }, 1000)
          }
        })
      } else if (this.active === 'alipay') {
        apiHttp.underPaymentPayType(this.$route.query.spidInfo, this.couponTypes, this.couponId, this.count1, this.active).then(response => {
          if (response.code === 0) {
            this.plusReady(1, response.data.payOrder)
          }
        })
      } else {
        apiHttp.underPaymentPayType(this.$route.query.spidInfo, this.couponTypes, this.couponId, this.count1, this.active).then(response => {
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
  .list-yhj{
    border-bottom: 1px solid @border-color;
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
    .hy-note{
      background: #ffedf0;
      border-radius: .1rem;
      margin-bottom: .1rem;
      .note-itm{
        padding: 0 .3rem;
        border-bottom: 1px solid #ffffff;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 1.2rem;
        div{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        div:first-child{
          p{
            color: #ff8226;
            font-size: @font-big;
          }
          span{
            color: @font-main-color;
          }
        }
        div:last-child{
          p{
            color: #666666;
            font-size: @font-small;
          }
          span{
            color: @font-main-color;
          }
        }
      }
    }
  }
}
</style>
