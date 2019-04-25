<template>
  <div id="apply">
    <x-header
      slot="header"
      :left-options="{showBack: false}" style="position: absolute">
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      申请商家
    </x-header>

    <div class="apply-body">
      <div v-if="titlePage">
        <div v-if="!underwayShow && !succeedShow && !failedShow" style="background: #ffffff">
          <div class="item">
            <p>商家名称：</p>
            <input type="text" placeholder="请输入商家名称" v-model="applyInfo.shopName">
          </div>
          <div class="item">
            <p>商家模型：</p>
            <span @click="show1 = true">{{text1}}<img v-if="text1 == '请选择'" style="width: 10%;margin-left: .1rem;" src="../../../assets/mall/img/my/left.png" alt=""></span>
          </div>
          <div class="item">
            <p>商家分类：</p>
            <span @click="show = true">{{text}}<img v-if="text == '请选择'" style="width: 10%;margin-left: .1rem;" src="../../../assets/mall/img/my/left.png" alt=""></span>
          </div>
          <div class="item">
            <p>姓名：</p>
            <input type="text" placeholder="请输入姓名" v-model="applyInfo.userName">
          </div>
          <div class="item">
            <p>身份证号：</p>
            <input type="text" placeholder="请输入身份证号" v-model="applyInfo.idNumber">
          </div>
          <div class="item">
            <p>电话：</p>
            <input type="text" placeholder="请输入电话" v-model="applyInfo.userPhone">
          </div>
          <div class="item">
            <p>发货地址：</p>
            <x-address @on-hide="logHide" @on-show="logShow" title="" v-model="value" :list="addressData"
                       @on-shadow-change="onShadowChange" placeholder="点击选择" :show.sync="showAddress">
            </x-address>
          </div>
          <div class="one" style="border:none">
            <span>详细地址：</span>
          </div>
          <div class="two">
            <textarea name="site" v-model="address" id="" cols="38" rows="3" placeholder="街道、街牌号等"></textarea>
          </div>

          <div class="uploadingLogo">
            <p>请上传店铺logo：</p>
            <img src="../../../assets/mall/img/shop/1.png" alt="" @click="showPhoto = true" v-if="!phone">
            <div style="position: relative" v-if="phone">
              <img :src="phone" alt="" style="width:1.87rem;height: 1.87rem;" @click="showToast = true">
              <img style="width: .3rem;height:.3rem;position: absolute;top: -.15rem;right: -.2rem;" src="../../../assets/mall/img/del0.png" alt="" @click="deleteImg()">
            </div>
          </div>
          <div class="uploadingLogo">
            <p>请上传手持身份证照：</p>
            <img src="../../../assets/mall/img/shop/1.png" alt="" @click="showIdNumberPhone = true" v-if="!idNumberPhone">
            <div style="position: relative" v-if="idNumberPhone">
              <img :src="idNumberPhone" alt="" style="width:3.33rem;height: 1.87rem;" @click="showIdNumberToast = true">
              <img style="width: .3rem;height:.3rem;position: absolute;top: -.15rem;right: -.2rem;" src="../../../assets/mall/img/del0.png" alt="" @click="deleteIdNumberImg()">
            </div>
          </div>
          <div class="confirm1" @click="applyConfirm">
            <button>确认申请</button>
          </div>
        </div>
        <div v-if="underwayShow" style="margin-top: 40%">
          <img src="../../../assets/mall/img/my/jinxing.png" alt="" style="width: 30%;margin-left: 35%;">
          <p style="text-align: center">您的申请已提交，请耐心等待！</p>
        </div>
        <div v-if="succeedShow" style="margin-top: 40%">
          <img src="../../../assets/mall/img/my/cheng.png" alt="" style="width: 30%;margin-left: 35%;">
          <p style="text-align: center">您的申请已通过，请重新登录！</p>
        </div>
        <div v-if="failedShow" class="apply-failed">
          <div>
            <img src="../../../assets/mall/img/my/failed.png" alt="">
            <p>对不起！您的申请没有通过</p>
          </div>
          <div>
            <span>失败原因：</span>
            <p>{{applyInfo1.applyfor.info}}</p>
          </div>
          <div class="confirm1" @click="failedShow = false">
            <button>重新申请</button>
          </div>
          <div class="confirm1" @click="jumpTo({name: 'mallMy'})">
            <button style="margin-top: -14px;background: #a1a1a1;">取消</button>
          </div>
        </div>
      </div>
    </div>

    <confirm
      v-model="deleteImg1"
      :close-on-confirm="false"
      @on-confirm="delConfirm">
      <p style="text-align:center;">您确定要删除logo图片吗？</p>
    </confirm>
    <confirm
      v-model="deleteIdNumberImg1"
      :close-on-confirm="false"
      @on-confirm="delIdNumberConfirm">
      <p style="text-align:center;">您确定要删除手持身份证图片吗？</p>
    </confirm>
    <div v-transfer-dom>
      <x-dialog v-model = "showToast">
        <div>
          <img :src="phone" style="max-width:100%;width: 5rem;height: 5rem;margin: .5rem 0">
        </div>
        <div @click="showToast = false">
          <img src="../../../assets/mall/img/del0.png" alt="">
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model = "showIdNumberToast">
        <div>
          <img :src="idNumberPhone" style="max-width:100%;width: 5rem;height: 5rem;margin: .5rem 0">
        </div>
        <div @click="showIdNumberToast = false">
          <img src="../../../assets/mall/img/del0.png" alt="">
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="refund-foot">
          <div class="title">
            <span>选择商品分类</span>
          </div>
          <div class="list" v-for="(item,index) in category" :key="index" @click="handChange(index,item)">
            <p>{{item.title}}</p>
            <div class="checkbox">
              <img :src="active == index ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
            </div>
          </div>
          <div class="confirm1" @click="confirm">
            <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;margin-top: .5rem;">确定</button>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show1">
        <div class="refund-foot">
          <div class="title">
            <span>选择商品模型</span>
          </div>
          <div class="list" v-for="(item,i) in modelInfo" @click="handChange1(i,item)" :key="'isUpDown'+i">
            <p>{{item.title}}</p>
            <div class="checkbox">
              <img :src="active1 == i ? './static/libs/img/active.png' : './static/libs/img/active_no.png'" alt="">
            </div>
          </div>
          <div class="confirm1" @click="confirm1">
            <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;margin-top: .5rem;">确定</button>
          </div>
        </div>
      </popup>
    </div>
    <actionsheet v-model="showPhoto" :menus="menus"  show-cancel @on-click-menu="click"></actionsheet>
    <actionsheet v-model="showIdNumberPhone" :menus="menus"  show-cancel @on-click-menu="clickIdNumber"></actionsheet>
  </div>
</template>

<script>
import './shops.less'
import { XHeader, XAddress, ChinaAddressV4Data, Popup, Previewer, Actionsheet, TransferDomDirective as TransferDom, Confirm, XDialog } from 'vux'
import * as apiHttp from '../../../api/index'
import address from '../../../plugin/address'
export default {
  name: 'applyShop',
  directives: {
    TransferDom
  },
  data () {
    return {
      menus: {
        menu1: '从相册选择一张',
        menu2: '拍照'
      },
      showPhoto: false,
      showIdNumberPhone: false,
      applyInfo: {
        shopName: null,
        userName: null,
        userPhone: null,
        idNumber: null
      },
      value: [],
      address: '',
      addressAll: [],
      addressData: address,
      showAddress: false,
      text: '请选择',
      text1: '请选择',
      cid: null,
      show: false,
      show1: false,
      active: null,
      active1: null,
      category: {},
      phone: '',
      idNumberPhone: '',
      applyInfo1: {},
      deleteImg1: false,
      deleteIdNumberImg1: false,
      showToast: false,
      showIdNumberToast: false,
      succeedShow: false,
      failedShow: false,
      underwayShow: false,
      titlePage: false,
      modelInfo: {},
      model: null
    }
  },
  components: {
    XHeader,
    XAddress,
    ChinaAddressV4Data,
    Popup,
    Previewer,
    Actionsheet,
    Confirm,
    XDialog
  },
  mounted () {
    // 删除
    apiHttp.applyShop().then(res => {
      if (res.code === 0) {
        this.applyInfo1 = res.data
        this.titlePage = true
        this.category = res.data.category
        this.modelInfo = res.data.modelInfo
        if (this.applyInfo1.applyfor.status === '1') {
          this.underwayShow = true
        } else if (this.applyInfo1.applyfor.status === '2') {
          this.succeedShow = true
        } else if (this.applyInfo1.applyfor.status === '9') {
          this.failedShow = true
        }
      }
    })
  },
  methods: {
    doShowAddress () {
      this.showAddress = true
      setTimeout(() => {
        this.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      this.addressAll = names
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    handChange (index, val) {
      this.active = index
      this.text = val.title
      this.cid = val.id
    },
    handChange1 (index, item) {
      this.active1 = index
      this.model = item.model
      this.text1 = item.title
      apiHttp.applyShopFei(this.model).then(res => {
        this.category = res.data.category
      })

    },
    confirm () {
      this.show = false
    },
    confirm1 () {
      this.show1 = false
    },
    // 拍照 上传logo照片
    click (key) {
      console.log(key)
      if (key === 'menu1') {
        this.galleryImg()
      } else {
        this.captureImage()
      }
    },
    // 拍照 上传手持身份证照片
    clickIdNumber (key) {
      if (key === 'menu1') {
        this.galleryIdNumberImg()
      } else {
        this.captureIdNumberImage()
      }
    },
    // 从相册中选取logo图片
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
           This.phone = ret.base64Data
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 从相册中选取手持身份证图片
    galleryIdNumberImg () {
      let This = this
      let apiIn = window.api
      apiIn.getPicture({
        sourceType: 'album',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true,
        targetWidth: 178,
        targetHeight: 100
      }, function (ret, err) {
        if (ret) {
           This.idNumberPhone = ret.base64Data
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 拍照logo
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
          This.phone = ret.base64Data
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 拍照手持身份证照片
    captureIdNumberImage () {
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
          This.idNumberPhone = ret.base64Data
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
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
    //删除上传的logo图片
    deleteImg () {
      this.deleteImg1 = true
    },
    //删除上传的手持身份证图片
    deleteIdNumberImg () {
      this.deleteIdNumberImg1 = true
    },
    //确认删除logo图片
    delConfirm () {
      this.phone = ''
      this.deleteImg1 = false
    },
    //确认删除手持身份证图片
    delIdNumberConfirm () {
      this.idNumberPhone = ''
      this.deleteIdNumberImg1 = false
    },
    applyConfirm () {
      if (!this.applyInfo.shopName) {
        this.$vux.toast.text('商家名称不能为空')
        return
      }
      if (!this.applyInfo.userName) {
        this.$vux.toast.text('用户名不能为空')
        return
      }
      if (!this.applyInfo.idNumber) {
        this.$vux.toast.text('身份证号不能为空')
        return
      }
      if (!this.applyInfo.userPhone) {
        this.$vux.toast.text('手机号不能为空')
        return
      }
      let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
      if (!reg.test(this.applyInfo.userPhone)) {
        this.$vux.toast.text('手机号格式不对')
        return
      }
      if (!this.cid) {
        this.$vux.toast.text('商家分类不能为空')
        return
      }
      if (this.value.length === 0) {
        this.$vux.toast.text('请选择地址')
        return
      }
      if (this.address.length === 0) {
        this.$vux.toast.text('请输入详细地址')
        return
      }
      if (!this.model) {
        this.$vux.toast.text('请输入商家模型')
        return
      }
      apiHttp.applyConfirm('save', this.applyInfo.shopName, this.cid, this.model, this.applyInfo.userName, this.applyInfo.idNumber, this.applyInfo.userPhone, this.addressAll[0], this.addressAll[1], this.addressAll[2], this.address, this.phone, this.idNumberPhone).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'mallMy'})
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/mall/style/_Variables";
.vux-cell-box:not(:first-child):before{
  border:none;
}
.apply-failed{
  margin-top: .1rem;
  div:first-child{
    background: #ffffff;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid @border-color;
    img{
      width: 30%;
      margin-bottom: .1rem;
    }
    p{
      color: @font-main-color;
      font-size: @font-big;
    }
  }
  div:nth-child(2){
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.2rem 0.3rem;
    span{
      color: @font-main-color;
      font-size: @font-big;
    }
    p{
      width: 75%;
      color: @font-light-color;
      font-size: @font-nomal;
    }
  }
  .confirm1{
    background: none;
  }
}
</style>
