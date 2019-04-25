<template>
      <div class="cart">
        <x-header :left-options="{showBack: false}" class="cart-head" >
          <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
          <!-- <i data-v-afc99ee4="" class="iconfont icon-back"></i> -->
          <a  class="head-right">购物车</a>
          <a slot="right" :class="{'head-right':true,'font-color':!showFoot}" @click="footShow" v-if="list">管理</a>
        </x-header>
        <div class="cart-body">
          <div class="mescrollBox" :style="{'bottom': list ? '50px' : '0'}">
            <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
              <div v-if="showEmpty">
                <div class="cart-item" v-for="(item,i) in list" :key="i">
                  <div class="item-head">
                    <span @click="selectItem('item',i)">
                      <i class="iconfont icon-circle2yuanquan" v-if="!item.isCheck"></i>
                      <i class="iconfont icon-duihao2" style="color: #FC3357" v-if="item.isCheck"></i>
                    </span>
                    <!--<img :src="item.shopInfo ? item.shopInfo.logo : ''" alt="">-->
                    <img src="../../../assets/mall/img/cart/13.png" alt="">
                    <span>{{item.shopInfo?item.shopInfo.title:''}}</span>
                    <i class="iconfont icon-right"></i>
                  </div>
                  <div class="item-body" v-for="(val,v) in item.goods" :key="v">
                    <div class="left" @click="selectItem('val',i,v)">
                      <i class="iconfont icon-circle2yuanquan" v-if="!val.isCheck"></i>
                      <i class="iconfont icon-duihao2" style="color: #FC3357" v-if="val.isCheck"></i>
                    </div>
                    <div class="center1">
                      <img v-lazy="val.thumb" alt="">
                    </div>
                    <div class="right">
                      <p>{{val.goodsName}}</p>
                      <p class="spec"><span v-for="(sp,l) in val.spec" :key="l">{{sp}}</span></p>
                      <div>
                        <span>￥{{val.goodsPrice}}</span>
                        <x-number button-style="round" :min="1" :value="val.goodsNum"  v-model="val.goodsNum" class="right-num" @on-change="send('update',val.id,val.goodsNum)"></x-number>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!list" class="cart-null">
                  <img src="../../../assets/mall/img/cart.png" alt="">
                  <p>购物车竟然空空如也~</p>
                </div>
              </div>
              <div class="hot" v-if="shopList.length > 0">
                <img src="../../../assets/mall/img/cart/hot.jpg" alt="">
              </div>
              <List :list="shopList"></List>
            </mescroll-vue>
          </div>
        </div>
        <div class="cart-foot" v-if="showFoot && list">
            <div class="left" @click="selectItem('all','','',list)">
              <i class="iconfont icon-circle2yuanquan" v-if="!selectAll"></i>
              <i class="iconfont icon-duihao2" style="color: #FC3357" v-if="selectAll"></i>
              <span>全选</span>
            </div>
            <div class="right">
              <div><span>合计:</span><span>￥{{price}}</span></div>
              <div @click="jumpTo({name:'mallFirmOrder',query:{type:'cart'}})">结算</div>
            </div>
        </div>
        <div class="cart-foot" v-if="!showFoot && list">
          <div class="left" @click="selectItem('all')">
            <i class="iconfont icon-circle2yuanquan" v-if="!selectAll"></i>
            <i class="iconfont icon-duihao2" style="color: #FC3357" v-if="selectAll"></i>
            <span>全选</span>
          </div>
          <div class="right">
            <div @click="send('delete')">删除</div>
          </div>
        </div>
      </div>
</template>

<script>
import './cart.less'
import '../../../assets/mall/style/mixin.less'
import List from '../../../components/list'
import { Panel, XHeader, InlineXNumber, XNumber } from 'vux'
import * as apiHttp from '../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
  components: {
    Panel,
    XHeader,
    InlineXNumber,
    XNumber,
    List,
    MescrollVue
  },
  data () {
    return {
      showFoot: true,
      selectAll: false,
      list: '',
      shopList: [],
      check: '',
      price: 0,
      page: 1,
      loading: false,
      finish: false,
      showEmpty: false,
      obj: {},
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
        htmlNodata: '<p class="upwarp-nodata">-- 我也是有底线的 --</p>',
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
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  mounted () {
    this.getList()
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
    getList () {
      this.$http.post('/mall/cart/list', {id: ''}).then(res => {
        if (res.code === 0) {
          this.showEmpty = true
          this.list = res.data.list
          this.obj = res.data
          this.price = parseInt(res.data.countPirce)
          this.selectAll = res.data.isCheck
        } else {
          this.$vux.toast.text(res.msg)
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(this.obj, false)
        })
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
      this.getList()
    },
    footShow () {
      this.showFoot = !this.showFoot
    },
    selectItem (type, x, s) {
      if (type === 'all') {
        this.selectAll = !this.selectAll
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isCheck = this.selectAll
          for (let j = 0; j < this.list[i].goods.length; j++) {
            this.list[i].goods[j].isCheck = this.selectAll
          }
        }
      } else if (type === 'item') {
        this.list[x].isCheck = !this.list[x].isCheck
        for (let i = 0; i < this.list[x].goods.length; i++) {
          this.list[x].goods[i].isCheck = this.list[x].isCheck
        }
        let sum = 0
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].isCheck === true) {
            sum += 1
          }
        }
        if (sum === this.list.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      } else if (type === 'val') {
        this.list[x].goods[s].isCheck = !this.list[x].goods[s].isCheck
        let num = 0
        for (let i = 0; i < this.list[x].goods.length; i++) {
          if (this.list[x].goods[i].isCheck === true) {
            num += 1
          }
        }
        if (num === this.list[x].goods.length) {
          this.list[x].isCheck = true
        } else {
          this.list[x].isCheck = false
        }
        let sum = 0
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].isCheck === true) {
            sum += 1
          }
        }
        if (sum === this.list.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      }
      this.totalPrice()
      console.log(this.showFoot)
      if (this.showFoot === true) {
        this.send('check')
      }
    },
    totalPrice () {
      this.price = 0
      this.check = ''
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.list[i].goods.length; j++) {
          if (this.list[i].goods[j].isCheck === true) {
            // this.price+=this.list[i].goods[j].goodsPrice*this.list[i].goods[j].goodsNum
            this.check += this.list[i].goods[j].id + ','
          }
        }
      }
      console.log(this.check)
    },
    send (type, id, num) {
      if (type === 'update') {
        this.$http.post('/mall/cart/update?i=1', {cartId: id, goodsNum: num}).then(res => {
          if (res.code === 0) {
            this.getList()
          }
        })
      } else if (type === 'check') {
        this.$http.post('/mall/cart/check?i=1', {cartIds: this.check}).then(res => {
          if (res.code === 0) {
            this.getList()
          }
        })
      } else if (type === 'delete') {
        this.$http.post('/mall/cart/delete?i=1', {cartIds: this.check}).then(res => {
          if (res.code === 0) {
            this.getList()
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  .cart-body{
    .mescrollBox {
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
    }
  }
</style>
