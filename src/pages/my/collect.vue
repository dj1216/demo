<template>
    <div class="collect">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i></a>
        我的收藏<span class="save" slot="right" v-if="open" @click="closeList">完成</span>
        <span class="save" slot="right" :style="{color: $store.state.global.theme.mainColor}" v-else @click="openList">编辑</span>
      </x-header>
      <div class="goods_list_2">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <ul class="goods_ul">
          <template v-for="item of list">
            <swipeout  :key="item.origin_id" >
              <swipeout-item  transition-mode="follow" :left-menu-width="30" :disabled="swiper">
                <div slot="left-menu">
                  <!--<swipeout-button type="warn">收藏</swipeout-button>-->
                  <div class="roundBox" @click="item.select = !item.select">
                    <i class="iconfont icon-circle2yuanquan" v-if="!item.select"></i>
                    <i class="iconfont icon-duihao2 selected" :style="{color: $store.state.global.theme.mainColor}" v-if="item.select"></i>
                  </div>
                </div>
                <div slot="content" class="demo-content">
                  <li class="goods_li" v-if="item.show" @click="share(item)" >
                    <img class="preview" v-lazy="item.good_image" alt="">
                    <div class="con_right">
                      <p class="brand">
                        <img src="../../assets/img/home/tblogo.png" alt="" v-if="Number(item.type) === 11">
                        <img src="../../assets/img/home/tmlogo.png" alt="" v-else-if="Number(item.type) === 12">
                        <img src="../../assets/img/home/jdlogo.png" alt="" v-if="Number(item.type) === 21">
                        <img src="../../assets/img/home/pddlogo.png" alt="" v-else-if="Number(item.type) === 31">{{item.title}}
                      </p>
                      <p class="listinfo">{{item.description}}</p>
                      <div class="original"><p>原价:&nbsp;&nbsp;<del>￥{{item.origin_price}}</del></p><i>已售: {{item.sales_num}}</i></div>
                      <div class="price" :style="{color: $store.state.global.theme.mainColor}" ><p>￥<span>{{item.coupon_price}}</span></p><b  :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">{{item.coupon_money}}元券</b></div>
                      <!--<p class="share">alipayid：{{item.commission_money}}</p>-->
                    </div>
                  </li>
                </div>
              </swipeout-item>
            </swipeout>
          </template>
          <!--<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="bubbles">-->
            <!--<span slot="no-more">已加载全部</span>-->
            <!--<span slot="no-results">暂无相关内容</span>-->
          <!--</infinite-loading>-->
        </ul>
        <div id="empty"></div>
        </mescroll-vue>
      </div>
      <div class="footer" v-if="open">
        <i class="iconfont icon-circle2yuanquan" v-if="!all" @click="allselect"></i>
        <i class="iconfont icon-duihao2" :style="{color: $store.state.global.theme.mainColor}" v-if="all" @click="allselect"></i>
        <p>全选</p>
        <span @click="del" :style="{background: $store.state.global.theme.mainColor}">删除</span>
      </div>
    </div>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton, XButton} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'footprint',
  components: {
    Swipeout, SwipeoutItem, SwipeoutButton, XButton, InfiniteLoading, MescrollVue
  },
  data () {
    return {
      swiper: true,
      open: false,
      list: [],
      page: 1,
      finish: false,
      loading: false,
      all: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
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
  mounted: function () {
    // 删除
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/collection-list', {
        status: 1,
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].select = false
            res.data[i].show = true
          }
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
            this.closeList()
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].select = this.all
            }
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    share (item) {
      if (this.$aliPay === 1) {
        if (item.type === '11' || item.type === '12') {
          let that = this
          let aliBC = api.require('aliBC')
          aliBC.asyncInit({
          }, function (ret, err) {
            if (ret.status) {
              aliBC.showLogin(function (ret, err) {
                if (ret.status) {
                  aliBC.showPageByUrl({
                    url: unescape(item.item_url),
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
            url: unescape(item.item_url),
            titleBar: {
              textColor: '#333',
              bg: '#fff'
            }
          })
        }
      } else {
        let browser = api.require('webBrowser')
        browser.open({
          url: unescape(item.item_url),
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    },
    del () {
      let ids = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].select) {
          ids.push(this.list[i].id)
        }
      }
      this.$http.post('/amoy/user/delete-collection', {
        id: ids
      }, true).then((res) => {
        this.$vux.toast.text(res.msg)
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].select) {
            this.list[i].show = false
          }
        }
      })
    },
    allselect () {
      this.all = !this.all
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].select = this.all
      }
    },
    closeList () {
      this.open = false
      let arr = document.getElementsByClassName('vux-swipeout-content')
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.transform = 'translate3d(0px, 0px, 0px)'
      }
      let arr2 = document.getElementsByClassName('con_right')
      for (let i = 0; i < arr2.length; i++) {
        arr2[i].style.width = '4.4rem'
      }
      let arr1 = document.getElementsByClassName('vux-swipeout-button-box-left')
      for (let i = 0; i < arr1.length; i++) {
        arr1[i].style.transform = 'translate3d(-1rem, 0px, 0px)'
      }
    },
    openList () {
      this.open = true
      let arr = document.getElementsByClassName('vux-swipeout-content')
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.transform = 'translate3d(1rem, 0px, 0px)'
      }
      let arr2 = document.getElementsByClassName('con_right')
      for (let i = 0; i < arr2.length; i++) {
        arr2[i].style.width = '3.4rem'
      }
      let arr1 = document.getElementsByClassName('vux-swipeout-button-box-left')
      for (let i = 0; i < arr1.length; i++) {
        arr1[i].style.transform = 'translate3d(0px, 0px, 0px)'
        console.log(arr1[i].style.transform)
      }
    }
  }
}
</script>
<style lang="less">
  @import "../../assets/less/common";
  .roundBox{
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      font-size: .38rem;
      color: #9b9b9b;
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";

.collect{
  height: 100%;
  /*border-top: 1px solid #f4f4f4;*/
  .vux-header{
    height: 0.88rem !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .goods_list_2{
    position: relative;
    margin-top: 1px;
    background: #fff;
    height: 100%;
    .goods_ul{
      height: 100%;
      overflow-y: auto;
      padding-top: 0;
      padding-bottom: 10px;
    }
  }
  .footer{
    border-top: 1px solid #f4f4f4;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    padding: 0 .3rem;
    height: 44px;
    align-items: center;
    i{
      font-size: .38rem;
      color: #9b9b9b;
      margin-right: .36rem;
    }
    p{
      flex: 1;
      font-size: .36rem;
    }
    span{
      border-radius: .05rem;
      font-size: .3rem;
      display: inline-block;
      width: 1.4rem;
      height: .75rem;
      line-height: .75rem;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
