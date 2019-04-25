<template>
  <div id="my" class="tbkMy">
    <mescroll-vue ref="mescroll"  :down="mescrollDown"  @init="mescrollInit">
    <div class="moneysBox">
      <img src="../../assets/img/my/setting.png" :style="{top: settingH + 0.3 + 'rem'}" alt="" class="setting" @click="jumpTo('/info')">
      <div class="headBox" :style="{marginTop: settingH + 1 + 'rem'}">
        <div class="top">
          <div class="avater" :style="{backgroundImage: 'url(' + data.avatar + ')'}" v-if="data.avatar" @click="jumpTo('/info')">
            <div class="lv" v-if="$store.state.user.token"><img src="../../assets/img/my/lv.png" alt=""><span>{{data.lv}}</span></div>
          </div>
          <div class="avater" v-else @click="jumpTo('/info')">
            <div class="lv" v-if="$store.state.user.token"><img src="../../assets/img/my/lv.png" alt=""><span>{{data.lv}}</span></div>
          </div>
          <p class="name" v-if="$store.state.user.token">{{data.nickname}} </p>
          <p class="name" v-else @click="jumpTo('wechatLogin')">登录/注册</p>
          <p class="invite"  @click="onCopy(data.invite_code)" v-if="data.invite_code"><span>邀请码：</span><span>{{data.invite_code}}</span><span class="copyObj">复制</span></p>
          <div class="profitBox">
            <div class="profit" @click="jumpTo('/profit')">
              <p v-if="data && data.thismonth_payment">￥{{data.thismonth_payment}}</p>
              <p v-else> 0.00</p>
              <p>本月预估</p>
            </div>
            <div class="profit" @click="jumpTo('/profit')">
              <p v-if="data && data.last_month_payment">￥{{data.last_month_payment}}</p>
              <p v-else> 0.00</p>
              <p>上月预估</p>
            </div>
            <div class="profit" @click="jumpTo('/profit')">
              <p v-if="data && data.last_month_Settlement">￥{{data.last_month_Settlement}}</p>
              <p v-else> 0.00</p>
              <p>上月结算</p>
            </div>
          </div>
        </div>
        <div class="bot">
          <div><span>今日预估</span><span v-if="data && data.today_payment_share">￥{{data.today_payment_share}}</span><span v-else>0.00</span></div>
          <div @click="jumpTo('/profit')"><span class="look">查看详情</span></div>
        </div>
      </div>
      <div class="option orderBox">
        <div @click="jumpTo('/jifenbao')">
          <div class="imgBox"><img src="../../assets/img/my/mo.jpg" alt=""></div>
          <div v-if="data && data.creditTitleInfo">{{data.creditTitleInfo}}</div>
          <div v-else>集分宝</div>
        </div>
        <div @click="jumpTo('/withdraw')">
          <div class="imgBox"><img src="../../assets/img/my/mt.jpg" alt=""></div>
          <div>提现</div>
        </div>
        <div @click="jumpTo('/team')">
          <div class="imgBox"><img src="../../assets/img/my/ms.jpg" alt=""></div>
          <div>粉丝</div>
        </div>
        <div @click="jumpTo('/order')">
          <div class="imgBox"><img src="../../assets/img/my/mts.jpg" alt=""></div>
          <div>订单</div>
        </div>
      </div>
      <!--<div class="swiperBox">-->
        <!--<swiper auto :aspect-ratio="140/710" dots-position="center">-->
          <!--<swiper-item class="swiper-demo-img" v-for="(item, index) in swiper" :key="index">-->
            <!--<img :src="item" @click="jumpLink(item)">-->
          <!--</swiper-item>-->
        <!--</swiper>-->
      <!--</div>-->
      <!--<div class="swiperBox">-->
        <!--<swiper :options="swiperOption" class="swiper">-->
          <!--<swiper-slide>-->
            <!--<img src="../../assets/img/my/mybg.png" alt="" >-->
          <!--</swiper-slide>-->
          <!--<swiper-slide>-->
            <!--<img src="../../assets/img/my/searchbg.png" alt="" >-->
          <!--</swiper-slide>-->
        <!--</swiper>-->
      <!--</div>-->
      <div class="upgrade" @click="jumpTo('/partnership')" v-if="model && model.isShopModel === '1'">
        <div><img src="../../assets/img/my/hehuoren.png" alt=""></div>
        <div>
          <p v-if="$bizId === 6">升级会员，让你轻松赚钱</p>
          <p v-if="$bizId !== 6">升级店主，让你轻松赚钱</p>
          <p>自购省钱、邀请好友赚钱</p>
        </div>
        <div>
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <!--<div class="upgrade" @click="jumpTo('/upgradeAgency')" v-if="model && model.isOperatorModel === '1'">-->
      <div class="upgrade" @click="jumpTo('/freeUpgrade')" v-if="model && model.isOperatorModel === '1' && model.isOperatorPage === '1'">
        <div><img src="../../assets/img/my/daili.png" alt=""></div>
        <div>
          <p>申请运营商，享受更多权益</p>
          <p>自购省钱、邀请好友赚钱</p>
        </div>
        <div>
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <div class="upgrade" @click="jumpTo('/upgradeAgency')" v-if="model && model.isOperatorModel === '1' && model.isOperatorPage === '0'">
        <div><img src="../../assets/img/my/daili.png" alt=""></div>
        <div>
          <p>申请运营商，享受更多权益</p>
          <p>自购省钱、邀请好友赚钱</p>
        </div>
        <div>
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <div class="tool">
        <div class="headers">
          我的工具
        </div>
        <div class="option">
          <div v-if="$aliPay === 1" @click="showLogin">
            <div class="imgBox"><img src="../../assets/img/home/taobao.png" alt=""></div>
            <div>淘宝授权</div>
          </div>
          <div @click="jumpTo('/collect')">
            <div class="imgBox"><img src="../../assets/img/my/xing.png" alt=""></div>
            <div>我的收藏</div>
          </div>
          <div @click="jumpTo('/footprint')">
            <div class="imgBox"><img src="../../assets/img/my/zuji.png" alt=""></div>
            <div>我的足迹</div>
          </div>
          <div @click="jumpTo('/pullNew')" v-if="$bizId === 6 || $bizId === 12">
            <div class="imgBox"><img src="../../assets/img/my/jia.jpg" alt=""></div>
            <div>手淘拉新</div>
          </div>
          <div @click="jumpTo('/invite')" v-if="$bizId !== 6 && $bizId !== 12">
            <div class="imgBox"><img src="../../assets/img/my/jia.png" alt=""></div>
            <div>邀请好友</div>
          </div>
          <div @click="jumpTo('/linkman')">
            <div class="imgBox"><img src="../../assets/img/auth/connect.png" alt=""></div>
            <div>联系我们</div>
          </div>
          <div  v-if="model && model.isMovieModel === 1" @click="jumpTo('/videoList')">
            <div class="imgBox"><img src="../../assets/img/my/movie.png" alt=""></div>
            <div>共享影视</div>
          </div>
          <div v-if="data && data.sharesInfo && data.sharesInfo.status === 1" @click="jumpTo('/weighting')">
            <div class="imgBox"><img src="../../assets/img/auth/jiaquan.png" alt=""></div>
            <div>{{data.sharesInfo.title}}</div>
          </div>
          <div v-for="(item, index) of cate" :key="index" @click="other(item)">
            <div class="imgBox">
              <img :src="item.img" alt=""></div>
            <div>{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    </mescroll-vue>
  </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {Group, Cell} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'my',
  components: {
    Group,
    Cell,
    MescrollVue,
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        grabCursor: true,
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      settingH: '',
      data: '',
      profit: '',
      list: '',
      show: '',
      cate: '',
      mescroll: null,
      mescrollDown: {
        use: !!this.$store.state.user.token,
        auto: false,
        callback: this.getInfo,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹,
      model: null,
      signInfo: ''
    }
  },
  methods: {
    showLogin () {
      // api.openWin({
      //   name: 'aliWin',
      //   url: '../html/main.html',
      //   reload: true,
      //   pageParam: {
      //     url: 'https://s.click.taobao.com/g4LhrGw'
      //   },
      //   animation: {
      //     type: 'push',
      //     subType: 'from_right',
      //     duration: 300
      //   },
      //   bounces: false,
      //   slidBackEnabled: false,
      //   allowEdit: true
      // })
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      let aliBC = api.require('aliBC')
      aliBC.asyncInit({
      }, function (ret, err) {
        if (ret.status) {
          let aliBC = api.require('aliBC')
          aliBC.showLogin(function (ret, err) {
            if (ret.status) {
              that.$vux.toast.text('授权成功')
            } else {
              that.$vux.toast.text(err.message)
            }
          })
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    other (item) {
      this.$router.push('/help?title=' + item.title + '&type=' + item.id)
    },
    carryCash () {
      this.$router.push('/withdraw')
    },
    onCopy (code) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: code
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', code)
          that.$vux.toast.text('复制成功')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    getInfo () {
      if (this.$store.state.user.token) {
        this.$http.post('/amoy/user/user-info', {}).then(res => {
          if (res.code === 0) {
            this.data = res.data
            utils.storage.set('signInfo', res.data.creditTitleInfo)
            this.$store.commit('setUserInfo', res.data)
            this.mescroll.endSuccess(res.data.length)
          }
        }).catch((e) => {
          this.mescroll.endErr()
        })
      }
      this.$http.post('/amoy/user/get-cate', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.cate = res.data
        }
      })
      this.$http.post('/amoy/app/info', {}, false, true).then((res) => {
        if (res.code === 0) {
          this.model = res.data
        }
      })
    }
  },
  activated () {
    this.data = this.$store.state.user.userInfo
    this.getInfo()
  },
  mounted () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.settingH = (api.safeArea.top / size)
  }
}
</script>
<style lang="less">
  .tbkMy{
    .mescroll{
      bottom: 0 !important;
    }
  }
  #my{
    /*._v-content{*/
      /*padding-bottom: 30px;*/
    /*}*/
    .vux-cell-primary{
      line-height: .4rem;
      margin-left: .2rem;
      .vux-label{
        font-size: .28rem;
      }
    }
    .weui-cells{
      margin-top: 0;
      .weui-cell:before{
        right: 15px;
      }
    }
    .weui-cells:after,.weui-cells:before{
      display: none;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.tops{
  padding-top: 2px;
}
#my{
  position: relative;
  height: 100%;
  background: #f7f7f7;
  .moneysBox{
    background: url("../../assets/img/my/mybg.png") no-repeat;
    background-size: contain;
    font-size: 0.3rem;
    position: relative;
    padding: .2rem;
    z-index: 100;
    /*background-color: #fff;*/
    .setting{
      position: absolute;
      right: .3rem;
      width: .4rem;
      top: .3rem;
    }
    .headBox{
      margin-top: 1rem;
      width: 100%;
      height: 4.3rem;
      background: linear-gradient(to right, #fcb798, #fc9298);
      border-radius: .2rem;
      text-align: center;
      .top{
        border-radius: .2rem;
        background: #fff;
        height: 3.5rem;
        position: relative;
        .avater{
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          border: .08rem solid #fff;
          background-size: cover;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('../../assets/img/my/avater.png');
          position: absolute;
          top: -0.5rem;
          left: 50%;
          transform: translate(-50%, 0);
          .lv{
            padding: 0 .2rem;
            position: absolute;
            left: 0.9rem;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .2rem;
            height: .34rem;
            border: 1px solid #F8E71C;
            background: #fff;
            border-radius: .17rem;
            span{
              font-size: .2rem;
              word-break: keep-all;
              color: #F7BD01;
            }
            img{
              width: .26rem;
              height: .26rem;
              margin-right: 0.05rem;
            }
          }
        }
        .name{
          padding-top: 1.2rem;
          font-size: .32rem;
          color: #333;
        }
        .invite{
          display: flex;
          justify-content: center;
          font-size: .26rem;
          .copyObj{
            display: flex;
            align-items: center;
            background: #FFE7EE;
            color: #FF5847;
            height: .4rem;
            font-size: .22rem;
            border-radius: .2rem;
            padding: 0 .2rem;
            margin-left: .2rem;
          }
        }
        .profitBox{
          overflow: hidden;
          position: absolute;
          left: 0;
          bottom: 0;
          border-top: 1px solid #EEEEEE;
          padding: 0.1rem 0;
          height: 1rem;
          width: 100%;
          .profit{
            width: 33.33%;
            float: left;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            position: relative;
            p:first-of-type{
              font-size: .32rem;
              color: #FF5847;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
              margin-bottom: 0.1rem;
            }
            p:last-of-type{
              text-align: center;
              font-size: .24rem;
              color: #666;
            }
          }
          .profit:after{
            content: '';
            height: 80%;
            position: absolute;
            top: 10%;
            right: 0;
            border-right: 1px solid #dadada;
            transform-origin: 0 0;
            transform: scaleX(.5);
          }
          .profit:last-of-type:after{
            display: none;
          }
        }
      }
      .bot{
        height: .8rem;
        padding: 0 0.5rem 0 0.2rem;
        width: 100%;
        line-height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        position: relative;
        color: #fff;
        div:nth-child(1){
          height: .8rem;
          display: flex;
          align-items: center;
          float: left;
          span:nth-child(2){
            color: #FF5847;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2){
          height: .8rem;
          float: right;
          font-size: 0.24rem;
          display: flex;
          align-items: center;
        }
        .look{
          display: inline-block;
          margin-right: 0.1rem;
        }
      }
      .bot:after{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #fff;
        border-style: solid;
        -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
        transform: matrix(.71,.71,-.71,.71,0,0);
        position: absolute;
        top: 50%;
        margin-top: -5px;
        right: .2rem;
      }
    }
    .profitBox{
       overflow: hidden;
       padding: 0.4rem 0;
       height: 1rem;
       width: 100%;
       .profit{
         width: 33.33%;
         float: left;
         justify-content: center;
         text-align: center;
         flex-direction: column;
         position: relative;
         p:first-of-type{
           font-size: .32rem;
           color: #fc3357;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           text-align: center;
           margin-bottom: 0.1rem;
         }
         p:last-of-type{
           text-align: center;
           font-size: .24rem;
           color: #666;
         }
       }
       .profit:after{
         content: '';
         height: 80%;
         position: absolute;
         top: 10%;
         right: 0;
         border-right: 1px solid #dadada;
         transform-origin: 0 0;
         transform: scaleX(.5);
       }
       .profit:last-of-type:after{
         display: none;
       }
     }
    .option{
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        margin-bottom: .4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .orderBox{
      background: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      padding-bottom: .26rem;
      div{
        margin-bottom: 0;
      }
    }
    .imgsBox{
      margin-top: 0.2rem;
      width: 100%;
      /*height: 1.15rem;*/
      img{
        width: 100%;
        height: 100%;
      }
    }
    .upgrade{
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      div{
        float: left;
      }
      div:nth-child(1){
        width: 1.2rem;
        height: 1.2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2){
        margin-left: 0.3rem;
        font-size: 0.28rem;
        padding-top: 0.1rem;
        color: black;
        p:nth-child(2){
          font-size: 0.24rem;
          color: #999999;
          margin-top: 0.14rem;
        }
      }
      div:nth-child(3){
        float: right;
        height: 100%;
        line-height: 1.2rem;
      }
    }
    .tool{
      margin-top: 0.2rem;
      border-radius: 10px;
      background: #fff;
      .option{
        margin-top: 0;
      }
      .headers{
        float: left;
        line-height: 1rem;
        font-size: 0.3rem;
        width: 100%;
        padding-left: 0.2rem;
        position: relative;
        box-sizing: border-box;
        text-align: left !important;
      }
      .headers:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
        bottom: 0;
        left: 0;
      }
    }
    .grow{
      height: 3.6rem;
      width: 100%;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 10px;
      .title{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        line-height: 1rem;
        div:nth-child(1){
          float: left;
          font-size: 0.3rem;
        }
        div:nth-child(2){
          float: right;
          color: #999;
          font-size: 0.24rem;
          span:nth-child(1){
            margin-right: 0.1rem;
          }
        }
      }
      .imgsbox{
        width: 100%;
        height: 2.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
