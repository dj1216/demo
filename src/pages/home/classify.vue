<template>
  <div id="classify">
    <div class="header" :style="{paddingTop: statusH + 'rem',color: $store.state.global.search.color,background: 'linear-gradient('+$store.state.global.search.bgDeg+'deg,' +$store.state.global.search.bgColor+','+$store.state.global.search.bgSecondColor+')'}">
      <i class="iconfont icon-back" @click="goBack()"></i>
      <span @click="goBack()">{{this.$route.query.title}}</span>
      <div class="searchBox" @click="jumpTo('/search?type=0')" :style="{background: $store.state.global.search.searchBgColor}">
        <img :src="$store.state.global.search.searchIcon" alt="">
        <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
      </div>
      <span @click="jumpTo('/search?type=0')">搜索</span>
    </div>
      <div class="tabBox" v-if="$route.query.type === '21' || $route.query.type === '31'">
        <tab :line-width="0"  :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="categoryIndex">
          <tab-item v-for="(item, index) of category" :key="item.id" @on-item-click="change(item.id)" :selected="index===categoryIndex">{{item.title}}</tab-item>
        </tab>
        <div class="more vux-1px-b" @click="showMore = !showMore">
          <i class="iconfont icon-sort" :style="{color: $store.state.global.theme.mainColor}" ></i>
        </div>
        <transition name="showlist">
          <div class="moreBox" v-show="showMore">
            <div class="t"><span>全部分类</span><i class="iconfont icon-close" @click="showMore = false"></i></div>
            <div class="classify">
              <div class="classifyBox" v-for="item of category" :key="item.id" @click="jumpTo('/list?type=11&title=' + item.title + '&id=' + item.id)">
                <img src="../../assets/img/home/meishi.png" alt="">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="list" :class="{over: showMore}"  :style="{top: (0.88 + statusH) + 'rem'}">
        <div class="rank vux-1px-t">
          <tab class="tab" :line-width="0" v-model="nowIndex" :active-color="$store.state.global.theme.mainColor" default-color="#333">
            <tab-item :selected="nowIndex === 0" @on-item-click="changeList(0)">最新</tab-item>
            <tab-item :selected="nowIndex === 1" @on-item-click="changeList(5)">佣金比例</tab-item>
            <tab-item v-if="nowIndex !== 2" class="tab_price">
              <p><span>价格</span><span class="sj"><i></i><i></i></span></p>
            </tab-item>
            <tab-item v-if="nowIndex === 2" class="tab_price" :selected="nowIndex === 2" @on-item-click="tabon">
              <p v-show="tab_on === 0"><span>价格</span><span class="sj shang" :style="{borderBottomColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
              <p v-show="tab_on === 1"><span>价格</span><span class="sj xia" :style="{borderTopColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
            </tab-item>
            <tab-item :selected="nowIndex === 3" @on-item-click="changeList(4)">销量</tab-item>
          </tab>
        </div>
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="swiperBox">
          <swiper  dots-position="center" :show-desc-mask="false" :auto="true" :aspect-ratio="340/750" v-if="imgs.length > 0">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in imgs" :key="index">
              <img v-lazy="item.img"  :key="item.img" v-if="item.img" @click="navHttp(item)">
              <img v-lazy="item"  :key="item" v-else>
            </swiper-item>
          </swiper>
        </div>
        <div class="high"></div>
        <div class="recommend">
          <goods-item v-bind:list = list v-bind:showVideo=showVideo v-bind:styles=true @detail="detail" @openVideo="openVideo"></goods-item>
        </div>
        </mescroll-vue>
      </div>
    <!--<div class="goods_back_top" @click="backTop()"></div>-->
  </div>
</template>

<script>
import {Tab, TabItem, Swiper, SwiperItem, Sticky} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    SwiperItem,
    Swiper,
    Sticky,
    MescrollVue,
    GoodsItem
  },
  data () {
    return {
      statusH: '',
      showMore: false,
      num: 6,
      nowIndex: 0,
      tab_on: 0,
      tab_on_ticket: 0,
      imgs: {},
      category: [],
      categoryIndex: 0,
      cate: '',
      list: [],
      page: 1,
      finish: false,
      sort: 0,
      loading: false,
      state: '',
      keyword: '',
      scrollTopH: 0,
      mescroll: null,
      showVideo: this.$route.query.type === 'hdk_10',
      mescrollDown: {
        auto: false,
        callback: this.reset
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
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
      vm.showVideo = vm.$route.query.type === 'hdk_10'
      if (to.name === 'classify' && from.name !== 'supergoods') {
        vm.tab_on = 0
        vm.tab_on_ticket = 0
        vm.nowIndex = 0
        vm.sort = 0
        vm.reset()
        vm.getSwiper()
      }
      if (to.name === 'classify' && from.name === 'supergoods') {
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
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'supergoods' && from.name === 'classify') {
      if (this.mescroll) {
        this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
      }
    }
    next()
  },
  methods: {
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
    openVideo (item) {
      let title = item.title.slice(0, 7) + '...'
      console.log(title)
      let videoPlayer = api.require('videoPlayer')
      videoPlayer.play({
        texts: {
          head: {
            title: title
          }
        },
        styles: {
          head: {
            bg: 'rgba(0.5,0.5,0.5,0.7)',
            height: 44,
            titleSize: 20,
            titleColor: '#fff',
            backSize: 24,
            backImg: 'fs://img/back.png',
            setSize: 20,
            setImg: 'fs://img/set.png'
          },
          foot: {
            bg: 'rgba(0.5,0.5,0.5,0.7)',
            height: 44,
            playSize: 20,
            playImg: 'fs://img/back.png',
            pauseImg: 'fs://img/back.png',
            nextSize: 20,
            nextImg: 'fs://img/back.png',
            timeSize: 14,
            timeColor: '#fff',
            sliderImg: 'fs://img/slder.png',
            progressColor: '#696969',
            progressSelected: '#76EE00'
          }
        },
        path: item.video_url,
        autoPlay: true
      }, function (ret, err) {
        if (ret) {
        } else {
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      if (page.num !== 1) {
        page.num--
      }
      this.$http.post('/amoy/home/goods-list', {
        page: page.num,
        type: this.$route.query.type.substring(4),
        sort: this.sort
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data.goodsList
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          if (res.data && res.data.min_id) {
            this.mescrollUp.page.num = res.data.min_id
          } else {
            this.mescrollUp.page.num += 1
          }
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
            if (this.scrollH && p === 1) {
              this.mescroll.scrollTo(this.$refs.recommend.offsetTop)
            }
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    backTop () {
      setTimeout(() => {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }, 10)
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
      // utils.storage.set('supergoods', item)
      // this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id)
    },
    getSwiper () {
      this.imgs = {}
      let arr = JSON.parse(utils.storage.get('slideInfo'))
      for (let key in arr) {
        if (key === this.$route.query.type) {
          this.imgs = arr[key]
        }
      }
    },
    getCategory (type) {
      this.$http.post('/amoy/home/channel', {type: type}, true).then(res => {
        this.category = res.data
        this.cate = res.data[0].id
        this.reset()
      })
    },
    change (id) {
      this.cate = id
      this.reset()
    },
    changeList (sort) {
      this.sort = sort
      this.reset()
    },
    reset () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    tabon () {
      if (this.tab_on === 1) {
        this.tab_on = 0
        this.sort = 1
        this.reset()
      } else {
        this.tab_on = 1
        this.sort = 2
        this.reset()
      }
    },
    tabTicket () {
      if (this.tab_on_ticket === 1) {
        this.tab_on_ticket = 0
        this.sort = 2
        this.reset()
      } else {
        this.tab_on_ticket = 1
        this.sort = 3
        this.reset()
      }
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    // 删除
    this.getSwiper()
    // this.reset()
  }
}
</script>
<style  lang="less">
  .swiperBox {
    position: relative;
    .vux-swiper-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
    .vux-slider{
      .vux-indicator{
        .vux-icon-dot{
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.4);
        }
        .active{
          background: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
#classify{
  /*position: relative;*/
  height: 100%;
  .mescroll{
    height: calc(100% - 44px);
  }
  .swiper-demo-img{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .88rem;
    span{
      font-size: .3rem;
      margin: 0.02rem .1rem 0 0;
      word-break: keep-all;
    }
    span:last-of-type{
      margin-left: .1rem;
    }
    .searchBox{
      width: 4.6rem;
      /*flex: 1;*/
      height: .6rem;
      border-radius: .3rem;
      background: rgba(255,255,255,.27);
      display: flex;
      align-items: center;
      padding-left: .3rem;
      .icon-search{
        font-size: .27rem;
        margin-top: 0;
      }
      img{
        width: .3rem;
      }
      input{
        margin-left: .2rem;
        font-size: .26rem;
        color: #fff;
        outline: none;
        border: none;
        background: rgba(255,255,255,0);
      }
      ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:    #fff;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #fff;
        opacity:  1;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #fff;
        opacity:  1;
      }
      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color:    #fff;
      }
      ::-ms-input-placeholder { /* Microsoft Edge */
        color:    #fff;
      }
      p{
        margin-top: 0.02rem;
        margin-left: .2rem;
        font-size: .26rem;
        color: #fff;
      }
    }
    .iconfont{
      font-size: .4rem;
      margin-top: .02rem;
    }
  }
  .tabBox{
    display: flex;
    align-items: center;
    height: 44px;
    position: relative;
    z-index: 100;
    background: #fff;
    .vux-tab-wrap{
      flex: 1;
      z-index: 100;
    }
    .more{
      background: #fff;
      position: relative;
      z-index: 100;
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      .icon-sort{
        font-size: .4rem;
      }
    }
    .more:before{
      content: " ";
      position: absolute;
      left: 0;
      bottom: 9px;
      top: 9px;
      height: 26px;
      border-left: 1px solid #C7C7C7;
      color: #C7C7C7;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
    }
    .moreBox{
      position: absolute;
      top: 44px;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      z-index: 99;
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
  }
  .list{
    /*padding-bottom: 44px;*/
    /*box-sizing: border-box;*/
    /*overflow-y: auto;*/
    position: absolute;
    left: 0;
    top: .88rem;
    bottom: 0;
    width: 100%;
    .dialog{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0,0,0,.2);
    }
    .tab_price{
      position: relative;
      font-size: var(--font-mid-size);
      color: #666666;
      p{
        font-size: .26rem;
      }
      span{
        font-size: 14px;
      }
      .sj{
        position: absolute;
        right: 15px;
        top: 14px;
        i{
          display: block;
        }
        i:nth-of-type(1){
          width: 0;
          height:0;
          border-left:3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 5px solid #666666;
        }
        i:nth-of-type(2){
          width: 0;
          height:0;
          margin-top:5px;
          border-left:3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 5px solid #666666;
        }
      }
      .shang i:nth-of-type(1){
        border-bottom: 5px solid !important;
      }
      .xia i:nth-of-type(2){
        border-top: 5px solid !important;
      }
    }
    .allBox{
      overflow: hidden;
      padding: .2rem 0;
      .allList{
        float: left;
        margin: 0 .25rem .2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 1rem;
        img{
          width: 1rem;
          height: 1rem;
          border-radius: .5rem;
        }
        span{
          font-size: .26rem;
        }
      }
    }
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
    ._v-container{
      top: 44px;
    }
  }
  .saleBox{
    .saleT{
      position: relative;
      width: 6.64rem;
      height: 1.32rem;
      margin: .2rem auto;
      img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      p{
        position: absolute;
        left: -0.2rem;
        top: .41rem;
        width: 100%;
        text-align: center;
        font-size: .32rem;
        line-height: .5rem;
        color: #fff;
      }
    }
    .sales{
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
  .recommend{
    background: #fff;
    /*height: calc(100% - 44px);*/
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
    .goods_list_2, .goods_list_1{
      height: 100%;
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
