<template>
  <div class="image-text" v-if="isShow">
    <x-header :left-options="{showBack: false}" class="collection-head" >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      <a  class="head-right">商家信息</a>
    </x-header>
    <div class="mescrollBox">
      <div class="image-body">
        <div class="text-title">
          <div class="title-one">{{data.title}}</div>
          <div v-html="data.info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../api/index'
  import './underLess.less'
  export default {
    data () {
      return {
        data: {},
        isShow: false
      }
    },
    mounted () {
      apiHttp.underShopsDetails(this.$route.query.spid).then(res => {
        if (res.code === 0) {
          this.isShow = true
          this.data = res.data.info
        }
      })
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
      bottom: 0;
      height: auto !important;
    }
  }
</style>
