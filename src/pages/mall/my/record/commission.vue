<template>
  <div class="balance_box">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的{{titleInfo.credit3}}
      <a @click="jumpTo({name:'mallCommissionList'})" slot="right"><i class="iconfont icon-iconfont02"></i></a>
    </x-header>
    <div class="content">
      <div class="header">
        <table></table>
        <p>账户{{titleInfo.credit3}}（元）</p>
        <h4>
          <span>￥</span>{{cmInfo.price}}
        </h4>
      </div>
      <div class="count">
        <div class="box"  @click="jumpTo({name:'mallYuWithdraw'})" v-if="cmInfo.withdraw === 1">
          <div class="div1">
            <img src="../../../../assets/img/balance/tixian.png" alt="">
            <span>提现</span>
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
import * as utils from '../../../../utils'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      cmInfo: {},
      titleInfo: utils.storage.get('titleInfo')
    }
  },
  mounted () {
    // 删除
    apiHttp.commissionInfo().then(res => {
      if (res.code === 0) {
        this.cmInfo = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
