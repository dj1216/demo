<template>
    <div class="liveBroadcast">
      <div class="list">
        <div class="imgs">
          <img src="../../assets/img/home/tmshop.png" alt="" class="logo">
          <div class="thumbBox">
            <div class="triangle"></div>
            <img src="../../assets/img/home/liveBg.png" alt="" class="thumb">
          </div>
        </div>
        <div class="desc">
          <img src="../../assets/img/home/tmshop.png" alt="" class="logo">
          <div class="thumbBox">
            <div class="triangle"></div>
            <div class="info">
              <p class="title">初秋新款的粉色蕾丝衫初秋新款的粉色衬衫蕾丝衫</p>
              <p class="descrition">初秋新款的粉色蕾丝衫初秋新款的粉色衬衫蕾丝衫</p>
              <div class="coupon">20元券</div>
              <div class="price">
                <p :style="{color: $store.state.global.theme.mainColor}" >券后价：¥<span>100.00</span></p>
                <p>原价：￥89.00</p>
              </div>
              <div class="profit" :style="{color: $store.state.global.theme.mainColor, background: $store.state.global.theme.thirdColor}" >预估收益：￥2.32</div>
              <p class="time">发布时间：2019-01-07  18:41:47</p>
              <div class="detail" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">查看宝贝详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'liveBroadcast',
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.liveBroadcast{
  height: 100%;
  width: 100%;
  background: url("../../assets/img/home/liveBg.png") no-repeat;
  background-size: 100% 100%;
  .list{
    .imgs{
      padding: 0.2rem;
      overflow: hidden;
      .logo{
        width: .64rem;
        height: .64rem;
        border-radius: .1rem;
        float: left;
        margin-right: .3rem;
      }
      .thumbBox{
        float: left;
        width: 4.16rem;
        height: 4.16rem;
        padding: .1rem;
        box-sizing: border-box;
        position: relative;
        background: #fff;
        border-radius: .1rem;
        .triangle{
          position: absolute;
          left: -0.2rem;
          top: 0.2rem;
          width: 0;
          height: 0;
          border-top: .14rem solid transparent;
          border-right: .2rem solid #fff;
          border-bottom: .14rem solid transparent;
        }
        .thumb{
          width: 3.95rem;
          height: 3.96rem;
        }
      }
    }
    .desc{
      padding: 0.2rem;
      overflow: hidden;
      .logo{
        width: .64rem;
        height: .64rem;
        border-radius: .1rem;
        float: left;
        margin-right: .3rem;
      }
      .thumbBox{
        position: relative;
        float: left;
        width: 5.6rem;
        height: 6rem;
        padding: .1rem;
        box-sizing: border-box;
        background: #fff;
        border-radius: .1rem;
        .triangle{
          position: absolute;
          left: -0.2rem;
          top: 0.2rem;
          width: 0;
          height: 0;
          border-top: .14rem solid transparent;
          border-right: .2rem solid #fff;
          border-bottom: .14rem solid transparent;
        }
        .info{
          padding: .1rem;
          box-sizing: border-box;
          width: 5.39rem;
          height: 5.8rem;
          .title{
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: .3rem;
            line-height: .44rem;
            font-weight: bold;
          }
          .descrition{
            padding-top: .1rem;
            font-size: .26rem;
            color: #999;
          }
          .coupon{
            margin: .2rem 0;
            float: left;
            width: .97rem;
            height: .38rem;
            display: inline-block;
            font-size: .22rem;
            color: #fff;
            background: url('../../assets/img/back_juan.png') no-repeat;
            background-size: .97rem .38rem;
            text-align: center;
            font-weight: 500;
          }
          .price{
            clear: both;
            display: flex;
            align-items: center;
            p:nth-of-type(1){
              margin-right: .3rem;
              font-size: .22rem;
              float: left;
              span{
                font-size: .38rem;
              }
            }
            p:nth-of-type(2){
              color: #999;
              font-size: .25rem;
            }
          }
          .profit{
            margin: .2rem 0;
            font-size: .24rem;
            padding: 0.1rem .2rem;
            display: inline-block;
          }
          .time{
            font-size: .24rem;
            color: #999;
          }
          .detail{
            color: #fff;
            width: 5.6rem;
            line-height: .86rem;
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 0;
            border-bottom-left-radius: .1rem;
            border-bottom-right-radius: .1rem;
          }
        }
      }
    }
  }
}
</style>
