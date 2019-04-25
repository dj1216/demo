<template>
  <div class="unser-cancel">
    <x-header
      slot="header"
      :left-options="{showBack: false}">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      商家核销
    </x-header>
    <div class="yhj-list">
      <div class="coupon-item">
        <img src="../../../assets/mall/img/under/yhj-bg.png" alt="">
        <div class="item-text">
          <div>
            <p>{{info.title}}</p>
            <span>店铺优惠券</span>
          </div>
          <div>
            <p>{{info.descs}}</p>
            <span v-if="parseInt(info.starttime) > 0 && parseInt(info.endtime) > 0">有效期：{{parseInt(info.starttime) | formatDate}}-{{parseInt(info.endtime) | formatDate}}</span>
          </div>
        </div>
      </div>
      <div class="cancel-confrim" @click="handleCancel()">
        <span>确定核销</span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import {formatDate} from '../../../plugin/data'
  export default {
    name: 'underCancel.vue',
    data () {
      return {
        info: {}
      }
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy.MM.dd')
      }
    },
    mounted () {
      apiHttp.underYhjQrcodeSecc(this.$route.query.spid, this.$route.query.id).then(res => {
        if (res.code === 0) {
          this.info = res.data.info
        }
      })
    },
    methods: {
      handleCancel () {
        apiHttp.underYhjQrcodeCon(this.$route.query.spid, this.$route.query.id, 'save').then(res => {
          if (res.code === 0) {
            this.$vux.toast.text(res.msg)
            this.$router.push({name: 'mallUnderdetail', query: {spid: this.$route.query.spid}})
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.unser-cancel{
  background: #ffffff;
  height: 100%;
  .yhj-list{
    padding: 1rem .3rem 0;
    margin-top: @margin-top;
    .coupon-item{
      height: 1.8rem;
      position: relative;
      img{
        width:100%;
        margin-top: .12rem;
      }
      .item-text{
        position: absolute;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        div{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          color: @main-red-color;
          font-size: @font-nomal;
        }
        div:first-child{
          width: 2.8rem;
        }
        div:last-child{
          width: 4.2rem;
          p{
            font-size: @font-small;
          }
          span{
            color: @font-light-color;
          }
        }
      }
    }
    .cancel-confrim{
      background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);
      border-radius: 20px;
      text-align: center;
      color: #fff;
      height: .8rem;
      margin: 1rem 5% 0;
      width: 90%;
      span{
        display: inline-block;
        line-height: 0.8rem;
        margin-left: 0;
        font-size:@font-more-big;
      }
    }
  }
}
</style>
