<template>
    <div class="footprint">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <goods-item v-bind:list = list  @detail="share"></goods-item>
      </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'footprint',
  components: {
    MescrollVue,
    GoodsItem
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
      this.$http.post('/amoy/user/collection-list', {
        status: 2,
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].thumb = res.data[i].good_image
            res.data[i].volume = res.data[i].sales_num
          }
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
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
    }
  }
}
</script>

<style scoped lang="less">
.footprint{
  height: 100%;
  /*border-top: 1px solid #f4f4f4;*/
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
}
</style>
