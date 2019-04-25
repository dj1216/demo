<template>
  <div class="under-details" v-if="isShow">
    <div class="mescrollBox">
      <div class="under_body">
        <div class="swiper">
          <swiper auto v-model="index" @on-index-change="onIndexChange" :show-dots='false' height="5.4rem">
            <swiper-item v-for="(item,i) in detail.thumbs" :key="i"><img v-lazy="item" alt="" style="height: 100%;width: 100%"></swiper-item>
          </swiper>
          <p class="number">
            <span>{{index+1}}</span>
            <span> /{{detail.thumbs.length}}</span>
          </p>
          <div class="goods-details" :style="{'top': top}">
            <p @click="jumpTo({name: 'mallUnderdetail', query: {spid: detail.spid}})"><i class="iconfont icon-back"></i></p>
            <p @click="showToast = true"><i class="iconfont icon-share1"></i></p>
          </div>
        </div>
        <div class="goods-info">
          <p class="info-title">{{detail.goodsName}}</p>
          <div>
            <p>
              <span style="color: #fc3357;font-size: .26rem">￥</span>
              <span style="color: #fc3357;font-size: .35rem;margin-right: .3rem;font-weight: 600">{{detail.spe_price}}</span>
              <span><s>￥{{detail.marketprice}}</s></span>
            </p>
            <span v-if="detail.sales > 0">已售 {{detail.sales}} {{detail.unit}}</span>
          </div>
          <div @click="handleShow = true">
            <p>
          <span style="color: #3ECAA6;margin-right: .2rem;" v-for="(item,i) in equityInfo" :key="i" v-if="item.status == 1">
            <i class="iconfont icon-duihao" style="font-size: 12px"></i>&nbsp;&nbsp;{{item.title}}
          </span>
            </p>
            <img src="../../../assets/mall/img/my/left.png" alt="">
          </div>
        </div>
        <div class="goods-info" v-if="detail.goodsDesc">
          <p class="info-title" style="font-weight: 500">详细内容</p>
          <div v-html="detail.goodsDesc">
          </div>
          <span class="check-more" @click="jumpTo({name: 'mallImageText', query: {goodsId: data.goodsId}})">查看图文详情</span>
        </div>
        <div class="buy-notices" v-if="detail.noticeInfo" v-html="detail.noticeInfo"></div>
      </div>
    </div>
    <div class="goPay" @click="jumpTo({name: 'mallUnderGoodsBuy', query: {goodsId: data.goodsId}})">
      <div>
        <span>立即购买</span>
      </div>
    </div>
    <div class="under-layer" v-if="handleShow">
      <div class="layer-one">
        <div>
          <p>权益保障</p>
          <i @click="handleShow = false" class="iconfont icon-close"></i>
        </div>
        <div v-for="(item,i) in equityInfo" :key="i" class="layer-son" v-if="item.status == 1">
          <p><i class="iconfont icon-duihao"></i>&nbsp;&nbsp;{{item.title}}</p>
          <span>{{item.descs}}</span>
        </div>
        <div style="height: .5rem"></div>
      </div>
    </div>
    <div class="share_to" v-if="showToast">
      <div class="weui-mask" @click="showToast = false"></div>
      <div class="classBox">
        <div><img src="../../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
        <div><img src="../../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
      </div>
    </div>
  </div>
</template>

<script>
  import './underLess.less'
  import './detail.less'
  import * as apiHttp from '../../../api/index'
  import { Swiper,SwiperItem } from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        index: 0,
        handleShow: false,
        data: {},
        detail: {},
        equityInfo: {},
        isShow: false,
        showToast: false,
        top: ''
      }
    },
    mounted () {
      apiHttp.underShopGoodsDetails(this.$route.query.goodsId).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
          this.equityInfo = res.data.equityInfo
          this.detail = res.data.detail
        }
      })
    },
    created () {
      let size = (document.documentElement.clientWidth / 7.5)
      this.top = (api.safeArea.top / size) + 'rem'
    },
    methods: {
      onIndexChange (index) {
        this.index = index
      },
      shareFri (type) {
        this.showToast = false
        let that = this
        let way = type === 1 ? 'session' : 'timeline'
        let format = 'share' + new Date().getTime() + '.png'
        let link = ''
        if (api.systemType === 'ios') {
          link = that.detail.shareInfo.link.ios
        } else {
          link = that.detail.shareInfo.link.android
        }
        api.download({
          url: that.detail.shareInfo.thumb,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          var wx = api.require('wx')
          wx.shareWebpage({
            scene: way,
            title: that.detail.shareInfo.title,
            description: that.detail.shareInfo.desc,
            thumb: 'fs://' + format,
            contentUrl: that.detail.shareInfo.url || link || that.detail.shareInfo.link.merge
          }, function (ret, err) {
            if (ret.status) {
              that.$http.post('/mall/users/share', {goodsId: this.$route.query.goodsId}).then()
            } else {
              console.log(err.code)
            }
          })
        })
      },
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.under-details{
  ul{
    padding-left: .3rem;
  }
  li{
    list-style-type: disc;
  }
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 1.2rem;
    height: auto !important;
    .under_body{
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
  .swiper{
    position: relative;
    .number{
      width: .88rem;
      height: .88rem;
      border-radius: 50%;
      border: 1px solid #fff;
      text-align: center;
      line-height: .88rem;
      position: absolute;
      right: 0.2rem;
      bottom: 0.3rem;
      background-color:rgba(255,255,255,.4);
      span{
        font-size: 0.36rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51 );
      }
    }
    .goods-details{
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 .3rem;
      align-items: center;
      box-sizing: border-box;
      position: absolute;
      top: .2rem;
      p{
        display: inline-block;
        i{
          font-size: .4rem;
        }
      }
    }
  }
  .goods-info{
    background: #ffffff;
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 .3rem;
    margin-bottom: .2rem;
    .info-title{
      color: @font-main-color;
      font-size: @font-more-big;
      font-weight: 600;
    }
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: .15rem;
        height: .25rem;
      }
      span{
        color: @font-light-color;
        font-size: @font-nomal;
      }
    }
    .check-more{
      width: 2.12rem;
      height: 0.57rem;
      margin: 0 auto;
      border: 1px solid @border-color;
      border-radius: .3rem;
      text-align: center;
      line-height: .57rem;
      color: @font-light-color;
    }
  }
  .under-layer{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background:rgba(0,0,0,0.7);
    .layer-one{
      background: #ffffff;
      bottom: 0;
      position: absolute;
      width: 100%;
      div:first-child{
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid @border-color;
        p{
          color: @font-main-color;
          font-size: @font-more-big;
        }
        i{
          position: absolute;
          right: .3rem;
        }
      }
      .layer-son{
        height: 1.2rem;
        padding: 0 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
          color: #3ECAA6;
          font-size: @font-nomal;
          i{
            font-size: 12px;
          }
        }
        span{
          font-size: @font-small;
          color: @font-main-color;
          margin: -0.3rem 0 0 0.4rem;
        }
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
}
</style>
