<template>
<div class="Bindex">
  <div class="seach_main" style="height: 0.9rem">
    <div class="home_seach">
      <div class="home_seach_left backBox" @click="goBack()">
        <i class="iconfont icon-back1" style="font-size: 20px"></i>
      </div>
      <div class="home_seach_input" @click="jumpTo({name:'mallSearch',query:{type:'shop'}})">
        <div class="input_box">
          <img src="../../../assets/mall/img/home/seach.png" alt="">
          <p>请输入关键字</p>
        </div>
      </div>
    </div>
  </div>
  <div class="mescrollBox">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="home_main" style="padding-bottom: 0.15rem">
        <div class="banner" style="position:relative" v-if="list1.slide">
          <swiper :options="swiperOption" ref="mySwiper" style="height:100%;">
            <swiperSlide v-for="(item,i) in list1.slide" :key="i" @click="jumpTos(item)">
              <img v-lazy="item.thumb" alt="" style="width:100%;height:3.4rem;">
            </swiperSlide>
          </swiper>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
        <swiper class="banner_list" :options="swiperOption1" ref="navButton"  v-if="list1.navInfo">
          <swiper-slide class="allBox" v-for="(item,i) in list1.navInfo" :key="i">
            <div class="allList"  v-if="item" v-for="(val,j) in item" :key="j" @click="jumpTos(val)">
              <img v-lazy="val.thumb" alt="">
              <p>{{val.title}}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="Blist">
        <div class="Bheader" v-for="(val,i) in list1.haoShopsSlide" :key="i">
          <img v-lazy="val.thumb" alt="">
        </div>
        <Business :showCancel=false :list="suggest" @jump="seller"></Business>
      </div>
    </mescroll-vue>
  </div>
  <loading v-show="load"></loading>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Business from './business'
import loading from '../../../components/loadingLoad'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    Business,
    loading,
    MescrollVue
  },
  data () {
    return {
      swiperOption: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        disabledClass: 'my-button-disabled',
        hiddenClass: 'my-button-hidden',
        spaceBetween: 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      load: false,
      finish: false,
      swiperOption1: {
        slidesPerView: 5,
        freeMode: false
      },
      img: [],
      list: [],
      suggest: [],
      list1: [],
      page: 1,
      loading: false,
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
    backTop () {
      setTimeout(() => {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }, 10)
    },
    seller (id) {
      console.log(id)
      this.$router.push({
        name: 'mallSeller',
        query: {
          spid: id
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.$http.post('/mall/shops/shops-list', {page: page.num}).then(res => {
        if (res.code === 0) {
          let arr = res.data.shopList =='' ? [] : res.data.shopList
          if (page.num === 1) this.suggest = []
          this.suggest = this.suggest.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.shopList.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  },
  mounted () {
    // 删除
    this.load = true
    this.$http.post('/mall/shops/display', {id: ''}).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.load = false
        this.list1 = res.data
      } else {
        this.load = false
        this.$vux.toast.text(res.msg)
      }
    })
  }
}
</script>

<style lang='less'>
  @import '../../../assets/mall/style/_Variables.less';
  .Bindex{
    text-align: center;
    .mescrollBox {
      width: 100%;
      position: absolute;
      top: 1.08rem;
      bottom: 0px;
      height: auto !important;
      .swiper-pagination{
        bottom: 10px;
        width: 100%;
        margin:0 auto;
        left: 0;
      }
    }
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
  .Bindex ._v-container{
    top:0.9rem;
    height: calc(100% - 0.9rem) !important;
  }
  .back_top{
    position: fixed;
    bottom:1rem;
    right: 0.35rem;
  }
  .back_top>img{
    width: 0.74rem;
    height: 0.74rem;
  }
</style>
