<template>
  <div class="firmOrder_main orderDetail_main" v-if="isShow">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      订单详情
    </x-header>
    <div class="content">
      <div>
        <div class="content_main" style="margin-top: 0">
          <div class="list">
            <div class="header">
              <img v-lazy="shopInfo.logo" alt="">
              <span>{{obj.shopName}}</span>
            </div>
            <div class="li_main">
              <div class="title_left">会员编号</div>
              <div class="title_right_span">{{obj.uid}}<span></span></div>
            </div>
            <div class="li_main">
              <div class="title_left">订单金额</div>
              <div class="title_right_span">¥{{obj.orderPrice}}<span></span></div>
            </div>
            <div class="li_main">
              <div class="title_left">支付金额</div>
              <div class="title_right_span">¥{{obj.payPrice}}<span></span></div>
            </div>
            <div class="li_main">
              <div class="title_left">优惠金额</div>
              <div class="title_right_span">¥{{obj.couponPrice}}<span></span></div>
            </div>
          </div>
        </div>
        <div class="content_main" style="margin-top:0.1rem;">
          <div class="list">
            <div class="li_main">
              <div class="title_left">订单号</div>
              <div class="title_right">
                {{obj.orderId}}
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">支付方式</div>
              <div class="title_right">
                {{payTypeInfo[obj.payType]}}
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">交易单号</div>
              <div class="title_right">
                {{obj.transaction_id}}
              </div>
            </div>
            <div class="li_main">
              <div class="title_left">支付时间</div>
              <div class="title_right">{{parseInt(obj.paytime) | formatDate}}</div>
            </div>
            <div class="li_main">
              <div class="title_left">下单时间</div>
              <div class="title_right">{{parseInt(obj.created_at) | formatDate}}</div>
            </div>
          </div>
        </div>
        <div class="off-order" @click="handService()">
          <p>注：若对此订单有任何疑问，可联系客服<span><img src="../../../assets/mall/img/under/u3.png" alt=""></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../shops/shops.less'
  import * as apiHttp from '../../../api/index'
  import {formatDate} from '../../../plugin/data'
  export default {
    data () {
      return {
        info: {
          expressName: null,
          expressNo: null
        },
        obj: {},
        payTypeInfo: {},
        shopInfo: {},
        isShow: false
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
      this.getDtails()
    },
    methods: {
      getDtails () {
        apiHttp.underShopOrderDetails(this.$route.query.orderId).then(response => {
          if (response.code === 0) {
            this.isShow = true
            this.obj = response.data.detail
            this.payTypeInfo = response.data.payTypeInfo
            this.shopInfo = response.data.shopInfo
          }
        })
      },
      handService () {
        // let This = this
        if (this.shopInfo.bdsqUrl) {
          return this.$router.push({
            name: 'mallCSD',
            query: {
              url: this.shopInfo.bdsqUrl
            }
          })
        } else if (this.shopInfo.mobile) {
          api.call({
            type: 'tel_prompt',
            number: this.shopInfo.mobile
          });
        } else {
          this.$vux.toast.text('暂未开发qq功能')
        }
      },
    }
  }
</script>

<style lang="less">
  @import '../../../assets/mall/style/_Variables';
  .off-order{
    margin-top: .2rem;
    p{
      color: #a1a1a1;
      font-size: 0.24rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        color: #333333;
        font-size: 0.28rem;
        width: .5rem;
        height: .5rem;
        margin-left: .2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
