<template>
    <div class="withdrawlist">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"   class="backBox">
        <i class="iconfont icon-back"></i></a>
        {{signInfo}}提现明细
        <span class="save" slot="right" @click="jumpTo('/operator')">运营商返佣</span>
      </x-header>
      <div class="widthBox">
        <div class="high"></div>
        <div class="head">
          <span>提现时间</span>
          <span>提现金额</span>
          <span>提现状态</span>
        </div>
        <div class="lists">
          <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="high"></div>
            <div class="list" v-for="item of list" :key="item.id">
              <span>{{item.created_at}}</span>
              <span>{{item.amount}}</span>
              <span class="doing" :style="{color: $store.state.global.theme.mainColor}"  v-if="item.status === '待审核'">{{item.status}}</span>
              <span v-else>{{item.status}}</span>
            </div>
            <div id="empty"></div>
          </mescroll-vue>
        </div>
      </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'withdrawlist',
  components: {
    InfiniteLoading, MescrollVue
  },
  data () {
    return {
      list: [],
      page: 1,
      finish: false,
      loading: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 6
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
      this.$http.post('/amoy/user/withdraw-list', {
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
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
.withdrawlist{
  height: 100%;
  background: #fff;
  overflow-y: auto;
  position: relative;
  .save{
    color: #666;
  }
  .widthBox{
    position: absolute;
    left: 0;
    top: .88rem;
    bottom: 0;
    width: 100%;
  }
  .high{
    height: .1rem;
    background: #f4f4f4;
    overflow: hidden;
  }
  .head{
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      color: #333;
      font-size: .3rem;
      flex: 1;
      text-align: center;
    }
  }
  .lists{
    height: calc(100% - 1.4rem);
    overflow-y: auto;
    position: relative;
  }
  .list{
    position: relative;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      color: #333;
      font-size: .3rem;
      flex: 1;
      text-align: center;
    }
  }
  .list:after{
    content: '';
    position: absolute;
    left: .3rem;
    right: .3rem;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #e7e7e7;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
}
</style>
