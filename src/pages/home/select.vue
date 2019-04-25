<template>
    <div class="result">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <goods-item v-bind:list = list v-bind:styles=!styles @detail="detail"></goods-item>
      </mescroll-vue>
    </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'result',
  components: {
    Tab,
    TabItem,
    MescrollVue,
    GoodsItem
  },
  data () {
    return {
      nowIndex: 0,
      tab_on: 0,
      tab_on_ticket: 0,
      list: [],
      page: 1,
      finish: false,
      loading: false,
      styles: true,
      value: this.$route.query.title,
      sort: 0,
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
      if (from.name !== 'supergoods') {
        vm.value = vm.$route.query.title
        vm.tab_on = 0
        vm.tab_on_ticket = 0
        vm.nowIndex = 0
        vm.sort = 1
        vm.reset()
      }
      if (from.name === 'supergoods') {
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
    if (to.name === 'supergoods' && from.name === 'list') {
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
    refresh () {
      this.list = []
      this.mescroll.resetUpScroll()
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      // if (page.num !== 1) {
      //   page.num--
      // }
      this.$http.post('/amoy/opgoods/optional-goods', {
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          // if (res.data[0] && res.data[0].min_id) {
          //   this.mescrollUp.page.num = res.data[0].min_id
          // } else {
          //   this.mescrollUp.page.num += 1
          // }
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
      // let types
      // if (this.type === 0) {
      //   types = 11
      // } else if (this.type === 1) {
      //   types = 21
      // } else if (this.type === 2) {
      //   types = 31
      // }
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0')
    },
    reset () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.finish = false
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    changeList (sort) {
      this.sort = sort
      this.reset()
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
  mounted: function () {
    // 删除
  }
}
</script>
<style lang="less">
  .rank{
    .vux-tab-item{
      background: none !important;
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
.result{
  height: 100%;
  position: relative;
  .high{
    background: @h-col;
    height: .1rem;
    width: 100%;
  }
  .list{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    .goods_list_2, .goods_list_1{
      height: 100%;
      ul{
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>
