<template>
  <div id="qiandao" v-if="isShow">
    <div class="list">
      <span class="goBack" @click="goBack()">
        <img src="../../assets/img/home/goods/goBack.png" alt="">
      </span>
      <div class="q-head">
        <div class="guize" @click="show(1)">
          <img src="../../assets/img/sign/guize.png" alt="">
          <span>签到规则</span>
        </div>
        <div class="q-h-body">
          <p>{{parseInt(user.credit4)}}</p>
          <p>我的{{info.credit}}</p>
          <div v-if="info.isSign == 0" class="q-button" @click="handleSign()">
            <p>点击签到</p>
          </div>
          <div v-if="info.isSign == 1" class="q-button">
            <p>已签到</p>
          </div>
          <p class="q-h-txt">您已连续签到<span>{{info.isNum}}</span>天,连续签到<span>{{info.day}}</span>天,即可获得<span>{{info.dayPrice}}</span>个{{info.credit}}</p>
        </div>
      </div>
      <div class="q-body">
        <img src="../../assets/img/sign/day.png" alt="" class="image">
        <div v-for="(item,i) in info.everyday" :key="i" class="list1">
          <div class="list1-item">
            <div class="item-img">
              <img v-if="item.type === '1'" src='../../assets/img/sign/read.png' alt="">
              <img v-if="item.type === '2'" src='../../assets/img/sign/share.png' alt="">
              <img v-if="item.type === '3'" src='../../assets/img/sign/invited.png' alt="">
            </div>
            <div class="item-center">
              <p>{{item.title}} <span>+{{item.price}}</span><img src="../../assets/img/sign/score.png" alt=""></p>
              <p v-if="item.status <= 1">完成 <span :class="{color:item.nums===item.num}">{{item.nums}}</span>/{{item.num}}</p>
              <p v-if="item.status > 1">完成 <span :class="{color:item.num===item.num}">{{item.num}}</span>/{{item.num}}</p>
            </div>
            <div class="status">
              <div v-if="item.status == 0" @click="handleDraw(i, 'everyday')">
                <img src="../../assets/img/sign/go.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
              <div v-if="item.status == 1" @click="handleDo(item.type)">
                <img src="../../assets/img/sign/go.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
              <div v-if="item.status == 2" @click="handleAward(i, 'everyday')">
                <img src="../../assets/img/sign/go.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
              <div v-if="item.status == 3">
                <img src="../../assets/img/sign/over.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
            </div>
          </div>
        </div>
        <img src="../../assets/img/sign/novice.png" alt="" class="image" style="margin-top: .3rem;">
        <div v-for="(item,i) in info.sprog" :key="'sprog' + i" class="list1">
          <div class="list1-item">
            <div class="item-img">
              <img v-if="item.type === '1'" src='../../assets/img/sign/order.png' alt="">
              <img v-if="item.type === '2'" src='../../assets/img/sign/fans.png' alt="">
            </div>
            <div class="item-center">
              <p>{{item.title}} <span>+{{item.price}}</span><img src="../../assets/img/sign/score.png" alt=""></p>
              <p>完成 <span :class="{color:item.nums===item.num}">{{item.nums}}</span>/{{item.num}}</p>
            </div>
            <div class="status">
              <div v-if="item.status == 0" @click="handleDraw(i, 'sprog')">
                <img src="../../assets/img/sign/go.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
              <div v-if="item.status == 1">
                <img src="../../assets/img/sign/over.png" alt="">
                <p>进行中</p>
              </div>
              <div v-if="item.status == 2" @click="handleAward(i, 'sprog')">
                <img src="../../assets/img/sign/go.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
              <div v-if="item.status ==  3">
                <img src="../../assets/img/sign/over.png" alt="">
                <p>{{statusInfo[parseInt(item.status)]}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-guize" v-if="showRules">
        <div class="rules">
          <div class="content"  v-html="info.info"></div>
        </div>
        <img src="../../assets/img/sign/close.png" alt="" @click="hide(1)" class="close">
      </div>
      <div class="q-sign" v-if="showSign">
        <div>
          <p style="padding-top: 2.5rem;">
            <span>+{{success}}</span>
            <img src="../../assets/img/sign/score.png" alt="">
          </p>
          <p class="text">您已连续签到 <span>{{info.isNum}}</span>天</p>
        </div>
        <img src="../../assets/img/sign/close.png" alt="" @click="hide(2)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showRules: false,
      showSign: false,
      info: {},
      statusInfo: [],
      user: {},
      success: null,
      isShow: false
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 获取数据
    getInfo () {
      this.$http.post('/amoy/task/index', {}, true).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.info = res.data.info
          this.statusInfo = res.data.statusInfo
          this.user = res.data.user
        }
      })
    },
    // 签到
    handleSign () {
      this.$http.post('/amoy/task/sign').then(res => {
        if (res.code === 0) {
          if (res.data.success_add) {
            this.success = parseInt(res.data.success) + parseInt(res.data.success_add)
            this.user.credit4 = parseInt(this.user.credit4) + parseInt(res.data.success) + parseInt(res.data.success_add)
          } else {
            this.success = parseInt(res.data.success)
            this.user.credit4 = parseInt(this.user.credit4) + parseInt(res.data.success)
          }
          this.info.isNum++
          this.show(2)
          this.getInfo()
        }
      })
    },
    // 领取任务
    handleDraw (index, type) {
      this.$http.post('/amoy/task/sprog', {type: type, id: index}).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          this.getInfo()
        }
      })
    },
    // 去做任务
    handleDo (type) {
      if (type === '1') {
        this.$router.push('/discounts?type=0')
      } else if (type === '2') {
        this.$router.push('/invite')
      } else if (type === '3') {
        this.$router.push('/invite')
      }
    },
    // 领取奖励
    handleAward (index, type) {
      this.$http.post('/amoy/task/draw', {id: index, type: type}).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.getInfo()
          }, 1000)
        }
      })
    },
    show (i) {
      if (i === 1) {
        this.showRules = true
      } else if (i === 2) {
        this.showSign = true
      }
    },
    hide (i) {
      if (i === 1) {
        this.showRules = false
      } else if (i === 2) {
        this.showSign = false
      }
    }
  }
}
</script>
<style lang="less">
  #qiandao{
    text-align: center;
    background-image: url("../../assets/img/sign/bg.png");
    width: 100%;
    height: 100%;
    background-size: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.6rem 0 0;
    .list{
      height: 100%;
      overflow-y: auto;
    }
    .goBack{
      display: inline-block;
      width: .88rem;
      height: .88rem;
      //background: url('../../assets/img/home/goods/goBack.png') no-repeat;
      background-size: .61rem .61rem;
      position: absolute;
      left: .30rem;
      top: .8rem;
      z-index: 999;
      text-align: center;
      img{
        margin-top: 0.14rem;
        width: .6rem;
        height: .6rem;
      }
    }
    .q-head{
      position: relative;
      .guize{
        position: absolute;
        right: 0;
        top:0;
        font-size: 0.3rem;
        color: rgb( 248, 94, 65 );
        background: #fde8de;
        height: 0.65rem;
        line-height: 0.65rem;
        width: 1.9rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        img{
          width: 0.3rem;
          height: 0.3rem;
          position: relative;
          top:1px;
        }
      }
      .q-h-body{
        color: #fff;
        font-size: 0.7rem;
        margin-top: .3rem;
        p:nth-child(2){
          font-size: 0.3rem;
          margin: 0 auto 0.4rem;
        }
        .q-button{
          color:#d30035;
          font-size: 0.34rem;
          font-weight: bold;
          width: 5rem;
          height: 0.9rem;
          margin: 0 auto;
          line-height: 0.9rem;
          border-radius: 0.5rem;
          background-image:linear-gradient( top, rgb(245,252,0) 0%, rgb(254,153,0) 100%);
        }
        .q-h-txt{
          font-size: 0.25rem;
          margin-top: 0.4rem;
          span{
            color: rgb(245,252,0);
          }
        }
      }
    }
    .q-body{
      margin-top: .5rem;
      img:first-child{
        height: 0.5rem;
      }
      .image{
        height: 0.5rem;
      }
      .list1{
        .list1-item{
          background-image: url("../../assets/img/sign/listbg.png");
          width: 90%;
          margin: 0.2rem auto;
          height: 1.5rem;
          background-size: 100%;
          font-size: 0.3rem;
          display: flex;
          justify-content: space-between;
          position: relative;
          .item-img{
            position: absolute;
            top: 50%;
            left: 0.3rem;
            transform: translateY(-50%);
          }
          .item-center{
            padding: 0.2rem 0;
            margin-left: 1.05rem;
            color: #777777;
            font-size: 0.26rem;
            p{
              img{
                width: 0.35rem;
                position: relative;
                top:1px;
              }
              span{
                color: #d30035;
                margin: 0 0.05rem;
                font-size: 0.35rem;
              }
            }
            p:last-child{
              text-align: left;
              span{
                color: #777777;
                font-size: 0.3rem;
              }
              span.color{
                color: #d30035;
              }
            }
          }
          .status{
            position: absolute;
            right: 0.2rem;
            top: 50%;
            transform: translateY(-50%);
            div{
              position: relative;
              img{
                width: 1.4rem;
                height: 0.4rem;
              }
              p{
                position: absolute;
                color: #fff;
                right: 0.2rem;
                font-size: 0.25rem;
                top: 50%;
                transform: translateY(-60%);
              }
            }
          }
        }
      }
    }
    .q-guize{
      div{
        padding: 0 .2rem;
      }
      .close{
        margin-top: .5rem;
      }
    }
    .q-guize,.q-sign{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background:rgba(0,0,0,0.7);
      img{
        width: 0.5rem;
      }
      .rules{
        width: 90%;
        height: 4.7rem;
        background-image: url("../../assets/img/sign/tcbg.png");
        background-size: 100%;
        background-repeat: no-repeat;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        margin: 0 auto;
        margin-top: 3rem;
        padding: 2rem 0 .3rem;
        text-align: left;
        overflow: hidden;
        box-sizing: content-box;
        .content{
          height: 100%;
          overflow-y: auto;
          img{
            max-width: 100% !important;
          }
        }
        p{
          font-size: 0.3rem;
        }
      }
    }
    .q-sign{
      div:first-child{
        height: 5rem;
        background: url("../../assets/img/sign/tbg.png") no-repeat;
        background-size: 100%;
        margin-top: 3rem;
        p{
          margin-top:1.3rem;
          font-size: 0.5rem;
          color: #fc3357;
          img{
            width: 0.4rem;
          }
        }
        p.text{
          color: #8d8d8d;
          margin-top:0.1rem;
          font-size: 0.3rem;
        }
      }
    }
  }
</style>
