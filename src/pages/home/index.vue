<template>
  <div id="home"  ref="home">
    <div class="dialog" v-if="showMore" @click="showMore = false"></div>
    <transition name="showlist">
      <div class="moreBox" v-show="showMore"  :style="{top: headBoxH + 'rem'}">
        <div class="t"><span>全部分类</span><i class="iconfont icon-close" @click="showMore = false"></i></div>
        <div class="classify">
          <div class="classifyBox" v-for="(item, index) of category" :key="item.id" @click="change(item.from_cid, index + 1)">
            <img v-lazy="item.img" alt="" >
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="swiperBg" :style="{paddingTop: statusH + 'rem',background: swiperBg}">
      <img src="../../assets/img/home/swiperBg.png" alt="">
      <div class=""></div>
    </div>
    <div  class="headBox" ref="headBox" :style="{paddingTop: statusH + 'rem',background: 'linear-gradient('+$store.state.global.search.bgDeg+'deg,' +$store.state.global.search.bgColor+','+$store.state.global.search.bgSecondColor+')'}">
      <div class="header" >
        <img :src="$store.state.global.search.leftIcon" alt="" class="signIn" @click="jumpLink($store.state.global.search.leftLink)" v-if="$store.state.global.search.leftIcon">
        <div class="searchBox" @click="jumpTo('/search')" :style="{background: $store.state.global.search.searchBgColor}">
          <img :src="$store.state.global.search.searchIcon" alt="">
          <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
        </div>
        <img  :src="$store.state.global.search.rightIcon" v-if="$store.state.global.search.rightIcon"  alt="" class="shopImg" @click="jumpLink($store.state.global.search.rightLink)">
      </div>
      <template v-for="item of $store.state.global.content">
        <div class="navBox homeNav"   :key="item.id" v-if="item.name === 'edit-header-category'"  :style="{background: 'linear-gradient('+item.params.bgDeg+'deg,' +item.params.bgColor+','+item.params.bgSecondColor+')'}">
          <div class="tabBox" ref="tabBox" v-if="category">
            <div class="tabIndex" :style="{color: item.params.color}">
              <div @click="change(0, 0)"  :class="{active: categoryIndex === 0}" v-if="categoryIndex === 0" :style="{color: item.params.activeColor}">精选</div>
              <div @click="change(0, 0)"  :class="{active: categoryIndex === 0}" v-else >精选</div>
              <template v-for="(itemNav, index) of category">
                <div  :key="itemNav.id" @click="change(itemNav.from_cid, index + 1)" :class="{active: categoryIndex === (index + 1)}" v-if="categoryIndex === (index + 1)" :style="{color: item.params.activeColor}">{{itemNav.title}}</div>
                <div  :key="itemNav.id" @click="change(itemNav.from_cid, index + 1)" :class="{active: categoryIndex === (index + 1)}" v-else>{{itemNav.title}}</div>
              </template>
            </div>
            <div class="more" @click="showMore = !showMore">
              <i class="iconfont icon-sort" :style="{color:item.params.color}"></i>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!--分类-->
    <div class="list" :class="{over: showMore}" ref="list" :style="{top: headBoxH + 'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" :style="{overflowY: showMore ? 'hidden' : 'auto'}">
        <template v-for="item of $store.state.global.content" v-if="!cid">
          <edit-slide v-if="item.name === 'edit-slide' && slide"  :data="item.params" ref="editSlide" @swiperChange="swiperChange" :key="item.id" ></edit-slide>
          <component v-else-if="item.name !== 'edit-slide' && item.name !== 'edit-header-category' && item.name !== 'edit-header'" v-bind:is="item.name" :data="item.params" :key="item.id"></component>
        </template>
        <!--<div class="indexswiper2">-->
          <!--<swiper :options="swiperOption2" class="swiper" >-->
            <!--&lt;!&ndash;<swiper-slide :class="{active:index === 0, shadow:true}">&ndash;&gt;-->
              <!--&lt;!&ndash;<img src="../../assets/img/home/swiper1.png" alt="" >&ndash;&gt;-->
            <!--&lt;!&ndash;</swiper-slide>&ndash;&gt;-->
            <!--<swiper-slide :class="{active:index === 0, shadow:true}">-->
              <!--<img src="../../assets/img/home/swiper2.png" alt="" >-->
            <!--</swiper-slide>-->
            <!--<swiper-slide :class="{active:index === 0, shadow:true}">-->
              <!--<img src="../../assets/img/home/swiper2.png" alt="" >-->
            <!--</swiper-slide>-->
            <!--<swiper-slide :class="{active:index === 0, shadow:true}">-->
              <!--<img src="../../assets/img/home/swiper1.png" alt="">-->
            <!--</swiper-slide>-->
            <!--&lt;!&ndash;<swiper-slide :class="{active:index === 0, shadow:true}">&ndash;&gt;-->
              <!--&lt;!&ndash;<img src="../../assets/img/home/swiper2.png" alt="" >&ndash;&gt;-->
            <!--&lt;!&ndash;</swiper-slide>&ndash;&gt;-->
          <!--</swiper>-->
        <!--</div>-->
        <!--<edit-slide :data="otherSwiper"></edit-slide>-->
        <div class="swiperBox" v-if="cid && other.img && other.img.length > 0">
          <swiper auto :aspect-ratio="300/750" dots-position="center">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in other.img" :key="index">
              <img :src="item" @click="jumpLink(item)">
            </swiper-item>
          </swiper>
        </div>
        <div class="secondClassify" v-if="cid && other.category && other.category.length > 0">
          <div class="classify" v-for="(item, index) of other.category" :key="index" @click="toList(item)">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="sortBox"  v-if="cid">
          <div class="sort" @click="rank(9)">
            <span>{{sortName}}</span>
            <img src="../../assets/img/home/sort1.png" alt="" v-if="classifySort === 0 || classifySort === 3 || classifySort === 6">
            <img src="../../assets/img/home/sort2.png" alt="" v-else>
          </div>
          <div class="sort" @click="rank(5)">
            <span>佣金比例</span>
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 8">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 5">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <div class="sort" @click="rank(2)">
            <span>券后价</span>
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 1">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 2">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <div class="sort" @click="rank(4)">
            <span>销量</span>
            <img src="../../assets/img/home/shang.png" alt="" v-if="classifySort === 7">
            <img src="../../assets/img/home/xia.png" alt="" v-else-if="classifySort === 4">
            <img src="../../assets/img/home/unsort.png" alt=""  v-else>
          </div>
          <div class="sort changeStyle">
            <img src="../../assets/img/home/style1.png" alt="" v-if="styles" @click="styles = !styles">
            <img src="../../assets/img/home/style2.png" alt="" v-else @click="styles = !styles">
          </div>
          <div class="multiple" v-if="multiple">
            <div @click="rank(0)" :class="{select: classifySort === 0}">综合排序</div>
            <div @click="rank(3)" :class="{select: classifySort === 3}">优惠券面值由高到低</div>
            <div @click="rank(6)" :class="{select: classifySort === 6}">优惠券面值由低到高</div>
          </div>
        </div>
        <tab :line-width="2" v-model="isTaoIndex" :active-color="$store.state.global.theme.mainColor" default-color="#333">
          <tab-item :selected="isTaoIndex === 0" @on-item-click="isTaoShopping">精选商品</tab-item>
          <tab-item :selected="isTaoIndex === 1" @on-item-click="isTaoShopping">淘客商品</tab-item>
        </tab>
        <div class="recommend" ref="recommend">
          <goods-item v-bind:list = "dataList" @detail="detail" v-bind:styles="!styles" v-show="isTaoShop"></goods-item>
          <list :list="dataList" ref="recommend" v-show="!isTaoShop"></list>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, Group, Cell, XHeader, Confirm, XDialog, Badge, XCircle, TransferDomDirective as TransferDom, Swiper, SwiperItem} from 'vux'
import * as utils from '../../utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import GoodsItem from '../../components/GoodsList'
import EditSlide from '../../components/EditSlide'
import EditNav from '../../components/EditNav'
import EditHeader from '../../components/EditHeader'
import EditBlank from '../../components/EditBlank'
import EditRichText from '../../components/EditRichText'
import EditText from '../../components/EditText'
import EditImg from '../../components/EditImg'
import EditCube from '../../components/EditCube'
import List from '../../components/list'
import * as apiHttp from '../../api/index'
export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    XHeader,
    Confirm,
    XCircle,
    XDialog,
    Badge,
    MescrollVue,
    GoodsItem,
    EditSlide,
    EditNav,
    EditHeader,
    EditBlank,
    EditRichText,
    EditImg,
    EditCube,
    EditText,
    Swiper,
    SwiperItem,
    List
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      isTaoIndex: 0,
      isTaoShop: false,
      slide: true,
      swiperBg: '',
      swiperOption2: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        loopedSlides: 4,
        slidesPerView: 3,
        initialSlide: 1,
        spaceBetween: 0,
        coverflowEffect: {
          rotate: 5,
          stretch: 20,
          depth: 80,
          modifier: 3,
          slideShadows: false
        }
      },
      sortName: '综合',
      multiple: false,
      other: '',
      otherSwiper: '',
      classifySort: 0,
      styles: true,
      headBoxH: 0,
      statusH: '',
      // text: '无所谓',
      color: '#fff',
      perCon: '0%',
      showToast1: false,
      percent: 0,
      wgtVer: '',
      size: '',
      wgtUrl: '',
      update: '',
      showToast: false,
      result: '',
      showMore: false,
      num: 6,
      imgs: [],
      icons: [],
      list: [],
      page: 1,
      sort: '',
      loading: false,
      category: '',
      categoryIndex: 0,
      cid: '',
      state: '',
      url: ['/amoy/home/goods-list', '/amoy/taobao/search'],
      type: 0,
      keyword: '',
      info: '',
      scrollH: false,
      scrollTopH: 0,
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
        scrollbar: {
          user: false
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.slide = false
      vm.change(0, 0)
      vm.$nextTick(() => {
        vm.slide = true
      })
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
    this.showMore = false
    if (this.mescroll) {
      this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
      this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
    }
    next()
  },
  methods: {
    isTaoShopping () {
      this.isTaoShop = !this.isTaoShop
      this.dataList = []
      this.mescrollUp.page.num = 0
      this.mescroll = null
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    swiperChange (color) {
      this.swiperBg = color
    },
    openCart () {
      api.openWin({
        name: 'cartWin',
        url: '../html/cartMain.html',
        reload: true,
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
    toList (item) {
      this.$router.push('/list?type=11&title=' + item.title + '&cid=' + this.cid)
    },
    rank (sort) {
      if (sort === 9) {
        this.multiple = !this.multiple
        // if (this.classifySort === 0) {
        //   this.multiple = true
        // } else {
        //   this.classifySort = sort
        //   this.mescroll.resetUpScroll()
        // }
      } else if (sort === 0) {
        this.multiple = false
        this.sortName = '综合'
        if (this.classifySort === 0) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 3) {
        this.multiple = false
        this.sortName = '优惠券面'
        if (this.classifySort === 3) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 6) {
        this.sortName = '优惠券面'
        this.multiple = false
        if (this.classifySort === 6) {
        } else {
          this.classifySort = sort
          this.mescroll.resetUpScroll()
        }
      } else if (sort === 5) {
        if (this.classifySort === 5) {
          this.classifySort = 8
        } else {
          this.classifySort = 5
        }
        this.mescroll.resetUpScroll()
      } else if (sort === 2) {
        if (this.classifySort === 2) {
          this.classifySort = 1
        } else {
          this.classifySort = 2
        }
        this.mescroll.resetUpScroll()
      } else if (sort === 4) {
        if (this.classifySort === 4) {
          this.classifySort = 7
        } else {
          this.classifySort = 4
        }
        this.mescroll.resetUpScroll()
      }
    },
    ali () {
      api.openWin({
        name: 'aliWin',
        url: '../html/main.html',
        reload: true,
        pageParam: {
          url: 'https://s.click.taobao.com/g4LhrGw'
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
    navHttp (item) {
      if (item.url) {
        let browser = api.require('webBrowser')
        let url
        if (item.url.indexOf('http://') === 0 || item.url.indexOf('https://') === 0) {
          url = item.url
        } else {
          url = 'http://' + item.url
        }
        browser.open({
          url: url,
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    },
    refresh: function () {
      // this.categoryIndex = 0
      this.type = 0
      this.keyword = ''
      // this.cid = ''
      this.showMore = false
      this.scrollH = false
      this.mescrollUp.page.num = 1
      this.getDesign()
      this.getSwiper()
      this.getCategory()
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if (page.num !== 1) {
        page.num--
      }
      if (this.type === 1) {
        this.info = {
          page: page.num,
          keyword: this.keyword
        }
      } else if (this.type === 2) {
        this.info = {
          cid: this.cid
        }
      } else if (this.cid === '' || this.cid === 0) {
        this.info = {
          page: page.num,
          type: 1
        }
      } else {
        this.info = {
          page: page.num,
          cid: this.cid,
          sort: this.classifySort
        }
      }
      if(!this.isTaoShop) {
        apiHttp.indexList(page.num).then(res => {
          if (res.code === 0) {
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.dataList = []
            this.dataList = this.dataList.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      } else {
        this.$http.post(this.url[this.type], this.info, true, true).then((response) => {
          let arr = response.data.goodsList
          if (page.num === 1) this.dataList = []
          // let p = page.num
          this.dataList = this.dataList.concat(arr)
          if (response.data && response.data.min_id) {
            this.mescrollUp.page.num = response.data.min_id
          } else {
            this.mescrollUp.page.num += 1
          }
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
            // if (this.scrollH && p === 1) {
            //   this.mescroll.scrollTo(this.$refs.recommend.offsetTop)
            // }
          })
        }).catch((e) => {
          mescroll.endErr()
        })
      }
      /* this.$http.post('amoy/material/material-list',{page: page.num,cid: 1}, true, true).then((response) => {
        let arr = response.data
        if (page.num === 1) this.dataList = []
        // let p = page.num
        this.dataList = this.dataList.concat(arr)
        if (response.data && response.data.min_id) {
          this.mescrollUp.page.num = response.data.min_id
        } else {
          this.mescrollUp.page.num += 1
        }
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
          // if (this.scrollH && p === 1) {
          //   this.mescroll.scrollTo(this.$refs.recommend.offsetTop)
          // }
        })
      }).catch((e) => {
        mescroll.endErr()
      }) */
    },
    navTo (item) {
      if (item.type === 'BY_JD') {
        this.$router.push('/otherclassify?title=' + item.title + '&type=21')
      } else if (item.type === 'BY_PDD') {
        this.$router.push('/otherclassify?title=' + item.title + '&type=31')
      } else if (item.type === 'BY_DRS') {
        this.$router.push('/personSpeak')
      } else if (item.type === 'BY_MS') {
        this.$router.push('/fastrob')
      } else if (item.type === 'BY_MALL_INDEX') {
        this.$router.push('/mall/home')
      } else if (item.type === 'BY_MALL_OTO') {
        this.$router.push('/mall/underShop')
      } else if (item.type === 'BY_VIDEO') {
        this.$router.push('/videoList')
      } else if (item.type === 'BY_DRY') {
        this.$router.push('/dayingList')
      } else if (item.type === 'BY_ALI') {
        api.openWin({
          name: 'aliWin',
          url: '../html/main.html',
          reload: true,
          pageParam: {
            url: item.url
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
        this.$router.push('/classify?title=' + item.title + '&type=' + item.type)
      }
    },
    backTop () {
      setTimeout(() => {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }, 10)
    },
    getDesign () {
      this.$http.post('/amoy/app/design', {
        type: 1,
        version: api.appVersion,
        device: (api.systemType === 'android') ? 1 : 2
      }, true).then(res => {
        if (res.data.footer) {
          this.$store.commit('setFooter', JSON.parse(res.data.footer))
        }
        if (res.data.content) {
          this.$store.commit('setContent', JSON.parse(res.data.content))
        }
        if (res.data.theme) {
          this.$store.commit('setTheme', JSON.parse(res.data.theme))
        }
        if (res.data.is_app_store) {
          this.$store.commit('setFirstNav', '/mall/home')
          this.$router.push('/mall/home')
        } else {
          this.$store.commit('setFirstNav', '/home')
        }
        if (res.data.content) {
          let content = JSON.parse(res.data.content)
          for (let i = 0; i < content.length; i++) {
            if (content[i].name === 'edit-header') {
              this.$store.commit('setSearch', content[i].params)
            }
          }
        }
      })
    },
    getSwiper () {
      this.$http.post('/amoy/home/slides', {}, true, true).then(res => {
        if (res.code === 0) {
          utils.storage.set('slideInfo', JSON.stringify(res.data))
        } else {
          utils.storage.set('slideInfo', JSON.stringify({}))
        }
      })
    },
    getCategory () {
      this.$http.post('/amoy/home/channel', {type: 1}, false).then(res => {
        this.category = res.data
        // let size = (document.documentElement.clientWidth / 7.5)
        // this.$nextTick(() => {
        //   let h = document.getElementsByClassName('headBox')[0].offsetHeight
        //   this.headBoxH = (h / size)
        // })
        // api.removeLaunchView({
        //   animation: {
        //     type: 'fade',
        //     duration: 500
        //   }
        // })
      })
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
    },
    changeCate () {
      this.$http.post('/amoy/user/get-category', {cid: this.cid}).then(res => {
        this.other = res.data
        // api.removeLaunchView({
        //   animation: {
        //     type: 'fade',
        //     duration: 500
        //   }
        // })
      })
    },
    change (id, index) {
      this.mescroll.setScrollTop(0)
      this.type = 0
      this.categoryIndex = index
      this.showMore = false
      this.scrollH = true
      this.page = 1
      this.cid = id
      this.mescrollUp.page.num = 1
      this.changeCate()
      this.mescroll.resetUpScroll()
    },
    scrollT () {
      this.$refs.my_scroller.scrollTo(0, this.$refs.recommend.offsetTop, false)
    }
  },
  // computed: {
  //   swiperBgColor () {
  //     // let size = (document.documentElement.clientWidth / 7.5)
  //     // let h = document.getElementsByClassName('headBox')[0].offsetHeight
  //     // return h / size
  //     // let color = ''
  //     // api.addEventListener({
  //     //   name: 'swiperChange'
  //     // }, function (ret, err) {
  //     //   color = ret.value.progress
  //     //   console.log(color)
  //     // })
  //     console.log(this.$store.state.global.swiperProgress)
  //     // return color
  //   }
  // },
  created () {
    this.getSwiper()
    this.getCategory()
    let size = (document.documentElement.clientWidth / 7.5)
    // this.$nextTick(() => {
    //   let h = document.getElementsByClassName('headBox')[0].offsetHeight
    //   this.headBoxH = (h / size)
    // })
    // alert(this.$refs.recommend)
    this.statusH = (api.safeArea.top / size)
    this.headBoxH = this.statusH + 0.88 + 0.78
  },
  mounted: function () {
    // alert(this.$refs.recommend)
    document.getElementsByClassName('footer')[0].style.paddingBottom = api.safeArea.bottom + 'px'
  }
}
</script>
<style lang="less">
  @import "../../assets/less/common";
  #home{
    .recommend {
      background: #fff;
      .goods_list_2, .goods_list_1 {
        .goods_ul {
          padding-top: 0;
        }
      }
    }
    .scrollable .vux-tab-item{
      flex: 0 0 14%;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.secondClassify{
  padding: .3rem 0 ;
  overflow: hidden;
  .classify{
    width: 20%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: .1rem 0;
    img{
      width: .8rem;
      height: .8rem;
      margin-bottom: .1rem;
    }
  }
}
.sortBox{
  position: sticky;
  top: -1px;
  background: #fff;
  z-index: 1000;
  display: flex;
  height: .9rem;
  border: 1px solid #F7F7F7;
  .sort{
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      font-size: .28rem;
      color: #333;
      margin-right: .1rem;
    }
    img{
      width: .18rem;
    }
  }
  .changeStyle{
    flex: 1;
    img{
      width: .36rem;
    }
  }
  .multiple{
    position: absolute;
    bottom: -2.64rem;
    left: 0;
    width: 100%;
    background: #fff;
    div{
      font-size: .28rem;
      height: .88rem;
      line-height: .88rem;
      padding-left: .3rem;
    }
    .select{
      color: #FF2556;
    }
  }
}
.shadow{
  box-shadow:0 21px 36px -3px #EAEAEA;;
}
.eleven{
  /*width: 100%;*/
  height: 2rem;
  position: relative;
  margin: 0px 0.2rem;
  >img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .go{
    position: absolute;
    top: 0.3rem;
    right: 0.1rem;
    width: 1rem;
    height: 1rem;
    animation:mymove 1s infinite;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes mymove
{
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
/*.swiper{*/
  /*height: 3.4rem;*/
/*}*/
.banner{
  height: 3.4rem;
  width: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
.explain{
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 0.3rem;
  line-height: 0.9rem;
  padding-left: 0.2rem;
  color: black;
}
#home{
  /*background: url("../../assets/img/home/homebg.png") no-repeat;*/
  /*background-size: contain;*/
  .headBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .swiperBg{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 666;
    img{
      position: absolute;
      left: 0;
      right: 0;
      top: 4.5rem;
    }
    div{
      position: absolute;
      top: 6rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      z-index: 667;
    }
  }
  .header{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    .searchBox{
      flex: 1;
      height: .6rem;
      border-radius: .3rem;
      background: rgba(255,255,255,.27);
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: .3rem;
      }
      p{
        margin-top: 0.02rem;
        margin-left: .2rem;
        font-size: .26rem;
      }
    }
    .signIn{
      width: .40rem;
      height: .4rem;
      margin-right: .3rem;
    }
    .shopImg{
      width: .40rem;
      height: .4rem;
      margin-left: .3rem;
    }
    .shop{
      font-size: .6rem;
      line-height: .6rem;
      height: 100%;
      width: .6rem;
      position: relative;
      top: .075rem;
      left: .075rem;
      img{
        width: .45rem;
        height: .45rem;
      }
      .vux-badge{
        background: #fff;
        position: absolute;
        right: 0.01rem;
        top: 0.01rem;
      }
    }
    .iconfont{
      color: #fff;
      font-size: .4rem;
    }
  }
  .dialog{
    position: fixed;
    left: 0;
    top: 200px;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.4);
    z-index: 866;
  }
  .moreBox{
    z-index: 888;
    position: absolute;
    top: 0.78rem;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: .2rem .2rem;
    .t{
      overflow: hidden;
      span{
        font-size: .26rem;
        float: left;
      }
      i{
        float: right;
      }
    }
    .classify{
      .classifyBox{
        width: 15%;
        margin: .2rem 5%;
        float: left;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img{
          width: .9rem;
          margin-bottom: .2rem;
        }
        span{
          font-size: .26rem;
        }
      }
    }
  }
  ._v-container{
    top: 44px;
  }
  height: 100%;
  position: relative;
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all .3s;
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
  }
  .navBox{
    height: 0.78rem;
    position: relative;
    z-index: 100;
  }
  .tabBox{
    display: flex;
    align-items: center;
    height: 0.78rem;
    position: relative;
    z-index: 100;
    .tabIndex{
      flex: 1;
      position: relative;
      z-index: 1000;
      overflow-y: auto;
      display: -webkit-box;
      flex-wrap: nowrap;
      height: 100%;
      div{
        padding: 0 .2rem;
        height: 100%;
        font-size: .26rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active{
        font-size: .26rem;
      }
    }
    .vux-tab-wrap{
      flex: 1;
      z-index: 100;
    }
    .vux-tab-item{
      font-size: .26rem;
    }
    .vux-tab-selected{
      font-weight: bold;
      font-size: .28rem;
    }
     .vux-tab-item{
      /*color: #fff !important;*/
    }
    .more{
      position: relative;
      z-index: 100;
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      .icon-sort{
        font-size: .4rem;
        color: #333;
      }
    }
    .more:before{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 9px;
      top: 9px;
      height: 26px;
      border-left: 1px solid #fff;
      color: #fff;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
    }
  }
  .list{
    width: 100%;
    position: absolute;
    bottom: 0;
    overflow-y: auto;
    z-index: 777;
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
  }
  .saleBox{
    overflow: hidden;
    background: #fff;
    .saleT{
      position: relative;
      width: 7rem;
      height: 2.1rem;
      padding: .2rem .25rem;
      img{
        height: 100%;
        width: 100%;
      }
      p{
        position: absolute;
        left: 0;
        top: .41rem;
        width: 100%;
        text-align: center;
        font-size: .32rem;
        line-height: .5rem;
        color: #fff;
      }
    }
    .imgNav{
      overflow: hidden;
      padding: .2rem .3rem;
      img{
        float: left;
        width: 3.44rem;
        height: 2.47rem;
        box-sizing: border-box;
      }
      img:nth-of-type(1){
        border-right: #f3f3f3 solid 1px;
      }
      img:nth-of-type(2){
      }
      img:nth-of-type(3){
        border-top: 1px solid #f3f3f3;
        border-right: 1px solid #f3f3f3;
      }
      img:nth-of-type(4){
        border-top: 1px solid #f3f3f3;
      }
    }
    .sales{
      padding-bottom: .2rem;
      display: flex;
      img{
        width: 100%;
        height: 100%;
      }
      .sale{
        margin-left: .18666rem;
        width: 3.47rem;
        height: 4.3rem;
        .sale1{
          width: 100%;
          height: 2.11rem;
          margin-bottom: .08rem;
        }
        .sale2{
          width: 100%;
          height: 2.11rem;
        }
      }
      .sale3{
        margin-left: .18666rem;
        width: 3.47rem;
        height: 4.3rem;
      }
    }
  }
  .saleBoxs{
    height: 7rem;
    position: relative;
    padding: 0.16rem;
    > img{
      width: 100%;
      height: 100%;
    }
    .imgBox{
      position: absolute;
      width: 100%;
      height: 0.5rem;
      top: 2.4rem;
      height: 4.56rem;
      overflow: hidden;
      .le{
        float: left;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column ;
        .bottoms{
          width: 90%;
          margin: 0 auto;
          height: 50%;
          margin-top: 0.1rem;
        }
        .tops{
          height: 46%;
          width: 90%;
          margin: 0 auto;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .ri{
        width: 34%;
        height: 98%;
        float: right;
        position: absolute;
        right: 0.55rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .commodityBox{
    padding: 0.16rem;
    margin-top: 0.7rem;
    .commodity{
      display: flex;
      height: 2.72rem;
      border-bottom: 1px solid #e1e1e1;
      div{
        flex: 1;
        padding: 0.2rem;
        img{
          width: 100%;
        }
      }
      >div:nth-child(1){
        border-right: 1px solid #e1e1e1;
      }
    }
    .active{
      border-bottom: none
    }
  }
  .recommendT{
    .t{
      width: 100%;
      height: 1.2rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 5.68rem;
      }
    }
  }
  .recommend{
    background: #fff;
    .goods_list_2, .goods_list_1{
      .goods_ul{
        padding-top: 0;
      }
      height: calc(100% - 1.2rem);
      background: #f4f4f4;
      ul{
        height: 100%;
        overflow: auto;
      }
    }
  }
  .over{
    overflow-y: hidden;
  }
}
</style>
