<template>
  <div class="supRouterBox">
    <div class="hideT" :style="{'paddingTop': marginTop, background: opacity}" v-if="showHead">
      <!--<div class="back" @click="goBack"><i class="iconfont icon-back"></i></div>-->
      <div class="searchBox" @click="jumpTo('/search')"><img src="../../assets/img/superRouter/searchLogo.png" alt=""><span>请输入宝贝名称或标题</span></div>
      <!--<div class="teach">返佣教程</div>-->
    </div>
    <div class="box" ref="box">
      <div class="head">
        <div class="top"  @click="goBack" :style="{'paddingTop': marginTop}">
          <!--<i class="back" v-show="!showHead"></i>-->
          <!--<span style="display:none" class="tutorial" v-show="!showHead">返佣教程</span>-->
        </div>
        <div class="search" @click="jumpTo('/search')">
          <p>
            <img src="../../assets/img/superRouter/searchLogo.png" alt="">请输入宝贝名称或标题
          </p>
        </div>
      </div>
      <template v-for="(item, index) of list">
        <div class="listBox" v-if="item.type === 1" :key="index" >
          <div class="listTitle">
            <img src="../../assets/img/superRouter/left1.png" alt=""><span>{{item.title}}</span><img src="../../assets/img/superRouter/left2.png" alt="">
          </div>
          <tab active-color="#FF7265" default-color="#666" custom-bar-width=".5rem" class="tabBar">
            <tab-item v-for="(resultList, k) of item.result" :key="k" :selected="resultList.open" @on-item-click="onItemClick(item.result, k)">{{resultList.name}}</tab-item>
          </tab>
          <template v-for="(resultList, k) of item.result">
            <ul class="listItem" v-if="resultList.open" :key="k">
              <li v-for="(shop, j) of resultList.data" :key="j" @click="open(shop.url)"><div class="logoBox"><img :src="shop.img" alt=""></div><p>{{shop.name}}</p><p class="average">{{shop.describe}}</p></li>
            </ul>
          </template>
        </div>
        <div class="listBox" v-else :key="index">
          <div class="listTitle">
            <img src="../../assets/img/superRouter/left1.png" alt=""><span>{{item.title}}</span><img src="../../assets/img/superRouter/left2.png" alt="">
          </div>
          <ul class="listItem" >
            <li v-for="(resultList, k) of item.result" :key="k" @click="open(resultList.url)"><div class="logoBox"><img :src="resultList.img" alt=""></div><p>{{resultList.name}}</p><p class="average">{{resultList.describe}}</p></li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

export default {
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      showHead: false,
      opacity: 'rgba(0, 0, 0, 0)',
      marginTop: '',
      tabIndex: 0,
      list: []
    }
  },
  methods: {
    handleScroll () {
      console.log(this.$refs.box.scrollTop)
      let offsetTop = this.$refs.box ? this.$refs.box.scrollTop : 10
      this.showHead = offsetTop > 20
      let w = document.documentElement.clientWidth
      let size = (document.documentElement.clientWidth / 7.5)
      this.opacity = 'rgba(0, 0, 0,' + offsetTop / (4.36 * size - w / 7.5) + ')'
    },
    onItemClick (result, index) {
      for (let i = 0; i < result.length; i++) {
        result[i].open = false
      }
      result[index].open = true
    },
    getList () {
      this.$http.post('/amoy/user/super-enter', {}, true).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          // res.data[i].title = res.data[i].title.split('')
          // if (res.data[i].result[0].data.length > 0) {
          //   res.data[i].type = 1
          // }
          for (let j = 0; j < res.data[i].result.length; j++) {
            // res.data[i].title = res.data[i].title.split('')
            if (res.data[i].result[j].data.length > 0) {
              res.data[i].type = 1
              if (j === 0) {
                res.data[i].result[j].open = true
              }
            }
          }
        }
        console.log(res.data)
        this.list = res.data
      })
    },
    open (url) {
      api.openWin({
        name: 'aliWin',
        url: '../html/main.html',
        reload: true,
        pageParam: {
          url: url,
          back: 'newIndex'
        },
        animation: {
          type: 'push',
          subType: 'from_right',
          duration: 300
        },
        bounces: false,
        slidBackEnabled: false,
        allowEdit: true
      })
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.marginTop = (api.safeArea.top / size) + 'rem'
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    this.getList()
  }
}
</script>

<style scoped lang="less">
  .supRouterBox {
    position: relative;
    height: 100%;
    .hideT{
      z-index: 1000;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 0.88rem;
      display: flex;
      align-items: center;
      background: rgba(0,0,0,0.8);
      padding-right: 0.2rem;
      .back{
        padding: 0.2rem;
        i{
          font-size: 0.4rem;
          color: #666;
        }
      }
      .searchBox{
        flex: 1;
        background: #fff;
        display: flex;
        align-items: center;
        height: 0.68rem;
        border-radius: 0.34rem;
        padding-left: 0.34rem;
        img{
          width: 0.34rem;
        }
        span{
          font-size: 0.26rem;
          color: #999;
        }
      }
      .teach{
        margin-left: 0.2rem;
        font-size: 0.3rem;
        color: #fff;
      }
    }
    .box{
      overflow-y: auto;
      height: 100%;
    }
    .head {
      height: 4.36rem;
      background-image: url("../../assets/img/superRouter/banner.png");
      background-size: contain;
      background-repeat: no-repeat;
      overflow: hidden;
      .top {
        height: 0.88rem;
        padding: 0 .22rem 0 .31rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .back {
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #666;
          border-left: 2px solid #666;
          transform: rotate(45deg);
        }
        .tutorial {
          font-size: .3rem;
          color: #CF933A;
        }
      }
      .search {
        width: 7rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background-color: #fff;
        border-radius: .4rem;
        margin: 1.9rem auto;
        p {
          color: #999;
          img {
            display: inline-block;
            width: .34rem;
            height: .34rem;
            vertical-align: middle;
            margin-right: .15rem;
          }
        }
      }
    }
    .listBox {
      /*.vux-tab .vux-tab-item.vux-tab-selected {*/
        /*color: #FF7265;*/
        /*!*border-bottom: 3px solid #FF7265;*!*/
        /*border-bottom: none !important;*/
      /*}*/
      margin-top: .2rem;
      background-color: #fff;
      .listTitle {
        width: 2.95rem;
        margin: 0 auto;
        padding: .5rem 0;
        display: flex;
        justify-content: space-between;
        font-size: .30rem;
        line-height: .30rem;
        img {
          width: .48rem;
          height: .30rem;
          vertical-align: middle;
        }
      }
      .listItem {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 25%;
          box-sizing: border-box;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
          padding-bottom: .26rem;
          &:nth-of-type(4n+0) {
            border-right: none;
            padding-bottom: .25rem;
          }
          &:nth-child(n+5) {
            border-bottom: none;
          }
          .logoBox {
            padding:.33rem .45rem .2rem;
            img {
              width: 100%;
              vertical-align: middle;
            }
          }
          p {
            font-size: .26rem;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            text-align: center;
          }
          .average {
            font-size: .2rem;
            color: #999;
          }
        }
      }
      .tabBar {
        box-sizing: border-box;
        margin-bottom: .5rem;
        .vux-tab-container {
          .scrollable {
            padding-bottom: 7px;
          }
        }
        .vux-tab-ink-bar{
          bottom: 28px !important;
        }
      }
    }
  }
</style>
