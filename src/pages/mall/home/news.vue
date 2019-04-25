<template>
  <div class="news_main">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        消息
      </x-header>
      <div class="tab">
        <div class="tab_box">
          <button-tab v-model="demo01">
            <button-tab-item @on-item-click="consoleIndex()">物流交易</button-tab-item>
            <button-tab-item @on-item-click="consoleIndex()">通知公告</button-tab-item>
          </button-tab>
        </div>
      </div>
    </div>
    <div class="news_content" v-show="demo01 == 1 ? true : false">
      <div v-if="showList1">
        <div style="margin-top: 40%;" v-if="list.length === 0">
          <img style="width: 40%;margin-left: 30%" src="../../../assets/mall/img/kong.png" alt="">
        </div>
        <div class="news_li" v-for="(item,i) in list" :key="i" @click="jumpTo({name:'mallNewDetail',query:{id:item.id}})">
          <div class="left">
            <img src="../../../assets/mall/img/home/detail/detail3.png" alt="">
            <span>{{item.title}}</span>
          </div>
          <div class="right">{{formatDate(item.created_at)}}</div>
        </div>
      </div>
    </div>
    <div class="logistics_content" v-show="demo01 == 0 ? true : false">
      <div v-if="showList2">
        <div style="margin-top: 40%;" v-if="listIn.length === 0">
          <img style="width: 40%;margin-left: 30%" src="../../../assets/mall/img/kong.png" alt="">
          <p style="text-align: center">亲，你还没有物流交易哦！</p>
        </div>
        <div class="logistics_li" v-for="(item,i) in listIn" :key="i">
          <div class="logistics_status">
            <div class="left">
              {{item.title}}
            </div>
            <div class="right">
              {{formatDate(item.created_at)}}
            </div>
          </div>
          <div class="mail">
            <div class="left">
              <img :src="item.goodsList[0].thumb" alt="">
            </div>
            <div class="right">
              <div class="div1">
                {{item.goodsList[0].goodsName}}
              </div>
              <div class="div2">
                订单号：{{item.orderId}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ButtonTab, ButtonTabItem } from 'vux'
// import {formatDate} from '../../plugin/data'
import * as apiHttp from '../../../api/index'
export default {
  name: 'news',
  components: {
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      demo01: 0,
      list: [],
      listIn: [],
      showList1: false,
      showList2: false
    }
  },
  methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01)
    },
    getList () {
      this.$http.post('/mall/index/notice-list?i=1', {id: ''}).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.showList1 = true
          this.list = res.data.list
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    getListIn () {
      apiHttp.messageList().then(response => {
        if (response.code === 0) {
          this.showList2 = true
          this.listIn = response.data.list
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getList()
    this.getListIn()
  }
}
</script>

<style>

</style>
