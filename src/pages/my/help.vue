<template>
    <div class="help" id="help">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="listBox vux-1px-b" v-for="(item, index) of dataList" :key="index" @click="item.show = !item.show" :class="{show: item.show}">
          <div class="list">
            <span :style="{background: $store.state.global.theme.mainColor}"></span>
            <p>{{item.title}}</p>
          </div>
          <div class="info" v-html="item.content">
          </div>
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'help',
  components: {
    MescrollVue
  },
  data () {
    return {
      show: false,
      data: '',
      mescroll: null,
      mescrollDown: {
        use: false
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
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/article-list', {
        cid: this.$route.query.type
      }, true).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].show = false
        }
        let arr = res.data
        if (page.num === 1) this.dataList = []
        this.dataList = this.dataList.concat(arr)
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      })
    },
    getInfo () {
      this.$http.post('/amoy/user/article-list', {
        cid: this.$route.query.type
      }, true).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].show = false
        }
        this.data = res.data
      })
    }
  },
  mounted () {
    // 删除
    // this.getInfo()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.help{
  height: 100%;
  background: #fff;
  overflow-y: auto;
  .list{
    display: flex;
    height: .86rem;
    align-items: center;
    padding: 0 .2rem;
    position: relative;
    span{
      margin-right: .1rem;
      display: inline-block;
      width: .15rem;
      height: .15rem;
      border-radius: 50%;
    }
    p{
      font-size: .3rem;
      flex: 1;
    }
  }
  .list:before{
    content: '';
    display: inline-block;
    position: absolute;
    right: .2rem;
    top: .4rem;
    width: .12rem;
    height: .12rem;
    border-right: 1px solid #d1d1d1;
    border-top: 1px solid #d1d1d1;
    transform: matrix(.71,.71,-.71,.71,0,0);
    /*transition: transform .5s;*/
  }
  .info{
    background: #fff5f7;
    font-size: .26rem;
    margin: 0 .4rem;
    border-radius: .05rem;
    color: #666;
    padding: 0 .2rem;
    line-height: .6rem;
    transition: max-height .5s ;
    overflow: hidden;
    box-sizing: border-box;
    /*transform: translateY(-100%);*/
    max-height: 0;
  }
  .show{
    padding-bottom: .2rem;
    .info{
      max-height: max-content;
    }
    .list:before{
      transform: rotate(135deg);
    }
  }
  .listBox{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
}
</style>
