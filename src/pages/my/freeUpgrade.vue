<template>
    <div class="freeUpgrade" ref="freeUpgrade" v-if="data" :style="{overflowY: dialog ? 'hidden' : 'auto'}">
      <div class="upgradeBox" ref="upgradeBox">
        <div class="head">
          <img :src="data.userInfo.avatar" alt="" class="avater" v-if="data.userInfo && data.userInfo.avatar">
          <img src="../../assets/img/my/avater.png" alt="" class="avater" v-else>
          <p class="name">{{data.userInfo.nickname}}</p>
          <p class="level">{{data.userInfo.lv}}</p>
          <div class="powerBox" v-if="data && data.rights.length > 0">
            <div class="power">
              <p class="title">升级运营商权益</p>
              <div class="powerList">
                <div class="list" v-for="(item, index) of data.rights" :key="item.id" v-if="index < 6">
                  <img v-lazy="item.thumb" alt="" :key="item.thumb">
                  <p class="t">{{item.title}}</p>
                  <p class="info">{{item.remark}}</p>
                </div>
              </div>
              <div class="update" @click="update">升级运营商</div>
            </div>
          </div>
        </div>
        <div class="status">
          <p class="select" v-if="data && data.choiceRights.length > 0">运营商精选权益</p>
          <div class="successNav" v-if="data && data.choiceRights.length > 0">
            <swiper :options="swiperOption" class="swiper">
              <swiper-slide v-for="(item, index) in data.choiceRights" :key="index" :class="{active:index === 0, shadow:true}">
                <img :src="item.thumb" alt="" >
                <p class="title">{{item.title}}</p>
                <p class="info">{{item.remark}}</p>
              </swiper-slide>
            </swiper>
          </div>
          <div class="select">如何升级为运营商</div>
          <div v-if="data.is_show.is_user === '1'">
            <p class="ways" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">邀请好友</p>
            <div class="progressBox">
              <x-progress :percent="(data.requires.direct.num / data.requires.direct.require_num) * 100 > 100 ? 100 : (data.requires.direct.num / data.requires.direct.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.direct">{{data.requires.direct.require_num}}人</p>
            </div>
            <p class="present">当前有效直属会员：{{data.requires.direct.num}}人</p>
            <div class="progressBox progressBox1">
              <x-progress :percent="(data.requires.non_direct.num / data.requires.non_direct.require_num) * 100 > 100 ? 100 : (data.requires.non_direct.num / data.requires.non_direct.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.non_direct">{{data.requires.non_direct.require_num}}人</p>
            </div>
            <p class="present">当前有效非直属会员：{{data.requires.non_direct.num}}人</p>
            <div class="progressBox progressBox1" v-if="data.requires.person_price && data.requires.person_price.require_price > 0">
              <x-progress :percent="(data.requires.person_price.price / data.requires.person_price.require_price) * 100 > 100 ? 100 : (data.requires.person_price.price / data.requires.person_price.require_price) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.requires.person_price">{{data.requires.person_price.require_price}}元</p>
            </div>
            <p class="present" v-if="data.requires.person_price && data.requires.person_price.require_price">当前个人预估收益：{{data.requires.person_price.price}}元</p>
            <p class="notice">{{data.requires.note}}</p>
            <div class="invite" @click="jumpTo('invite')">邀请好友加入我的团队</div>
          </div>
          <div v-if="data.is_show.is_team === '1'">
            <p class="ways" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">订单收益</p>
            <div class="progressBox">
              <x-progress :percent="(data.teamInfo.orderNum.num / data.teamInfo.orderNum.require_num) * 100 > 100 ? 100 : (data.teamInfo.orderNum.num / data.teamInfo.orderNum.require_num) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.teamInfo.orderNum">{{data.teamInfo.orderNum.require_num}}单</p>
            </div>
            <p class="present">团队总订单数量：{{data.teamInfo.orderNum.num}}单</p>
            <div class="progressBox progressBox1">
              <x-progress :percent="(data.teamInfo.creditPrice.price / data.teamInfo.creditPrice.require_price) * 100 > 100 ? 100 : (data.teamInfo.creditPrice.price / data.teamInfo.creditPrice.require_price) * 100" :show-cancel="false"></x-progress>
              <p v-if="data.teamInfo.creditPrice">{{data.teamInfo.creditPrice.require_price}}元</p>
            </div>
            <p class="present">个人累计收益：{{data.teamInfo.creditPrice.price}}元</p>
            <p class="notice">{{data.teamInfo.note}}</p>
            <div class="invite" @click="jumpTo('home')">去下单</div>
          </div>
          <div  v-if="data.is_show.is_buy === '1'">
            <p class="ways">付费升级</p>
            <div class="way" v-if="data.buyInfo.year_price !== '0'" @click="selectpay('year')" :style="{background: $store.state.global.theme.thirdColor}"><p>年付<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.year_price}}</span>元</p><span class="selectBox" :class="{selected: payWays === 'year'}"></span></div>
            <div class="way" v-if="data.buyInfo.month_price !== '0'" @click="selectpay('month')" :style="{background: $store.state.global.theme.thirdColor}"><p>月付<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.month_price}}</span>元</p><span class="selectBox"  :class="{selected: payWays === 'month'}"></span></div>
            <div class="way" v-if="data.buyInfo.forever !== '0' && $bizId === 6"  @click="selectpay('forever')" :style="{background: $store.state.global.theme.thirdColor}"><p>铂金<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.forever}}</span>元</p><span class="selectBox"  :class="{selected: payWays === 'forever'}"></span></div>
            <div class="way" v-else-if="data.buyInfo.forever !== '0'"  @click="selectpay('forever')" :style="{background: $store.state.global.theme.thirdColor}"><p>永久<span :style="{color: $store.state.global.theme.mainColor}" >{{data.buyInfo.forever}}</span>元</p><span class="selectBox"  :class="{selected: payWays === 'forever'}"></span></div>
            <div class="invite" @click="toPay">去付费</div>
          </div>
          <p class="notice" style="text-align: center" v-if="data.model === '1'">满足以上任意条件即可自动升级</p>
          <p class="notice" style="text-align: center" v-else>以上条件全部满足即可自动升级</p>
        </div>
        <div class="persons" v-if="data && data.managerList.length > 0">
          <p class="title">我们的运营商</p>
          <div class="personSwiper">
            <swiper :options="swiperOption1" class="swiper" ref="mySwiper">
              <swiper-slide v-for="(item, index) in data.managerList" :key="index" :class="{active:index === 0, shadow:true}">
                <img :src="item.avatar" alt="" v-if="item.avatar">
                <img src="../../assets/img/my/avater.png" alt="" v-else>
              </swiper-slide>
            </swiper>
          </div>
          <div class="name" v-if="income">{{income.nickname}}</div>
          <div class="level" v-if="income">{{income.lv}}</div>
          <div class="moneyBox" v-if="income">
            <p class="money">{{income.last_month_income}}元</p>
            <p class="time">上月收入</p>
            <p class="info">*以上信息均为获得用户同意公开</p>
            <div class="triangle"></div>
          </div>
        </div>
      </div>
      <div class="waysBox" v-if="dialog">
        <div class="dialog" @click="dialog = false"></div>
        <div class="way">
          <p class="t">选择支付方式</p>
          <p class="ways" @click="getWay('wxpay')"><img src="../../assets/img/my/wx.png" alt="">微信支付</p>
          <p @click="getWay('alipay')"><img src="../../assets/img/my/zfb.png" alt="">支付宝支付</p>
          <i class="iconfont icon-close" @click="dialog = false"></i>
        </div>
      </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { XProgress } from 'vux'
export default {
  name: 'freeUpgrade',
  components: {
    swiper, swiperSlide, XProgress
  },
  data () {
    return {
      payWays: '',
      dialog: false,
      data: '',
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        slidesPerView: 3,
        spaceBetween: 10,
        // autoplay: {
        //   delay: 3000,//自动播放速度
        //   disableOnInteraction: false//鼠标移上去时是否还继续播放
        // },
        coverflowEffect: {
          // rotate: 50,
          // stretch: 0,
          // depth: 500,
          // modifier: 1,
          // slideShadows : true
          rotate: 2,
          stretch: -15,
          depth: 50,
          modifier: 3,
          slideShadows: false
        }
      },
      swiperOption1: {
        effect: 'coverflow',
        grabCursor: true,
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: false,
        loopedSlides: 3,
        slidesPerView: 3,
        initialSlide: 0,
        coverflowEffect: {
          // rotate: 50,
          // stretch: 0,
          // depth: 500,
          // modifier: 1,
          // slideShadows : true
          rotate: 2,
          stretch: 5,
          depth: 50,
          modifier: 3,
          slideShadows: false
        },
        on: {
          transitionEnd: () => {
            if (this.$refs.mySwiper.swiper) {
              this.income = this.data ? this.data.managerList[this.$refs.mySwiper.swiper.activeIndex] : ''
            }
          }
        }
      },
      income: ''
    }
  },
  // watch: {
  //   data () {
  //     this.income = this.data ? this.data.managerList[imgIndex] : ''
  //   }
  // },
  methods: {
    getWay (type) {
      this.$http.post('/amoy/user/upgrade-agent', {
        upgrade_type: 2,
        term: this.payWays,
        type: type,
        id: this.data.buyInfo.id
      }, true).then(res => {
        this.dialog = false
        if (res.code === 0) {
          if (type === 'alipay') {
            this.plusReady(1, res.data.payOrder)
          } else {
            this.plusReady(0, res.data.payOrder)
          }
        }
      })
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
          switch (ret.code) {
            case '9000':
              that.$vux.toast.text('支付成功')
              setTimeout(() => {
                that.$router.go(-1)
              }, 2000)
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
      } else {
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
    toPay () {
      if (this.payWays === '') {
        this.$vux.toast.text('请选择付费方式')
      } else {
        this.dialog = true
      }
    },
    selectpay (way) {
      this.payWays = way
    },
    update () {
      this.$refs.freeUpgrade.scrollTop = this.$refs.upgradeBox.offsetHeight - this.$refs.freeUpgrade.offsetHeight
      this.$vux.toast.text('对不起，您不满足当前升级要求！')
    },
    getInfo () {
      this.$http.post('/amoy/user/manager', {}, true).then(res => {
        this.data = res.data
        this.swiperOption1.initialSlide = Math.ceil(res.data.managerList.length / 2) - 1
        this.income = this.data.managerList ? this.data.managerList[this.swiperOption1.initialSlide] : ''
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>
<style lang="less">
 .successNav{
   .swiper-wrapper{
     .title{
       font-size: .28rem;
       text-align: center;
     }
     .info{
       text-align: center;
       color: #f6c585;
       font-size: .24rem;
     }
   }
 }
  .personSwiper{
    width: 3rem;
    margin: 0 auto;
    .swiper-slide{
      width: 1rem !important;
      height: 1rem;
      border-radius: .5rem;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .freeUpgrade{
    .progressBox{
      .weui-progress__bar{
        height: .2rem;
        border-radius: .1rem;
        .weui-progress__inner-bar{
          border-radius: .1rem;
        }
      }
    }
    .progressBox1{
      .weui-progress__bar{
        .weui-progress__inner-bar{
          background: #a256ff;
        }
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.freeUpgrade{
  position: relative;
  background: #f7f7f7;
  height: 100%;
  overflow-y: auto;
  .head{
    background: #fff;
    text-align: center;
    .avater{
      border-radius: 50%;
      margin: .2rem 0;
      width: 1.2rem;
      height: 1.2rem;
    }
    .name{
      font-size: .28rem;
    }
    .level{
      font-size: .34rem;
      color: #e0a539;
      padding-bottom: .4rem;
    }
    .powerBox{
      position: relative;
      width: 7.5rem;
      height: 7.7rem;
      background: url("../../assets/img/powerBg.png") no-repeat;
      background-size: 100% 100%;
      .power{
        width: 7rem;
        margin: 0 auto;
        .title{
          font-size: .44rem;
          color: #523b1c;
          padding: .3rem 0 0;
          font-weight: bold;
        }
        .powerList{
          width: 6rem;
          margin: 0 auto;
          overflow: hidden;
          .list{
            width: 33.33%;
            float: left;
            margin-top: .3rem;
            img{
              width: .92rem;
              height: .92rem;
              border-radius: 50%;
            }
            .t{
              font-size: .28rem;
            }
            .info{
              color: #999;
              font-size: .24rem;
            }
          }
        }
        .update{
          position: absolute;
          left: 1.2rem;
          bottom: .4rem;
          width: 5.1rem;
          height: .88rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .34rem;
          border-radius: .44rem;
          background: linear-gradient(to right, #f7c785, #f6deac);
          font-weight: bold;
        }
      }
    }
  }
  .status{
    background: #fff;
    padding-bottom: .5rem;
    .select{
      padding: .2rem;
    }
    .ways{
      margin: .1rem 0 0.1rem 0.2rem;
      width: 1.44rem;
      height: 0.46rem;
      display: flex;
      align-items: center;
      justify-content: center;
      /*background: url("../../assets/img/updateBg.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      color: #fff;
      font-size: .26rem;
      background: linear-gradient(to right, @theme-col, @partial-color);
      border-bottom-right-radius: .46rem;
      border-top-left-radius: .46rem;
    }
    .way{
      margin: .2rem .2rem;
      background: #ffe8ef;
      display: flex;
      align-items: center;
      height: .74rem;
      border-radius: .37rem;
      padding: 0 .2rem;
      p{
        font-size: .28rem;
        flex: 1;
        span{
          color: @theme-col;
        }
      }
      .selectBox{
        width: .4rem;
        height: .4rem;
        border-radius: .2rem;
        background: #fff;
      }
      .selected{
        background: url("../../assets/img/my/select.png") no-repeat;
        background-size: contain;
        background-position: bottom;
      }
    }
    .present{
      color: #999;
      font-size: .24rem;
      padding: .1rem .2rem .2rem;
    }
    .progressBox{
      padding: 0 .2rem;
      display: flex;
      justify-content: space-between;
      .weui-progress{
        width: 6rem;
      }
    }
    .notice{
      padding: 0 .2rem;
      color: #f6c585;
      font-size: .24rem;
    }
    .invite{
      width: 5.1rem;
      height: .88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .34rem;
      margin: .5rem auto 0.5rem;
      border-radius: .44rem;
      background: linear-gradient(to right, #f7c785, #f6deac);
      font-weight: bold;
    }
  }
  .persons{
    padding-bottom: 2rem;
    background: #fff;
    margin-top: .2rem;
    .title{
      font-size: .34rem;
      text-align: center;
      padding: .4rem 0 .2rem;
    }
    .name{
      font-size: .24rem;
      text-align: center;
      margin-top: .2rem;
    }
    .level{
      width: 1.36rem;
      height: .36rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #f7c785, #f6deac);
      margin: 0.1rem  auto;
      border-radius: .18rem;
    }
    .moneyBox{
      position: relative;
      background: #f7f7f7;
      width: 5.5rem;
      height: 1.9rem;
      margin: .5rem auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      border-radius: .1rem;
      .money{
        color: #f09b23;
        font-size: .48rem;
      }
      .time{
        font-size: .28rem;
      }
      .info{
        color: #f09b23;
        font-size: .24rem;
      }
      .triangle{
        position: absolute;
        left: 2.65rem;
        top: -0.2rem;
        width: 0;
        height: 0;
        border-left: .14rem solid transparent;
        border-bottom: .2rem solid #f7f7f7;
        border-right: .14rem solid transparent;
      }
    }
  }
  .waysBox{
    .dialog{
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100000;
    }
    .way{
      background: #fff;
      border-radius: .1rem;
      position: fixed;
      left: .3rem;
      top: 50%;
      margin-top: -1.75rem;
      width: 6.9rem;
      font-size: .3rem;
      z-index: 100001;
      .icon-close{
        position: absolute;
        right: .3rem;
        top: .25rem;
        font-size: .4rem;
      }
      p{
        text-align: center;
        height: 1.15rem;
        line-height: 1.15rem;
        justify-content: center;
        display: flex;
        align-items: center;
        position: relative;
        img{
          width: .4rem;
          margin-right: .1rem;
        }
      }
      .t:after{
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .ways:after{
        content: '';
        width: 90%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 5%;
        border-bottom: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
    }
  }
}
</style>
