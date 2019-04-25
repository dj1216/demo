<template>
  <div id="otherclassify">
    <div class="header" :style="{paddingTop: statusH + 'rem',color: $store.state.global.search.color,background: 'linear-gradient('+$store.state.global.search.bgDeg+'deg,' +$store.state.global.search.bgColor+','+$store.state.global.search.bgSecondColor+')'}">
      <i class="iconfont icon-back" @click="goBack()"></i>
      <span @click="goBack()">{{this.$route.query.title}}</span>
      <div class="searchBox" @click="jumpTo('/search?type=' + type)" :style="{background: $store.state.global.search.searchBgColor}">
        <img :src="$store.state.global.search.searchIcon" alt="">
        <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
      </div>
      <span @click="jumpTo('/search?type=' + type)">搜索</span>
    </div>
    <div class="tabBox" v-if="$route.query.type === '21' || $route.query.type === '31'">
      <tab :line-width="0"  default-color="#333" v-model="categoryIndex" :active-color="$store.state.global.theme.mainColor"  @touchstart.native='forbidRightSlip' @touchend.native='allowRightSlip'>
        <!--<tab-item @on-item-click="change('')">全部</tab-item>-->
        <tab-item v-for="(item, index) of category" :key="item.id" @on-item-click="change(item.from_cid, index)" :selected="index===categoryIndex">{{item.title}}</tab-item>
      </tab>
      <!--<div class="tabBox">-->
        <!--<div class="tabBoxItem" v-for="(item, index) of category" :key="item.id" :class="{active: index===categoryIndex}" @on-item-click="change(item.id)">{{item.title}}</div>-->
      <!--</div>-->
      <!--<div class="more vux-1px-b" @click="showMore = !showMore">-->
        <!--<i class="iconfont icon-sort"></i>-->
      <!--</div>-->
      <transition name="showlist">
        <div class="moreBox" v-show="showMore">
          <div class="t"><span>全部分类</span><i class="iconfont icon-close" @click="showMore = false"></i></div>
          <div class="classify">
            <div class="classifyBox" v-for="(item, index) of category" :key="item.id" @click="change(item.from_cid, index)" >
              <img src="../../assets/img/home/meishi.png" alt="">
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="list" :class="{over: showMore}"  :style="{top: listTop + 'rem'}">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="dialog" v-if="showMore"></div>
        <div class="swiperBox">
          <swiper  dots-position="center"  :show-desc-mask="false" :auto="true" :aspect-ratio="300/750" v-if="imgs.length > 0">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in imgs" :key="index">
              <img v-lazy="item.img"  :key="item.img" v-if="item.img" @click="navHttp(item)">
              <img v-lazy="item"  :key="item" v-else>
            </swiper-item>
          </swiper>
        </div>
      <div class="high"></div>
      <div class="rank vux-1px-t" v-if="$route.query.type === 11 || $route.query.type === 12">
        <tab class="tab" :line-width="0" v-model="nowIndex" active-color="#fc3357" default-color="#333">
          <tab-item :selected="nowIndex === 0" @on-item-click="changeList(1)">最新</tab-item>
          <tab-item :selected="nowIndex === 1" @on-item-click="changeList(3)">销量</tab-item>
          <tab-item v-if="nowIndex !== 2" class="tab_price">
            <p><span>价格</span><span class="sj"><i></i><i></i></span></p>
          </tab-item>
          <tab-item v-if="nowIndex === 2" class="tab_price" :selected="nowIndex === 2" @on-item-click="tabon">
            <p v-show="tab_on === 0"><span>价格</span><span class="sj shang" :style="{borderBottomColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
            <p v-show="tab_on === 1"><span>价格</span><span class="sj xia" :style="{borderTopColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
          </tab-item>
          <tab-item v-if="nowIndex !== 3" class="tab_price">
            <p><span>券额</span><span class="sj"><i></i><i></i></span></p>
          </tab-item>
          <tab-item v-if="nowIndex === 3" class="tab_price" :selected="nowIndex === 3" @on-item-click="tabTicket">
            <p v-show="tab_on_ticket === 0"><span>券额</span><span class="sj shang" :style="{borderBottomColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
            <p v-show="tab_on_ticket === 1"><span>券额</span><span class="sj xia" :style="{borderTopColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
          </tab-item>
        </tab>
      </div>
      <div class="recommend">
        <goods-item v-bind:list = list  v-bind:styles=true @detail="detail"></goods-item>
      </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
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
    MescrollVue,
    GoodsItem
  },
  data () {
    return {
      listTop: '',
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
      sort: 1,
      loading: false,
      state: '',
      keyword: '',
      url: this.$route.query.type === '21' ? '/amoy/jd/search' : '/amoy/pdd/search',
      type: Number(this.$route.query.type) === 21 ? 1 : 2,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 8
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
      if (to.name === 'otherclassify' && from.name !== 'supergoods') {
        vm.categoryIndex = 0
        vm.cate = ''
        vm.getSwiper()
        if (vm.$route.query.type === '21') {
          vm.url = '/amoy/jd/search'
          vm.type = 1
          vm.getCategory(2)
        } else if (vm.$route.query.type === '31') {
          vm.url = '/amoy/pdd/search'
          vm.type = 2
          vm.getCategory(3)
        }
        vm.reset()
      }
      if (to.name === 'otherclassify' && from.name === 'supergoods') {
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
    if (to.name === 'supergoods' && from.name === 'otherclassify') {
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
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post(this.url, {
        page: page.num,
        cid: this.cate
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            console.log(page.num)
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
    getSwiper () {
      this.imgs = {}
      let arr = JSON.parse(utils.storage.get('slideInfo'))
      if (this.$route.query.type === '21') {
        if (arr.sys_21) {
          this.imgs = arr.sys_21
        }
      } else if (this.$route.query.type === '31') {
        if (arr.sys_31) {
          this.imgs = arr.sys_31
        }
      }
    },
    getCategory (type) {
      this.$http.post('/amoy/home/channel', {type: type}, false).then(res => {
        res.data.unshift({title: '全部', id: '', from_cid: ''})
        this.category = res.data
      })
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + this.$route.query.type + '&id=' + item.origin_id + '&i=0')
    },
    change (id, index) {
      this.categoryIndex = index
      this.showMore = false
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
        this.sort = 5
        this.reset()
      } else {
        this.tab_on = 1
        this.sort = 4
        this.reset()
      }
    },
    tabTicket () {
      if (this.tab_on_ticket === 1) {
        this.tab_on_ticket = 0
        this.sort = 9
        this.reset()
      } else {
        this.tab_on_ticket = 1
        this.sort = 8
        this.reset()
      }
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
    this.listTop = (44 / size) + this.statusH + 0.88
  }
}
</script>
<style lang="less">
@import "../../assets/less/common";
#otherclassify{
  .scrollable .vux-tab-item{
    flex: none;
    padding: 0 10px;
    word-break: keep-all;
    float: left;
    width: auto;
  }
  /*.mescroll{*/
    /*height: 600px;*/
  /*}*/
}
</style>
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
#otherclassify{
  height: 100%;
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
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .88rem;
    span{
      font-size: .3rem;
      margin: 0.02rem .2rem 0 0;
    }
    .searchBox{
      width: 4.6rem;
      height: .6rem;
      border-radius: .3rem;
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
      p{
        margin-top: 0.02rem;
        margin-left: .2rem;
        font-size: .26rem;
        line-height: .6rem;
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
    box-sizing: border-box;
    overflow-y: auto;
    position: relative;
    position: absolute;
    bottom: 0;
    left: 0;
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
