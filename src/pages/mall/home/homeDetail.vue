<template>
  <div class="home_detail" style="height:100%;">
    <div class="header">
      <div class="left backBox" @click="goBack()">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="main">
        <div :class="active === 1 ? 'active':''" @click="handActive(1)">商品</div>
        <div  :class="active === 2 ? 'active':''"  @click="handActive(2)">评价</div>
        <div  :class="active === 3 ? 'active':''" @click="handActive(3)">详情</div>
      </div>
      <div class="right">
        <popover placement="bottom" style="margin: 20px;" :gutter='25'>
          <div slot="content" class="popover-demo-content" id="popover-demo-content">
            <div @click="jumpTo({name:'mallHome'})">
              <i class="iconfont icon-home"></i><span>首页</span>
            </div>
            <div  @click="handService()">
              <i class="iconfont icon-geren2"></i><span>客服</span>
            </div>
            <div @click="jumpTo({name:'mallCart'})">
              <i class="iconfont icon-cart"></i><span>购物车</span>
            </div>
            <div @click="showToast = true">
              <i class="iconfont icon-fenxiang"></i><span>分享</span>
            </div>
          </div>
          <!--<button class="btn btn-default">{{ $t('Popover on bottom') }}</button>-->
          <img src="../../../assets/mall/img/home/share.png" alt="">
        </popover>
      </div>
    </div>
    <div class="mescrollBoxHome">
      <div class="detail_main" id="detail_main" ref="my_scroller">
        <div class="banner" style="position:relative">
          <div class="img">
            <swiper v-if="detailObj.thumbs" :options="swiperOption" ref="mySwiper" style="height:100%;">
              <swiperSlide v-for="(item,index) in detailObj.thumbs" :key="index">
                <img v-lazy="item" alt="" style="width:100%;height:6.2rem;">
              </swiperSlide>
            </swiper>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="mall-saoma" @click="handleQrcode(detailObj.id)">
              <i class="iconfont icon-qrcode"></i>
            </div>
            <!--<img  v-lazy="link+detailObj.thumb"  alt="">-->
          </div>
          <div class="title">
            <div class="top">
              {{detailObj.goodsName}}
            </div>
            <div class="price_main"><span>¥ </span>{{detailObj.spe_price}}</div>
            <div class="bottom">
              <div>配送方式：{{detailObj.freeShippingInfo}}</div>
              <div>已售：{{detailObj.sales}}</div>
              <div>{{shopInfo.birth}}</div>
            </div>
          </div>
        </div>
        <div class="order" @click="handModel(1)" v-if="detailObj.field1 || detailObj.field2">
          <div class="div1">规格</div>
          <div class="div2">选择{{detailObj.field1}}分类，{{detailObj.field2}}</div>
          <div class="div3">
            <i class="iconfont icon-right" style="color: #a1a1a1;"></i>
          </div>
        </div>
        <div class="productReview" id="productReview">
          <div class="title">
            <div class="left">
              商品评价<span>({{detailObj.discussNum}})</span>
            </div>
            <div class="right" @click="jumpTo({name:'mallComment',query:{id:detailObj.id}})">
              更多     <i class="iconfont icon-right"></i>
            </div>
          </div>
          <div class="list">
            <ul>
              <li v-if="discussList.length>0">
                <div class="titleList">
                  <div class="userName">
                    <img v-lazy="discussList[0].userInfo.avatar" alt="">
                    <span>{{discussList[0].info}}</span>
                  </div>
                  <div class="time">
                    {{parseInt(discussList[0].created_at) | formatDate}}
                  </div>
                </div>
                <div class="count">{{discussList[0].info}}</div>
                <div class="img" v-if="discussList[0].thumbs" v-for="(item,index) in discussList[0].thumbs" :key="index">
                  <img :src="item" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="Merchant">
          <div class="Merchant_top">
            <div class="Merchant_name">
              <img v-lazy="shopInfo.logo" alt="">
              <span>{{shopInfo.title}}</span>
            </div>
            <div class="icon_shou" @click="handShang()" :class="shopInfo.isCare === 0 ? '' : 'active'">
              <i style="margin-right: .1rem;" class="iconfont icon-likefill"></i>
              <span>关注</span>
            </div>
          </div>
          <div class="Merchant_bottom">
            <div class="left" @click="handShangGo(2)">全部宝贝</div>
            <div class="right" @click="handShangGo(1)">进店逛逛</div>
          </div>
        </div>
        <div class="commodity_detail">
          <div class="title">
            <img src="../../../assets/mall/img/home/detail_title.png" alt="">
          </div>
          <div class="count" v-html="detailObj.info">

          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <div class="div_flex" @click="jumpTo({name:'mallHome'})">
          <p><i class="iconfont icon-home"></i></p><span>首页</span>
        </div>
        <div class="div_flex" :class="isLick == 0 ? '' : 'active'" @click="handShou()">
          <p><i class="iconfont icon-like"></i></p><span>收藏</span>
        </div>
        <div class="div_flex" @click="handService()">
          <p><i class="iconfont icon-service"></i></p><span>客服</span>
        </div>
      </div>
      <div class="right_btn">
        <div class="btn1" @click="handModel(1)" v-if="detailObj.module == '实物'">加入购物车</div>
        <div class="btn2" @click="handModel(2)" v-if="detailObj.module == '实物'">立即购买</div>
        <div class="btn3" @click="handModel(2)" v-if="detailObj.module == '虚拟'">立即购买</div>
      </div>
    </div>
    <!--选择规格-->
    <div v-transfer-dom>
      <popup v-model="show_select" position="bottom"  width="100%">
        <div class="detail_model">
            <div class="header">
              <div class="header_main">
                <div class="img_box">
                  <img :src="detailObj.thumb || './static/img/under/111.png'" alt="">
                </div>
                <div class="right_main">
                  <div class="div1" v-if="active1 != 0 || active2 != 0">
                    <span>¥</span>{{price}}
                  </div>
                  <div class="div1" v-if="active1 == 0 && active2 == 0">
                    <span>¥</span>{{price1}}
                  </div>
                  <div class="div2">库存{{total}}件</div>
                  <div class="div3" v-if="detailObj.field1 || detailObj.field2">选择{{detailObj.field1}}分类，{{detailObj.field2}}</div>
                </div>
              </div>
            </div>
            <div class="model_main"  v-if="detailObj.attrList" v-show="this.detailObj.field1">
              <p>{{detailObj.field1}}</p>
              <div class="list">
                <div v-for="(item,index) in detailObj.attrList.color" :key="index" :class="active1 === item ? 'active' : ''" @click="handClick(index,item)">{{item}}</div>
              </div>
            </div>
            <div class="model_main"  v-if="detailObj.attrList"  v-show="this.detailObj.field2">
              <p>{{detailObj.field2}}</p>
              <div class="list">
                <div v-for="(item,i) in detailObj.attrList ? detailObj.attrList.size : []" :key="i" @click="selected(i,item.price,item.total,item.id)" :class="{'active':i===iid}">{{item.field_2}}</div>
              </div>
            </div>
            <div class="num_main">
              <x-number title="购买数量" v-model="changeValue" width="0.5rem" :min="1" button-style="round" fillable ></x-number>
            </div>
            <div class="footer_btn" v-if="buyActive">
              <div class="btn1"  @click="send(1)">加入购物车</div>
              <div class="btn2"  @click="send(2)">立即购买</div>
            </div>
            <div class="footer_buy" v-if="!buyActive">
              <div class="btn2"  @click="send(2)">立即购买</div>
            </div>
           <div class="btn_close">
             <img src="../../../assets/mall/img/home/clone.png" alt="" @click="show_select = false">
           </div>
        </div>
      </popup>
    </div>
    <div class="back_top" @click="backTop">
      <img src="../../../assets/mall/img/home/ding1.png" alt="">
    </div>
    <div class="share_to" v-if="showToast">
      <div class="weui-mask" @click="showToast = false"></div>
      <div class="classBox">
        <div><img src="../../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
        <div><img src="../../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
      </div>
    </div>
    <!--显示二维码-->
    <div v-if="isShowQrcode">
      <div class="mall-sq-body">
        <div class="sq-content">
          <div class="sq-one">
            <img src="../../../assets/mall/img/under/erweima.png" alt="">
          </div>
          <div class="sq-two">
            <img :src="qrcodeInfo.qrcode" alt="">
          </div>
          <img class="close" src="../../../assets/img/sign/close.png" alt="" @click="handleClose()">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {Popup, TransferDom, XNumber, Popover} from 'vux'
import {formatDate} from '../../../plugin/data'
import * as apiHttp from '../../../api/index'
export default {
  name: 'homeDetail',
  data () {
    return {
      swiperOption: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        disabledClass: 'my-button-disabled',
        hiddenClass: 'my-button-hidden',
        spaceBetween: 5,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      buyActive: false,
      index: 0,
      active: this.$route.query.id ? this.$route.query.id : 1,
      show_select: false,
      changeValue: 1,
      buy_select: false,
      detailObj: {},
      shopInfo: {},
      discussList: [],
      isLick: 0,
      id: '',
      price: '',
      price1: '',
      iid: '',
      total: 1000,
      attrId: '',
      modelNum: 0,
      modelPrice: 0,
      active1: 0,
      active2: 0,
      pic: '',
      fieldInfo: {},
      showToast: false,
      type: '',
      isShowQrcode: false,
      qrcodeInfo: {}
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  directives: {
    TransferDom
  },
  components: {
    swiper,
    swiperSlide,
    Popup,
    XNumber,
    Popover
  },
  mounted: function () {
    // 删除
    window.addEventListener('scroll', this.handleScroll, true)
    apiHttp.goodsDetail(this.$route.query.title).then(response => {
      if (response.code === 0) {
        this.detailObj = response.data.detail
        this.price = response.data.detail.addPrice
        this.price1 = response.data.detail.spe_price
        let obj = response.data.detail
        this.isLick = obj.isLike
        this.shopInfo = response.data.detail.shopInfo
        this.discussList = response.data.detail.discussList
        this.fieldInfo = response.data.fieldInfo
      }
    })
  },
  methods: {
    select (i) {
      let id = this.detailObj.attrList.field[i].id
      this.id = i
      this.$http.post('/mall/index/attr-list', {attrId: id}).then(res => {
        if (res.code === 0) {
          this.price = parseFloat(res.data.list[0].price) + parseFloat(this.detailObj.addPrice)
          this.detailObj.attrList.size = res.data.list
        }
      })
    },
    selected (i, price, total, itemId) {
      this.iid = i
      this.price = parseFloat(this.detailObj.addPrice) + parseFloat(price)
      this.total = total
      this.attrId = itemId
    },
    handClick (index, item) {
      this.iid = ''
      this.active1 = item
      let id = this.detailObj.attrList.field[index].id
      this.selectIn(id)
    },
    selectIn (key) {
      apiHttp.attrList(key).then(response => {
        this.price = parseFloat(response.data.list[0].price) + parseFloat(this.detailObj.addPrice)
        this.detailObj.attrList.size = response.data.list
      })
    },
    handService () {
      // let This = this
      if (this.shopInfo.bdsqUrl) {
        return this.$router.push({
          name: 'mallCSD',
          query: {
            url: this.shopInfo.bdsqUrl
          }
        })
        // let browser = api.require('webBrowser')
        // browser.open({
        //   url: this.shopInfo.bdsqUrl,
        //   titleBar: {
        //     textColor: '#333',
        //     bg: '#fff'
        //   }
        // })
      } else if (this.shopInfo.mobile) {
        api.call({
          type: 'tel_prompt',
          number: this.shopInfo.mobile
        })
      } else {
        this.$vux.toast.text('暂未开发qq功能')
      }
    },
    handleScroll () {
      var offsetTop = document.querySelector('#detail_main') ? document.querySelector('#detail_main').scrollTop : 10
      if (offsetTop < 300) {
        this.active = 1
      } else if (offsetTop <= 640) {
        this.active = 2
      } else {
        this.active = 3
      }
    },
    backTop () {
      let body = document.getElementById('detail_main')
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
    handActive (key) {
      let body = document.getElementById('detail_main')
      if (key === 1) {
        body.scrollTop = 0
      } else if (key === 2) {
        body.scrollTop = 300
        this.active = key
      } else if (key === 3) {
        body.scrollTop = 650
        this.active = key
      }
    },
    // 收藏商品
    handShou () {
      apiHttp.goodsLike(this.$route.query.title).then(response => {
        if (response.code === 0) {
          if (this.isLick === 0) {
            this.isLick = 1
            this.$vux.toast.text(response.msg)
          } else {
            this.isLick = 0
            this.$vux.toast.text(response.msg)
          }
        }
      })
    },
    handShang () {
      let isLick = this.shopInfo.isCare
      apiHttp.shopsCare(this.detailObj.spid).then(response => {
        if (response.code === 0) {
          if (isLick === 0) {
            this.shopInfo.isCare = 1
            this.$vux.toast.text(response.msg)
          } else {
            this.shopInfo.isCare = 0
            this.$vux.toast.text(response.msg)
          }
        }
      })
    },
    handShangGo (key) {
      this.$router.push({
        name: 'mallSeller',
        query: {
          spid: this.detailObj.spid,
          type: key
        }
      })
    },
    handModel (key) {
      if (key === 1) {
        this.show_select = true
        this.buyActive = true
      } else {
        this.show_select = true
        this.buyActive = false
      }
    },
    send (key) {
      if (this.detailObj.field1) {
        if (this.attrId === '') {
          this.$vux.toast.text('请选择尺寸,分类!')
          return
        }
      }
      let goodsNum = this.changeValue
      let attrId = this.attrId
      if (key === 1) {
        // this.show_select = true
        if (this.detailObj.fieldInfo[0]) {
          apiHttp.addCard('add', this.$route.query.title, goodsNum, attrId).then(response => {
            if (response.code === 0) {
              this.$vux.toast.text('加入购物车成功')
              this.show_select = false
            }
          })
        } else {
          apiHttp.addCard('add', this.$route.query.title, goodsNum, 0).then(response => {
            if (response.code === 0) {
              this.$vux.toast.text('加入购物车成功')
              this.show_select = false
            }
          })
        }
      } else {
        // this.buy_select = true
        if (!this.attrId) {
          this.attrId = 0
        }
        apiHttp.cardInterim(this.$route.query.title, goodsNum, this.attrId).then(response => {
          if (response.code === 0) {
            this.$router.push({
              name: 'mallFirmOrder',
              query: {
                data: response.data
              }
            })
          }
        })
      }
    },
    shareQQ () {
      let This = this
      var sharedModule = api.require('shareAction')
      sharedModule.share({
        text: This.detailObj.shareInfo.link.ios,
        type: 'url'
      })
    },
    shareFri (type) {
      this.showToast = false
      let that = this
      let way = type === 1 ? 'session' : 'timeline'
      let format = 'share' + new Date().getTime() + '.png'
      let link = ''
      if (api.systemType === 'ios') {
        link = that.detailObj.shareInfo.link.ios
      } else {
        link = that.detailObj.shareInfo.link.android
      }
      api.download({
        url: that.detailObj.shareInfo.thumb,
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        console.log(that.detailObj.shareInfo.title)
        var wx = api.require('wx')
        wx.shareWebpage({
          scene: way,
          title: that.detailObj.shareInfo.title,
          description: that.detailObj.shareInfo.desc,
          thumb: 'fs://' + format,
          contentUrl: that.detailObj.shareInfo.url || link || that.detailObj.shareInfo.link.merge
        }, function (ret, err) {
          if (ret.status) {
            that.$http.post('/mall/users/share', {goodsId: this.$route.query.id}).then()
          } else {
            console.log(err.code)
          }
        })
      })
    },
    // 二维码
    handleQrcode (id) {
      apiHttp.underGoodsQrcodeCon(id).then(res => {
        if (res.code === 0) {
          this.isShowQrcode = true
          this.qrcodeInfo = res.data
        }
      })
    },
    handleClose () {
      this.isShowQrcode = false
    }
  }
}
</script>

<style lang="less">
  .home_detail{
    .mescrollBoxHome{
      width: 100%;
      position: absolute;
      top: 0.88rem;
      bottom: 1.1rem;
      height: auto !important;
    }
    .swiper-pagination{
      position:absolute;
      bottom:10px;
      left: 100%;
      margin-left: -1.3rem;
      width:0.8rem;
      height:0.8rem;
      border-radius: 50%;
      background:rgba(255,255,255,.5);
      color:#000;
      font-size:0.28rem;
      text-align: center;
      line-height:0.8rem;
    }
  }
  .home_detail .banner .img{
    position:relative;
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
      right: 0;
      left: 0;
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
</style>
