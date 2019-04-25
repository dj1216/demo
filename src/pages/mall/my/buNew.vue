<template>
  <div class="buNew_main">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      补交资料
    </x-header>
    <div class="header" style="margin-top:1rem;">
      <div class="buNew_list">
        <span>商家信息</span>
        <p>{{obj.shopInfo ? obj.shopInfo.title : '暂无地址信息'}}</p>
      </div>
      <div class="buNew_list">
        <span>商家地址</span>
        <p>{{obj.shopInfo ? obj.shopInfo.province + obj.shopInfo.city + obj.shopInfo.district + obj.shopInfo.address : '暂无地址信息'}}</p>
      </div>
      <div class="buNew_list">
        <span>订单号</span>
        <p>{{obj.orderSn ? obj.orderSn : '暂无订单信息'}}</p>
      </div>
      <div class="buNew_list red">
        <span>退款金额</span>
        <p>￥{{obj.returnOrder ? obj.returnOrder.returnPrice : '0'}}</p>
      </div>
    </div>
    <div class="input_box">
      <div class="item">
        <p>快递公司：</p>
        <input type="text" placeholder="请输入快递公司" v-model="express">
      </div>
      <div class="item">
        <p>快递单号：</p>
        <input type="text" placeholder="请输入快递单号" v-model="expressNo">
      </div>
    </div>
    <div class="confirm" @click="submit()">
      <button>提交</button>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import * as api from '../../../api/index'
  export default {
    name: 'buNew',
    data () {
      return {
        express: '',
        expressNo: '',
        obj: {}
      }
    },
    mounted: function () {
      api.returnInfo(this.$route.query.orderSn).then(response => {
        if (response.code === 0) {
          this.obj = response.data
        }
      })
    },
    components: {
      XHeader
    },
    methods: {
      submit () {
        api.returnInfoTu('save', this.express, this.expressNo, this.obj.orderSn).then(response => {
          if (response.code === 0) {
            this.goBack()
            this.$vux.toast.text('提交申请成功')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
