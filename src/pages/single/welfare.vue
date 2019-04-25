<template>
  <div class="welfare">
    <div class="welfare_head">
      <ul>
        <template v-for="(item, index) in tab">
          <li  :key="index" v-if="colorIndex === index" class="red" style="color: #FF2556;"  @click="change(item, index)">{{item}}</li>
          <li :key="index" v-else @click="change(item, index)">{{item}}</li>
        </template>
      </ul>
      <span class="tab_active" :style="{'left': offLeft}"></span>
    </div>
    <div class="welfare_body">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="welfare_list" v-for="(item,i) in list" :key="i">
          <div class="list_title" v-if="colorIndex === 1">
            <img src="../../assets/img/single/001.png" alt="">
            <p>请及时确认订单收货</p>
          </div>
          <div class="welfare_item">
            <img :src='item.img' alt="">
            <div>
              <p class="item_one">{{item.title}}</p>
              <span class="item_two">领取时间：{{formatDate(item.created_at)}}</span>
              <span class="item_two" v-if="colorIndex === 1 || colorIndex === 2">订单号：{{item.trade_id}}</span>
              <span class="item_three" v-if="colorIndex === 0" @click="handleId(item.id)">补充单号</span>
              <span class="item_four" v-if="colorIndex === 1">商品金额：￥{{item.price}}</span>
              <p v-if="colorIndex === 2"><span class="item_four" style="margin-right: .3rem">商品金额：￥{{item.price}}</span><span class="item_four">补贴金额：￥{{item.free_money}}</span></p>
              <span class="item_two" style="margin-bottom: .3rem" v-if="colorIndex === 3">已失效</span>
            </div>
          </div>
        </div>
        <div id="empty"></div>
      </mescroll-vue>
    </div>
    <div class="replenish" v-if="show">
      <div class="wel_info">
        <p class="info_one">请填写单号</p>
        <p class="info_two">订单号补充后不可修改</p>
        <p class="info_two">补充错误将无法获得补贴，请谨慎填写</p>
        <input type="text" placeholder="请输入订单号" v-model="order">
        <p class="info_three"><span @click="show = false">取消</span><span @click="welfareConfirm()">确定</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    components: {
      MescrollVue
    },
    data () {
      return {
        tab:['未确认','待结算','已结算','已失效'],
        colorIndex: 0,
        offLeft: '.4rem',
        show: false,
        list: '',
        order: '',
        id: '',
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
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
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
        }
      }
    },
    created () {
      this.width = document.documentElement.clientWidth || document.body.clientWidth
      this.size = this.width / 750 * 100
    },
    methods: {
      change (item,index) {
        this.colorIndex = index
        this.$nextTick(() => {
          let red = document.getElementsByClassName('red')
          this.offLeft = red[0].offsetLeft / this.size + 0.15 + 'rem'
        })
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      upCallback (page, mescroll) {
        this.$http.post('/amoy/home/free-order-list', {page: page.num, sort: this.colorIndex}).then(res => {
          if (res.code === 0) {
            let arr = res.data === '' ? [] : res.data
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.length, true)
            })
          }
        }).catch((e) => {
          mescroll.endErr()
        })
      },
      refresh: function () {
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      handleId (id) {
        this.show = true
        this.id = id
        console.log(this.id)
      },
      welfareConfirm () {
        this.show = false
        this.$http.post('/amoy/home/free-submit-order', {id: this.id, trade_id: this.order}).then(res => {
          if (res.code === 0) {
            this.$vux.toast.text(res.msg)
            this.mescrollUp.page.num = 1
            this.upCallback(this.mescrollUp.page, this.mescroll)
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import "../../assets/mall/style/_Variables";
.welfare{
  .welfare_head{
    width: 100%;
    height: .9rem;
    padding: 0 .3rem;
    background: #ffffff;
    box-sizing: border-box;
    ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
      li{
        color: #333333;
        font-size: .28rem;
        line-height: .9rem;
      }
    }
    .tab_active{
      display: inline-block;
      width: 0.58rem;
      height: 0.06rem;
      background: #FF2556;
      border-radius: 0.4rem 0.4rem 0 0;
      position: absolute;
      top: 1.72rem;
      left: 0;
    }
  }
  .welfare_body{
    width: 100%;
    position: absolute;
    top: 1.9rem;
    bottom: 0;
    height: auto !important;
    .welfare_list{
      width: 100%;
      margin-top: .1rem;
      background: #ffffff;
      padding: 0 .3rem;
      box-sizing: border-box;
      .list_title{
        width: 100%;
        height: .9rem;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: .26rem;
          height: .26rem;
          border-radius: 50%;
        }
        p{
          color: #FF2556;
          font-size: .28rem;
          font-weight:500;
          margin-left: .1rem;
        }
      }
      .welfare_item{
        width: 100%;
        height: 2.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          width: 1.6rem;
          height: 1.6rem;
          border-radius: .1rem;
        }
        div{
          width: 74%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 1.7rem;
          .item_one{
            display: inline-block;
            color: #333333;
            font-size: .26rem;
            font-weight:500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item_two{
            color: #999999;
            font-size: .22rem;
            font-weight:500;
          }
          .item_three{
            display: inline-block;
            width: 1.72rem;
            height: .5rem;
            background:linear-gradient(90deg,#FB2F74,#FF7E7E);
            border-radius: .25rem;
            color: #ffffff;
            text-align: center;
            line-height: .5rem;
            margin-left: 64%;
          }
          .item_four{
            color: #FC3357;
            font-size: .26rem;
            font-weight:500;
          }
        }
      }
    }
  }
  .replenish{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    .wel_info{
      width: 6.9rem;
      height: 4.6rem;
      border-radius: .16rem;
      position: absolute;
      top:3.9rem;
      left: 50%;
      margin-left: -3.45rem;
      background: #ffffff;
      .info_one{
        color: #333333;
        font-size: .32rem;
        margin: 0.49rem 0 0.2rem 0;
        text-align: center;
        font-weight:500;
      }
      .info_two{
        color: #FF2556;
        font-size: .26rem;
        text-align: center;
        font-weight:500;
      }
      input{
        outline: none;
        border: 1px solid #D6D6D6;
        width: 5.5rem;
        height: .74rem;
        position: absolute;
        top: 2.26rem;
        left: 50%;
        margin-left: -2.75rem;
        border-radius: .1rem;
        padding-left: .2rem;
      }
      .info_three{
        height: 0.7rem;
        position: absolute;
        top: 3.42rem;
        left: .92rem;
        span{
          display: inline-block;
          width: 1.9rem;
          height: .7rem;
          border-radius: .35rem;
          text-align: center;
          line-height: .7rem;
          font-size: .28rem;
        }
        span:first-child{
          color: #898787;
          background: #F0F0F0;
          margin-right: 1.2rem;
        }
        span:last-child{
          color: #ffffff;
          background: #FF2556;
        }
      }
    }
  }
}
</style>
