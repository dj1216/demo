<template>
  <div class="fastrob">
    <div class="robTime">
      <p class="title">限时秒杀</p>
      <i class="iconfont icon-back" @click="$router.go(-1)"></i>
      <div class="tiemBox">
        <vueScroller lock-y :scrollbar-x=false :bounce="false">
        <div class="times" :style="{transform:LeftMove}">
          <div class="time" v-for="(item, index) of times" :key="index"  @click="move(index)" :class="{active: active === index}">
            <p>{{item.time}}</p>
            <p>{{item.name}}</p>
          </div>
        </div>
        </vueScroller>
      </div>
    </div>
    <div class="lists">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <ul>
        <li class="box" v-for="(item,index) in list" :key="index"  @click="detail(item)">
          <div class="commodity">
            <div class="left">
              <img v-lazy="item.thumb" alt="" :key="item.thumb">
            </div>
            <div class="right">
              <div class="top">
                <div class="tao" v-show="item.type === 11">
                  <img src="../../assets/img/home/tblogo.png" alt="">
                </div>
                <div class="tao" v-show="item.type === 12">
                  <img src="../../assets/img/home/tmlogo.png" alt="">
                </div>
                <div class="text">{{item.title}}</div>
              </div>
              <div class="middle">
                <div class="left" :style="{color: $store.state.global.theme.mainColor}" >
                  <span :style="{borderColor: $store.state.global.theme.mainColor}">券</span>
                  <span :style="{borderColor: $store.state.global.theme.mainColor}">￥{{item.coupon_money}}</span>
                </div>
                <span class="right">已售: {{item.volume}}件</span>
              </div>
              <div class="bottom">
                <div class="Bleft">
                  <span class="price" :style="{color: $store.state.global.theme.mainColor}" >券后价￥:</span>
                  <span class="money" :style="{color: $store.state.global.theme.mainColor}" >{{item.coupon_price}}</span>
                </div>
                <div class="share" @click="detail(item)" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">马上抢
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
    <!--<div class="goods_back_top" @click="backTop()"></div>-->
  </div>
</template>

<script>
import {Scroller as VueScroller, Panel} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'fastrob',
  components: {
    MescrollVue, Panel, VueScroller
  },
  data () {
    return {
      times: [
        {time: '00:00', name: '昨日开抢'},
        {time: '10:00', name: '昨日开抢'},
        {time: '12:00', name: '昨日开抢'},
        {time: '15:00', name: '昨日开抢'},
        {time: '20:00', name: '昨日开抢'},
        {time: '00:00', name: '今日开抢'},
        {time: '10:00', name: '今日开抢'},
        {time: '12:00', name: '今日开抢'},
        {time: '15:00', name: '今日开抢'},
        {time: '20:00', name: '今日开抢'},
        {time: '00:00', name: '明日开抢'},
        {time: '10:00', name: '明日开抢'},
        {time: '12:00', name: '明日开抢'},
        {time: '15:00', name: '明日开抢'},
        {time: '20:00', name: '明日开抢'}
      ],
      list: [],
      LeftMove: '',
      page: 1,
      active: '',
      hour_type: '',
      finish: false,
      loading: false,
      Listlength: 0,
      newListlength: 0,
      show: true,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      mescrollUp: {
        auto: false,
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
    refresh () {
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/hao/fast-buy', {
        page: page.num,
        hour_type: this.hour_type
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
      })
    },
    backTop () {
      let body = document.getElementById('vux_view_box_body')
      let time = ''
      time = setInterval(() => {
        let scroll = body.scrollTop
        let speed = Math.floor(scroll / 10)
        if (speed <= 5) {
          body.scrollTop = 0
          clearInterval(time)
        } else {
          body.scrollTop = scroll - speed
        }
      }, 10)
    },
    move (i) {
      this.mescrollUp.htmlLoading = ''
      this.LeftMove = 'translateX(' + (-1.5 * (i - 2)) + 'rem)'
      this.list = []
      this.finish = false
      this.hour_type = i + 1
      this.active = i
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    getHour () {
      var time = new Date()
      var hour = time.getHours()
      if (hour >= 20) {
        this.active = 9
        this.LeftMove = 'translateX(' + (-1.5 * 7) + 'rem)'
        this.hour_type = 10
      } else if (hour >= 15) {
        this.active = 8
        this.LeftMove = 'translateX(' + (-1.5 * 6) + 'rem)'
        this.hour_type = 9
      } else if (hour >= 12) {
        this.active = 7
        this.LeftMove = 'translateX(' + (-1.5 * 5) + 'rem)'
        this.hour_type = 8
      } else if (hour >= 10) {
        this.active = 6
        this.LeftMove = 'translateX(' + (-1.5 * 4) + 'rem)'
        this.hour_type = 7
      } else {
        this.active = 5
        this.LeftMove = 'translateX(' + (-1.5 * 3) + 'rem)'
        this.hour_type = 6
      }
      this.mescroll.resetUpScroll()
    },
    detail (item) {
      // utils.storage.set('supergoods', item)
      // this.$router.push('/supergoods?type=11&id=' + item.origin_id)
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.origin_id + '&i=0&way=1')
    }
  },
  mounted () {
    // 删除
    this.$nextTick(() => {
      this.getHour()
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
  .fastrob{
    position: relative;
    height: 100%;
    background: #fff;
    width: 100%;
    ._v-container{
    }
    .high{
      background: @h-col;
      height: .1rem;
      width: 100%;
    }
    .robTime{
      position: absolute;
      top: 0;
      height: 3.2rem;
      width: 100%;
      background-image: url("../../assets/img/home/ms.png");
      overflow: hidden;
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
        top: .3rem;
        color: #fff;
        font-size: .4rem;
        line-height: .88rem;
        padding: .2rem;
      }
      .tiemBox{
        height: 1.3rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        /*overflow-x: auto;*/
        /*display: -webkit-box;*/
        /*flex-wrap: nowrap;*/
        .time{
          float: left;
          width: 1.5rem;
          p{
            text-align: center;
            color: #fff;
            font-size: .22rem;
          }
          p:first-of-type{
            font-size: .32rem;
          }
        }
        .times{
          width: 22.5rem;
          .active{
            background: #fff;
            border-radius: .2rem;
            p{
              color: @theme-col;
            }
          }
        }
      }
    }
    .lists{
      position: absolute;
      top: 3.2rem;
      bottom: 0;
      width: 100%;
      text-align: center;
      font-size: 0.3rem;
    }
    .box{
      >p {
        font-size: 0.24rem;
        letter-spacing:0.03rem;
        color: #676767;
      }
      .commodity{
        height: 2.40rem;
        border-bottom: 1px solid #f4f1f1;
        margin-top: 0.2rem;
        padding: 0.1rem 0.1rem 0.3rem;
        display: flex;
        justify-content: space-between;
        .left{
          /*float: left;*/
          height: 100%;
          width: 2.22rem;
          border-radius: 0.08rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          /*float: left;*/
          height: 100%;
          padding-right:0.1rem;
          color: black;
          width: 65%;
          .top{
            padding-top: 0.1rem;
            height: 0.96rem;
            display: flex;
            justify-content: left;
            .tao{
              position: relative;
              left: 0.1rem;
              width: 0.34rem;
              height: 0.34rem;
              background-color: pink;
              margin-top: 0.12rem;
              border-radius: 0.05rem;
              img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
            .text{
              width: 4.2rem;
              font-size: 0.32rem;
              text-overflow:ellipsis;
              white-space:nowrap;
              overflow:hidden;
              padding-left: 0.1rem;
              margin-top: 0.025rem;
              color: black;
            }
          }
          .middle{
            height: 0.5rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .left{
              position: relative;
              width: 1.8rem;
              height: 0.50rem;
              text-align: center;
              line-height: 0.5rem;
              font-size: 0.3rem;
              span{
                border: 1px solid;
                width: 0.5rem;
                display: inline-block;
              }
              span:nth-child(2){
                border-left: none;
                position: relative;
                left: -0.1rem;
                width: 1rem;
              }
            }
            .left::after{
              left: 1.1rem;
            }
            .right{
              font-size: 0.2rem;
              width: 2rem;
              line-height: 0.5rem;
              text-align: right;
              color: #999999;
            }
          }
          .bottom{
            margin-top: 0.3rem;
            height: 0.32rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .Bleft {
              width: 60%;
              display: flex;
              justify-content: left;
              margin-left: -0.1rem;
              .price {
                width: 52%;
                font-size: 0.26rem;
                line-height: 0.32rem;
              }
              .money {
                line-height: 0.32rem;
                width:0.5rem;
                font-size: 0.3rem;
              }
            }
            .share{
              border-radius: 0.35rem;
              height: .5rem;
              width: 1.1rem;
              padding: 0 .15rem;
              position: relative;
              top:-.1rem;
              font-size: .24rem;
              line-height: .5rem;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
