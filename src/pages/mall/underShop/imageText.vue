<template>
  <div class="image-text" v-if="isShow">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">图文详情</a>
    </x-header>
    <div class="mescrollBox">
      <div class="image-body">
        <div class="text-title" v-if="detail.info" v-html="detail.info">
        </div>
        <div class="buy-notices" v-if="detail.noticeInfo" v-html="detail.noticeInfo">
        </div>
      </div>
    </div>
    <div class="goPay" @click="jumpTo({name: 'mallUnderGoodsBuy', query: {goodsId: data.goodsId}})">
      <div>
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  import './underLess.less'
  import './detail.less'
  import { Swiper,SwiperItem } from 'vux'
  import * as apiHttp from '../../../api/index'
  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        slides: ['./static/img/under/11.png', './static/img/under/12.png'],
        index: 0,
        data: {},
        detail: {},
        equityInfo: {},
        isShow: false
      }
    },
    mounted () {
      apiHttp.underShopGoodsDetails(this.$route.query.goodsId).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data
          this.equityInfo = res.data.equityInfo
          this.detail = res.data.detail
        }
      })
    },
    methods: {
      onIndexChange (index) {
        this.index = index
      }
    }
  }
</script>

<style lang="less">
@import '../../../assets/mall/style/_Variables';
.image-text{
  .mescrollBox{
    width: 100%;
    position: absolute;
    top: @margin-top;
    bottom: 1.2rem;
    height: auto !important;
  }
}
</style>
