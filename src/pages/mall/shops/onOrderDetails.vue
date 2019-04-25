<template>
  <div class="firmOrder_main orderDetail_main">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      订单详情
    </x-header>
    <div class="content">
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
            <span>收货人：{{obj.username}}</span>
          </div>
          <div class="right_phone">
            {{obj.mobile}}
          </div>
        </div>
        <div class="div2">
          <i class="iconfont icon-locationfill"></i>
          <span>{{obj.province+obj.city+obj.district+obj.address}}</span>
        </div>
      </div>
      <div>
        <div class="content_main">
          <div class="list">
            <div class="header">
              <img src="../../../assets/mall/img/home/detail/detail2.png" alt="">
              <span>{{obj.shopName}}</span>
            </div>
            <div class="mail" v-for="(item,index) in obj.goodsList" :key="index">
              <div class="left">
                <img v-lazy="item.thumb" alt="">
              </div>
              <div class="right">
                <div class="div1">
                  {{item.goodsName}}
                </div>
                <div class="div2">
                  <div>
                    <span>白的</span>
                    <span>均码</span>
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
              <div class="title_right">¥{{obj.postagePrice}}</div>
            </div>
            <div class="li_main">
              <div class="title_left">实付款</div>
              <div class="title_right_span">¥{{obj.payPrice}}<span>(含运费)</span></div>
            </div>
            <div class="li_main">
              <div class="title_left">支付方式</div>
              <div class="title_right">
                {{obj.payTypeInfo}}
              </div>
            </div>
          </div>
        </div>
        <div class="content_main" style="margin-top:0.1rem;">
          <div class="list">
            <div class="li_main">
              <div class="title_left">订单号</div>
              <div class="title_right">
                {{obj.orderSn}}
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">下单时间</div>
              <div class="title_right">{{parseInt(obj.created_at) | formatDate}}</div>
            </div>
          </div>
        </div>
        <div class="content_main" style="margin-top:0.1rem;" v-if="obj.orderStatus !== '0'">
          <div class="list">
            <div class="li_main">
              <div class="title_left">配送方式</div>
              <div class="title_right">
                {{obj.expressName}}
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">物流单号</div>
              <div class="title_right">
                {{obj.expressNo}}
              </div>
            </div>
          </div>
        </div>
        <div class="content_main" style="margin-top:0.1rem;" v-if="obj.orderStatus === '0'">
          <div class="list">
            <div class="li_main">
              <div class="title_left">配送方式</div>
              <div class="title_right">
                <input type="text" placeholder="请输入配送方式" v-model="info.expressName">
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">物流单号</div>
              <div class="title_right">
                <input type="text" placeholder="请输入物流单号" v-model="info.expressNo">
              </div>
            </div>
          </div>
        </div>
        <div class="confirm1" @click="deliverGoods()" v-if="obj.orderStatus === '0'">
          <button>确认发货</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './shops.less'
import * as apiHttp from '../../../api/index'
import Clipboard from 'clipboard'
import {formatDate} from '../../../plugin/data'
export default {
  name: 'onOrderDetails',
  data () {
    return {
      info: {
        expressName: null,
        expressNo: null
      },
      shopList: [],
      obj: {},
      status: {},
      payStatus: ''
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    // 删除
    this.getDtails()
  },
  methods: {
    getDtails () {
      apiHttp.onOrderDetails(this.$route.query.orderId).then(response => {
        if (response.code === 0) {
          this.obj = response.data.detail
          this.payStatus = response.data.detail.payStatus
          if (response.data.detail.payStatus === '1') {
            switch (response.data.detail.orderStatus) {
              case '-3':
                this.status = {title: '申请退货', img: './static/libs/img/tuihuo.png'}
                break
              case '-4':
                this.status = {title: '已退货', img: './static/libs/img/yituihuo.png'}
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
            this.status = {title: '待付款', img: './static/libs/img/daifukuan.png'}
          }
        }
      })
    },
    deliverGoods () {
      apiHttp.onOrderDetails1('save', this.$route.query.orderId, this.info).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          this.getDtails()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
