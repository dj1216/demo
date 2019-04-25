<template>
  <div id="logistics">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      查看物流
    </x-header>
    <div class="logistics-body">
      <div class="body-one">
        <img :src="goods.thumb || './static/img/under/111.png'" alt="">
        <div class="details">
          <p>物流状态：<span style="color: #fc3357" v-if="info.orderStatus === '1'">派送中</span><span style="color: #fc3357" v-if="info.orderStatus === '2'">已完成</span></p>
          <p>承运公司：{{info.expressName}}</p>
          <p>订单号：{{info.orderSn}}</p>
        </div>
      </div>
      <div class="body-two">
        <div class="two-title">
          <p>物流跟踪</p>
          <span v-if="!list && url" @click="jumpTo({name: 'mallCheckLogis', query: {url: url}})">查看物流</span>
        </div>
        <div class="box" v-if="list">
          <flow  orientation="vertical" class="flow-info">
           <div v-for="(item,i) in list" :key="i">
             <flow-state :is-done="i === 0 || i === 1"  class="item"></flow-state>
             <div class="flow-time">
               <span>{{item.time}}</span>
             </div>
             <div class="flow-details">
               <p>{{item.context}}</p>
             </div>
             <flow-line :is-done="i === 0" style="height: 1.8rem;margin-left: 3px;" v-if="i < list.length - 1"></flow-line>
           </div>
          </flow>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './my.less'
import { Flow, FlowState, FlowLine } from 'vux'
import * as apiHttp from '../../../api/index'
export default {
  name: 'logistics',
  data () {
    return {
      time: {
        start: '09-17',
        middle: '10-01'
      },
      info: {},
      list: {},
      goods: {},
      url: null
    }
  },
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  mounted () {
    // 删除
    apiHttp.logisticsInfo(this.$route.query.orderSn).then(res => {
      this.info = res.data.info
      this.url = res.data.url
      this.goods = res.data.info.goods
      this.list = res.data.info.list
    })
  }
}
</script>

<style scoped lang="less">

</style>
