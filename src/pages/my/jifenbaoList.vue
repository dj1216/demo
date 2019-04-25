<template>
  <div class="withdrawlist1">
    <div class="head">
      <span @click="handleType(1)" v-if="active === 1" :style="{color: $store.state.global.theme.mainColor,borderBottom:'1px solid ' +$store.state.global.theme.mainColor}" >余额明细</span>
      <span @click="handleType(1)" v-else  >余额明细</span>
      <span v-if="active === 2" @click="handleType(2)" :style="{color: $store.state.global.theme.mainColor,borderBottom:'1px solid ' +$store.state.global.theme.mainColor}">提现记录</span>
      <span v-else @click="handleType(2)">提现记录</span>
    </div>
    <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="lists">
        <div class="list" v-for="item of list" :key="item.id" v-if="active == 1">
          <div>
            <span :style="{color: $store.state.global.theme.mainColor}" ><span style="color: #333;">奖励：</span>+{{item.credit4}}</span>
            <span>{{typesInfo[item.op]}}</span>
          </div>
          <div>
            <span>{{formatDate(item.created_at)}}</span>
          </div>
        </div>
        <div class="list" v-for="item of list" :key="item.id" v-if="active == 2">
          <div>
            <span><span style="color: #333;">到账金额：</span>{{item.amount}}</span>
            <span>{{statusInfo[parseInt(item.status)]}}</span>
          </div>
          <div>
            <p><span style="color: #333;">手续费：</span>{{item.charge}}</p>
            <span>{{formatDate(item.created_at)}}</span>
          </div>
        </div>
        <div id="empty1"></div>
      </div>
    </mescroll-vue>
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
      typesInfo: {},
      statusInfo: {},
      active: 1,
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
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty1',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if (page.num !== 1) {
        page.num--
      }
      this.$http.post('/amoy/task/withdraw-list', {
        type: this.active,
        page: page.num
      }, false, true).then((res) => {
        if (res.code === 0) {
          this.typesInfo = res.data.typesInfo
          this.statusInfo = res.data.statusInfo
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          if (res.data[0] && res.data[0].min_id) {
            this.mescrollUp.page.num = res.data[0].min_id
          }
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    handleType (val) {
      this.active = val
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .withdrawlist1{
    height: 100%;
    overflow-y: auto;
    .head{
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: .1rem;
      background: #fff;
      span{
        color: #333;
        font-size: .3rem;
        height: 1rem;
        line-height: 1rem;
        width: 2rem;
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
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      padding: 0 .3rem;
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        span:first-child{
          font-size: .3rem;
        }
        span:last-child{
          color: #a1a1a1;
          font-size: .26rem;
        }
        p{
          color: #333333;
          font-size: .26rem;
        }
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
