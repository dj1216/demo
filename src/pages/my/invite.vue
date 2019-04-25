<template>
    <div class="invite">
      <div class="box">
        <div class="swiperBox">
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide v-for="(item, index) in imgs" :key="index" :class="{active:index === 0, shadow:true}">
              <!--<img :src="item.article_banner" style="width: 100%;height: 100%">-->
              <!--<div>-->
              <img :src="item" alt="" @click="showBig(index)">
                <!--<div class="banner" :style="{backgroundImage: 'url('+ item +')'}">-->
                  <!--<img :src="item" alt="">-->
                <!--</div>-->
              <!--</div>-->
            </swiper-slide>
          </swiper>
          <!--<div class="swiper-pagination"></div>-->
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
        <div class="info" v-if="data.appDownRules">
          <div class="t"><span>邀请规则</span></div>
          <div v-html="data.appDownRules" class="rules"></div>
          <!--<p class="rule">1. 专属海报中的二维码已包含您的邀请码信息</p>-->
          <!--<p class="rule">2. 好友通过您的二维码海报下载APP并注册成为会员后，Ta即永久成为您的粉丝，未来Ta升级市场运营或领券下单时产生的奖励收入</p>-->
          <!--<p class="rule">3. 通过您注册的所有用户领券下单并确认收货后，您均将获得相应的消费佣金奖励。</p>-->
        </div>
      </div>
      <div class="footer" :style="{bottom: h}">
      <!--<div class="footer" >-->
        <!--<span  @click="keepImgs"><img src="../../assets/img/my/down.png" alt="">保存图片</span>-->
        <p @click="showShare(1)">分享邀请链接</p>
        <p @click="showShare(2)">分享邀请海报</p>
      </div>
      <div class="share_to" v-transfer-dom>
        <div class="weui-mask" @click="showToast = false" v-if="showToast"  ></div>
        <div class="classBox"  v-if="showToast"  >
          <div><img src="../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
          <div><img src="../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
          <div><img src="../../assets/img/home/goods/qq.png" alt="" @click="shareQq()"><p>QQ</p></div>
          <!--<div><img src="../../assets/img/auth/QQk.png" alt="" @click="shareQq()"><p>QQ空间</p></div>-->
        </div>
      </div>
      <div class="bigSwiper" v-if="bigSwiper">
        <div class="weui-mask" v-if="bigSwiper"></div>
        <swiper :options="swiperOption1" class="swiperList" ref="swiperList">
          <swiper-slide v-for="(item, index) in imgs" :key="index" >
            <img :src="item" alt="" @click="hideBig">
          </swiper-slide>
        </swiper>
        <img src="../../assets/img/my/downLoad.png" alt="" class="downLoad" @click.stop="downImg">
      </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {XDialog, TransferDomDirective as TransferDom} from 'vux'
let imgIndex = 0
export default {
  name: 'invite',
  components: {
    swiper,
    swiperSlide,
    XDialog
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      bigSwiper: false,
      imgs: [],
      info: this.$store.state.user.userInfo,
      arr: [],
      index: 0,
      showToast: false,
      // h: api.safeArea.bottom + 'px',
      h: 0 + 'px',
      swiperOption: {
        effect: 'coverflow',
        width: 220,
        coverflowEffect: {
          rotate: 2,
          stretch: -15,
          depth: 80,
          modifier: 2,
          slideShadows: false
        },
        on: {
          transitionEnd: function () {
            imgIndex = this.activeIndex
          }
        }
      },
      downImgIndex: 0,
      swiperOption1: {
        on: {
          transitionEnd: () => {
            if (this.$refs.swiperList.swiper) {
              this.downImgIndex = this.$refs.swiperList.swiper.activeIndex
            }
          }
        }
      },
      type: '',
      data: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.showToast = false
    next()
  },
  methods: {
    hideBig () {
      this.bigSwiper = false
    },
    showBig (index) {
      this.swiperOption1.initialSlide = index
      this.downImgIndex = index
      this.$nextTick(() => {
        this.bigSwiper = true
      })
    },
    downImg () {
      const that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgs[this.downImgIndex],
        savePath: 'fs://' + format,
        report: true,
        cache: true,
        allowResume: true
      }, function (ret, err) {
        if (ret.state === 1) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if (ret && ret.status) {
              console.log('相册成功：' + JSON.stringify(ret))
              that.$vux.toast.text('保存成功')
            } else {
              console.log('相册失败：' + JSON.stringify(err))
            }
          })
          console.log('成功：' + JSON.stringify(ret))
        } else {
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    },
    shareFri (type) {
      let that = this
      this.showToast = false
      let way = type === 1 ? 'session' : 'timeline'
      if (that.type === 1) {
        let format = 'share' + new Date().getTime() + '.png'
        api.download({
          url: that.data.appDownLogo,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          var wx = api.require('wx')
          wx.shareWebpage({
            scene: way,
            title: that.data.appDownTitle,
            description: that.data.appDownDesc,
            thumb: 'fs://' + format,
            contentUrl: that.data.downloadUrl
          }, function (ret, err) {
            that.$http.post('/amoy/task/collection', {}, false, true).then()
            // if (ret.status) {
            //   alert('分享成功')
            // } else {
            //   alert(err.code)
            // }
          })
        })
      } else {
        that.$vux.loading.show({
          text: '加载中'
        })
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
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
            that.$http.post('/amoy/task/collection', {}, false, true).then()
          })
        })
      }
    },
    shareQq () {
      let that = this
      this.showToast = false
      if (that.type === 1) {
        let sharedModule = api.require('shareAction')
        sharedModule.share({
          text: that.data.downloadUrl,
          type: 'text'
        })
      } else {
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
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
    },
    showShare (type) {
      this.type = type
      this.showToast = true
    },
    getSwiper () {
      this.$http.post('/amoy/user/invite', {}, true, true).then(res => {
        if (res.code === 0) {
          this.imgs = []
          res.data.img.forEach((item) => {
            this.imgs.push(this.link + '/amoy/user/invite?tpl=' + item + '&uid=' + this.info.uid + '&invite_code=' + this.info.invite_code)
          })
          this.data = res.data
        }
      })
    },
    keepImgs () {
      const that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      that.$vux.loading.show({
        text: '保存中...'
      })
      api.download({
        url: that.imgs[imgIndex],
        savePath: 'fs://' + format,
        report: true,
        cache: true,
        allowResume: true
      }, function (ret, err) {
        if (ret.state === 1) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if (ret && ret.status) {
              that.$vux.loading.hide()
              console.log('相册成功：' + JSON.stringify(ret))
              that.$vux.toast.text('保存成功')
            } else {
              console.log('相册失败：' + JSON.stringify(err))
            }
          })
          console.log('成功：' + JSON.stringify(ret))
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    },
    share () {
      let that = this
      that.$vux.loading.show({
        text: '加载中'
      })
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgs[imgIndex],
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
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    }
  },
  mounted () {
    // let baseApiUrl = window.location.host
    // if (baseApiUrl.indexOf('192.168') !== -1 || baseApiUrl.indexOf('localhost') !== -1) {
    // } else {
    //   let This = this
    //   api.setStatusBarStyle({
    //     style: 'light',
    //     color: This.colorInfo[0]
    //   })
    // }
    this.getSwiper()
  },
  activated () {
    this.getSwiper()
  }
}
</script>
<style lang="less">
  .my-bullet{
    border-radius: 5px;
    width: 10px;
    height: 10px;
    margin: 0 .1rem;
    display: inline-block;
    background-color: #fff;
    border: 1px solid #fc3357;
  }
  .my-bullet-active{
    background: #fc3357;
  }
  .invite .swiper-pagination{
    bottom: -1.1rem;
  }
.invite{
  .vux-indicator-right{
    left: 0;
    right: 0;
    text-align: center;
    font-size: .3rem;
    a{
      float: none !important;
      font-size: .3rem;
    }
  }
  .swiper-pagination{
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    li{
      margin: 0 6px;
    }
    .swiper-pagination-bullet{
      border: 1px solid red;
      opacity: 1;
      background-color: #fff;
    }
    .swiper-pagination-bullet-active{
      background-color: red;
    }
  }
}
  .share_to{
    background: #fff;
    position: relative;
    width: 100%;
    .classBox{
      border-top: 1px solid #f9f6f6;
      z-index: 100000;
      position: fixed;
      bottom: 0;
      height: 2rem;
      width: 7.5rem;
      display: flex;
      background: #fff;
      border-radius: 0;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: .9rem;
          height: .9rem;
        }
        p{
          margin-top: .2rem;
          color: #666;
          font-size: .26rem;
        }
      }
    }
  }
  .bigSwiper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    .weui-mask{
      background: #000;
    }
    .swiperList{
      z-index: 1001;
      position: absolute;
      left: 0;
      right: 0;
      top: 2rem;
      bottom: 0.6rem;
      .swiper-slide{
        text-align: center;
        img{
          width: auto;
          height: 100%;
        }
      }
    }
    .downLoad{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.5rem !important;
      z-index: 10001;
      padding: 0.4rem;
    }
  }
</style>
<style scoped lang="less">
  .active{
    margin-left: 1.4rem;
  }
  .shadow{
    box-shadow:0 21px 36px -3px #EAEAEA;;
  }
  .swiperBox{
    position: relative;
    margin-bottom: 0.5rem;
    .swiper{
      margin-top: 0.2rem;
      margin-bottom: 0.4rem;
    }
    .swiper-pagination{
      width: 200px;
    }
    .swiper-slide{
      img{
        float: left;
      }
    }
  }
.invite{
  background: #fff;
  height: 100%;
  position: relative;
  .rules{
    padding: 0 .2rem;
    img{
      max-width: 100% !important;
    }
  }
  .box{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 1.3rem;
    overflow-y: auto;
  }
  img{
    width: 100%;
  }
  .footer{
    border-top: 1px solid #f9f6f6;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0 .2rem;
    span{
      display: inline-block;
      color: #666;
      img{
        width: .28rem;
        height: .28rem;
        margin-right: .1rem;
      }
    }
    p{
      /*color: #fff;*/
      display: flex;
      align-items: center;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      color: #fff;
      padding: 0 .3rem;
      border-radius: .4rem;
      img{
        width: .34rem;
        margin-right: .1rem;
      }
    }
    p:first-of-type{
      background: url("../../assets/img/my/save.png");
    }
    p:last-of-type{
      background: url("../../assets/img/my/sharebg.png");
    }
  }
  .rule{
    font-size: .24rem;
    color: #666;
    line-height: .36rem;
    padding: 0 .3rem;
  }
  .t{
    margin: .2rem 0;
    font-size: .3rem;
    text-align: center;
    position: relative;
    img{
      width: .32rem;
      height: .27rem;
      margin-right: .2rem;
    }
    span{
      font-size: .3rem;
      color: #666;
    }
  }
  .t:before{
    content: '';
    position: absolute;
    left: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
  .t:after{
    content: '';
    position: absolute;
    right: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
}
</style>
