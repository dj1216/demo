<template>
  <div class="result" :style="{paddingTop: h+'px'}">
    <div class="header">
      <i class="iconfont icon-back" @click="goBack()"></i>
      <div class="searchBox">
        <i class="iconfont icon-search" :style="{color: $store.state.global.theme.mainColor}" ></i>
        <input placeholder="请输入关键字" v-model="value" @keyup.enter="reset" />
      </div>
      <span @click="reset" :style="{color: $store.state.global.theme.mainColor}" >搜索</span>
    </div>
    <tab :line-width="2" custom-bar-width=".8rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type" class="resultTab">
      <tab-item @on-item-click="reset">淘宝</tab-item>
      <tab-item @on-item-click="reset">京东</tab-item>
      <tab-item @on-item-click="reset">拼多多</tab-item>
    </tab>
    <div class="rank">
      <tab class="tab resultTab" :line-width="0" v-model="nowIndex" :active-color="$store.state.global.theme.mainColor" default-color="#333">
        <tab-item :selected="nowIndex === 0" @on-item-click="changeList('')">综合</tab-item>
        <tab-item :selected="nowIndex === 1" @on-item-click="changeList(2)">销量</tab-item>
        <tab-item v-if="nowIndex !== 2" class="tab_price">
          <p><span>价格</span><span class="sj"><i></i><i></i></span></p>
        </tab-item>
        <tab-item v-if="nowIndex === 2" class="tab_price" :selected="nowIndex === 2" @on-item-click="tabon">
          <p v-show="tab_on === 0"><span>价格</span><span class="sj shang" :style="{borderBottomColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
          <p v-show="tab_on === 1"><span>价格</span><span class="sj xia" :style="{borderTopColor: $store.state.global.theme.mainColor}"><i></i><i></i></span></p>
        </tab-item>
        <tab-item :selected="nowIndex === 3" @on-item-click="changeList(6)">佣金</tab-item>
        <!--<tab-item v-if="nowIndex !== 3" class="tab_price">-->
        <!--<p><span>销量</span><span class="sj"><i></i><i></i></span></p>-->
        <!--</tab-item>-->
        <!--<tab-item v-if="nowIndex === 3" class="tab_price" :selected="nowIndex === 3" @on-item-click="tabTicket">-->
        <!--<p v-show="tab_on_ticket === 0"><span>销量</span><span class="sj shang"><i></i><i></i></span></p>-->
        <!--<p v-show="tab_on_ticket === 1"><span>销量</span><span class="sj xia"><i></i><i></i></span></p>-->
        <!--</tab-item>-->
      </tab>
      <div class="more">
        <!--<i class="iconfont icon-sort" @click="styles = !styles" :style="{color: $store.state.global.theme.mainColor}" ></i>-->
        <img src="../../assets/img/home/style1.png" alt="" v-if="styles"  @click="styles = !styles">
        <img src="../../assets/img/home/style2.png" alt="" v-else  @click="styles = !styles">
      </div>
    </div>
    <div class="screen">
      <img src="../../assets/img/coupon.png" alt="" class="coupon"><p class="name">仅显示优惠券商品</p>
      <inline-x-switch title="switch" v-model="coupon" @on-change="changeCoupon" :value-map=map></inline-x-switch>
    </div>
    <!--<group>-->
      <!--<x-switch title="title" v-model="value"></x-switch>-->
    <!--</group>-->
    <div class="list">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <goods-item v-bind:list = list v-bind:styles=!styles @detail="detail"></goods-item>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, InlineXSwitch} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'result',
  components: {
    Tab,
    TabItem,
    MescrollVue,
    GoodsItem,
    InlineXSwitch
  },
  data () {
    return {
      nowIndex: 0,
      tab_on: 0,
      tab_on_ticket: 0,
      value: '',
      list: [],
      page: 1,
      finish: false,
      sort: '',
      coupon: 0,
      map: [0, 1],
      loading: false,
      interface: ['/amoy/taobao/search', '/amoy/jd/search', '/amoy/pdd/search'],
      type: Number(this.$route.query.type),
      styles: true,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
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
      lastBounce: null, // 路由切换时是否禁止ios回弹
      h: api.safeArea.top
    }
  },
  watch: {
    '$route' (to, from) {
      if (from.name === 'results' && to.name === 'results') {
        let search = this.$route.query.search.replace(/%/g, '%25')
        let keyword = decodeURIComponent(search)
        if (this.value !== keyword) {
          this.value = keyword
          this.type = Number(this.$route.query.type)
          this.tab_on = 0
          this.tab_on_ticket = 0
          this.nowIndex = 0
          this.sort = ''
          this.reset()
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.name === 'results' && from.name !== 'supergoods') {
        let search = vm.$route.query.search.replace(/%/g, '%25')
        vm.value = decodeURIComponent(search)
        vm.type = Number(vm.$route.query.type)
        vm.tab_on = 0
        vm.tab_on_ticket = 0
        vm.nowIndex = 0
        vm.sort = ''
        vm.reset()
      }
      if (to.name === 'results' && from.name === 'supergoods') {
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
    if (to.name === 'supergoods' && from.name === 'results') {
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
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post(this.interface[this.type], {
        page: page.num,
        keyword: this.value,
        sort: this.sort,
        isCoupon: this.coupon
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
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
      let types
      if (this.type === 0) {
        types = 11
      } else if (this.type === 1) {
        types = 21
      } else if (this.type === 2) {
        types = 31
      }
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + types + '&id=' + item.origin_id + '&i=0')
    },
    changeList (sort) {
      this.sort = sort
      this.reset()
    },
    changeCoupon () {
      this.reset()
    },
    reset () {
      let keyCode = this.value
      if (keyCode === '') {
        this.$vux.toast.text('请输入关键词')
        return
      }
      let key = JSON.parse(utils.storage.get('keyword'))
      if (key) {
        const index = key.indexOf(keyCode)
        if (index !== -1) {
          key.splice(index, 1)
        }
        key.unshift(keyCode)
      } else {
        key = []
        key.unshift(keyCode)
      }
      key = key.slice(0, 10)
      utils.storage.set('keyword', JSON.stringify(key))
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      // this.upCallback(this.mescrollUp.page, this.mescroll)
      this.mescroll.resetUpScroll()
    },
    tabon () {
      if (this.tab_on === 1) {
        this.tab_on = 0
        this.sort = 4
        this.reset()
      } else {
        this.tab_on = 1
        this.sort = 5
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
  activated () {
    // 删除
    this.value = decodeURIComponent(this.$route.query.search)
    // this.type = Number(this.$route.query.type)
    // console.log(this.type)
  }
}
</script>
<style lang="less">
  .result{
    .resultTab{
      .vux-tab-item{
        font-size: .26rem;
      }
    }
    .rank{
      .tab{
        .vux-tab-item{
         background: none;
        }
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .result{
    height: 100%;
    position: relative;
    .header{
      position: absolute;
      left: 0;
      top: -0.88rem;
      width: 100%;
      z-index: 999;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: .88rem;
      background: #fff;
      .icon-back{
        font-size: .4rem;
        color: #000;
        margin-top: .02rem;
      }
      .searchBox{
        width: 5.5rem;
        height: .6rem;
        border-radius: .3rem;
        background: #efefef;
        display: flex;
        align-items: center;
        padding-left: .3rem;
        .icon-search{
          font-size: .27rem;
          color: @theme-col;
        }
        input{
          background: #efefef;
          margin-left: .2rem;
          width: 4.8rem;
          font-size: .26rem;
          color: #999;
          outline: none;
          border: none;
        }
      }
      span{
        font-size: .3rem;
        color: @theme-col;
        margin-right: .2rem;
      }
    }
    .rank{
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
          color: @theme-col;
        }
        img{
          width: 0.3rem;
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
        border-bottom: 5px solid @theme-col!important;
      }
      .xia i:nth-of-type(2){
        border-top: 5px solid @theme-col!important;
      }
    }
    ._v-container{
      top: 98px;
    }
    .screen{
      background: #fff;
      padding: 0 .2rem;
      display: flex;
      height: 30px;
      align-items: center;
      .coupon{
        width: .26rem;
        height: .26rem;
        margin-right: .1rem;
      }
      .name{
        font-size: .24rem;
        color: #999;
        flex: 1;
      }
      .weui-switch, .weui-switch-cp__box{
        width: 42px;
        height: 22px;
      }
      .weui-switch:before, .weui-switch-cp__box:before{
        width: 40px;
        height: 20px;
      }
      .weui-switch:after, .weui-switch-cp__box:after{
        width: 20px;
        height: 20px;
      }
      .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
        background: @theme-col;
        border-color: @theme-col;
      }
    }
    .list{
      position: absolute;
      top: 118px;
      bottom: 0;
      width: 100%;
      .goods_list_2, .goods_list_1 {
        height: calc(100% - 1.2rem);
        ul{
          height: 100%;
          overflow: auto;
        }
      }
      .share{
        font-size: .32rem;
        color: @theme-col;
      }
    }
  }
</style>
