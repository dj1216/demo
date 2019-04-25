<template>
  <div class="firmOrder_main orderDetail_main" v-if="isShow">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        订单详情
      </x-header>
    </div>
    <confirm
      v-model="showquxiao"
      :close-on-confirm="false"
      @on-confirm="confirm1">
      <p style="text-align:center;">您确定要取消该订单？</p>
    </confirm>
    <div class="mescrollBox">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content" style="margin-top: 0">
        <div class="content_status">
          <div class="left">{{status.title}}</div>
          <div class="right">
            <img :src="status.img || './static/img/under/111.png'" alt="">
          </div>
        </div>
        <div class="content_top">
          <div class="div1">
            <div class="left_name">
              <i class="iconfont icon-wode1"></i>
              <span>收货人：{{obj.order ? obj.order.username: ''}}</span>
            </div>
            <div class="right_phone">
              {{obj.order ? obj.order.mobile: ''}}
            </div>
          </div>
          <div class="div2">
            <i class="iconfont icon-locationfill"></i>
            <span>{{obj.order ? obj.order.province+obj.order.city+obj.order.district+obj.order.address: ''}}</span>
          </div>
        </div>
        <div>
          <div class="content_main">
            <div class="list">
              <div class="header">
                <img :src="obj.shopInfo ? obj.shopInfo.logo : './static/img/under/111.png'" alt="">
                <span>{{obj.order ? obj.order.shopName : ''}}</span>
              </div>
              <div class="mail" v-for="(item,index) in obj.goodsList" :key="index" @click="jumpTo({name:'mallHomeDetail',query:{title:item.goodsId}})">
                <div class="left">
                  <img v-lazy="item.thumb" alt="">
                </div>
                <div class="right">
                  <div class="div1">
                    {{item.goodsName}}
                  </div>
                  <div class="div2">
                    <div>
                      <span>{{item.goodsField}}</span>
                    </div>
                    <div>
                      ×{{item.goodsNum}}
                    </div>
                  </div>
                  <div class="div3">
                    <div class="price_main"><span>¥</span>{{item.goodsPrice}}</div>
                  </div>
                </div>
              </div>
              <div class="li_main">
                <div class="title_left">运费</div>
                <div class="title_right">¥{{obj.order ? obj.order.postagePrice : ''}}</div>
              </div>
              <div class="li_main">
                <div class="title_left">实付款</div>
                <div class="title_right_span">¥{{obj.order ? obj.order.payPrice : ''}}<span>(含运费)</span></div>
              </div>
              <div class="li_main">
                <div class="title_left">支付方式</div>
                <div class="title_right">
                  {{obj.order ? obj.order.payTypeInfo : ''}}
                </div>
              </div>
              <div class="li_main">
                <div class="title_left">配送方式</div>
                <div class="title_right">
                  {{obj.order ? obj.order.expressName : ''}}
                </div>
              </div>
            </div>
          </div>
          <div class="content_main" style="margin-top:0.1rem;">
            <div class="list">
              <div class="li_main">
                <div class="title_left">订单号</div>
                <div class="title_right">
                  {{obj.order ? obj.order.orderSn: ''}}
                </div>
                <p style="font-size: .26rem;color: #fc3357;" @click="onCopy(obj.order.orderSn)">复制</p>
              </div>
              <div class="li_main">
                <div class="title_left">下单时间</div>
                <div class="title_right">{{obj.order ? parseInt(obj.order.created_at) : 0 | formatDate}}</div>
              </div>
              <div class="refund">
                <div class="btns btn1s" v-if="payStatus === '1' && (obj.order.orderStatus === '1' || obj.order.orderStatus === '0')" @click="jumpTo({name:'mallExchange',query:{orderSn:obj.order.orderSn}})">申请退货</div>
                <div class="btns" v-if="payStatus === '1' && obj.order.orderStatus === '1'" @click="receipt(obj.order.orderSn)">确认收货</div>
                <div class="btns btn1s" v-if="payStatus === '0' && obj.order.orderStatus === '0'" @click="handShow(obj.order.orderSn)">取消订单</div>
                <div class="btns" v-if="payStatus === '0' && obj.order.orderStatus === '0'" @click="jumpTo({name:'mallPayMent',query:{orderId:obj.order.orderId}})">去支付</div>
                <div class="btns" v-if="payStatus === '1' && obj.order.orderStatus === '2' && obj.order.isDiscuss == 0" @click="jumpTo({name:'mallAppraise',query:{orderSn:obj.order.orderSn}})">去评价</div>
              </div>
            </div>
          </div>
        </div>
        <div class="title_img">
          <img src="../../../assets/mall/img/home/orderdetail_title.png" alt="">
        </div>
        <list :list="shopList"></list>
    </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import { Confirm } from 'vux'
import list from '../../../components/list'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import MescrollVue from 'mescroll.js/mescroll.vue'
import Clipboard from 'clipboard'
export default {
  name: 'orderDetail',
  components: {
    list,
    Confirm,
    MescrollVue
  },
  data () {
    return {
      shopList: [],
      obj: {},
      status: {},
      order: null,
      showquxiao: false,
      payStatus: '',
      page: 1,
      isShow: false,
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.refresh
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: '',
          icon: '',
          tip: '暂无相关订单~'
        }
      }
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted: function () {
    // 删除
    this.getDtails()
  },
  methods: {
    getDtails () {
      apiHttp.orderDetaiil(this.$route.query.order).then(response => {
        if (response.code === 0) {
          this.isShow = true
          this.obj = response.data
          this.payStatus = response.data.order.payStatus
          if (response.data.order.payStatus === '1') {
            switch (response.data.order.orderStatus) {
              case '-3':
                this.status = {title: '申请退货', img: './static/libs/img/tuihuo.png'}
                break
              case '-4':
                this.status = {title: '已退货', img: './static/libs/img/tuihuo.png'}
                break
              case '0':
                this.status = {title: '待发货', img: './static/libs/img/daifahuo.png'}
                break
              case '1':
                this.status = {title: '待收货', img: './static/libs/img/yifukuan.png'}
                break
              case '2':
                this.status = {title: '已完成', img: './static/libs/img/order_status.png'}
                break
            }
          } else {
            this.status = {title: '待付款', img: './static/libs/img/yifukuan.png'}
          }
        }
      })
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.indexListSpid(this.obj.shopInfo.id, page.num).then(res => {
        if (res.code === 0) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.shopList = []
          this.shopList = this.shopList.concat(arr)
          console.log(this.shopList)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.list.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.getDtails()
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    receipt (order) {
      this.order = order
      this.$http.post('/mall/order/confirm-order?i=1', {orderSn: this.order}).then(res => {
        this.$vux.toast.text(res.msg)
        this.getDtails()
      })
    },
    handShow (order) {
      this.order = order
      this.showquxiao = true
    },
    confirm1 () {
      apiHttp.orderRemove(this.order).then(response => {
        if (response.code === 0) {
          this.showquxiao = false
          this.$vux.toast.text('取消成功')
          this.$router.push({name: 'mallFixing_order'})
        }
      })
    },
    // 复制
    onCopy (orderSn) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: orderSn
      }, function (ret, err) {
        if (ret) {
          that.$vux.toast.text('复制成功')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    }
  }
}

</script>

<style lang="less">
  .orderDetail_main{
    .mescrollBox {
      width: 100%;
      position: absolute;
      top: .9rem;
      bottom: 0;
      height: auto !important;
    }
  }
</style>
