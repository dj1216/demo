<template>
  <div class="shop-qrcode" v-if="isShow">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的二维码
      <i @click="handleShow()" style="position: absolute;right: .3rem;font-size: .3rem;" class="iconfont icon-dingdan3"></i>
    </x-header>
    <div class="sq-body">
      <div class="sq-content">
        <div class="sq-one">
          <img src="../../../assets/mall/img/under/erweima.png" alt="">
          <div>
            <img :src="shopInfo.logo || './static/img/under/111.png'" alt="" v-if="shopInfo.logo">
            <p v-if="shopInfo.title">{{shopInfo.title}}</p>
          </div>
        </div>
        <div class="sq-two">
          <img :src="info.qrcode" alt="">
        </div>
      </div>
    </div>
    <div class="sq-price" v-if="showRules">
      <div>
        <p>设置金额</p>
        <input type="text" placeholder="请设置金额！" v-model="price">
        <span @click="handleConfirm()">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  export default {
    name: 'shopQrcode.vue',
    data () {
      return {
        info: {},
        shopInfo: {},
        isShow: false,
        showRules: false,
        price: null
      }
    },
    mounted () {
      this.getInfo()
    },
    methods: {
      getInfo (price) {
        apiHttp.underQrcode(price).then(res => {
          if (res.code === 0) {
            this.isShow = true
            this.info = res.data
            this.shopInfo = res.data.shopInfo
          }
        })
      },
      handleShow () {
        this.showRules = true
        this.price = null
      },
      handleConfirm () {
        this.showRules = false
        if (this.price) {
          this.getInfo(this.price)
        } else {
          this.getInfo()
        }

      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.shop-qrcode{
  .sq-body{
    margin-top: @margin-top;
    .sq-content{
      width: 90%;
      margin: 2rem 5% 0;
      background: #ffffff;
      border-radius: .2rem;
      .sq-one{
        width: 100%;
        height: 1.75rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        div{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-left: .3rem;
          }
          p{
            color: #ffffff;
            font-size: @font-big;
            margin-left: .2rem;
          }
        }
      }
      .sq-two{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5.25rem;
        img{
          width: 3.6rem;
          height: 3.6rem;
        }
      }
    }
  }
  .sq-price{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background:rgba(0,0,0,0.7);
    div{
      width: 80%;
      height: 3.7rem;
      background: #ffffff;
      border-radius: 0.1rem;
      margin: 5rem auto 0;
      p{
        font-size: 0.4rem;
        text-align: center;
        margin-bottom: .3rem;
        padding-top: .2rem;
      }
      input{
        outline: none;
        border: 1px solid @border-color;
        width: 94%;
        height: .8rem;
        text-align: left;
        margin-left: 3%;
        font-size: @font-big;
        padding-left: .5rem;
        box-sizing: border-box;
      }
      span{
        background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);
        border-radius: 20px;
        text-align: center;
        display: inline-block;
        width: 86%;
        height: .8rem;
        margin: .5rem 7% 0;
        line-height: .8rem;
        color: #fff;
        font-size: @font-more-big;
      }
    }
  }
}
</style>
