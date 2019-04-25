<template>
  <div class="red_packet">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      U券红包
      <p style="position: absolute;right: .3rem;top: 0;color: rgba(153,153,153,1);font-size:.28rem;" @click="jumpTo('/redList')">红包记录</p>
    </x-header>
    <div class="red_content">
      <div class="red_rule">
        <p>可抢<span>1</span>个红包</p>
        <p @click="jumpTo('/redRule')">如何获取红包？</p>
      </div>
      <div class="red_time">
        <div class="time_one">
          <p>2019-1-16 00:00:00</p>
        </div>
      </div>
      <div class="red_person">
        <img src="../../assets/img/logo.png" alt="">
        <div class="red_img" @click="showRed = true">
          <img src="../../assets/img/red/dailingqu.png" alt="">
          <div>
            <p>恭喜发财，大吉大利！</p>
            <span>领取红包</span>
            <p>U券红包</p>
          </div>
        </div>
      </div>
      <div class="red_time">
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>小幸运领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>臣妾做不到领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>*她*领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>小幸运领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>臣妾做不到领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>*她*领取了<span>红包</span></p>
        </div>
      </div>
      <div class="red_time">
        <div class="time_one">
          <p>2019-1-16 00:00:00</p>
        </div>
      </div>
      <div class="red_person">
        <img src="../../assets/img/logo.png" alt="">
        <div class="red_img">
          <img src="../../assets/img/red/yilingqu.png" alt="">
          <div>
            <p>恭喜发财，大吉大利！</p>
            <span>领取红包</span>
            <p>U券红包</p>
          </div>
        </div>
      </div>
      <div class="red_time">
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>小幸运领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>臣妾做不到领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>*她*领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>小幸运领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>臣妾做不到领取了<span>红包</span></p>
        </div>
        <div class="time_one">
          <img src="../../assets/img/red/red.png" alt="">
          <p>*她*领取了<span>红包</span></p>
        </div>
      </div>
    </div>
    <div v-if="showRed" class="red_get">
      <img class="red_open" src="../../assets/img/red/daiopen.png" alt="">
      <div class="red_info" @click="redOpen()">
        <img src="../../assets/img/logo.png" alt="">
        <span>U券</span>
        <p class="red_p_one">恭喜发财，大吉大利！</p>
        <p class="red_p_two">红包仅限U券平台用户</p>
      </div>
      <img class="red_close" @click="showRed = false" src="../../assets/img/red/close.png" alt="">
    </div>
    <div v-if="showPacket" class="red_get">
      <img class="red_open" src="../../assets/img/red/open.png" alt="">
      <div class="open_info">
        <img src="../../assets/mall/img/cart/1/1.jpg" alt="">
        <span>XXXX</span>
        <p class="open_p_one">恭喜发财，大吉大利！</p>
        <p class="open_p_price">￥6.23</p>
        <p class="open_p_two">红包仅限U券平台用户</p>
      </div>
      <img class="red_close" @click="showPacket = false" src="../../assets/img/red/close.png" alt="">
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default {
    name: 'index',
    components:{
      XHeader
    },
    data () {
      return{
        showRed: false,
        showPacket: false
      }
    },
    methods: {
      redOpen () {
        this.showRed = false
        this.showPacket = true
      }
    }
  }
</script>

<style lang="less">
@import "../../assets/mall/style/_Variables";
.red_packet{
  .red_content{
    margin-top: @margin-top;
    .red_rule{
      width: 100%;
      height: .68rem;
      background: @main-red-color;
      padding: 0 .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      p{
        color: #ffffff;
        font-size: @font-nomal;
        span{
          color: #FFFC00;
        }
      }
    }
    .red_time{
      margin: 0.3rem 0 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .time_one{
        background: #DDDDDD;
        border-radius: 0.25rem;
        padding: 0 0.3rem;
        display: flex;
        height: 0.46rem;
        justify-content: center;
        align-items: center;
        margin-top: .2rem;
        img{
          width: .22rem;
          height: .24rem;
          margin-right: .1rem;
        }
        p{
          color: #ffffff;
          font-size: @font-small;
          display: inline-block;
          line-height: .46rem;
          span{
            color: #FD8D57;
          }
        }
      }
    }
    .red_person{
      height: 2.1rem;
      display: flex;
      justify-content: flex-start;
      padding: 0 .3rem;
      img{
        width: .88rem;
        height: .88rem;
        border-radius: 50%;
      }
      .red_img{
        width: 4.7rem;
        height: 2.1rem;
        margin-left: .4rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
        div{
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          p{
            position: absolute;
            color: #ffffff;
          }
          p:first-child{
            font-size: @font-more-big;
            left: 33%;
            top: 14%;
          }
          span{
            position: absolute;
            color: #ffffff;
            font-size: @font-small;
            left: 33%;
            top: 35%;
          }
          p:last-child{
            font-size: @font-nomal;
            bottom: 4%;
            left: 8%;
            color: #999999;
          }
        }
      }
    }
  }
  .red_get{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .red_open{
      width: 5.64rem;
      height: 8.24rem;
      border-radius: .2rem;
      position: absolute;
      top: 2.12rem;
      left: 50%;
      margin-left: -2.82rem;
    }
    .red_info{
      width: 5.64rem;
      height: 8.24rem;
      border-radius: .2rem;
      position: absolute;
      top: 2.12rem;
      left: 50%;
      margin-left: -2.82rem;
      img{
        width: .86rem;
        height: .86rem;
        border-radius: .2rem;
        position: absolute;
        top: .92rem;
        left: 50%;
        margin-left: -.43rem;
      }
      span{
        font-size: .36rem;
        color: #ffffff;
        display: inline-block;
        margin: 2.05rem 0 0 2.51rem;
      }
      .red_p_one{
        font-size: .48rem;
        color: #FFD298;
        margin: .39rem 0 0 .6rem;
       }
      .red_p_two{
        color: #FF9386;
        font-size: @font-more-big;
        position: absolute;
        bottom: 3.54%;
        left: 1.39rem;
      }
    }
    .open_info{
      width: 5.64rem;
      height: 6.2rem;
      position: absolute;
      top: 4.17rem;
      left: 50%;
      margin-left: -2.82rem;
      img{
        width: 0.86rem;
        height: 0.86rem;
        border-radius: .2rem;
        position: absolute;
        top:1.09rem;
        left: 2.39rem;
      }
      span{
        position: absolute;
        top: 2.23rem;
        left: 2.41rem;
        color: #ffffff;
        font-size: @font-more-big;
      }
      .open_p_one{
        color: #FFD298;
        font-size: .48rem;
        position: absolute;
        top: 2.92rem;
        left: .6rem;
      }
      .open_p_price{
        position: absolute;
        top: 4.05rem;
        left: 1.89rem;
        font-size: .5rem;
        color: #ffffff;
      }
      .open_p_two{
        position: absolute;
        bottom: .47rem;
        left: 1.39rem;
        color: #FF9386;
        font-size: @font-more-big;
      }
    }
    .red_close{
      width: .6rem;
      height: .6rem;
      position: absolute;
      top:11.07rem;
      left: 50%;
      margin-left: -.3rem;
    }
  }
}
</style>
