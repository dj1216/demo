<template>
  <div class="drawYhj">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        领取优惠券
      </x-header>
      <!--<div class="tab">-->
        <!--<div class="tab_box">-->
          <!--<button-tab v-model="demo01">-->
            <!--<button-tab-item @on-item-click="consoleIndex()">满减卷</button-tab-item>-->
            <!--<button-tab-item @on-item-click="consoleIndex()">折扣卷</button-tab-item>-->
          <!--</button-tab>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="draw-body">
      <div class="drow-list" v-for="(item,i) in couponList" :key="i">
        <div class="drow-item">
          <img src="../../../assets/mall/img/under/lingYhj.png" alt="">
          <div class="YhjList-item">
            <div>
              <p>{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;店铺优惠券</p>
              <p>{{item.descs}}</p>
              <p v-if="parseInt(item.starttime) > 0 && parseInt(item.endtime) > 0">有效期：{{parseInt(item.starttime) | formatDate}}-{{parseInt(item.endtime) | formatDate}}</p>
            </div>
            <div @click="getDrowList(item.id)">
              <span>立即领取</span>
              <img v-if="item.userReceive == 1" src="../../../assets/mall/img/under/yilingqu.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ButtonTab, ButtonTabItem } from 'vux'
  import * as apiHttp from '../../../api/index'
  import {formatDate} from '../../../plugin/data'
  export default {
    name: 'drawYhj.vue',
    components: {
      ButtonTab,
      ButtonTabItem,
      formatDate
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy.MM.dd')
      }
    },
    data () {
      return {
        demo01: 0,
        drawList: [],
        shopInfo: {},
        couponList: {}
      }
    },
    mounted () {
     this.getInfo()
    },
    methods: {
      getInfo () {
        apiHttp.underShopInfo(this.$route.query.spid).then(res => {
          if (res.code === 0) {
            this.shopInfo = res.data.shopInfo
            this.couponList = res.data.couponList
          }
        })
      },
      consoleIndex () {
        console.log('click demo01', this.demo01)
      },
      getDrowList (id) {
        apiHttp.underDrawYhj(this.$route.query.spid, id).then(res => {
          if (res.code === 0){
            this.$vux.toast.text(res.msg)
            this.getInfo()
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.drawYhj{
  .header{
    .tab{
      position:absolute;
      top:0.9rem;
      height:1.1rem;
      width:100%;
      display: flex;
      align-items: center;
      background:#fff;
      .tab_box{
        margin:0 auto;
        width:4.88rem;
        height:0.62rem;
      }
    }
  }
  .draw-body{
    margin-top: @margin-top;
    .drow-list{
      height: 2.16rem;
      background: #ffffff;
      margin-bottom: .2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 .3rem;
      .drow-item{
        position: relative;
        .YhjList-item{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div:first-child{
            width: 70%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding-left: .3rem;
            box-sizing: border-box;

            p:first-child{
              color: @main-red-color;
              font-size: @font-big;
              span{
                font-size: @font-more-big;
                font-weight: 600;
              }
            }
            p:nth-child(2){
              color: @main-red-color;
              font-size:@font-nomal;
            }
            p:nth-child(3){
              color: @font-light-color;
              font-size: @font-small;
            }
          }
          div:last-child{
            width: 30%;
            span{
              width: 100%;
              text-align: center;
              display: inline-block;
              color: @main-red-color;
              font-size: @font-nomal;
            }
            img{
              width: .7rem;
              position: absolute;
              bottom: 5%;
              right: 1px;
            }
          }
        }
      }
    }
  }
}
</style>
