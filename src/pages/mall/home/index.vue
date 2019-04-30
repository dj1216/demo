<template>
  <div id="home" class="homeMall">
    <div class="seach_main">
      <div class="home_seach">
        <div class="home_seach_left backBox">
          <!--<img src="../../../assets/mall/img/home/person.png" alt="">-->
          <div style="width: 100%; height: 100%"  @click="goBack()" v-if="$store.state.global.firstNav === '/home'">
            <i class="iconfont icon-back" style="font-size: .4rem"></i>
          </div>
        </div>
        <div class="home_seach_input" @click="jumpTo({name:'mallSearch'})">
          <div class="input_box">
            <img src="../../../assets/mall/img/home/seach.png" alt="">
            <p>请输入关键字</p>
            <i style="position: absolute;right: 1.2rem;color: #b6b6b6;" class="iconfont icon-saoyisao" @click.stop="handleQrcode()"></i>
          </div>
        </div>
        <div class="home_seach_right" @click="jumpTo({name:'mallNews'})">
          <img src="../../../assets/mall/img/home/new.png" alt="">
        </div>
      </div>
      <div class="linchpin">
        <div class="linchpin_main">
          <div class="linchpin_left">
            热搜：
          </div>
          <div class="linchpin_list">
            <div v-for="(item,index) in search" :key="index" v-if='index < 5' @click="handSearch(item.keyword)">{{item.keyword}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mall-home-scroll">
      <div class="mescrollBox">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="home_main">
            <div class="banner" style="position:relative" v-if="bannerImg">
              <swiper :options="swiperOption" ref="mySwiper" style="height:100%;">
                <swiperSlide v-for="(item,index) in bannerImg" :key="index">
                  <img v-lazy="item.thumb" alt="" style="width:100%;height:3.4rem;"  @click="jumpTos(item)">
                </swiperSlide>
              </swiper>
              <div class="swiper-pagination" slot="pagination"></div>
            </div>
            <swiper class="banner_list" :options="swiperOption1" ref="navButton" v-if="navInfo && $store.state.global.firstNav === '/home'">
              <swiper-slide class="allBox" v-for="(items,indexs) in navInfo" :key="indexs">
                <div class="allList" v-for="(item,index) in items" :key="index" @click="jumpTos(item)">
                  <img v-lazy="item.thumb" alt="" :key="item.thumb">
                  <p>{{item.title}}</p>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-scrollbar" v-if="navInfo && $store.state.global.firstNav === '/home'">
            </div>
            <div class="new_product" v-if="newList && $store.state.global.firstNav === '/home'">
              <div class="new_box">
                <div class="mearee">
                  <div class="left_img" @click="jumpTo({name:'mallArticleList'})">
                    <img :src="logo || '../../../assets/mall/img/home/new_product.png'" alt="">
                  </div>
                  <marquee>
                    <marquee-item v-for="(i,index) in newList" :key="index" @click.native="handDetailNew(i)">
                      <div class="right_text" @click="jumpTo({name:'articleInfo'})">
                        <div class="text">
                          {{i.title}}
                        </div>
                        <div class="right_img">
                          <img  :src="i.thumb || './static/img/under/111.png'" alt="">
                        </div>
                      </div>
                    </marquee-item>
                  </marquee>
                </div>
              </div>
            </div>
            <div v-for="(items,index) in diySlide" :key="index" v-if="diySlide && $store.state.global.firstNav === '/home'">
              <div class="ad">
                <div class="ad_main">
                  <img v-lazy="items[0].thumb" alt=""   @click="jumpTos(items[0])">
                </div>
              </div>
              <div class="ad_two">
                <div class="left" v-if="items.length > 1">
                  <img v-lazy="items[1].thumb" alt=""  @click="jumpTos(items[1])">
                </div>
                <div class="right" v-if="items.length > 2">
                  <img v-lazy="items[2].thumb" alt=""   @click="jumpTos(items[2])">
                </div>
              </div>
            </div>
          </div>
          <div class="hot_shop" v-if="obj.isHot == 1 && obj.hotGoodsList">
            <div class="home_header">
              <img src="../../../assets/mall/img/home/list_header1.png" alt="">
            </div>
            <div class="slice_main">
              <swiper :options="swiperOption3">
                <swiper-slide v-for="(item,index) in obj.hotGoodsList" :key="index"   @click.native="handDetail(item.id)">
                  <div class="slide_box">
                    <img v-lazy="item.thumb" alt="">
                    <p>{{item.goodsName}}</p>
                    <div class="price">
                      <span>¥</span>{{item.spe_price}}
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="home_header" v-if="shopList.length > 0">
            <img src="../../../assets/mall/img/home/list_header.png" alt="">
          </div>
          <list :list="shopList" ref="recommend"></list>
        </mescroll-vue>
      </div>
    </div>
    <div class="tab_main">
      <!--<p @click="jumpTo({name:'home'})" style="margin-bottom: .1rem;">-->
        <!--<img src="../../../assets/mall/img/fanhui.png" alt="">-->
      <!--</p>-->
      <!--<p @click="jumpTo({name:'mallBusiness'})">-->
        <!--<img src="../../../assets/mall/img/shangjia.png" alt="">-->
      <!--</p>-->
      <!--<h1 @click="jumpTo({name:'mallCart'})">-->
        <!--<img src="../../../assets/mall/img/gouwuche.png" alt="">-->
      <!--</h1>-->
      <!--环形菜单-->
      <!--<quick-menu :menu-count=count :icon-class=icons :menu-url-list=list position=" bottom-right"></quick-menu>-->
    </div>
    <loading v-show="load"></loading>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {Marquee, MarqueeItem} from 'vux'
import list from '../../../components/list'
import * as apiHttp from '../../../api/index'
import loading from '../../../components/loadingLoad'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
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
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      load: false,
      scrollTopH: 0,
      swiperOption1: {
        slidesPerView: 5,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      },
      swiperOption3: {
        slidesPerView: 3.5,
        spaceBetween: 30,
        freeMode: true
      },
      page: 1,
      loading: false,
      finish: false,
      search: [],
      shopList: [],
      bannerImg: [],
      newList: [],
      diySlide: [],
      navInfo: [],
      obj: {},
      logo: null,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: '',
          icon: '',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  components: {
    swiper,
    swiperSlide,
    list,
    Marquee,
    MarqueeItem,
    loading,
    // quickMenu,
    MescrollVue
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.mescroll) {
        // 滚动到之前列表的位置
        if (vm.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
        // 恢复到之前设置的isBounce状态
        if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
    }
    next()
  },
  mounted: function () {
    // 删除
    this.getIndex()
  },
  computed: {
    indexHome: function () {
      return this.$store.state.user.indexHome
    }
  },
  methods: {
    getIndex () {
      this.load = true
      apiHttp.indexHome().then(response => {
        if (response.code === 0) {
          this.load = false
          this.obj = response.msg
          this.search = response.msg.search
          this.bannerImg = response.msg.slide
          this.newList = response.msg.article
          this.diySlide = response.msg.diySlideInfo
          this.navInfo = response.msg.navInfo
          this.logo = response.msg.article[0].logo
        } else {
          this.load = false
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(this.obj, false)
        })
      }).catch((e) => {
        this.load = false
      })
    },
    handSearch (item) {
      this.$router.push({
        name: 'mallProductList',
        query: {keyword: item}
      })
    },
    handDetail (id) {
      this.$router.push({
        name: 'mallHomeDetail',
        query: {
          title: id
        }
      })
    },
    handDetailNew (item) {
      this.$router.push({
        name: 'mallArticleInfo',
        query: item
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.indexList(page.num).then(res => {
        if (res.code === 0) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.shopList = []
          this.shopList = this.shopList.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.list.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.finish = false
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    // 扫码
    handleQrcode () {
      var FNScanner = api.require('FNScanner');
      let This = this
      FNScanner.open({
        autorotation: true
      }, function(ret, err) {
        if (ret.eventType == 'success') {
          console.log(ret.content);
          apiHttp.underQrcodeSecc(ret.content).then(res => {
            if (res.code === 0) {
              if (res.data.type === 'sadmin') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallPayUnder',
                  query: {spid: res.data.spid, price: res.data.price}
                })
              } else if (res.data.type === 'coupon') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallUnderCancel',
                  query: {spid: res.data.spid, id: res.data.id}
                })
              } else if (res.data.type === 'goods') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallHomeDetail',
                  query: {title: res.data.goodsId}
                })
              } else if (res.data.type === 'shops' && res.data.model === 'bbc') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallSeller',
                  query: {spid: res.data.spid}
                })
              } else if (res.data.type === 'shops' && res.data.model === 'oto') {
                console.log(res.data)
                This.$router.push({
                  name: 'mallUnderdetail',
                  query: {spid: res.data.spid}
                })
              } else if (res.data.type === 'order') {
                This.$router.push({
                  name: 'mallOff_order_detail',
                  query: {orderId: res.data.orderId, bdelete: res.data.bdelete}
                })
              }
            }
          })
        } else {
          console.log(JSON.stringify(err));
        }
      });
    }
  }
}
</script>

<style lang="less">
  .mall-home-scroll{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 1.8rem;
      bottom: 0px;
      height: auto !important;
      background: #ffffff;
      .swiper-pagination{
        bottom: 10px;
        width: 100%;
        margin:0 auto;
        left: 0;
      }
    }
  }
  #home{
    height: 100%;
    text-align: center;
  }
  .my-bullet{
    border-radius: .1rem;
    width: .1rem;
    height: .1rem;
    margin: .05rem;
    display:inline-block;
    background:rgba(0,0,0,0.20);
    display: inline-block;
  }
  .my-bullet-active{
    display: inline-block;
    background:#fc3357;
    width: .2rem
  }
  .homeMall ._v-container{
    margin-top: 1.7rem;
    height: calc(100% - 1.7rem) !important;
  }
  .quick-menu{
    bottom: 1.8rem !important;
    right: .3rem !important;
    transform: rotate(150deg) !important;
  }
  .quick-menu>.menu{
    background: rgba(252,51,87,.8) !important;
    height: .8rem !important;
    width: .8rem !important;
    box-shadow: none !important;
  }
  .quick-menu .sub-menu:first-child{
    left: -128px !important;
  }
  .quick-menu .sub-menu:nth-child(2){
    top: -55px !important;
    left: -100px !important;
  }
  .quick-menu .sub-menu:nth-child(3){
    top: -95px !important;
    left: -60px !important;
  }
  .quick-menu .sub-menu:nth-child(4){
    top: -120px !important;
    left: -6px !important;
  }
  .quick-menu>.menu .core-menu{
    height: .8rem !important;
    width: .8rem !important;
    transform: rotate(30deg) !important;
  }
  .quick-menu>.menu .core-menu .bar, .quick-menu>.menu .core-menu .bar:after, .quick-menu>.menu .core-menu .bar:before{
    width: .38rem !important;
    height: 2px !important;
  }
  .quick-menu>.menu .core-menu .bar{
    left: 11px !important;
    top: 36% !important;
  }
  .quick-menu.active .menu .bar{
    margin-left: 1px !important;
    top:50% !important;
    transform: rotate(106deg) !important;
  }
  .quick-menu>.sub-menu>a{
    background: rgba(252,51,87,.8) !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .quick-menu .sub-menu{
    height: .8rem !important;
    width: .8rem !important;
  }
  .quick-menu .sub-menu a i{
    font-size: 20px !important;
    margin-top: 0 !important;
  }
  .menu-animate{
    animation:none !important;
  }

</style>
