<template>
    <div class="list">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="lists" v-for="(item, index) of list" :key="index">
        <p class="title">{{item.remark}}</p>
        <p class="info">
          <span>余额：+{{item.price}}</span>
          <span>{{item.created_at*1000 | dateFormat('YYYY-MM-DD')}}</span>
        </p>
      </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {dateFormat} from 'vux'
export default {
  name: 'list',
  filters: {
    dateFormat
  },
  components: {
    MescrollVue
  },
  data () {
    return {
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
      list: []
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/rebate', {
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
.list{
  background: #fff;
  height: 100%;
  .lists{
    padding: .2rem .3rem;
    border-bottom: 1px solid #E5E5E5;
    .title{
      font-size: .24rem;
      color: #333;
    }
    .info{
      margin-top: .1rem;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1){
        font-size: .24rem;
        color: #333;
      }
      span:nth-of-type(2){
        color: #999;
        font-size: .24rem;
      }
    }
  }
}
</style>
