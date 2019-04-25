<template>
  <div class="share-poster">
    <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
      <i class="iconfont icon-back"></i></a>
      U淘拉新
    </x-header>
    <div class="poster-body" @click="isShare = false">
      <div class="poster">
        <img :src="data.pic" alt="">
        <!--<div>-->
          <!--<img src="../../assets/img/logo.png" alt="">-->
        <!--</div>-->
      </div>
      <div class="poster-foot">
        <p>手机淘宝扫码领奖</p>
        <span @click.stop="isShare = true">分享邀请海报</span>
      </div>
    </div>
    <div class="share_to" v-if="isShare">
      <h2>分享到</h2>
      <ul>
        <li>
          <img src="../../assets/img/home/goods/wechat.png" alt="" @click="sharePnM(1)">
        </li>
        <li>
          <img src="../../assets/img/home/goods/friend_circle.png" alt="" @click="sharePnM(2)">
        </li>
        <li>
          <img src="../../assets/img/home/goods/microblog.png" alt="" @click="sharePnQ()">
        </li>
        <li>
          <img src="../../assets/img/home/goods/qq.png" alt="" @click="sharePnQ()">
        </li>
        <!--<li>-->
        <!--<img src="../../assets/img/auth/QQk.png" alt="">-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShare: false,
        data: {}
      }
    },
    mounted () {
      this.$http.post('/amoy/user/new-user', {}, true, true).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.data = res.data
        }
      })
    },
    methods: {
      sharePnM (type) {
        let that = this
        this.isShare = false
        let way = type === 1 ? 'session' : 'timeline'
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.data.pic,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          let wx = api.require('wx')
          wx.shareImage({
            scene: way,
            contentUrl: 'fs://' + format
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection?biz_id=1', {}, false, true).then()
          })
        })
      },
      sharePnQ () {
        let that = this
        this.isShare = false
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.data.pic,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          if (ret.state === 1) {
            let sharedModule = api.require('shareAction')
            sharedModule.share({
              images: ['fs://' + format],
              type: 'image'
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/mall/style/_Variables";
  .share-poster{
    .poster-body{
      margin-top: @margin-top;
      .poster{
        width: 5.36rem;
        height: 8.62rem;
        margin: 1.2rem auto 0;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          border-radius: .1rem;
        }
        div{
          position: absolute;
          bottom: 5%;
          left: 50%;
          margin-left: -.8rem;
          width: 1.6rem;
          height: 1.6rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .poster-foot{
        p{
          margin: .5rem 0;
          color: #6F6F6F;
          font-size: .3rem;
          text-align: center;
        }
        span{
          display: block;
          width: 4.48rem;
          height: .84rem;
          background: linear-gradient(to right, #FF2D5A, #FF767A);
          margin: 0 auto;
          line-height: .84rem;
          color: #fff;
          font-size: .3rem;
          border-radius: .4rem;
          text-align: center;
        }
      }
    }
    .share_to{
      background: #fff;
      border-top: 1px solid #ccc;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      h2{
        font-size: .26rem;
        text-align: center;
        padding-top: .32rem;
        color: #666666;
      }
      ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: .32rem .5rem;
        li{
          width: .70rem;
          height: .70rem;
          img{
            width: .70rem;
            height: .70rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
