<template>
    <div class="help notice" id="notice">
      <!--<tab :line-width="2" custom-bar-width=".6rem" active-color="#fc3357" default-color="#333" v-model="type">-->
        <!--<tab-item @on-item-click="reset">系統消息</tab-item>-->
        <!--<tab-item @on-item-click="reset">我的消息</tab-item>-->
      <!--</tab>-->
      <div class="tab">
        <div class="tab_box">
          <button-tab v-model="type">
            <button-tab-item >系統消息</button-tab-item>
            <button-tab-item >我的消息</button-tab-item>
          </button-tab>
        </div>
      </div>
      <div class="lists">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <template  v-if="type === 0">
            <div class="box" v-for="item of list" :key="item.id" @click="jumpTo('/noticeDetail?id=' + item.id)">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.created_at}}</p>
            </div>
          </template>
          <template  v-else>
            <div class="box" v-for="item of list" :key="item.id">
              <div class="title" v-html="item.content"></div>
              <p class="time">{{item.created_at}}</p>
            </div>
          </template>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {Tab, TabItem, ButtonTab, ButtonTabItem} from 'vux'
export default {
  name: 'help',
  components: {
    Tab, TabItem, MescrollVue, ButtonTab, ButtonTabItem
  },
  data () {
    return {
      show: false,
      list: [],
      type: this.$route.query.type ? this.$route.query.type : 0,
      mescroll: null,
      url: ['/amoy/home/announcement', '/amoy/user/message-list'],
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10
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
  watch: {
    type () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post(this.url[this.type], {
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
  },
  mounted () {
  }
}
</script>
<style lang="less">
  #notice{
    .vux-tab-wrap{
      padding-top: .88rem;
      .vux-tab-container{
        height: .88rem;
        .vux-tab{
          height: .88rem;
          .vux-tab-item{
            line-height: .88rem;
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.notice{
  background: #fff;
  height: 100%;
  .tab{
    height:1.1rem;
    width:100%;
    display: flex;
    align-items: center;
    background:#fff;
    .tab_box{
      margin:0 auto;
      width:4.88rem;
      height:0.62rem;
    }
  }
}
.help{
  background: #f7f7f7;
  height: 100%;
  position: relative;
  .lists{
    position: absolute;
    top: 1.1rem;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: #f7f7f7;
    .mescroll{
      padding: .2rem;
      box-sizing: border-box;
    }
    .box{
      background: #fff;
      padding: .1rem .2rem;
      border-radius: .1rem;
      margin-bottom: .2rem;
      .title{
        font-size: .3rem;
        color: #333;
        margin-bottom: .1rem;
      }
      .info{
        color: #999;
        font-size: .26rem;
        margin-bottom: .2rem;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: center;
      }
      .time{
        font-size: .22rem;
        color: #afafaf;
      }
    }
  }
}
</style>
