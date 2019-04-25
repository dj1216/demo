<template>
    <div class="dayingShop">
      <div class="listBox">
        <p class="notice" :style="{color: $store.state.global.theme.mainColor, background: $store.state.global.theme.thirdColor}"  v-if="list.length === 0">温馨提示：只有结算过的有效订单才可以晒单哦~</p>
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="list" v-for="(item, index) of list" :key="index" @click="selectShop(item)">
            <div class="select">
              <i class="iconfont icon-duihao2 selected" v-if="item.select" :style="{color: $store.state.global.theme.mainColor}" ></i>
              <i class="iconfont icon-circle2yuanquan" v-else></i>
            </div>
            <div class="shop">
              <img v-lazy="item.estimated_revenue" alt="" class="thumb" >
              <div class="info">
                <p class="title">{{item.title}}</p>
                <p class="price">券后价：¥<span>{{item.product_price}}</span></p>
                <div class="profit">
                  <p :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">预估收益</p>
                  <span :style="{color: $store.state.global.theme.mainColor}" >已结算</span>
                </div>
              </div>
            </div>
          </div>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
      <div class="sure" @click="sure">
        <p :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">确定</p>
      </div>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'dayingShop',
  components: {
    MescrollVue
  },
  data () {
    return {
      list: [],
      mescroll: null,
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
      let shop = utils.storage.get('dayingShop')
      if (!shop) {
        for (let i = 0; i < vm.list.length; i++) {
          vm.list[i].select = false
        }
      }
    })
  },
  methods: {
    sure () {
      this.$router.go(-1)
    },
    selectShop (item) {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].select = false
      }
      item.select = true
      utils.storage.set('dayingShop', item)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/drying/get-order', {
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].select = false
          }
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.dayingShop{
  height: 100%;
  overflow: hidden;
  position: relative;
  .listBox{
    position: relative;
    height: 100%;
  }
  .notice{
    position: absolute;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: .88rem;
    font-size: .26rem;
  }
  .list{
    background: #fff;
    margin-top: .2rem;
    padding: .3rem;
    display: flex;
    align-items: center;
    .shop{
      flex: 1;
      overflow: hidden;
      display: flex;
      .thumb{
        width: 1.9rem;
        height: 1.9rem;
        border-radius: .1rem;
        margin: 0 .2rem;
      }
      .info{
        flex: 1;
        overflow: hidden;
        .title{
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: .26rem;
          margin-bottom: .1rem;
        }
        .price{
          margin-bottom: .1rem;
          font-size: .24rem;
          color: #666;
          span{
            font-size: .3rem;
          }
        }
        .profit{
          display: flex;
          justify-content: space-between;
          p{
            display: flex;
            align-items: center;
            font-size: .22rem;
            height: .4rem;
            padding: 0 .3rem;
            border-radius: .2rem;
            color: #fff;
          }
          span{
            font-size: .28rem;
          }
        }
      }
    }
  }
  .sure{
    z-index: 1000;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
    box-shadow: 0 -2px 0 #f4f4f4;
    background: #fff;
    p{
      margin: .18rem auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.9rem;
      height: .84rem;
      border-radius: .42rem;
      color: #fff;
      font-size: .3rem;
    }
  }
}
</style>
