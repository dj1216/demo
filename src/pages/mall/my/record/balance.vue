<template>
  <div class="balance_box">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      我的{{titleInfo.credit2}}
      <a @click="jumpTo({name:'mallYueList'})" slot="right"><i class="iconfont icon-iconfont02"></i></a>
    </x-header>
    <div class="content" v-if="isShow">
        <div class="header">
          <table></table>
            <p>账户{{titleInfo.credit2}}（元）</p>
            <h4>
              <span>￥</span>{{yueInfo.price}}
            </h4>
        </div>
        <div class="count">
          <div class="box"  @click="jumpTo({name:'mallYuePayment'})">
            <div class="div1">
              <img src="../../../../assets/img/balance/chongzhi.png" alt="">
              <span>充值</span>
            </div>
            <div class="div2">
              <i class="iconfont icon-right"></i>
            </div>
          </div>
          <div class="box"  @click="jumpTo({name:'mallYuWithdraw'})" v-if="yueInfo.withdraw === 1">
            <div class="div1">
              <img src="../../../../assets/img/balance/tixian.png" alt="">
              <span>提现</span>
            </div>
            <div class="div2">
              <i class="iconfont icon-right"></i>
            </div>
          </div>
          <div class="box" v-if="yueInfo.attorn === 1" @click="jumpTo({name: 'mallDonation', query: {credittype: 'credit2'}})">
            <div class="div1">
              <img src="../../../../assets/mall/img/my/zhuanzeng.png" alt="">
              <span>转赠</span>
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
  name: 'balance',
  components: {
    XHeader
  },
  data () {
    return {
      yueInfo: {},
      titleInfo: utils.storage.get('titleInfo'),
      isShow: false
    }
  },
  mounted () {
    // 删除
    apiHttp.yueInfo().then(res => {
      if (res.code === 0) {
        this.isShow = true
        this.yueInfo = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
