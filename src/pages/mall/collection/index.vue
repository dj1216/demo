<template>
    <div class="collection">
      <x-header :left-options="{showBack: false}" class="collection-head" >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        <a  class="head-right">商品收藏</a>
        <a slot="right" :class="{'head-right':true,'font-color':showFoot}" @click="footShow" v-if="list">管理</a>
      </x-header>
      <div class="mescrollBox" :style="{'bottom': showFoot ? '50px' : '0'}">
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div>
            <div v-for="(item,i) in list" :key="i" class="goods">
              <div class="select" v-if="showFoot">
                <p @click="selectItem('item',i)">
                  <i class="iconfont icon-circle2yuanquan" v-if="!item.select"></i>
                  <i class="iconfont icon-duihao2" style="color: #fc3357" v-if="item.select"></i>
                </p>
              </div>
              <div class="list-left" @click="item.goods.stop == 0 ? jumpTo({name:'mallHomeDetail',query:{title:item.goodsId}}) : ''">
                <img :src="item.goods.thumb || './static/img/under/111.png'" alt="">
              </div>
              <div class="list-right">
                <p>{{item.goods.goodsName}}</p>
                <div>
                  <div>{{item.goods.care}}人收藏</div>
                  <div>
                    <p v-if="item.goods.stop == 1" class="failure">已失效</p>
                    <p v-if="item.goods.stop == 0">￥{{item.goods.spe_price}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!list" class="cart-null">
              <img src="../../../assets/mall/img/wushoucang.png" alt="">
              <p style="margin-top: .3rem;">收藏的商品竟然空空如也~</p>
            </div>
            <div class="hot">
              <img src="../../../assets/mall/img/cart/hot.jpg" alt="">
            </div>
            <List :list="shopList"></List>
          </div>
        </mescroll-vue>
      </div>
      <div class="collection-foot" v-if="showFoot">
        <div class="left" @click="selectItem('all')">
          <i class="iconfont icon-circle2yuanquan" v-if="!selectAll"></i>
          <i class="iconfont icon-duihao2" style="color: #fc3357" v-if="selectAll"></i>
          <span>全选</span>
        </div>
        <div class="right">
          <div @click="del()">删除</div>
        </div>
      </div>
    </div>
</template>

<script>
import './collection.less'
import Business from '../business/business'
import List from '../../../components/list'
import * as apiHttp from '../../../api/index'
import '../../../assets/mall/style/mixin.less'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
  components: {Business, List, MescrollVue},
  data () {
    return {
      showBorder: true,
      showFoot: false,
      selectAll: false,
      list: [],
      list1: [],
      shopList: [],
      page: 1,
      loading: false,
      finish: false,
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
      }
    }
  },
  methods: {
    getIndex () {
      apiHttp.goodLickList().then(response => {
        if (response.code === 0) {
          this.list = response.data.list
        }
        this.$nextTick(() => {
          this.mescroll.endSuccess(this.obj, false)
        })
      })
    },
    upCallback (page, mescroll) {
      apiHttp.indexList(this.page).then(res => {
        if (res.code === 0) {
          var arr = res.data.list
          if (page.num === 1) this.shopList = []
          this.shopList = this.shopList.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    refresh: function () {
      this.finish = false
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
      this.getIndex()
    },
    setBorder (type) {
      this.showBorder = !this.showBorder
    },
    footShow () {
      this.showFoot = !this.showFoot
    },
    del () {
      let data = []
      let str = ''
      for (let i = 0; i < this.list1.length; i++) {
        data.push(this.list1[i].id)
        str += this.list1[i].id + ','
      }
      apiHttp.goodsLikeDelete(str).then(response => {
        if (response.code === 0) {
          for (let i = 0; i < this.list.length; i++) {
            if (data.indexOf(this.list[i].id) !== -1) {
              this.list.splice(i, 1)
              i--
            }
          }
          if (this.selectAll) {
            this.showFoot = false
          }
          this.getIndex()
        }
      })
    },
    selectItem (type, i) {
      if (type === 'all') {
        this.selectAll = !this.selectAll
        if (this.selectAll === true) {
          this.list1.push(...this.list)
        } else {
          this.list1 = []
        }
        for (let j = 0; j < this.list.length; j++) {
          this.list[j].select = this.selectAll
        }
      } else if (type === 'item') {
        // console.log(111111111111)
        this.list[i].select = !this.list[i].select
        this.list1 = []
        let num = 0
        for (let j = 0; j < this.list.length; j++) {
          if (this.list[j].select === true) {
            this.list1.push(this.list[j])
            num += 1
          }
        }
        if (num === this.list.length) {
          this.selectAll = true
        } else {
          this.selectAll = false
        }
      }
      console.log(this.list1)
    }
  },
  mounted () {
    // 删除
   this.getIndex ()
  }
}
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  .collection{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
    }
  }
</style>
