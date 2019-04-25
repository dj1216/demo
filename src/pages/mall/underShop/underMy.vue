<template>
  <div class="under-my" v-if="isShow">
    <div class="under_head">
      <img :src="data.avatar || userInfo.avatar || './static/libs/img/touxiang.png'" alt="">
      <div>
        <p>{{data.mobile || '未设置'}}</p>
        <span>UID:{{data.uid}}</span>
      </div>
    </div>
    <div class="address1" @click="jumpTo({name:'mallShopCenter'})" v-show="shopInfo && shopInfo.status == 1 && info.isShop > 0">
      <div>
        <img src="../../../assets/mall/img/my/shop.png" alt="">
        <p v-if="shopInfo">{{shopInfo.title}}</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name:'mallApplyShop'})" v-show="info.isShop <= 0">
      <div>
        <img src="../../../assets/mall/img/my/shangjia.png" alt="">
        <p>商家申请</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name: 'mallMyCoupon'})">
      <div>
        <img src="../../../assets/mall/img/my/youhui.png" alt="">
        <p>我的优惠券</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name: 'mallMyClub'})">
      <div>
        <img src="../../../assets/mall/img/my/yuan.png" alt="">
        <p>我的会员卡</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name: 'mallUnderOrderList'})">
      <div>
        <img src="../../../assets/mall/img/under/u10.png" alt="">
        <p>线下订单</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name: 'mallUnderGoodsList'})">
      <div>
        <img src="../../../assets/mall/img/my/shopgoods.png" alt="">
        <p>线下商品订单</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name:'mallDistributor'})" v-show="!isDisUser && disUserInfo.type == 3">
      <div>
        <img src="../../../assets/mall/img/my/shangjia.png" alt="">
        <p>申请{{titleInfo.disUser || '分销商'}}</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
    <div class="address1" @click="jumpTo({name:'mallGrade'})" v-show="(isDisUser && isDisUser.status === '1') || disUserInfo.type == 0">
      <div>
        <img src="../../../assets/mall/img/my/link.png" alt="">
        <p>{{titleInfo.agent || '代理中心'}}</p>
      </div>
      <img src="../../../assets/mall/img/my/left.png" alt="">
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import * as utils from '../../../utils'
  export default {
    data () {
      return {
        info: {},
        userInfo: {},
        shopInfo: {},
        data: this.$store.state.user.userInfo,
        isShow: false,
        titleInfo: {},
        isDisUser: {},
        disUserInfo: {}
      }
    },
    mounted () {
      apiHttp.personInfo().then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.info = res.data
          this.userInfo = res.data.userInfo
          this.shopInfo = res.data.shopInfo
          this.titleInfo = res.data.titleInfo.alias
          utils.storage.set('titleInfo', this.titleInfo)
          this.isDisUser = res.data.isDisUser
          this.disUserInfo = res.data.disUserInfo
        }
      })
    },
    methods: {

    }

  }
</script>

<style lang="less">
@import "../../../assets/mall/style/_Variables";
.under-my{
  .under_head{
    width: 100%;
    height: 1.8rem;
    margin: .2rem 0;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 .3rem;
    box-sizing: border-box;
    img{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-right: .2rem;
    }
    div{
      p{
        font-size: @font-big;
        color: @font-main-color;
        font-weight: 600;
      }
      span{
        font-size: @font-nomal;
        color: @font-middle-color;
        display: block;
        width: 2rem;
        height: .4rem;
        background: @border-color;
        text-align: center;
        line-height: .4rem;
        border-radius: .2rem;
        margin-top: .1rem;
      }
    }
  }
 .address1{
   height: .9rem;
   div{
     p{
       font-size: .26rem;
     }
     img{
       width: 4vw;
     }
   }
   img{
     width: 2vw;
   }
 }
}
</style>
