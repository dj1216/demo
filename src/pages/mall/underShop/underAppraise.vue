<template>
  <div id="estimate">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      评价
    </x-header>
    <confirm
      v-model="deleteImg1"
      :close-on-confirm="false"
      @on-confirm="delConfirm">
      <p style="text-align:center;">您确定要删除该图片吗？</p>
    </confirm>
    <div v-for="(item,i) in list" :key="i">
      <div class="estimate-body">
        <div class="refund-one" style="padding: .1rem 0;">
          <img :src="item.thumb || './static/img/under/111.png'" alt="">
          <div class="details" style="display: flex;flex-direction: column;justify-content: center;">
            <p>{{item.goodsName}}</p>
            <div>
              <span>白色 均码</span>
              <span style="margin-left: .5rem;">x{{item.goodsNum}}</span>
            </div>
          </div>
        </div>
        <div class="estimate-info">
          <textarea name="info" placeholder="宝贝满足你的期待吗？说说你的心得，分享给想买的小伙伴吧。" v-model="item.module"></textarea>
          <!--<p>{{info.text.length}}/500</p>-->
          <div>
            <img src="../../../assets/mall/img/my/1.png" alt="" style="width: 19%;" @click="show = true" v-if="phones.length < 5">
            <div v-for="(item,i) in phones" :key="i" style="position: relative">
              <img :src="item" alt="" style="width:1.1rem;height: 1.1rem;" @click="look(phones, i)">
              <img style="width: 23%;position: absolute;top: -.35rem;right: -.2rem;" src="../../../assets/mall/img/del0.png" alt="" @click="deleteImg(i)">
            </div>
            <!--<img v-for="(item,index) in phones" :key="index" :src="item" alt="" style="width:19%;height: 65%;margin-left:0.2rem;"  @click="look(phones, index)">-->
          </div>
        </div>
        <div class="info-foot">
          <div>
            <img :src="item.status == '3' ? './static/libs/img/haoping1.png' : './static/libs/img/haoping.png'" alt="" @click="selectFace(3,i)">
            <p :style="{'color' : item.status == '3' ? '#fc3357' : '#a1a1a1'}">好评</p>
          </div>
          <div>
            <img :src="item.status == '2' ? './static/libs/img/zhongping1.png' : './static/libs/img/zhongping.png'" alt="" @click="selectFace(2,i)">
            <p :style="{'color' : item.status == '2' ? '#fc3357' : '#a1a1a1'}">中评</p>
          </div>
          <div>
            <img :src="item.status == '1' ? './static/libs/img/chaping1.png' : './static/libs/img/chaping.png'" alt="" @click="selectFace(1,i)">
            <p :style="{'color' : item.status == '1' ? '#fc3357' : '#a1a1a1'}">差评</p>
          </div>
        </div>
      </div>
    </div>
    <div class="estimate-foot">
      <div class="foot-item">
        <p>描述相符</p>
        <div>
          <img v-for="i in [1,2,3,4,5]" :key="i" @click="setStar('desc',i)" :src="form.desc >= i? './static/libs/img/xing.png' : './static/libs/img/xing1.png'" alt="">
        </div>
      </div>
      <div class="foot-item">
        <p>物流服务</p>
        <div>
          <img v-for="i in [1,2,3,4,5]" :key="i" @click="setStar('express',i)" :src="form.express >= i? './static/libs/img/xing.png' : './static/libs/img/xing1.png'" alt="">
        </div>
      </div>
      <div class="foot-item">
        <p>服务态度</p>
        <div>
          <img v-for="i in [1,2,3,4,5]" :key="i" @click="setStar('serve',i)" :src="form.serve >= i? './static/libs/img/xing.png' : './static/libs/img/xing1.png'" alt="">
        </div>
      </div>
    </div>
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="click"></actionsheet>
    <div v-transfer-dom>
      <previewer :list="imgs" ref="previewer"></previewer>
    </div>
    <div class="confirm" style="margin: .5rem 8%;" @click="send">
      <button style="background: -webkit-linear-gradient(left, #fb2f74, #ff7e7e);border-radius: .8rem;">提交</button>
    </div>
  </div>
</template>

<script>
  import '../my/my.less'
  import { Actionsheet, XButton, Previewer, TransferDomDirective as TransferDom } from 'vux'
  export default {
    components: {
      Actionsheet,
      XButton,
      Previewer
    },
    data () {
      return {
        status: 0,
        form: {
          desc: 5,
          express: 5,
          serve: 5
        },
        info: {
          text: ''
        },
        show: false,
        menus: {
          menu1: '从相册选择一种',
          menu2: '拍照'
        },
        phones: [],
        list: [],
        list1: [],
        imgs: [],
        deleteImg1: false,
        index: null,
      }
    },
    directives: {
      TransferDom
    },
    mounted () {
      // 删除
      this.getList()
    },
    methods: {
      selectFace (val, i) {
        this.list[i].status = '' + val + ''
        console.log(this.list[i])
        this.list = this.list.concat()
      },
      setStar (type, i) {
        if (type === 'desc') {
          this.form.desc = i
        } else if (type === 'express') {
          this.form.express = i
        } else if (type === 'serve') {
          this.form.serve = i
        }
      },
      send () {
        // console.log('info:',this.info.text,'isGoods:',this.status,'isShops:',this.form)
        let dataInfo = []
        let arr = []
        for (let i = 0; i < this.list.length; i++) {
          arr[this.list[i].attrId] = {}
          arr[this.list[i].attrId].info = this.list[i].module
          arr[this.list[i].attrId].isGoods = this.list[i].status
          arr[this.list[i].attrId].isShops = this.form.desc + ',' + this.form.express + ',' + this.form.serve
          dataInfo[this.list[i].goodsId] = arr
          // dataInfo[this.list[i].id][this.list[i].attrId].info=this.list[i].module
          // dataInfo[this.list[i].id][this.list[i].attrId].isGoods=this.list[i].status
          // dataInfo[this.list[i].id][this.list[i].attrId].isShops=this.form.desc+','+this.form.express+','+this.form.serve
        }
        console.log(dataInfo)
        this.$http.post('/mall/order/discuss?i=1', {type: 'save', orderSn: this.$route.query.orderSn, dataInfo}).then(res => {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.push({name: 'mallUnderGoodsList'})
          }, 1000)
        })
      },
      getList () {
        this.$http.post('/mall/order/discuss?i=1', {orderSn: this.$route.query.orderSn}).then(res => {
          if (res.code === 0) {
            this.list = res.data.list
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].module = ''
              this.list[i].status = 3
            }
            console.log(this.list)
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      },
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
      //删除上传的图片
      deleteImg (i) {
        this.deleteImg1 = true
        this.index = i
      },
      //确认删除图片
      delConfirm () {
        this.phones.splice(this.index, 1)
        this.deleteImg1 = false
      }
    }

  }
</script>

<style scoped>

</style>
