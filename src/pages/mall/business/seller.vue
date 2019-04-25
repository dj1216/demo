<template>
    <div class="seller" v-if="isShow">
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="seller-head" :style="{'background-image':slides ? 'url('+slides+')' :'url(./static/libs/img/sjbj.png)'}" ref="mate">
              <div class="head-nav" :style="{'marginTop': marginTop}">
                <div @click="goBack" class="backBox">
                  <i class="iconfont icon-back1" style="font-size: .4rem"></i>
                </div>
                <div>
                  <img src="../../../assets/mall/img/sousuo.png" alt="">
                  <input type="text" placeholder="请输入关键字" v-model="searchText">
                </div>
                <div @click="search">
                  <p>搜索</p>
                </div>
              </div>
              <div class="shop-name">
                <img :src="shop.logo || './static/img/under/111.png'" alt="" style="height: 1rem">
                <div>
                  <p>{{shop.title}}</p>
                  <p>
                    <img src="../../../assets/mall/img/xing.png" alt="" v-for="(i,index) in score" :key="index">
                    <img src="../../../assets/mall/img/xing1.png" alt="" v-for="(i,index) in (5-score)" :key="index">
                  </p>
                </div>
                <div class="shop-notice" @click="setCare">
                  <p v-if="shop.isCare===0">+关注</p>
                  <p v-if="shop.isCare===1">已关注</p>
                  <div @click.stop="handleQrcode(shop.id)" style="text-align: center;color: #333333;">
                    <i class="iconfont icon-qrcode"></i>
                  </div>
                </div>
              </div>
          </div>
          <div  ref="tabBox" class="tabBox" :class="{sticky: isIos}" :style="{paddingTop: isShowH ? h + 'px' : '0px'}">
            <div class="seller-nav">
            <div :class="{'focus':select===1}" @click="selectItem(1)" style="padding-top: .18rem">
              <p class="top">
                <i class="iconfont icon-home"></i>
              </p>
              <p class="bottom">首页</p>
            </div>
            <div :class="{'focus':select===2}" @click="selectItem(2)">
              <p class="top">{{shop.count}}</p>
              <p class="bottom">宝贝</p>
            </div>
            <div :class="{'focus':select===3}" @click="selectItem(3)">
              <p class="top">{{shop.sales}}</p>
              <p class="bottom">热销</p>
            </div>
            <div :class="{'focus':select===4}" @click="selectItem(4)">
              <p class="top">{{shop.new}}</p>
              <p class="bottom">上新</p>
            </div>
          </div>
          </div>
          <List :list="list"></List>
          <div id="empty"></div>
        </mescroll-vue>
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
import './business.less'
import List from '../../../components/list'
import * as apiHttp from '../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'seller',
  data () {
    return {
      select: 1,
      searchText: '',
      shop: '',
      list: [],
      slides: '',
      score: 5,
      shopId: '',
      isShow: false,
      isShowQrcode: false,
      qrcodeInfo: {},
      marginTop: '',
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      mescrollUp: {
        auto: true,
        onScroll: this.handleScroll,
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关宝贝~'
        }
      },
      isIos: api.systemType === 'ios',
      h: api.safeArea.top,
      isShowH: false
    }
  },
  components: {
    List,
    MescrollVue
  },
  mounted: function () {
    // 删除
    this.shopId = this.$route.query.spid
    this.$route.query.type ? (this.select = this.$route.query.type) : ''
    this.getShopInfo()
    if (this.isIos) {
      this.isShowH = true
    } else {
      this.isShowH = false
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.marginTop = (api.safeArea.top / size) + 'rem'
  },
  methods: {
    selectItem (type) {
      this.select = type
      this.mescrollUp.page.num = 1
      this.list = []
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    search () {
      console.log(this.searchText)
      this.$router.push({
        name: 'mallProductList',
        query: {
          spid: this.$route.query.spid,
          keyword: this.searchText
        }
      })
    },
    getShopInfo () {
      let id = this.shopId
      apiHttp.shopInfo(id).then(response => {
        if (response.code === 0) {
          this.isShow = true
          console.log(response.data.slides)
          this.shop = response.data.shopInfo
          if (response.data.slides) {
            this.slides = response.data.slides[0].thumb
          }
          this.score = parseInt(response.data.shopInfo.score)
        } else {
          console.log(response.msg)
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if (this.select === 1) {
        this.$http.post('/mall/index/goods-list',{page: page.num, spid: this.shopId, isRecommend: 1}).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] :  res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      } else if (this.select === 2) {
        this.$http.post('/mall/index/goods-list',{page: page.num, spid: this.shopId}).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] :  res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      } else if (this.select === 3) {
        this.$http.post('/mall/index/goods-list',{page: page.num, spid: this.shopId, sales: 1}).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] :  res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      } else if (this.select === 4) {
        this.$http.post('/mall/index/goods-list',{page: page.num, spid: this.shopId, isNew: 1}).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] :  res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      }
    },
    refresh: function () {
      this.mescrollUp.page.num = 1
      this.getShopInfo()
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    setCare () {
      this.$http.post('/mall/users/shops-care', {spid: this.shopId}).then(res => {
        if (res.code === 0) {
          // console.log(res)
          this.$vux.toast.text(res.msg)
          this.getShopInfo()
          this.upCallback(this.mescrollUp.page, this.mescroll)
        }
      })
    },
    // 二维码
    handleQrcode (id) {
      apiHttp.underShopQrcodeCon(id).then(res => {
        if (res.code === 0) {
          this.isShowQrcode = true
          this.qrcodeInfo = res.data
        }
      })
    },
    handleClose () {
      this.isShowQrcode = false
    },
    handleScroll (mescroll, y, isUp) {
      let that = this
      if (that.isIos) {
        return
      }
      if (y >= that.$refs.mate.offsetHeight) {
        that.$refs.tabBox.className = 'tabBox fixedTop'
        that.isShowH = true
      } else {
        that.$refs.tabBox.className = 'tabBox'
        if (that.isIos) {
          that.isShowH = true
        } else {
          that.isShowH = false
        }
      }
    }
  }
}
</script>

<style lang="less">
.seller{
  text-align: center;
  .vux-fixed{
    position: absolute;
  }
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto !important;
    .tabBox{
      width: 100%;
      z-index: 1000;
      background: #fff;
      margin-bottom: .1rem;
      .vux-tab-item{
        background: none !important;
      }
    }
    .fixedTop{
      position: fixed;
      top: 0;
    }
    .sticky{
      position: -webkit-sticky;
      position: sticky;
      top: 0;
    }
  }
}
</style>
