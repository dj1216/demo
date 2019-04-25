<template>
  <div id="giftsPack_box">
    <div class="header">
      <i class="iconfont icon-back side" @click="back"></i>
      <span class="middle">礼包专区</span>
      <span class="side">我的订单</span>
    </div>
    <div class="banner">
      <swiper>
        <swiper-item><img src="../../assets/img/source/banner.png" alt=""></swiper-item>
        <swiper-item><img src="../../assets/img/source/banner.png" alt=""></swiper-item>
        <swiper-item><img src="../../assets/img/source/banner.png" alt=""></swiper-item>
        <!--<swiper-item><img src="../../assets/img/source/banner.png" alt=""></swiper-item>-->
        <!--<swiper-item><img src="../../assets/img/source/banner.png" alt=""></swiper-item>-->
      </swiper>
    </div>
    <div class="intreduce">
      <div class="desc">
        商品描述
      </div>
      <p class="text">
        严格挑选生长五年 的高山楠竹，选材用心，板材加厚加粗设计， 挂衣不用愁，底部加入万向轮设计，移动方便收纳快捷，树杈收 纳设计美观大方，收纳方式更加多样化，多款可选拆装简单方便,打破传统收纳方式，一切问题轻松解决
      </p>
    </div>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from "vux"
  // import MescrollVue from 'mescroll.js/mescroll.vue';
  export default {
    name: 'giftsPack',
    data () {
      return {}
    },
    components: {
      // MescrollVue
      Swiper,
      SwiperItem
    },
    methods: {
      back (){
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="less" scoped>
  #giftsPack_box {
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0 .2rem;
      margin-top: .4rem;
      font-size: .3rem;
      height: .88rem;
      line-height: .88rem;
      .side {
        color: #666;
      }
      .middle {
        padding-left: .6rem;
      }
    }
    .banner {
      /*height: 4.8rem;*/
      .vux-indicator.vux-indicator-right {
        right: 50% !important;
        margin-right: -50% !important;
      }
    }
    .intreduce {
      padding-top: .47rem;
      background-color: #fff;
      .desc {
        display: inline-block;
        font-size: .28rem;
        line-height: .28rem;
        padding: .11rem .23rem .11rem .17rem;
        height: .5rem;
        border-radius: 0 .25rem .25rem 0;
        background-color: red;
        box-sizing: border-box;
      }
      .text {
        padding: .33rem .42rem .57rem .37rem;
        font-size: .24rem;
      }
    }
  }
</style>
