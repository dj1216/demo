<template>
  <div class="donation payMent">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      转赠
      <a slot="right" @click="jumpTo({name: 'mallDonationList', query: {credittype: credittype}})"><i class="iconfont icon-iconfont02"></i></a>
    </x-header>
    <div class="donation-body content" v-if="isShow">
      <div class="body-one">
        <p>UID:</p>
        <input type="text" placeholder="请输入要搜索的uid" v-model="uid">
        <span @click="searchUid()">搜索</span>
      </div>
      <div class="body-two">
        <div v-if="show">
          <div class="two-item">
            <p>UID：</p>
            <span>{{userInfo.uid}}</span>
          </div>
          <div class="two-item">
            <p>昵称：</p>
            <span>{{userInfo.nickname || '未设置'}}</span>
          </div>
          <div class="two-item" v-if="userInfo.realname">
            <p>姓名：</p>
            <span>{{userInfo.realname}}</span>
          </div>
        </div>
        <div class="two-price">
          <div class="two-item">
            <p>转赠金额：</p>
            <input type="text" placeholder="请输入转赠金额" v-model="dtPrice">
          </div>
          <div>
            <span style="color: #fc3357" v-if="credittype === 'credit2'">￥{{dtInfo.credit2}}</span>
            <span style="color: #fc3357" v-if="credittype === 'credit1'">￥{{dtInfo.credit1}}</span>
            <span v-if="credittype === 'credit2'">当前可用余额：</span>
            <span v-if="credittype === 'credit1'">当前可用积分：</span>
          </div>
        </div>
      </div>
      <div class="btns" @click="confirmDt()">
        <div class="btn">确定转赠</div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import * as apiHttp from '../../../../api/index'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      dtInfo: {},
      uid: null,
      userInfo: {},
      dtPrice: null,
      credittype: this.$route.query.credittype,
      show: false,
      isShow: false
    }
  },
  mounted () {
    // 删除
    apiHttp.donationInfo(this.credittype).then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.dtInfo = res.data.userInfo
      }
    })
  },
  methods: {
    searchUid () {
      apiHttp.donationSearch(this.credittype, 'select', this.uid).then(res => {
        if (res.code === 0) {
          this.userInfo = res.data.user
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    confirmDt () {
      apiHttp.donationSub(this.credittype, 'save', this.uid, this.dtPrice).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'mallDonationList', query: {credittype: this.credittype}})
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/mall/style/_Variables";
.donation{
  .donation-body{
    margin-top: @margin-top;
    .body-one{
      height: 1.2rem;
      background: #ffffff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 .3rem;
      p{
        color: @font-main-color;
        font-size: @font-more-big;
      }
      input{
        outline: none;
        border: 0;
        width: 4.2rem;
        height: 0.6rem;
        background: #EEEEEE;
        border-radius: 5px;
        text-align: left;
        padding-left: .3rem;
      }
      span{
        width: 1.2rem;
        height: .6rem;
        border: 1px solid @main-red-color;
        border-radius: 17px;
        line-height: .6rem;
        text-align: center;
        color: @main-red-color;
        font-size:  @font-more-big;
      }
    }
    .body-two{
      padding: 0 .3rem;
      margin-top: .2rem;
      background: #ffffff;
      .two-item{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid @border-color;
        p{
          color: @font-light-color;
          font-size: @font-big;
        }
        span{
          color: @font-main-color;
          font-size: @font-big;
          margin-left: .3rem;
        }
        input{
          outline: none;
          border: 0;
          width: 5rem;
          height: 0.7rem;
          background: #EEEEEE;
          border-radius: 5px;
          text-align: left;
          padding-left: .3rem;
        }
      }
      .two-price{
        height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .two-item{
          border-bottom: 0;
          p{
            color: @font-main-color;
            font-size: @font-more-big;
          }
        }
        div{
          span{
            float: right;
            color: @font-light-color;
            font-size: @font-nomal;
          }
        }
      }
    }
  }
}
</style>
