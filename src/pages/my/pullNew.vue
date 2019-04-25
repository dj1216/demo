<template>
  <div class="pull-new">
    <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
      <i class="iconfont icon-back"></i></a>
      U淘拉新
    </x-header>
    <div class="pull-body" @click="isShare = false">
      <img :src="data.poster || '../../assets/img/auth/newbg.png'" alt="">
      <div class="pull-contant">
        <div @click.stop="jumpTo('/pullNewRule')">
          <img src="../../assets/img/auth/new3.png" alt="">
        </div>
        <div>
          <img src="../../assets/img/auth/new2.png" alt="" @click.stop="isShare = true">
          <img src="../../assets/img/auth/new1.png" alt="" @click.stop="jumpTo('/sharePoster')">
        </div>
      </div>
    </div>
    <div class="share_to" v-if="isShare">
      <h2>分享到</h2>
      <ul>
        <li>
          <img src="../../assets/img/home/goods/wechat.png" alt="" @click.stop="sharePnM(1)">
        </li>
        <li>
          <img src="../../assets/img/home/goods/friend_circle.png" alt="" @click.stop="sharePnM(2)">
        </li>
        <li>
          <img src="../../assets/img/home/goods/microblog.png" alt="" @click.stop="sharePnQ()">
        </li>
        <li>
          <img src="../../assets/img/home/goods/qq.png" alt="" @click.stop="sharePnQ()">
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
        let format = 'share' + new Date().getTime() + '.png'
        api.download({
          url: that.data.logo,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          var wx = api.require('wx')
          wx.shareWebpage({
            scene: way,
            title: that.data.title,
            description: that.data.describe,
            thumb: 'fs://' + format,
            contentUrl: that.data.url
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection', {}, false, true).then()
            // if (ret.status) {
            //   alert('分享成功')
            // } else {
            //   alert(err.code)
            // }
          })
        })
      },
      sharePnQ () {
        let that = this
        this.isShare = false
        let sharedModule = api.require('shareAction')
        sharedModule.share({
          text: that.data.url,
          type: 'text'
        })
      }
    }
  }
</script>

<style lang="less">
@import "../../assets/mall/style/_Variables";
.pull-new{
  width: 100%;
  height: 100%;
  .pull-body{
    margin-top: @margin-top;
    width: 100%;
    height: calc(100% - @margin-top);
    overflow-y: auto;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .pull-contant{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      div:first-child{
        position: absolute;
        bottom: 21%;
        left: 50%;
        margin-left: -1.215rem;
        img{
          width: 2.43rem;
          height: .64rem;
        }
      }
      div:nth-child(2){
        position: absolute;
        bottom: 3%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 .6rem;
        box-sizing: border-box;
        img{
          width: 2.7rem;
          height: .84rem;
        }
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
