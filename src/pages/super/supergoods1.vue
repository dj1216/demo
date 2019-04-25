<template>
  <div id="goods" ref="goods" v-if="other">
      <span class="goBack" @click="goodsBack" :style="{top: h + 'rem'}" v-if="showBack">
        <img src="../../assets/img/home/goods/goBack.png" alt="">
      </span>
    <div class="vux-header" :style="{backgroundColor: opacity,paddingTop: h + 'rem'}" v-if="!showBack">
      <div class="vux-header-left" :style="{top: h + 'rem'}">
        <div class="left-arrow" style="display: none;"></div> <a v-if="!showBack" @click="goodsBack" class="backBox"><i class="iconfont icon-back"></i></a></div>
          <h1 class="vux-header-title" v-if="!showBack">商品详情</h1>
    </div>
    <div id="box" ref="box">
      <div class="goods_carousel">
        <img :src="$img" alt="" v-if="!other.small_images || other.small_images.length === 0">
        <swiper :show-dots="false" :aspect-ratio="750/750" v-model="index"  v-else>
          <swiper-item class="goods_swiper" v-for="(item, index) in other.small_images" :key="index" ><img v-lazy="item"  @click="show(index)" :key="item"></swiper-item>
        </swiper>
        <p class="goods_page" v-if="other.small_images && other.small_images.length"><span>{{index + 1}}</span>/{{other.small_images.length}}</p>
      </div>
      <div class="goods_info">
        <div class="title"  @click="copyTitle(other.title)"><img src="../../assets/img/home/tblogo.png" alt="" v-if="Number(other.type) === 11">
          <img src="../../assets/img/home/tmlogo.png" alt="" v-else-if="Number(other.type) === 12">
          <img src="../../assets/img/home/jdlogo.png" alt="" v-if="Number(other.type) === 21">
          <img src="../../assets/img/home/pddlogo.png" alt="" v-else-if="Number(other.type) === 31"><p>{{other.title}}</p></div>
        <p class="profit" v-if="other.commission_money" :style="{color: $store.state.global.theme.mainColor, background: $store.state.global.theme.thirdColor}" >预估收益：￥{{other.commission_money}}</p>
        <div class="price">
          <p class="p1"  :style="{color: $store.state.global.theme.mainColor}">券后价￥<span>{{other.coupon_price}}</span></p>
          <p class="p2">原价:&nbsp;&nbsp;<del>￥{{other.zk_final_price}}</del></p>
          <p class="p3" v-if="$route.query.type !== '21'">已售: {{other.volume}}</p>
        </div>
        <div class="coupon"  v-if="other.coupon_money > 0" @click="tobuy" :style="{color: $store.state.global.theme.mainColor}">
          <p class="p1">{{other.coupon_money}} <span>元优惠券</span></p>
          <p class="p2" v-if="other.coupon_start_at">使用期限 {{other.coupon_start_at}}-{{other.coupon_end_at}}</p>
          <!--<p class="p2" v-else-if="data.coupon_start_at">使用期限 {{data.coupon_start_at}}-{{data.coupon_end_at}}</p>-->
        </div>
      </div>
      <div class="goods_shop_info" v-if="other.shopIcon">
      <h2>
        <img class="img1" src="../../assets/img/home/pddshop.png" alt="" v-if="type === 3">
        <img class="img1" src="../../assets/img/home/jdshop.png" alt="" v-else-if="type === 2">
        <img class="img1" v-else-if="other.shopIcon" v-lazy="other.shopIcon" alt="" :key="other.shopIcon">
        <img class="img1" v-else-if="Number(other.type) === 11" src="../../assets/img/home/tbshop.png" alt="">
        <img class="img1" v-else-if="Number(other.type) === 12" src="../../assets/img/home/tmshop.png" alt="">
        {{other.shopName}}
      </h2>
      <ul v-if="other.score">
      <li class="li1" v-if="other.score">宝贝描述 <span>{{other.score[0]}}</span>
      </li>
      <li class="li2" v-if="other.score">卖家服务 <span>{{other.score[1]}}</span>
      </li>
      <li class="li3" v-if="other.score">物流服务 <span>{{other.score[2]}}</span>
      </li>
      </ul>
      </div>
      <div class="goods_details"  @click="showDetail = !showDetail">
        <h2>宝贝详情</h2>
        <i class="iconfont icon-unfold" v-if="showDetail"></i>
        <i class="iconfont icon-fold" v-else></i>
      </div>
      <div class="detail" v-if="showDetail && type !== 3 && type !== 2 && other.info_img"  ref="detailBox">
        <div v-for="(item, index) of other.info_img" :key="index" v-html="item"></div>
      </div>
      <div class="detail" v-else-if="showDetail && type === 3 && other && other.description">
        <p class="pddCon" v-html="other.description"></p>
      </div>
      <div class="detail" v-else-if="showDetail && type === 2 && other && other.info_img">
        <img v-for="(item, index) of other.info_img" v-lazy="item" alt="" :key="index">
      </div>
      <div class="goods_like" v-if="this.type === 0 || this.type === 1">
        <span></span>
        <img src="../../assets/img/home/goods/guess_you_like.png" alt="">
        <p>猜您喜欢</p>
        <span></span>
      </div>
      <goods-item v-bind:list = like styles=true @detail="detail"></goods-item>
    </div>
    <div class="goods_pay">
      <div class="goods_pay_left" @click="collect" v-if="collectStatus === 1">
        <i :style="{color: $store.state.global.theme.mainColor}"  class="iconfont icon-shoucang1"></i>
        <p class="hadGet" :style="{color: $store.state.global.theme.mainColor}" >已收藏</p>
      </div>
      <div class="goods_pay_left" @click="collect" v-else>
        <i style="color: #666"  class="iconfont icon-shoucang2"></i>
        <p>收藏</p>
      </div>
      <b class="goods_pay_1px"></b>
      <div class="goods_pay_right">
        <div class="goods_pay_share" @click="share">
          <i :style="{color: $store.state.global.theme.mainColor}"  class="iconfont icon-fenxiang"></i>
          <!--<img src="../../assets/img/home/goods/fenxiang.png" alt="">-->
          <p :style="{color: $store.state.global.theme.mainColor}">分享宝贝</p>
        </div>
        <div class="goods_pay_buy" @click="tobuy" :style="{background: $store.state.global.theme.mainColor}">
          <i class="iconfont icon-youhuiquan"></i>
          <span>领券购买</span>
        </div>
      </div>
    </div>
    <div class="goods_back_top" @click="backTop()" v-show="backShow"></div>
  </div>
</template>

<script>
import {Swiper, SwiperItem, XImg, Previewer, TransferDom, dateFormat} from 'vux'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'goods',
  data () {
    return {
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
      getCouponUrl: true
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
      // let size = (document.documentElement.clientWidth / 7.5)
      // let hight = api.safeArea.top >= 30 ? api.safeArea.top + 5 : api.safeArea.top
      // return (hight / size)
      return 0.5
    }
  },
  filters: {
    dateFormat
  },
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    SwiperItem,
    XImg,
    Previewer,
    GoodsItem
  },
  methods: {
    goodsBack () {
      if (this.$route.query.from) {
        api.openWin({
          name: 'aliWin',
          animation: {
            type: 'push',
            subType: 'from_left',
            duration: 300
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
    handleScroll () {
      let offsetTop = this.$refs.box ? this.$refs.box.scrollTop : 10
      let w = document.documentElement.clientWidth
      this.opacity = 'rgba(255, 255, 255,' + offsetTop / (w - w * 0.88 / 7.5) + ')'
      this.showBack = !(offsetTop / (w - w * 0.88 / 7.5) > 0.05)
      this.backShow = offsetTop > w
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
    tobuy () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      if (that.other.coupon_url) {
        if (that.$aliPay === 1) {
          if (this.type === 0 || this.type === 1) {
            let that = this
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
        this.$router.push('/share?type=' + this.$route.query.type + '&id=' + this.$route.query.id + '&i=' + Number(this.$route.query.i))
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
        if (this.$route.query.way) {
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
            if (this.$route.query.way) {
              for (let i in res.data) {
                if (i !== 'small_images') {
                  this.$set(this.other, i, res.data[i])
                } else if (i === 'small_images' && (!this.other.small_images || this.other.small_images.length === 0)) {
                  this.$set(this.other, i, res.data[i])
                }
              }
            } else {
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
    copyTitle (title) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: title
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', title)
          that.$vux.toast.text('宝贝标题已复制', 'top')
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
    document.getElementsByClassName('goods_pay')[0].style.paddingBottom = api.safeArea.bottom + 'px'
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less">
  #goods{
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
