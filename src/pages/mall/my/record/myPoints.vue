<template>
  <div class="balance_box myPoints">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的{{titleInfo.credit1}}
      <a @click="jumpTo({name:'mallMyPointsList'})" slot="right"><i class="iconfont icon-iconfont02"></i></a>
    </x-header>
    <div class="content" v-if="isShow">
      <div class="header">
        <table></table>
        <p>总{{titleInfo.credit1}}</p>
        <h4>
          <img src="../../../../assets/img/balance/jifen.png" alt="">
          {{jifen.price}}
        </h4>
      </div>
      <div class="count">
        <div class="box"  @click="jumpTo({name: 'mallDonation', query: {credittype: 'credit1'}})" v-if="jifen.attorn === 1">
          <div class="div1">
            <img src="../../../../assets/img/balance/tixian.png" alt="">
            <span>转赠</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <div class="box"  @click="jumpTo({name: 'mallPointsYue'})" v-if="jifen.change === 1">
          <div class="div1">
            <img src="../../../../assets/img/balance/tixian.png" alt="">
            <span>{{titleInfo.credit1}}转余额</span>
          </div>
          <div class="div2">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import * as apiHttp from '../../../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../../../utils'
export default {
  name: 'balance',
  components: {
    XHeader,
    MescrollVue
  },
  data () {
    return {
      jifen: {},
      typesInfo: {},
      titleInfo: utils.storage.get('titleInfo'),
      isShow: false
    }
  },
  mounted () {
    // 删除
    apiHttp.jifenInfo().then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.jifen = res.data
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="less">

</style>
