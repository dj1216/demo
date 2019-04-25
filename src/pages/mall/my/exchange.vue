<template>
  <div id="exchange">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      退款申请
    </x-header>
    <div class="refund exchange_box">
      <div class="listBox" v-for="(item,index) in list" :key="index">
        <div class="left" @click="handCheck(index)">
          <img :src="item.check ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
        </div>
        <div class="refund-one">
          <img v-lazy="item.thumb" alt="">
          <div class="details">
            <p>{{item.goodsName}}</p>
            <div>
              <span>{{item.goodsField}}</span>
            </div>
            <div class="num_box" style="margin-top:0.1rem;">
              <span>￥{{item.goodsPrice}}</span>
              <x-number button-style="round" :min="1" :value="item.goodsNum"  v-model="item.goodsNum" :max="item.max" class="right-num" @on-change="changeNumL"></x-number>
            </div>
          </div>
        </div>
      </div >
      <div class="refund-two">
        <div class="item">
          <p>退款原因</p>
          <span @click="show=true">{{text}}<img v-if="text == '请选择'" style="width: 10%;margin-left: .1rem;" src="../../../assets/mall/img/my/left.png" alt=""></span>
        </div>
        <div class="item">
          <p>退款类型</p>
          <span @click="show1=true">{{text1.title}}<img v-if="text1.title == '请选择'" style="width: 10%;margin-left: .1rem;" src="../../../assets/mall/img/my/left.png" alt=""></span>
        </div>
        <div class="item" style="border:none">
          <p>退款金额</p>
          <span style="color: #fc3357">￥{{allMary}}</span>
        </div>
        <div class="item">
          <span style="font-size: .26rem">最多￥{{obj.order ?obj.order.payPrice : ''}}，包含发货运费￥0.00</span>
        </div>
        <div class="item">
          <p>退款说明：</p>
          <input type="text" placeholder="（选填）" v-model="info">
        </div>
        <div class="item" style="height:2rem;">
          <img src="../../../assets/mall/img/my/1.png" alt="" style="width: 19%;" @click="showPhoto = true" v-if="phones.length < 5">
          <div v-for="(item,i) in phones" :key="i" style="position: relative">
            <img :src="item" alt="" style="width:1.1rem;height: 1.1rem;" @click="look(phones, i)">
            <img style="width: 23%;position: absolute;top: -.15rem;right: -.2rem;" src="../../../assets/mall/img/del0.png" alt="" @click="deleteImg(i)">
          </div>
        </div>
      </div>
      <div class="confirm" @click="submit()">
        <button>提交</button>
      </div>
    </div>
    <confirm
      v-model="deleteImg1"
      :close-on-confirm="false"
      @on-confirm="delConfirm">
      <p style="text-align:center;">您确定要删除该图片吗？</p>
    </confirm>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="refund-foot">
          <div class="title">
            <span>选择退款原因</span>
          </div>
          <div class="list-item1" v-for="(item,index) in obj.returnInfo"  :key="index" @click="handChange(index)">
            <p>{{item}}</p>
            <div class="checkbox">
              <img :src="active == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
            </div>
          </div>
          <div class="confirm" style="margin: .5rem 8% 0;" @click="confirm">
            <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;">确定</button>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show1">
        <div class="refund-foot">
          <div class="title">
            <span>选择退款类型</span>
          </div>
          <div class="list-item1" v-for="(item,index) in obj.priceStatus" :key="index"  @click="handChange1(index)">
            <p>{{item.title}}</p>
            <div class="checkbox">
              <img :src="active1 == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
            </div>
          </div>
          <div class="confirm" style="margin: .5rem 8% 0;" @click="confirm1">
            <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;">确定</button>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="imgs" ref="previewer"></previewer>
    </div>
    <actionsheet v-model="showPhoto" :menus="menus"  show-cancel @on-click-menu="click"></actionsheet>
  </div>
</template>

<script>
import './my.less'
import {Popup, XNumber, Actionsheet, Confirm, Previewer, TransferDomDirective as TransferDom, XDialog} from 'vux'
import * as apiHttp from '../../../api/index'
import Vue from 'vue'
export default {
  name: 'exchange',
  components: {
    XNumber,
    Actionsheet,
    Confirm,
    Previewer,
    XDialog,
    Popup
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      deleteImg1: false,
      index: null,
      menus: {
        menu1: '从相册选择一张',
        menu2: '拍照'
      },
      showPhoto: false,
      show: false,
      show1: false,
      showImgMobel: false,
      imgs: [],
      active: 0,
      active1: 0,
      text: '请选择',
      text1: {title: '请选择'},
      check: true,
      goodsNum: 1,
      obj: {},
      list: [],
      allMary: 0,
      phones: [],
      info: '',
      expressNo: '',
      express: ''
    }
  },
  mounted: function () {
    apiHttp.returnInfo(this.$route.query.orderSn).then(response => {
      if (response.code === 0) {
        this.obj = response.data
        this.list = response.data.goodsList
        this.allMary = response.data.order.payPrice
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].check = true
          this.list[i].goodsNum = parseInt(this.list[i].goodsNum)
          this.list[i].max = parseInt(this.list[i].goodsNum)
        }
      }
    })
  },
  methods: {
    // 删除上传的图片
    deleteImg (i) {
      this.deleteImg1 = true
      this.index = i
    },
    // 确认删除图片
    delConfirm () {
      this.phones.splice(this.index, 1)
      this.deleteImg1 = false
    },
    // 拍照 上传照片
    click (key) {
      console.log(key)
      if (key === 'menu1') {
        this.galleryImg()
      } else {
        this.captureImage()
      }
    },
    // 从相册中选取图片
    galleryImg () {
      let This = this
      let apiIn = window.api
      apiIn.getPicture({
        sourceType: 'album',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true,
        targetWidth: 100,
        targetHeight: 100
      }, function (ret, err) {
        if (ret) {
          This.phones.push(ret.base64Data)
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 拍照
    captureImage () {
      let This = this
      api.getPicture({
        sourceType: 'camera',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true,
        targetWidth: 100,
        targetHeight: 100
      }, function (ret, err) {
        if (ret) {
          This.phones.push(ret.base64Data)
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 上传图片完
    // 点击显示模态框图片
    look (item, index) {
      this.imgs = []
      for (let i = 0; i < item.length; i++) {
        let obj = {
          src: item[i]
        }
        this.imgs.push(obj)
      }
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
      })
    },
    refund () {
      this.show = true
    },
    handChange (key) {
      this.active = key
    },
    handChange1 (key) {
      this.active1 = key
    },
    handCheck (i) {
      this.list[i].check = !this.list[i].check
      this.getAllMary()
      Vue.set(this.list, i, this.list[i])
    },
    submit () {
      if (this.text === '请选择') {
        return this.$vux.toast.text('请选择退款原因')
      }
      if (this.text1.title === '请选择') {
        return this.$vux.toast.text('请选择退款类型')
      }
      let arr = []
      let am = 0
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].check) {
          arr[am] = {}
          console.log(this.list[i].goodsId)
          arr[am].goodsId = this.list[i].goodsId
          arr[am].goodsNum = this.list[i].goodsNum
          arr[am].attrId = this.list[i].attrId
          am++
        }
      }
      apiHttp.submitInfo('save', '', this.obj.orderSn, this.text + ',' + this.info, this.allMary, this.text1.id, arr, this.phones, this.express, this.expressNo).then(response => {
        if (response.code === 0) {
          this.$vux.toast.text('提交成功')
          this.goBack()
        }
      })
    },
    changeNumL () {
      this.getAllMary()
    },
    getAllMary () {
      this.allMary = 0
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].check === true) {
          this.allMary += Number(this.list[i].goodsPrice) * Number(this.list[i].goodsNum)
        }
        // console.log(this.allMary)
      }
    },
    confirm () {
      this.text = this.obj.returnInfo[this.active]
      this.show = false
    },
    confirm1 () {
      this.show1 = false
      this.text1 = this.obj.priceStatus[this.active1]
    }
  }

}
</script>

<style scoped lang="less">


</style>
