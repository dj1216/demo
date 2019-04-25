<template>
    <div class="team">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="head">
          <img src="../../assets/img/my/teambg.png" alt="" class="bg">
          <p class="title">粉丝</p>
          <i class="iconfont icon-back" @click="$router.go(-1)"></i>
          <div class="headbox">
            <div class="t">我的推荐人</div>
            <div class="info" v-if="data.referrer">
              <!--<img :src="data.referrer.avatar" alt="" v-if="data.referrer.avatar">-->
              <!--<img :src="$logo" alt="" v-else-if="$logo">-->
              <div class="avater" :style="{backgroundImage: 'url(' + data.referrer.avatar + ')'}" v-if="data.referrer.avatar"></div>
              <div class="avater" :style="{backgroundImage: 'url(' + $logo + ')'}" v-else-if="$logo"></div>
              <div class="nickname">
                <p class="name"><span v-if="data.referrer.nickname">{{data.referrer.nickname}}</span><span v-if="data.referrer.mobile">{{data.referrer.mobile}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="numBox">
          <div class="top">
            <div class="num" :class="{active: type === 1}" @click="reset(1)">
              <p>{{data.numAll}}</p>
              <span>总人数</span>
            </div>
            <div class="num" :class="{active: type === 2}" @click="reset(2)">
              <p>{{data.num1}}</p>
              <span>直属代理</span>
            </div>
          </div>
          <div class="bot">
            <div class="nums" :class="{active: type === 5}" @click="reset(5)">
              <p>{{data.numToday}}人</p>
              <span>今日</span>
            </div>
            <div class="nums" :class="{active: type === 4}" @click="reset(4)">
              <p>{{data.numYesterday}}人</p>
              <span>昨日</span>
            </div>
            <div class="nums" :class="{active: type === 2}" @click="reset(2)">
              <p>{{data.num1}}人</p>
              <span>直属代理</span>
            </div>
            <div class="nums" :class="{active: type === 3}" @click="reset(3)">
              <p>{{data.num2}}人</p>
              <span>直属代理下级</span>
            </div>
          </div>
        </div>
        <div class="searchBox">
          <div class="search">
            <img src="../../assets/img/my/search.png" alt="">
            <input type="text" placeholder="请输入昵称或手机号" @keyup.enter="reset(type)" v-model="keyword">
          </div>
        </div>
        <div class="lists">
          <div class="list" v-for="(item, index) of list" :key="index">
            <div class="slef">
              <!--<img v-lazy="item.avatar" alt="" :key="item.avatar" v-if="item.avatar">-->
              <!--<img :src="$logo"  alt="" v-else-if="$logo">-->
              <div class="avater" :style="{backgroundImage: 'url(' + item.avatar + ')'}" v-if="item.avatar"></div>
              <div class="avater" :style="{backgroundImage: 'url(' + $logo + ')'}" v-else-if="$logo"></div>
              <div class="slefinfo">
                <p class="name">{{item.nickname}}
                  <span v-if="item.lv">{{item.lv}}</span>
                </p>
                <p class="account">{{item.mobile}}</p>
              </div>
              <div class="recommend">
                <p>推荐人数：{{item.num}}</p>
                <!--<p>订单数量：{{item.num}}</p>-->
              </div>
            </div>
            <!--<div class="profit">-->
              <!--<div>-->
                <!--<p>上月结算</p>-->
                <!--<p>0.00</p>-->
              <!--</div>-->
              <!--<div>-->
                <!--<p>本月预估</p>-->
                <!--<p>0.00</p>-->
              <!--</div>-->
              <!--<div>-->
                <!--<p>今日预估</p>-->
                <!--<p>0.00</p>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <!--<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="bubbles">-->
            <!--<span slot="no-more">已加载全部</span>-->
            <!--<span slot="no-results">暂无相关内容</span>-->
          <!--</infinite-loading>-->
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'team',
  components: {
    MescrollVue
  },
  data () {
    return {
      data: '',
      list: [],
      page: 1,
      finish: false,
      keyword: '',
      loading: false,
      type: 1,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
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
      this.$http.post('/amoy/user/team', {
        type: this.type,
        page: page.num,
        nickname: this.keyword
      }, true, true).then((res) => {
        if (res.code === 0) {
          this.data = res.data
          let arr = res.data.info
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
    },
    reset (type) {
      this.mescrollUp.htmlLoading = ''
      this.mescrollUp.page.num = 1
      this.type = type
      this.list = []
      this.finish = false
      this.upCallback(this.mescrollUp.page, this.mescroll)
    }
  },
  mounted () {
    // 删除
    // this.getTeam()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.team{
  height: 100%;
  background: #f7f7f7;
  .head{
    width: 100%;
    height: 5rem;
    position: relative;
    .bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 3.89rem;
    }
    .headbox{
      position: absolute;
      left: .3rem;
      top: 1.6rem;
      width: 6.9rem;
      height: 3.3rem;
      background: #fff;
      border-radius: .1rem;
    }
    .title{
      position: absolute;
      left: 0;
      top: .5rem;
      width: 100%;
      height: .88rem;
      line-height: .88rem;
      text-align: center;
      color: #fff;
      font-size: .36rem;
    }
    .icon-back{
      position: absolute;
      left: .3rem;
      top: .3rem;
      color: #fff;
      font-size: .4rem;
      line-height: .88rem;
      padding: .2rem;
    }
  }
  .t{
    text-align: center;
    color: #333;
    font-size: .3rem;
    margin-top: .2rem;
  }
  .info{
    text-align: center;
    .avater{
      width: 1.38rem;
      height: 1.38rem;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0.2rem auto 0;
    }
    .nickname{
      .name{
        font-size: .3rem;
        color: #666;
        span:nth-of-type(2){
          font-size: .24rem;
          margin-left: .4rem;
        }
      }
      .account{
        font-size: .24rem;
        color: #666;
      }
    }
  }
  .numBox{
    margin-top: .1rem;
    background: #fff;
    .top{
      height: 2.56rem;
      align-items: center;
      display: flex;
      justify-content: space-around;
      position: relative;
      .num{
        width: 1.82rem;
        height: 1.82rem;
        border-radius: 50%;
        background: #f7f7f7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        p{
          color: @theme-col;
          font-size: .36rem;
          margin-bottom: .2rem;
        }
        span{
          font-size: .26rem;
        }
      }
      .active{
        border: 5px solid @theme-col;
      }
    }
    .top:after{
      content: '';
      height: 1px;
      position: absolute;
      bottom: 0;
      left: .2rem;
      right: .2rem;
      border-bottom: 1px solid #dadada;
      transform-origin: 0 0;
      transform: scaleY(.5);
    }
    .bot{
      height: 1.7rem;
      display: flex;
      .nums{
        position: relative;
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p{
          font-size: .3rem;
          color: #333;
          margin-bottom: .2rem;
        }
        span{
          font-size: .24rem;
          color: #666;
        }
      }
      .active{
        p{
          color: @theme-col;
        }
        span{
          color: @theme-col;
        }
      }
      .nums:nth-of-type(3){
        flex: 3;
      }
      .nums:nth-of-type(4){
        flex: 4;
      }
      .nums:after{
        content: '';
        height: 50%;
        position: absolute;
        bottom: 25%;
        top: 25%;
        right: 0;
        border-right: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleX(.5);
      }
      .nums:last-of-type:after{
        display: none;
      }
    }
  }
  .searchBox{
    margin: .1rem 0;
    height: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../assets/img/my/searchbg.png");
    background-size: cover;
    .search{
      height: .7rem;
      width: 6.9rem;
      background: #fff;
      display: flex;
      padding: 0 .35rem;
      box-sizing: border-box;
      border-radius: .35rem;
      align-items: center;
      img{
        width: .32rem;
        height: .32rem;
        margin-right: .2rem;
      }
      input{
        flex: 1;
        outline: none;
        border: none;
        background: inherit;
      }
    }
  }
  .lists{
    .list{
      background: #fff;
      .slef{
        padding: .3rem;
        position: relative;
        display: flex;
        .avater{
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 1.08rem;
          height: 1.08rem;
          margin-right: .2rem;
          border-radius: 50%;
        }
        .slefinfo{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name{
            font-size: .3rem;
            color: #333;
            span{
              height: .4rem;
              line-height: .4rem;
              padding: 0 .1rem;
              border-radius: .2rem;
              display: inline-block;
              background: #f0f0f0;
              color: #999;
              font-size: .24rem;
            }
          }
          .account{
            color: #999;
            font-size: .24rem;
          }
        }
        .recommend{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: .6rem;
          position: relative;
          p{
            font-size: .24rem;
            color: #666;
          }
        }
        .recommend:before{
          content: '';
          height: 100%;
          position: absolute;
          bottom: 0;
          top: 0;
          left: 0;
          border-left: 1px solid #dadada;
          transform-origin: 0 0;
          transform: scaleX(.5);
        }
      }
      .slef:after{
        content: '';
        height: 1px;
        position: absolute;
        bottom: 0;
        left: .2rem;
        right: .2rem;
        border-bottom: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .profit{
        padding: .3rem;
        display: flex;
        div{
          flex: 1;
          p:first-of-type{
            font-size: .24rem;
            margin-bottom: .2rem;
          }
          p:last-of-type{
            font-size: .3rem;
            color: @theme-col;
          }
        }
        div:nth-of-type(2){
          text-align: center;
        }
        div:nth-of-type(3){
          text-align: right;
        }
      }
    }
  }
}
</style>
