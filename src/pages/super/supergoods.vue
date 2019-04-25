<template>
  <div id="goods" ref="goods" v-if="other">
      <span class="goBack" @click="goodsBack" :style="{top: h + 'rem'}" v-if="showBack">
        <img src="../../assets/img/super/back.png" alt="">
      </span>
    <div class="vux-header" :style="{backgroundColor: opacity,paddingTop: h + 'rem'}" v-show="!showBack">
      <div class="vux-header-left" :style="{top: h + 'rem'}">
        <div class="left-arrow" style="display: none;"></div> <a v-if="!showBack" @click="goodsBack" class="backBox"><i class="iconfont icon-back"></i></a></div>
      <h1 class="vux-header-title" v-if="!showBack"><span class="titleInfo" @click="scrollTo(1)">宝贝</span><span class="titleInfo" @click="scrollTo(2)">详情</span><span class="titleInfo" @click="scrollTo(3)" v-if="this.type === 0 || this.type === 1">推荐</span></h1>
    </div>
    <div id="box" ref="box">
      <div class="goods_carousel" ref="swiper">
        <img :src="$img" alt="" v-if="!other.small_images || other.small_images.length === 0">
        <!--<swiper :show-dots="false" :aspect-ratio="750/750" v-model="index"  v-else>-->
          <!--<swiper-item class="goods_swiper" v-for="(item, index) in other.small_images" :key="index" ><img v-lazy="item"  @click="show(index)" :key="item"></swiper-item>-->
        <!--</swiper>-->
        <swiper :options="swiperOption" ref="smallImages">
          <swiper-slide class="goods_swiper" v-for="(item, index) in other.small_images" :key="index">
            <img v-lazy="item" :key="item">
          </swiper-slide>
        </swiper>
        <p class="goods_page_box" v-if="other.small_images && other.small_images.length"><span>{{index + 1}}</span>/{{other.small_images.length}}</p>
      </div>
      <div class="goodsInst">
        <div class="title"  @click="copyTitle(other.title, '宝贝标题已复制')"><img src="../../assets/img/home/tblogo.png" alt="" v-if="Number(other.type) === 11">
          <img src="../../assets/img/home/tmlogo.png" alt="" v-else-if="Number(other.type) === 12">
          <img src="../../assets/img/home/jdlogo.png" alt="" v-if="Number(other.type) === 21">
          <img src="../../assets/img/home/pddlogo.png" alt="" v-else-if="Number(other.type) === 31">{{other.title}}</div>
        <p class="numBox">{{other.volume}}人已购买</p>
        <div class="priceBox">
          <div class="price"><p class="new" :style="{color: $store.state.global.theme.mainColor}"><span>￥</span>{{other.coupon_price}}</p><p class="old">￥{{other.zk_final_price}}</p></div>
          <div class="profit"  :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">预估收益￥{{other.commission_money}}</div>
        </div>
        <div class="update" v-if="other.level_commission_money" @click="jumpTo('/freeUpgrade')">
          <p :style="{color: $store.state.global.theme.mainColor}">现在升级运营商，最高获得{{other.level_commission_money}}佣金</p><span :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">立即升级</span>
        </div>
        <div class="coupon" @click="tobuy" v-if="other.coupon_money">
          <img src="../../assets/img/home/goods/couponBg.png" alt="">
          <p class="money" v-if="Number(other.coupon_money) >= 99" style="font-size: 0.8rem">{{Number(other.coupon_money)}}<span style="font-size: 0.3rem">元</span></p>
          <p class="money" v-else >{{Number(other.coupon_money)}}<span>元</span></p>
          <p class="time" v-if="other.coupon_start_at">使用期限 {{other.coupon_start_at}}-{{other.coupon_end_at}}</p>
        </div>
        <div class="description" @click="copyTitle(other.description, '推荐理由已复制')" v-if="other.description"><span :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">推荐</span>{{other.description}}</div>
        <!--宝贝评论-->
      </div>
      <div class="commentBox" v-if="other && other.rate">
        <p>宝贝评论({{other.rate.totalCount}})</p> <p class="checkAll" @click="lookRate">查看全部</p>
      </div>
      <template v-if="other && other.rate && other.rate.rateList">
        <div class="commentContent"  v-for="(item, index) of other.rate.rateList" :key="index">
          <div class="titlee">
            <div class="head">
              <img :src="'http:'+ item.headPic" alt="">
            </div>
            <div class="username">{{item.userName}}</div>
          </div>
          <p class="size">{{item.dateTime}}  {{item.skuInfo}}</p>
          <p class="text">{{item.content}}</p>
          <div class="imgbox" >
            <img :src="'http:'+ img" alt="" v-for="(img, i) of item.images" :key="i">
          </div>
        </div>
      </template>
      <div class="shopBoxInfo">
        <img class="shopLogo" src="../../assets/img/home/pddshop.png" alt="" v-if="type === 3">
        <img class="shopLogo" src="../../assets/img/home/jdshop.png" alt="" v-else-if="type === 2">
        <img class="shopLogo" v-else-if="other.shopIcon" v-lazy="other.shopIcon" alt="" :key="other.shopIcon">
        <img class="shopLogo" v-else-if="Number(other.type) === 11" src="../../assets/img/home/tbshop.png" alt="">
        <img class="shopLogo" v-else-if="Number(other.type) === 12" src="../../assets/img/home/tmshop.png" alt="">
        <div class="shopInfo">
          <div class="title">
            <p>{{other.shopName}}</p>
            <span v-if="other.shopUrl && !$route.query.from" @click="joinShop(other.shopUrl)" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">进店逛逛</span>
          </div>
          <div class="score" v-if="other.score">
            <p>宝贝描述<span  :style="{color: $store.state.global.theme.mainColor}">{{other.score[0]}}</span></p>
            <p>卖家服务<span  :style="{color: $store.state.global.theme.mainColor}">{{other.score[1]}}</span></p>
            <p>物流服务<span  :style="{color: $store.state.global.theme.mainColor}">{{other.score[2]}}</span></p>
          </div>
        </div>
      </div>
      <div class="detailTitle" ref="detail" >
        <img src="../../assets/img/home/goods/detail.png" alt="">
      </div>
      <div class="detail" v-if="showDetail && type !== 3 && type !== 2 && other.info_img"  ref="detailBox">
        <div v-for="(item, index) of other.info_img" :key="index" v-html="item"></div>
      </div>
      <div class="detail" v-else-if="showDetail && type === 3 && other && other.description" ref="detailBox">
        <p class="pddCon" v-html="other.description"></p>
        <img v-for="(item, index) of other.small_images" v-lazy="item" alt="" :key="index">
      </div>
      <div class="detail" v-else-if="showDetail && type === 2 && other && other.info_img" ref="detailBox">
        <img v-for="(item, index) of other.info_img" v-lazy="item" alt="" :key="index">
      </div>
      <div class="goods_like_box" ref="likes"  v-if="this.type === 0 || this.type === 1">
        <img src="../../assets/img/home/goods/likes.png" alt="">
      </div>
      <goods-item v-bind:list = like styles=true @detail="detail"></goods-item>
    </div>
    <div class="footer">
      <div class="collect" @click="collect" v-if="collectStatus === 1">
        <i :style="{color: $store.state.global.theme.mainColor}"  class="iconfont icon-shoucang1"></i>
        <p :style="{color: $store.state.global.theme.mainColor}" >已收藏</p>
      </div>
      <div class="collect" @click="collect" v-else>
        <i style="color: #666"  class="iconfont icon-shoucang2"></i>
        <p>收藏</p>
      </div>
      <div class="otherBox">
        <div class="Box" @click="share">分享奖励<span>￥</span>{{other.commission_money}}</div>
        <div class="Box" @click="tobuy">领券购买<span>￥</span>{{other.commission_money}}</div>
      </div>
    </div>
    <div class="goods_back_top_box" @click="backTop()" v-show="backShow"></div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="oauthBox">
        <div class="update">
          <img src="../../assets/img/oauth.png" alt="" class="bg">
          <div class="contentBox">
            <div class="add">
              <p class="t" >淘宝渠道认证</p>
              <div class="info" >由于淘宝需要对渠道加强精细化管理，邀请您进行淘宝身份认证操作，届时没有进行身份认证得，将可能无法分享推广淘宝商品功能，请您提前认证。</div>
            </div>
            <div class="update_btn" ><span @click="showToast1 = false" >稍后再说</span><span @click="oauth">马上认证</span></div>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {XImg, Previewer, TransferDom, dateFormat, XDialog} from 'vux'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'goods',
  data () {
    return {
      showToast1: false,
      showBack: true,
      opacity: 'rgba(255, 255, 255, 0)',
      shows: false,
      data: '',
      index: 0,
      imgs: [],
      type: '',
      url: ['/amoy/taobao/goods-item', '/amoy/taobao-buy/item-info', '/amoy/jd/details', '/amoy/pdd/goods-detail'],
      other: utils.storage.get('supergoods')[this.$route.query.i],
      collectStatus: '',
      like: '',
      width: '',
      showDetail: true,
      backShow: false,
      loading: null,
      skip: null,
      save: null,
      getCouponUrl: true,
      swiperOption: {
        loop: true,
        on: {
          transitionEnd: () => {
            if (this.$refs.smallImages.swiper) {
              this.index = this.$refs.smallImages.swiper.activeIndex
            }
          },
          sliderMove: function (event) {
            window.canRightSlipBack = false
          },
          touchEnd: function (event) {
            window.canRightSlipBack = true
          }
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.showDetail = true
      this.getCouponUrl = true
      this.other = utils.storage.get('supergoods')[this.$route.query.i]
      if (!this.other.coupon_url) {
        this.getInfo()
      }
      this.$nextTick(() => {
        this.backTop()
      })
    }
  },
  computed: {
    h () {
      let size = (document.documentElement.clientWidth / 7.5)
      let hight = api.safeArea.top >= 30 ? api.safeArea.top + 5 : api.safeArea.top
      return (hight / size)
      // return 1
    }
  },
  filters: {
    dateFormat
  },
  directives: {
    TransferDom
  },
  components: {
    swiper,
    swiperSlide,
    XImg,
    Previewer,
    GoodsItem,
    XDialog
  },
  methods: {
    lookRate () {
      let that = this
      let browser = api.require('webBrowser')
      browser.open({
        url: 'https://h5.m.taobao.com/app/rate/www/rate-list/index.html?auctionNumId=' + that.$route.query.id,
        titleBar: {
          textColor: '#333',
          bg: '#fff'
        }
      })
    },
    joinShop (url) {
      let that = this
      api.openWin({
        name: 'aliWin',
        url: '../html/main.html',
        reload: true,
        pageParam: {
          url: url,
          back: '/supergoods?type=' + that.$route.query.type + '&id=' + that.$route.query.id + '&i=0&way=1'
        },
        animation: {
          type: 'push',
          subType: 'from_right',
          duration: 300
        },
        bounces: false,
        slidBackEnabled: false,
        allowEdit: true
      })
    },
    goodsBack () {
      if (this.$route.query.from === 'ali') {
        utils.storage.set('supergoods', [{}])
        this.$router.go(-1)
        api.openWin({
          name: 'aliWin',
          animation: {
            type: 'push',
            subType: 'from_left',
            duration: 300
          }
        })
      } else if (this.$route.query.from === 'cart') {
        utils.storage.set('supergoods', [{}])
        this.$router.go(-1)
        api.openWin({
          name: 'cartWin',
          animation: {
            type: 'push',
            subType: 'from_left',
            duration: 300
          }
        })
      } else if (this.$route.query.from === 'home') {
        this.$router.push('/home')
      } else {
        this.$router.go(-1)
      }
    },
    scrollTo (position) {
      if (position === 1) {
        this.$refs.box.scrollTop = this.$refs.swiper.offsetTop
      } else if (position === 2) {
        this.$refs.box.scrollTop = this.$refs.detail.offsetTop - 100
      } else if (position === 3) {
        this.$refs.box.scrollTop = this.$refs.likes.offsetTop - 100
      }
    },
    handleScroll () {
      let offsetTop = this.$refs.box ? this.$refs.box.scrollTop : 10
      let w = document.documentElement.clientWidth
      this.opacity = 'rgba(255, 255, 255,' + offsetTop / (w - w * 0.88 / 7.5) + ')'
      this.showBack = !(offsetTop / (w - w * 0.88 / 7.5) > 0.05)
      this.backShow = offsetTop > w
      if ((this.type === 0 || this.type === 1) && offsetTop > 10) {
        if (offsetTop < this.$refs.detail.offsetTop - 100) {
          if (document.getElementsByClassName('titleInfo')[0]) {
            document.getElementsByClassName('titleInfo')[0].style.color = this.$store.state.global.theme.mainColor
            document.getElementsByClassName('titleInfo')[1].style.color = '#333'
            document.getElementsByClassName('titleInfo')[2].style.color = '#333'
          }
        } else if (offsetTop >= this.$refs.detail.offsetTop - 100 && offsetTop < this.$refs.likes.offsetTop - 100) {
          document.getElementsByClassName('titleInfo')[1].style.color = this.$store.state.global.theme.mainColor
          document.getElementsByClassName('titleInfo')[0].style.color = '#333'
          document.getElementsByClassName('titleInfo')[2].style.color = '#333'
        } else {
          document.getElementsByClassName('titleInfo')[2].style.color = this.$store.state.global.theme.mainColor
          document.getElementsByClassName('titleInfo')[1].style.color = '#333'
          document.getElementsByClassName('titleInfo')[0].style.color = '#333'
        }
      } else if (offsetTop > 10) {
        if (offsetTop < this.$refs.detail.offsetTop - 100) {
          if (document.getElementsByClassName('titleInfo')[0]) {
            document.getElementsByClassName('titleInfo')[0].style.color = this.$store.state.global.theme.mainColor
            document.getElementsByClassName('titleInfo')[1].style.color = '#333'
          }
        } else if (offsetTop >= this.$refs.detail.offsetTop - 100) {
          document.getElementsByClassName('titleInfo')[1].style.color = this.$store.state.global.theme.mainColor
          document.getElementsByClassName('titleInfo')[0].style.color = '#333'
        }
      }
    },
    collect () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      if (this.other.coupon_url) {
        this.$http.post('/amoy/user/collection', {
          origin_id: this.$route.query.id,
          status: 1,
          coupon_money: this.other.coupon_money ? this.other.coupon_money : 0,
          good_image: this.other.thumb,
          sales_num: this.other.volume,
          item_url: this.other.coupon_url,
          coupon_price: this.other.coupon_price,
          origin_price: this.other.zk_final_price,
          title: this.other.title,
          type: this.$route.query.type
        }, true).then(res => {
          this.collectStatus = Number(res.data.collectStatus)
        })
      } else {
        this.save = true
        this.$store.commit('show')
      }
    },
    detail (item) {
      let arr = utils.storage.get('supergoods')
      arr.splice((Number(this.$route.query.i) + 1), 1, item)
      utils.storage.set('supergoods', arr)
      this.$router.push('/supergoods?type=' + this.$route.query.type + '&id=' + item.origin_id + '&i=' + (Number(this.$route.query.i) + 1))
    },
    oauth () {
      let that = this
      if (that.$aliPay === 1) {
        let aliBC = api.require('aliBC')
        aliBC.asyncInit({
        }, function (ret, err) {
          if (ret.status) {
            aliBC.showLogin(function (ret, err) {
              if (ret.status) {
                api.openWin({
                  name: 'oauth',
                  url: '../html/oauth.html',
                  reload: true,
                  pageParam: {
                    url: that.other.oauth_url,
                    back: '/supergoods?type=' + that.$route.query.type + '&id=' + that.$route.query.id + '&i=0&way=1'
                  },
                  animation: {
                    type: 'push',
                    subType: 'from_right',
                    duration: 300
                  },
                  bounces: false,
                  slidBackEnabled: false,
                  allowEdit: true
                })
              } else {
                that.$vux.toast.text(err.message)
              }
            })
          }
        })
      } else {
        let browser = api.require('webBrowser')
        browser.open({
          url: that.other.oauth_url,
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    },
    tobuy () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      if (that.other.coupon_url) {
        if (this.type === 0 || this.type === 1) {
          // alert(this.other.rid)
          // alert(this.other.oauth_url)
          if (this.other.rid === '' && this.other.oauth_url !== '') {
            this.showToast1 = true
          } else if (that.$aliPay === 1) {
            let aliBC = api.require('aliBC')
            aliBC.asyncInit({
            }, function (ret, err) {
              if (ret.status) {
                aliBC.showLogin(function (ret, err) {
                  if (ret.status) {
                    aliBC.showPageByUrl({
                      url: that.other.coupon_url,
                      openType: 'native'
                    })
                  } else {
                    that.$vux.toast.text(err.message)
                  }
                })
              }
            })
          } else {
            let browser = api.require('webBrowser')
            browser.open({
              url: that.other.coupon_url,
              titleBar: {
                textColor: '#333',
                bg: '#fff'
              }
            })
          }
        } else if (this.type === 2) {
          if (api.systemType === 'ios') {
            api.appInstalled({
              appBundle: 'openApp.jdMobile://'
            }, function (ret, err) {
              if (ret.installed) {
                window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + that.other.coupon_url + '"}')
              } else {
                let browser = api.require('webBrowser')
                browser.open({
                  url: that.other.coupon_url,
                  titleBar: {
                    textColor: '#333',
                    bg: '#fff'
                  }
                })
              }
            })
          } else {
            let browser = api.require('webBrowser')
            browser.open({
              url: that.other.coupon_url,
              titleBar: {
                textColor: '#333',
                bg: '#fff'
              }
            })
            window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + that.other.coupon_url + '"}')
            // api.appInstalled({
            //   appBundle: 'com.jingdong.app.mall'
            // }, function (ret, err) {
            //   if (ret.installed) {
            //     // window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + that.other.coupon_url + '"}')
            //     window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + that.other.coupon_url + '"}')
            //   } else {
            //     let browser = api.require('webBrowser')
            //     browser.open({
            //       url: that.other.coupon_url,
            //       titleBar: {
            //         textColor: '#333',
            //         bg: '#fff'
            //       }
            //     })
            //   }
            // })
            // window.open('openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"' + that.other.coupon_url + '"}')
          }
        } else {
          let browser = api.require('webBrowser')
          browser.open({
            url: that.other.coupon_url,
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
        }
      } else if (this.getCouponUrl) {
        this.skip = true
        this.$vux.loading.show({
          text: '领券链接生成中'
        })
      } else {
        that.$vux.toast.text('优惠券链接获取失败')
      }
    },
    share () {
      if (this.other.coupon_url) {
        if (this.type === 0 || this.type === 1) {
          if (this.other.rid === '' && this.other.oauth_url !== '') {
            this.showToast1 = true
          } else {
            this.$router.push('/share?type=' + this.$route.query.type + '&id=' + this.$route.query.id + '&i=' + Number(this.$route.query.i))
          }
        }
      } else if (this.getCouponUrl) {
        if (this.type === 0 || this.type === 1) {
          this.loading = true
          this.$vux.loading.show({
            text: '淘口令生成中'
          })
        } else {
          this.loading = true
          this.$vux.loading.show({
            text: '领券链接生成中'
          })
        }
      } else {
        this.$vux.toast.text('优惠券链接获取失败')
      }
    },
    backTop () {
      let body = document.getElementById('box')
      let time = ''
      time = setInterval(() => {
        let scroll = body.scrollTop
        let speed = Math.floor(scroll / 10)
        if (speed <= 5) {
          body.scrollTop = 0
          clearInterval(time)
        } else {
          body.scrollTop = scroll - speed
        }
      }, 10)
    },
    local (item) {
      let arr = utils.storage.get('supergoods')
      arr.splice((Number(this.$route.query.i)), 1, item)
      utils.storage.set('supergoods', arr)
    },
    getInfo () {
      if (this.type === 0 || this.type === 1) {
        let info
        if (this.$route.query.way || !this.other.title) {
          info = {
            item_id: this.$route.query.id,
            detail: 1
          }
        } else {
          info = {
            item_id: this.$route.query.id
          }
        }
        this.$http.post('/amoy/taobao/goods-detail', {
          item_id: this.$route.query.id
        }, true).then(res => {
          // let srcReg = /src=['"]?([^'"]*)['"]?/i
          // let arr = res.data.info_img[0].match(srcReg)
          // console.log(arr)
          for (let i in res.data) {
            this.$set(this.other, i, res.data[i])
          }
          if (!this.other.small_images || this.other.small_images.length === 0) {
            this.$set(this.other, 'small_images', res.data.images)
          }
          this.local(this.other)
        })
        this.$http.post('/amoy/taobao/goods-item', info, false, true).then(res => {
          if (res.code === 0) {
            if (this.$route.query.way || !this.other.title) {
              for (let i in res.data) {
                if (i !== 'small_images') {
                  this.$set(this.other, i, res.data[i])
                } else if (i === 'small_images' && (!this.other.small_images || this.other.small_images.length === 0)) {
                  this.$set(this.other, i, res.data[i])
                }
              }
            } else {
              this.$set(this.other, 'oauth_url', res.data['oauth_url'])
              this.$set(this.other, 'rid', res.data['rid'])
              this.$set(this.other, 'tbk_pwd', res.data['tbk_pwd'])
              this.$set(this.other, 'coupon_url', res.data['coupon_url'])
            }
            this.local(this.other)
            if (this.loading) {
              this.$vux.loading.hide()
              this.$router.push('/share?type=' + this.$route.query.type + '&id=' + this.$route.query.id + '&i=' + Number(this.$route.query.i))
            }
            if (this.skip) {
              this.$vux.loading.hide()
              this.tobuy()
            }
            this.getCollect()
          } else {
            this.$vux.toast.text(res.msg)
            if (this.loading) {
              this.$vux.loading.hide()
            }
            if (this.skip) {
              this.$vux.loading.hide()
            }
            this.getCouponUrl = false
          }
        })
      } else if (this.type === 2) {
        this.$set(this.other, 'small_images', [this.other.thumb])
        this.$http.post('/amoy/jd/detail', {
          item_id: this.$route.query.id
        }, true).then(res => {
          if (res.code === 0) {
            this.$set(this.other, 'info_img', res.data)
            this.local(this.other)
          }
        })
        if (!this.$store.state.user.token) {
          return
        }
        this.$http.post('/amoy/jd/promotion-url', {
          item_id: this.$route.query.id,
          coupon_url: this.other.extras.coupon_url
        }, false, true).then(res => {
          if (res.code === 0) {
            this.other.coupon_url = res.data.shortURL
            this.local(this.other)
            if (this.loading) {
              this.$vux.loading.hide()
              this.$router.push('/share?type=' + this.$route.query.type + '&id=' + this.$route.query.id + '&i=' + Number(this.$route.query.i))
            }
            if (this.skip) {
              this.$vux.loading.hide()
              this.tobuy()
            }
            this.getCollect()
          } else {
            this.$vux.toast.text(res.msg)
            if (this.loading) {
              this.$vux.loading.hide()
            }
            if (this.skip) {
              this.$vux.loading.hide()
            }
            this.getCouponUrl = false
          }
        })
      } else if (this.type === 3) {
        this.$set(this.other, 'score', [this.other.shop.desc, this.other.shop.lgst, this.other.shop.serv])
        this.$set(this.other, 'shopIcon', this.other.thumb)
        this.$set(this.other, 'shopName', this.other.shop.name)
        this.$http.post('/amoy/pdd/goods-detail', {
          item_id: this.$route.query.id
        }, false, true).then(res => {
          if (res.code === 0) {
            for (let i in res.data) {
              this.$set(this.other, i, res.data[i])
            }
            this.$set(this.other, 'type', 31)
            this.local(this.other)
            if (this.loading) {
              this.$vux.loading.hide()
              this.$router.push('/share?type=' + this.$route.query.type + '&id=' + this.$route.query.id + '&i=' + Number(this.$route.query.i))
            }
            if (this.skip) {
              this.$vux.loading.hide()
              this.tobuy()
            }
            this.getCollect()
          } else {
            this.$vux.toast.text(res.msg)
            if (this.loading) {
              this.$vux.loading.hide()
            }
            if (this.skip) {
              this.$vux.loading.hide()
            }
            this.getCouponUrl = false
          }
        })
      }
    },
    getCollect () {
      if (!this.$store.state.user.token) {
        return
      }
      this.$http.post('/amoy/user/collection', {
        origin_id: this.$route.query.id,
        status: 2,
        coupon_money: this.other.coupon_money ? this.other.coupon_money : 0,
        good_image: this.other.thumb,
        sales_num: this.other.volume,
        item_url: this.other.coupon_url,
        coupon_price: this.other.coupon_price,
        origin_price: this.other.zk_final_price,
        title: this.other.title,
        type: this.$route.query.type
      }, false, true).then(res => {
        if (res.code === 0) {
          this.collectStatus = Number(res.data.collectStatus)
          if (this.save) {
            this.$store.commit('hide')
            this.collect()
          }
        }
      })
    },
    getLike () {
      this.$http.post('/amoy/hao/guess-like', {
        id: this.$route.query.id
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].zk_final_price = res.data[i].origin_price
        }
        this.like = res.data
      })
    },
    copyTitle (title, text) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: title
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', title)
          that.$vux.toast.text(text, 'center')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    }
  },
  created () {
    this.getCouponUrl = true
    this.width = document.documentElement.clientWidth
    let t = Number(this.$route.query.type)
    if (t === 11) {
      this.type = 0
      this.getLike()
    } else if (t === 12) {
      this.type = 1
      this.getLike()
    } else if (t === 21) {
      this.type = 2
    } else if (t === 31) {
      this.type = 3
    }
  },
  mounted () {
    if (!this.other.coupon_url) {
      this.getInfo()
    }
    window.addEventListener('scroll', this.handleScroll, true)
    document.getElementsByClassName('footer')[0].style.paddingBottom = api.safeArea.bottom + 'px'
    let size = (document.documentElement.clientWidth / 7.5)
    document.getElementsByClassName('goods_back_top_box')[0].style.bottom = (api.safeArea.bottom / size) + 1.4 + 'rem'
    let that = this
    api.addEventListener({
      name: 'oauthEnd'
    }, function (ret, err) {
      that.showToast1 = false
      that.$vux.toast.text('认证成功')
      that.$http.post('/amoy/taobao/goods-item', {item_id: that.$route.query.id}, true, true).then(res => {
        if (res.code === 0) {
          that.$set(that.other, 'oauth_url', res.data['oauth_url'])
          that.$set(that.other, 'rid', res.data['rid'])
          that.$set(that.other, 'tbk_pwd', res.data['tbk_pwd'])
          that.$set(that.other, 'coupon_url', res.data['coupon_url'])
        }
      })
    })
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less">
  .oauthBox{
    .weui-dialog{
      max-width: 5.1rem !important;
      width: 5.1rem !important;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.7);
    }
    .weui-dialog{
      background: none;
    }
    .update{
      position: relative;
      /*left: 50%;*/
      /*top: 50%;*/
      /*transform: translate(-50%, -50%);*/
      width: 5.1rem;
      overflow: hidden;
      border-radius:0.2rem;
      .bg{
        width: 100%;
        float: left;
      }
      .contentBox{
        width: 100%;
        float: left;
        background: #fff;
        padding: 0 0.4rem 0.4rem;
        box-sizing: border-box;
        /*border-radius:  0 0 0.2rem 0.2rem;*/
      }
      .add{
        width: 100%;
        p{
          text-align: center;
          color: #666;
        }
        .t{
          font-size: .36rem;
          color: #333333;
        }
        .info{
          margin-top: .2rem;
          font-size: .24rem;
          color: #333333;
          text-align: left;
        }
        img{
          margin-top: .6rem;
          width: .76rem;
          height: .76rem;
        }
      }
      .update_btn{
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-around;
        span{
          display: inline-block;
          width: 2rem;
          height: .6rem;
          border-radius: .3rem;
          text-align: center;
          background: #E5E5E5;
          line-height: .6rem;
          font-size: .3rem;
          color: #999;
        }
        span:last-of-type{
          color: #fff;
          background: linear-gradient(to right, #D456FF, #7468FF);
        }
      }
      .close{
        width: .76rem;
        height: .76rem;
        position: absolute;
        bottom: -0.76rem;
        left: 50%;
        margin-left: -0.38rem;
      }
    }
  }
</style>
<style lang="less" scoped>
  #goods{
    .vux-header{
      .vux-header-title{
        display: flex;
        justify-content: space-around;
        span{
          font-size: .3rem;
          color: #333;
        }
      }
    }
    .goodsInst{
      background: #fff;
      padding: 0.2rem;
      .title{
        font-size: .32rem;
        line-height: .48rem;
        //font-weight: bold;
        overflow: hidden;
        display: -webkit-inline-box;
        text-overflow:ellipsis;
        -webkit-line-clamp: 2;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        img{
          width: .33rem;
          height: .33rem;
          vertical-align: top;
          margin-right: .09rem;
          margin-top: .06rem;
        }
      }
      .numBox{
        margin-top: 0.1rem;
        font-size: 0.22rem;
        color: #999;
      }
      .priceBox{
        display: flex;
        justify-content: space-between;
        .price{
          display: flex;
          align-items: center;
          .new{
            font-size: .36rem;
            margin-right: 0.16rem;
            span{
              font-size: 0.24rem;
            }
          }
          .old{
            font-size: 0.26rem;
            color: #999999;
            text-decoration: line-through;
          }
        }
        .profit{
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 0.26rem;
          padding: 0 0.1rem;
          height: 0.44rem;
          border-radius: 0.06rem;
        }
      }
      .update{
        margin-top: 0.3rem;
        height: 0.62rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.1rem;
        background: rgba(255, 199, 0, 0.15);
        border-radius: 0.06rem;
        p{
          font-size: 0.24rem;
        }
        span{
          padding: 0 0.1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.2rem;
          color: #fff;
          font-size: 0.2rem;
        }
      }
      .coupon{
        margin: 0.2rem 0.4rem;
        position: relative;
        height: 1.6rem;
        .bg{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .money{
          position: absolute;
          left: 0.4rem;
          top: 0;
          font-size: 1rem;
          color: #fff;
          line-height: 1.2rem;
          span{
            font-size: 0.3rem;
          }
        }
        .time{
          position: absolute;
          left: 0.4rem;
          bottom: 0;
          color: #fff;
          font-size: 0.2rem;
        }
      }
      .description{
        background: #F7F7F7;
        border-radius: 0.06rem;
        font-size: 0.24rem;
        margin-top: 0.2rem;
        padding: 0.1rem;
        span{
          display: inline-block;
          line-height: 0.34rem;
          color: #fff;
          padding: 0 0.1rem;
          height: 0.34rem;
          border-radius: 0.17rem;
          font-size: 0.16rem;
        }
      }
    }
    .commentBox {
      position: relative;
      margin-top: 0.2rem;
      font-size: .3rem;
      background: #fff;
      height: 0.8rem;
      padding: 0 0.4rem 0 0.2rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      justify-content: space-between;
      p{
        line-height: 0.6rem;
        margin-top: 0.08rem;
      }
      .checkAll {
        color: #FF5847;
      }
    }
    .commentBox:after{
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #FF5847;
      border-style: solid;
      -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
      transform: matrix(.71,.71,-.71,.71,0,0);
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: .2rem;
    }
    .commentContent {
      font-size: .3rem;
      background-color: #fff;
      padding:.2rem;
      .titlee {
        line-height: .8rem;
        overflow: hidden;
        .head {
          float: left;
          height: .8rem;
          width: .8rem;
          border-radius: 50%;
          margin-right: .1rem;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .username {
          float: left;
        }
      }
      .size {
        font-size: .24rem;
        color: #999;
        margin: .15rem 0;
      }
      .imgbox {
        overflow: hidden;
        img {
          float: left;
          width: 2.28rem;
          height: 2.28rem;
          margin-right: 0.06rem;
          margin-top: 0.06rem;
        }
        img:nth-of-type(3n){
          margin-right: 0;
        }
      }
    }
    .shopBoxInfo{
      margin: 0.2rem 0;
      padding: 0.3rem 0.2rem;
      background: #fff;
      display: flex;
      .shopLogo{
        width: 1.16rem;
        height: 1.16rem;
        border-radius: 0.1rem;
        flex-shrink: 0;
        margin-right: 0.16rem;
      }
      .shopInfo{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            font-size: 0.32rem;
            color: #666;
          }
          span{
            height: 0.44rem;
            line-height: 0.44rem;
            color: #fff;
            border-radius: 0.22rem;
            font-size: 0.2rem;
            padding: 0 0.1rem;
          }
        }
        .score{
          display: flex;
          align-items: center;
          p{
            font-size: 0.22rem;
            color: #999999;
          }
          p:nth-of-type(2){
            flex: 1;
            text-align: center;
          }
        }
      }
    }
    .footer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1.04rem;
      background: #fff;
      .collect{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: .5rem;
        i{
          color: #666666;
        }
        p{
          font-size: .2rem;
          color: #666666;
        }
      }
      .otherBox{
        width: 5.8rem;
        border-radius: 0.4rem;
        height: 0.8rem;
        margin-right: 0.2rem;
        display: flex;
        .Box{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.4rem 0 0 0.4rem;
          background: linear-gradient(to right, #FF9702, #FFCB00);
          font-size: 0.28rem;
          color: #fff;
          span{
            font-size: 0.18rem;
          }
        }
        .Box:nth-of-type(2){
          border-radius: 0 0.4rem 0.4rem 0;
          background: linear-gradient(to right, #F63D36, #F87B64);
        }
      }
    }
    .vux-header{
      border-bottom: 0;
      z-index: 1000;
      height: 0.88rem;
      box-sizing: content-box;
      .vux-header-left{
        /*top: .5rem;*/
        left: 0.2rem;
      }
      .high{
        width: 100%;
        height: .5rem;
        overflow: hidden;
      }
    }
    #box{
      .toOrder{
        p{
          font-size: 0.26rem;
        }
        .p1{
          span{
            padding-left: 0.1rem;
            font-size: 0.26rem;
          }
        }
        .p2{
          padding-left: 0.2rem;
          color: #fc3357;
        }
      }
    }
  }
  .detail{
    overflow: hidden;
    text-align: center;
    background: #fff;
    .pddCon{
      font-size: .24rem;
      color: #333;
      text-align: left;
      padding: .2rem;
      line-height: .46rem;
    }
    img{
      /*width: 100%;*/
      max-width: 100% !important;
      height: auto;
    }
    .desc_anchor{
      display: none;
    }
    .ssd-module-wrap{
      width: 100%;
      .ssd-module{
        width: 100%;
        padding-top: 100%;
        height: 0;
      }
    }
  }
</style>
<style lang="less" scoped>
  .detailTitle{
    height: 1.32rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    img{
      width: 4.1rem;
    }
  }
  #box{
    .goods_carousel{
      .goods_page_box{
        z-index: 1001;
        padding: 0 .2rem;
        color: #fff;
        border-radius: .2rem;
        justify-content: center;
        letter-spacing: 3px;
        display: flex;
        align-items: center;
        position: absolute;
        right: .30rem;
        bottom: .33rem;
        height: .4rem;
        font-size: .2rem;
        background: rgba(0,0,0,0.4);
      }
    }
    .goods_like_box{
      margin-top: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: .9rem;
      background: #fff;
      img{
        width: 4rem;
      }
    }
  }
  .goods_back_top_box{
    width: .74rem;
    height: .74rem;
    background-size: .74rem .74rem;
    position: absolute;
    right: .34rem;
    background: url('../../assets/img/back_top.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
