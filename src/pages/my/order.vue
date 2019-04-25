<template>
    <div class="order">
      <tab :line-width="2" custom-bar-width=".4rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type">
        <tab-item @on-item-click="reset(0)">我的订单</tab-item>
        <tab-item @on-item-click="reset(1)">团队订单</tab-item>
      </tab>
      <div class="my" v-show="!type" v-if="data">
        <div>
          <div class="list" @click="jumpTo('/orderlist?order_type=1&type=' + type)">
            <div class="top">
              <img src="../../assets/img/home/tblogo.png" alt="">
              <p>淘宝</p>
            </div>
            <div class="bot">
              <span>全部({{data[0].tbTotal}})</span>
              <span>已结算({{data[0].tbSettled}})</span>
              <span>已付款({{data[0].tbPaid}})</span>
              <span>已失效({{data[0].tbExpired}})</span>
            </div>
          </div>
          <div class="high"></div>
        </div>
        <div>
          <div class="list" @click="jumpTo('/orderlist?order_type=2&type=' + type)">
            <div class="top">
              <img src="../../assets/img/home/jdlogo.png" alt="">
              <p>京东</p>
            </div>
            <div class="bot">
              <span>全部({{data[1].jdTotal}})</span>
              <span>已结算({{data[1].jdSettled}})</span>
              <span>已付款({{data[1].jdPaid}})</span>
              <span>已失效({{data[1].jdExpired}})</span>
            </div>
          </div>
          <div class="high"></div>
        </div>
        <div>
          <div class="list" @click="jumpTo('/orderlist?order_type=3&type=' + type)">
            <div class="top">
              <img src="../../assets/img/home/pddlogo.png" alt="">
              <p>拼多多</p>
            </div>
            <div class="bot">
              <span>全部({{data[2].pddTotal}})</span>
              <span>已结算({{data[2].pddSettled}})</span>
              <span>已付款({{data[2].pddPaid}})</span>
              <span>已失效({{data[2].pddExpired}})</span>
            </div>
          </div>
          <div class="high"></div>
        </div>
      </div>
      <div class="listBox" v-if="type === 1">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="high"></div>
          <div class="list" v-for="(item, index) of list" :key="index">
            <div class="top">
              <!--<img :src="item.picUrl" alt="">-->
              <p>订单：{{item.trade_id}}</p>
              <span v-if="item.status === '已失效'">{{item.order_status}}</span>
              <span class="active" :style="{color: $store.state.global.theme.mainColor}"  v-else>{{item.order_status}}</span>
            </div>
            <div class="centerBox">
              <img v-lazy="item.picUrl" alt="" :key="item.picUrl">
              <div class="info">
                <p class="t">{{item.title}}</p>
                <div class="money">
                  <p class="price" :style="{color: $store.state.global.theme.mainColor}" >¥<span>{{item.payment_price}}</span></p>
                  <p class="profit" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">预估收益：{{item.price}}</p>
                </div>
              </div>
            </div>
            <div class="bot">
              <!--<p class="order" v-if="item.nickname">-->
              <!--<span>购买人：{{item.nickname}}</span>-->
              <!--&lt;!&ndash;<span @click="onCopy" class="copyObj" data-clipboard-text="1212">复制</span>&ndash;&gt;-->
              <!--</p>-->
              <div class="time">
                <span>创建时间：{{item.created_at*1000 | dateFormat}}</span>
                <!--<span>结算时间：{{item.settlement_at}}</span>-->
              </div>
            </div>
          </div>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import {Tab, TabItem, dateFormat} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'order',
  components: {
    Tab, TabItem, MescrollVue
  },
  filters: {
    dateFormat
  },
  data () {
    return {
      data: '',
      type: 0,
      list: [],
      page: 1,
      finish: false,
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
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/user/order-list', {
        type: 2,
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
    },
    reset (type) {
      this.type = type
      if (!this.data) {
        this.getInfo()
      }
    },
    getInfo () {
      this.$http.post('/amoy/user/order-count', {
        type: this.type + 1
      }, true).then((res) => {
        this.data = res.data
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/common";
.order{
  height: 100%;
  background: #fff;
  overflow-y: auto;
  .my{
    .list{
      .top{
        height: 1rem;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        img{
          width: .45rem;
          height: .45rem;
          margin-right: .2rem;
        }
        p{
          flex: 1;
          font-size: .3rem;
        }
      }
      .top:before{
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
        transform: matrix(.71,.71,-.71,.71,0,0);
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: .3rem;
      }
      .top:after{
        content: '';
        position: absolute;
        left: .2rem;
        right: .2rem;
        bottom: 0;
        height: 1px;
        border-bottom: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .bot{
        display: flex;
        height: 1.28rem;
        justify-content: space-around;
        align-items: center;
        span{
          font-size: .26rem;
          color: #666;
        }
      }
    }
  }
  .high{
    overflow: hidden;
    height: .1rem;
    background: #f7f7f7;
    width: 100%;
  }
  .listBox{
    position: relative;
    background: #f7f7f7;
    height: calc(100% - 44px);
    .list{
      overflow: hidden;
      background: #fff;
      margin: .1rem 0;
      .top{
        background: #fff;
        display: flex;
        align-items: center;
        height: 1rem;
        padding: 0 .3rem;
        img{
          width: .34rem;
          margin-right: .2rem;
        }
        p{
          color: #666;
          font-size: .28rem;
          flex: 1;
        }
        span{
          font-size: .3rem;
        }
      }
      .centerBox{
        background: #fff;
        display: flex;
        /*height: 1.6rem;*/
        padding: .25rem .3rem;
        position: relative;
        img{
          width: 1.6rem;
          height: 1.6rem;
          margin-right: .3rem;
        }
        .info{
          /*height: 1.6rem;*/
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .t{
            font-size: .26rem;
          }
          .money{
            display: flex;
            justify-content: space-between;
            .price{
              font-size: .26rem;
              span{
                font-size: .38rem;
              }
            }
            .profit{
              font-size: .26rem;
              color: #fff;
              padding: 0 .2rem;
              height: .56rem;
              line-height: .56rem;
              border-radius: .28rem;
            }
          }
        }
      }
      .centerBox:before{
        content: '';
        position: absolute;
        left: .2rem;
        right: .2rem;
        top: 0;
        height: 1px;
        border-top: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .centerBox:after{
        content: '';
        position: absolute;
        left: .2rem;
        right: .2rem;
        bottom: 0;
        height: 1px;
        border-bottom: 1px solid #e0e0e0;
        transform-origin: 0 0;
        transform: scaleY(.5);
      }
      .bot{
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0.1rem .3rem;
        .order{
          text-align: right;
          color: #666;
          font-size: .28rem;
          padding: .1rem 0;
        }
        .time{
          text-align: right;
          font-size: .24rem;
          color: #999;
          span{
            margin-left: .4rem;
          }
        }
      }
    }
  }
}
</style>
