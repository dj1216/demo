<template>
  <div id="home" class="discounts" ref="home">
    <div class="tabBox" ref="tabBox">
      <template v-if="category">
        <tab :line-width="2"  :scroll-threshold=num :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="$route.query.type">
          <tab-item v-for="(item, index) of category" :key="index" @on-item-click="change(item.na,index)">{{item.name}}</tab-item>
        </tab>
      </template>
    </div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="list" :class="{over: showMore}" ref="list">
        <div class="dialog" v-if="showMore"></div>
        <div class="swiperBox"  v-if="imgs.length > 0">
          <swiper dots-position="center"  :show-desc-mask="false" auto :aspect-ratio="300/750" >
            <swiper-item class="swiper-demo-img" v-for="(item, index) in imgs" :key="index">
              <img :src="item.img"  @click="navHttp(item)">
            </swiper-item>
          </swiper>
        </div>
        <div class="saleBox">
        </div>
        <div class="high"></div>
        <div class="recommend" ref="recommend">
          <goods-item v-bind:list = list @detail="detail"></goods-item>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import {Tab, TabItem, Group, Cell, XHeader, Confirm, XDialog, Badge, TransferDomDirective as TransferDom, Swiper, SwiperItem} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'index',
  components: {
    Tab,
    TabItem,
    Group,
    Cell,
    XHeader,
    Confirm,
    XDialog,
    Badge,
    MescrollVue,
    GoodsItem,
    Swiper,
    SwiperItem
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      activ: 0,
      wgtVer: '',
      size: '',
      wgtUrl: '',
      update: '',
      showToast: false,
      showMore: false,
      num: 6,
      imgs: {},
      list: [],
      page: 1,
      finish: false,
      sort: '',
      loading: false,
      // category: ['新衣', '家具', '美妆'],
      category: [{name: '大牌新衣', na: '服装'}, {name: '名品家具', na: '家具'}, {name: '美妆会场', na: '美妆'}],
      categoryIndex: -1,
      cid: '',
      state: '',
      url: ['/amoy/home/goods-list', '/amoy/taobao/search'],
      type: 0,
      keyword: '',
      info: '',
      scrollH: false,
      scrollTopH: 0,
      swiperOption: {
        notNextTick: true,
        loop: false,
        initialSlide: 0,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        }
      },
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset
      },
      mescrollUp: {
        auto: false,
        callback: this.upCallback,
        page: {
          num: 0
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
      if (page.num !== 1) {
        page.num--
      }
      this.info = {
        page: page.num,
        keyword: this.keyword
      }
      this.$http.post(this.url[this.type], this.info, true, true).then((response) => {
        let arr = response.data
        if (page.num === 1) this.list = []
        this.list = this.list.concat(arr)
        if (response.data[0] && response.data[0].min_id) {
          this.mescrollUp.page.num = response.data[0].min_id
        } else {
          this.mescrollUp.page.num += 1
        }
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    getSwiper () {
      this.imgs = {}
      let arr = JSON.parse(utils.storage.get('slideInfo'))
      for (let key in arr) {
        if (key === 'sys_11') {
          this.imgs = arr.sys_11
        }
      }
      // this.$http.post('/amoy/home/slide', {}, false, true).then(res => {
      //   if (res.code === 0) {
      //     this.imgs = res.data
      //   }
      // })
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
    },
    change (item, index) {
      this.mescroll.scrollTo(0)
      this.imgSearch(item)
      this.activ = index
    },
    imgSearch (keyword) {
      this.categoryIndex = -1
      this.type = 1
      this.keyword = keyword
      this.showMore = false
      this.scrollH = true
      this.mescrollUp.page.num = 1
      this.finish = false
      this.list = []
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    reset () {
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    scrollT () {
      this.$refs.my_scroller.scrollTo(0, this.$refs.recommend.offsetTop, false)
    },
    classify () {
      if (parseInt(this.$route.query.type) === 0) {
        this.change('服装', 0)
      } else if (parseInt(this.$route.query.type) === 1) {
        this.change('家具', 1)
      } else {
        this.change('美妆', 2)
      }
    }
  },
  mounted () {
    // 删除
    this.classify()
    // this.getList()
    this.getSwiper()
  }
}
</script>
<style lang="less">
  @import "../../assets/less/common";
  .discounts{
    .mescroll{
      height: calc(100% - 0.88rem);
    }
    .vux-tab-wrap{
      padding-top: .88rem;
      .vux-tab-container{
        height: .88rem;
        .vux-tab{
          height: .88rem;
          .vux-tab-item{
            line-height: .88rem;
          }
        }
      }
    }
  }
  .swiperBox{
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
  .actives{
    color: #fc3357 !important;
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
  .swiperBox{
    position: relative;
    .vux-swiper-item{
      img{
        width: 100%;
        height: 100%;
      }
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
    ._v-container{
      top: 44px;
    }
    height: 100%;
    position: relative;
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
    .list{
      /*position: absolute;*/
      /*left: 0;*/
      /*top: 44px;*/
      /*bottom: 0;*/
      /*width: 100%;*/
      /*box-sizing: border-box;*/
      overflow-y: auto;
      .dialog{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,.2);
      }
      .allBox{
        overflow: hidden;
        padding: .2rem 0;
        margin-top: 0.2rem;
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
            /*height: 1rem;*/
            border-radius: .5rem;
          }
          span{
            font-size: .24rem;
            word-break: keep-all;
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
          left: 0;
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
    .recommend{
      background: #fff;
      /*height: 100%;*/
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
    .update{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 5.46rem;
      z-index: 10000;
      .bg{
        width: 100%;
      }
      .add{
        position: absolute;
        left: 0;
        top: 4.36rem;
        width: 100%;
        text-align: center;
        p{
          padding-left: .4rem;
          text-align: left;
        }
        .t{
          font-size: .32rem;
          font-weight: bold;
        }
        .info{
          font-size: .28rem;
          color: #666;
        }
        .primary_btn{
          border-radius: .45rem;
          width: 4.1rem;
        }
        img{
          margin-top: .6rem;
          width: .76rem;
          height: .76rem;
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
