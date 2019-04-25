<template>
  <div id="my" class="tbkMy">
    <mescroll-vue ref="mescroll"  :down="mescrollDown"  @init="mescrollInit">
    <div class="head">
      <img src="../../assets/img/my/my_head.png" alt="" class="bg">
      <!--<div class="t">我的</div>-->
      <img src="../../assets/img/my/setting.png" :style="{top: settingH + 'rem'}" alt="" class="setting" @click="jumpTo('/info')">
      <div class="box" >
        <div class="avater" :style="{backgroundImage: 'url(' + data.avatar + ')'}" v-if="data.avatar" @click="jumpTo('/info')"></div>
        <div class="avater" v-else @click="jumpTo('/info')"></div>
        <div class="info" v-if="$store.state.user.token">
          <div class="tou">
            <!--<div class="idgrede" v-if="data.uis_is_show === '1'">-->
              <!--<p style="font-size: 0.3rem; color: #fff" >ID: {{data.uid}}</p>-->
            <!--</div>-->
            <p class="name">{{data.nickname}} </p><span v-if="data.lv"><img src="../../assets/img/my/lvIcon.png" alt="">{{data.lv}}</span>
          </div>
          <!--<p class="uid">ID：{{data.uid}}</p>-->
          <p class="invite"  @click="onCopy(data.invite_code)" v-if="data.invite_code"><span>邀请码：</span><span>{{data.invite_code}}</span><span class="copyObj">复制</span></p>
        </div>
        <div v-else class="info">
          <p class="login" @click="jumpTo('wechatLogin')">登录/注册</p>
        </div>
      </div>
      <!--<div class="share" v-if="data.lv === 1">-->
        <!--&lt;!&ndash;<img src="../../assets/img/my/share.png" alt="">&ndash;&gt;-->
        <!--<span class="isVip">VIP</span>-->
      <!--</div>-->
      <!--<div class="share" @click="jumpTo('/partnership')" v-else>-->
        <!--&lt;!&ndash;<img src="../../assets/img/my/share.png" alt="">&ndash;&gt;-->
        <!--<span>升级</span>-->
      <!--</div>-->
    </div>
    <div class="moneysBox">
      <div class="buttom">
          <div class="tos">
            <div><span>今日预估</span><span v-if="data && data.today_payment_share">￥{{data.today_payment_share}}</span><span v-else>0.00</span></div>
            <div @click="jumpTo('/profit')"><span class="look">查看详情</span><span class="iconfont icon-arrow" style="font-size: 0.2rem;"></span></div>
          </div>
          <div class="bos">
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
      </div>
      <div class="top" @click="jumpTo('/pullNew')" v-if="$bizId === 6">
        <img src="../../assets/img/auth/yqhy.png" alt="">
      </div>
      <div class="top" @click="jumpTo('/invite')" v-if="$bizId !== 6">
        <img src="../../assets/img/my/yqhy.png" alt="">
      </div>
      <!--<div class="imgsBox"><img src="../../assets/img/my/z8.png" alt=""></div>-->
      <div class="option orderBox">
        <div @click="jumpTo('/jifenbao')">
          <div class="imgBox"><img src="../../assets/img/my/mo.png" alt=""></div>
          <div v-if="data && data.creditTitleInfo">{{data.creditTitleInfo}}</div>
          <div v-else>集分宝</div>
        </div>
        <div @click="jumpTo('/withdraw')">
          <div class="imgBox"><img src="../../assets/img/my/mt.png" alt=""></div>
          <div>提现</div>
        </div>
        <div @click="jumpTo('/team')">
          <div class="imgBox"><img src="../../assets/img/my/ms.png" alt=""></div>
          <div>粉丝</div>
        </div>
        <div @click="jumpTo('/order')">
          <div class="imgBox"><img src="../../assets/img/my/mts.png" alt=""></div>
          <div>订单</div>
        </div>
      </div>
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
          <!--<div>-->
            <!--<div class="imgBox" @click="showCartsPage"><img src="../../assets/img/my/xing.png" alt=""></div>-->
            <!--<div>天猫国际</div>-->
          <!--</div>-->
          <div @click="jumpTo('/collect')">
            <div class="imgBox"><img src="../../assets/img/my/xing.png" alt=""></div>
            <div>我的收藏</div>
          </div>
          <div @click="jumpTo('/footprint')">
            <div class="imgBox"><img src="../../assets/img/my/zuji.png" alt=""></div>
            <div>我的足迹</div>
          </div>
          <div @click="jumpTo('/pullNew')" v-if="$bizId === 6 || $bizId === 12">
            <div class="imgBox"><img src="../../assets/img/my/jia.png" alt=""></div>
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
          <!--<div>-->
            <!--<div class="imgBox" @click="jumpTo('/about?title=关于秒省&type=5')"><img src="../../assets/img/my/th.png" alt=""></div>-->
            <!--<div>关于秒省</div>-->
          <!--</div>-->
          <!--<div><div class="imgBox" @click="jumpTo('/rankingList')"><img src="../../assets/img/my/bd.png" alt=""></div>-->
            <!--<div>收入榜单</div>-->
          <!--</div>-->
        </div>
        <!--<div class="option">-->
          <!--&lt;!&ndash;<div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="imgBox" @click="jumpTo('/feedbacks')"><img src="../../assets/img/my/xiaox.png" alt=""></div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div>意见反馈</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div v-for="(item, index) of cate" :key="index" @click="other(item)">-->
            <!--<div class="imgBox">-->
            <!--<img :src="item.img" alt=""></div>-->
            <!--<div>{{item.title}}</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--<div class="grow" @click="jumpTo('/join')">-->
        <!--<div class="title">-->
          <!--<div>我的成长值</div>-->
          <!--<div><span>提升成长值</span><span>></span></div>-->
        <!--</div>-->
        <!--<div class=imgsbox>-->
          <!--<img src="../../assets/img/my/z6.png" alt="">-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--<div class="ranking" v-if="list.length !== 0">-->
      <!--<div class="t"><img src="../../assets/img/my/ranking.png" alt="">今日推广收益排行榜</div>-->
      <!--<div class="rank" v-for="item of list" :key="item.uid">-->
        <!--<img :src="item.avatar" alt="" v-if="item.avatar">-->
        <!--<img :src="$logo" v-if="$logo" alt="" v-else>-->
        <!--<p class="name">{{item.nickname}}</p>-->
        <!--<p class="money"><span>{{item.amount}}</span>元</p>-->
      <!--</div>-->
    <!--</div>-->
    </mescroll-vue>
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'my',
  components: {
    Group,
    Cell,
    MescrollVue
  },
  data () {
    return {
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
    this.settingH = (api.safeArea.top / size) + 0.6
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
  .ranking{
    margin: .2rem;
    background: #fff;
    border-radius: .2rem;
    .t{
      text-align: center;
      font-size: .3rem;
      line-height: .6rem;
      padding: .2rem 0;
      img{
        width: .34rem;
        margin-right: .2rem;
      }
    }
    .rank{
      font-size: .3rem;
      display: flex;
      align-items: center;
      padding: .2rem .3rem;
      img{
        width: .77rem;
        height: .77rem;
        border-radius: 50%;
        margin-right: .3rem;
      }
      .name{
        flex: 1;
        font-size: .28rem;
        color: #666;
      }
      .money{
        color: #666666;
        span{
          color: @theme-col;
          font-size: .32rem;
        }
      }
    }
  }
  .head{
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 3.59rem;
    .bg{
      position: absolute;
      width: 100%;
      height: 3.59rem;
      left: 0;
      top: 0;
    }
    .t{
      width: 100%;
      position: absolute;
      left: 0;
      top: .65rem;
      height: .55rem;
      line-height: .55rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
    }
    .setting{
      position: absolute;
      right: .25rem;
      top: .85rem;
      width: .45rem;
      height: .45rem;
      z-index: 100;
    }
    .share{
      position: absolute;
      top: 1.5rem;
      right: -.4rem;
      width: 1.81rem;
      height: .55rem;
      display: flex;
      align-items: center;
      background: -webkit-linear-gradient(left,#ff9914,#ffcb6e);
      border-radius: .27rem;
      font-size: 0.28rem;
      img{
        position: absolute;
        left: 0;
        top: 0;
        width: 1.91rem;
        height: 100%;
      }
      span{
        /*position: absolute;*/
        /*left: .3rem;*/
        /*top: .07rem;*/
        /*display: inline-block;*/
        /*height: .55rem;*/
        /*line-height: .55rem;*/
        text-indent: .5rem;
        font-size: 12px;
        color: #fff;
        z-index: 100;
      }
      .isVip{
        text-indent: .5rem;
      }
    }
    .box{
      position: absolute;
      top: 1.5rem;
      left: 0;
      width: 100%;
      height: 1.5rem;
      padding-left: .26rem;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      .avater{
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('../../assets/img/my/avater.png');
      }
      .info{
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        /*padding: .2rem 0;*/
        margin-left: .2rem;
        .login{
          font-size: .3rem;
          color: #fff;
        }
        .uid{
          font-size: .28rem;
          color: #fff;
        }
        .tou{
          display: flex;
          align-items: center;
          overflow: hidden;
          .name{
            text-align: left;
            font-size: .32rem;
            color: #fff;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            line-height: .4rem;
            max-width: 3.6rem;
            /*display: flex;*/
            /*align-items: center;*/
          }
          span {
            position: relative;
            background: #3a3b40;
            flex-shrink: 0;
            margin-left: .1rem;
            margin-right: .4rem;
            color: #f7bd01;
            font-size: .22rem;
            height: .4rem;
            text-align: left;
            padding-right: .2rem;
            padding-left: .4rem;
            line-height: .4rem;
            border-radius: .2rem;
            img{
              position: absolute;
              left: 0.05rem;
              top: 0.05rem;
              width: .3rem;
              height: .3rem;
            }
          }
        }
        .invite{
          text-align: left;
          font-size: .26rem;
          color: #fff;
          span:first-of-type{
            color: #ffd57c;
            margin-right: .1rem;
          }
          span:last-of-type{
            font-size: .20rem;
            display: inline-block;
            width: .68rem;
            height: .3rem;
            text-align: center;
            line-height: .34rem;
            border-radius: .2rem;
            margin-left: .2rem;
            background-color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }
  .moneyBox{
    margin: -.2rem .2rem .2rem;
    z-index: 100;
    position: relative;
    .money{
      border-radius: .05rem;
      background: #fff;
      padding: .2rem 0;
      .t{
        font-size: .26rem;
        color: #666;
        text-align: center;
      }
      .forward{
        margin-top: .1rem;
        color: @theme-col;
        text-align: center;
        font-size: .26rem;
        span:first-of-type{
          font-size: .36rem;
          display: inline-block;
        }
        span:last-of-type{
          display: inline-block;
          width: 1rem;
          height: .48rem;
          line-height: .48rem;
          text-align: center;
          font-size: .3rem;
          border: 1px solid @theme-col;
          border-radius: .24rem;
          margin-left: .2rem;
        }
      }
    }
    .classify{
      overflow: hidden;
      padding: .2rem 0;
      background: #fff;
      border-radius: .05rem;
      margin-top: .1rem;
      display: flex;
      div{
        flex: 1;
        text-align: center;
        font-size: .24rem;
        img{
          width: .65rem;
          /*height: .65rem;*/
        }
        p{
          font-size: .24rem;
          color: #666;
        }
      }
    }
  }
  .top{
    background-color: #fff;
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0.2rem 0;
    margin-top: .2rem;
    border-radius: 10px;
    img{
      height: 1.75rem;
      width: 6.94rem;
    }
  }
  .moneysBox{
    font-size: 0.3rem;
    position: relative;
    margin: .2rem .2rem .2rem;
    z-index: 100;
    /*background-color: #fff;*/
    .buttom{
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      overflow: hidden;
      .tos{
        padding: 0 0.2rem;
        width: 100%;
        line-height: 1rem;
        height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        position: relative;
        div:nth-child(1){
          float: left;
          span:nth-child(2){
            color: #fc3357;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2){
          float: right;
          font-size: 0.24rem;
          color: #999;
        }
        .look{
          display: inline-block;
          margin-right: 0.1rem;
        }
      }
      .bos{
        height: 1.6rem;
      }
      .tos:before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
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
