<template>
  <div id="share">
    <div class="share_pitchOn">
      <div class="share_pitchOn_title">
        <p>选择图片</p>
        <span>已选<i :style="{color: $store.state.global.theme.mainColor}" >{{index}}</i>张</span>
      </div>
      <ul class="share_pitchOn_img">
        <li  v-for="(item, index) of imgs" :key="index" @click="optFor(item)" >
          <img v-lazy="item.src" alt=""  >
          <i class="iconfont icon-roundcheckfill"  v-if="item.selected" :style="{color: $store.state.global.theme.mainColor}" ></i>
          <i class="iconfont icon-roundcheckfill"   v-else></i>
        </li>
      </ul>
    </div>
    <div class="share_copy">
      <div class="share_copy_title">
        <p>分享文案</p>
        <span @click="onCopy(msg)" class="copyObj" :style="{color: $store.state.global.theme.mainColor,borderColor: $store.state.global.theme.mainColor}" >复制</span>
      </div>
      <div class="share_copy_con">
        <div class="title">
          <img src="../../assets/img/home/tblogo.png" alt="" v-if="Number(data.type) === 11">
          <img src="../../assets/img/home/tmlogo.png" alt="" v-else-if="Number(data.type) === 12">
          <img src="../../assets/img/home/jdlogo.png" alt="" v-if="Number(data.type) === 21">
          <img src="../../assets/img/home/pddlogo.png" alt="" v-else-if="Number(data.type) === 31">
          <p>{{data.title}}</p>
        </div>
        <div class="price">
          <p class="p1" :style="{color: $store.state.global.theme.mainColor}" >￥<span>{{data.coupon_price}}</span></p>
          <p class="p2">原价:&nbsp;&nbsp;<del>￥{{data.zk_final_price}}</del></p>
        </div>
        <div class="copy">
          <span></span>
          <p v-if="type ===0 || type ===1">复制这条信息,{{code}},打开手机淘宝即可查看</p>
          <p v-else>复制这条信息,{{code}},打开链接即可查看</p>
        </div>
      </div>
    </div>
    <div class="share_to">
      <h2>分享到</h2>
      <ul>
        <li @click="saveImg">
          <img src="../../assets/img/materials/bcdxc.png" alt="">
        </li>
        <li @click="moreShare">
          <img src="../../assets/img/home/goods/wechat.png" alt="">
        </li>
        <li @click="shareFri">
          <img src="../../assets/img/home/goods/friend_circle.png" alt="">
        </li>
        <li @click="moreShare">
          <img src="../../assets/img/home/goods/microblog.png" alt="">
        </li>
        <li @click="moreShare">
          <img src="../../assets/img/home/goods/qq.png" alt="">
        </li>
        <!--<li>-->
          <!--<img src="../../assets/img/home/goods/space.png" alt="">-->
        <!--</li>-->
      </ul>
    </div>
    <div v-transfer-dom class="preview">
      <previewer :list="imgs" ref="previewer" :options="options">
        <!--<img src="../../assets/img/home/goods/qq.png" alt="" slot="button-before" @click="moreShare">-->
        <!--<i class="iconfont icon-roundcheckfill" style="font-size: 30px;color: red;" slot="button-after"></i>-->
        <template slot="button-after">
          <!--<img src="../../assets/img/home/goods/qq.png" width="22" height="22"  @click.prevent.stop="removeImg" style="position: absolute; right: 50px;bottom: 4px">-->
          <span class="previewer-download-icon-box" style="position: absolute; right: 50px;bottom: 4px">
            <img src="../../assets/img/home/goods/qq.png" class="previewer-delete-icon" width="22" height="22"  @click.prevent.stop="removeImg">
          </span>
        </template>
      </previewer>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="shareBox">
        <div class="share">
          <div class="classBox">
            <div><img src="../../assets/img/materials/dt.png" alt="" @click="oneShare"><p>单图分享</p></div>
            <div><img src="../../assets/img/materials/dtfx.png" alt="" @click="moreShare"><p>多图分享</p></div>
            <div><img src="../../assets/img/auth/QQk.png" alt="" @click="saveImg"><p>保存到相册</p></div>
          </div>
          <img src="../../assets/img/my/close.png" alt="" @click="showToast = false" class="close">
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {XDialog, XCircle, TransferDomDirective as TransferDom, Previewer} from 'vux'
import * as utils from '../../utils'
export default {
  name: 'share',
  data () {
    return {
      showToast: false,
      data: '',
      imgs: [],
      index: 1,
      code: '',
      type: '',
      shares: '',
      share: '',
      arr: [],
      select: '',
      msg: '',
      imgList: [],
      options: {
        isClickableElement: function (el) {
          return /previewer-delete-icon/.test(el.className)
        },
        timeToIdle: false,
        tapToToggleControls: false,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: true,
        arrowEl: false,
        preloaderEl: false,
        captionEl: false
      }
    }
  },
  directives: {
    TransferDom
  },
  components: {
    XDialog, XCircle, Previewer
  },
  methods: {
    removeImg () {
      alert(1)
    },
    look (item, index) {
      this.imgList = []
      for (let i = 0; i < item.length; i++) {
        let obj = {
          src: item[i].src
        }
        this.imgList.push(obj)
      }
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
        // document.getElementsByClassName('pswp__img')[0].click = function () {
        //   alert(1)
        // }
      })
    },
    saveImg () {
      this.showToast = false
      // this.beforeShare(2, 2)
      this.shareHref(2, 2)
    },
    oneShare () {
      this.showToast = false
      // this.beforeShare(1)
      this.shareHref(1)
    },
    moreShare () {
      this.showToast = false
      // this.beforeShare(2)
      this.shareHref(2)
    },
    showShare () {
      this.showToast = true
    },
    optFor (item) {
      item.selected = !item.selected
      if (item.selected) {
        this.index += 1
      } else {
        this.index -= 1
      }
    },
    optForIndex (flag) {
      if (flag === false) {
        this.index = this.index + 1
      } else {
        this.index = this.index - 1
      }
    },
    onCopy (code) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: code
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', code)
          that.$vux.toast.text('复制成功')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    getInfo () {
      if (this.data.item_url_state) {
        this.$http.post('/amoy/user/create-tpwd', {
          id: this.$route.query.id,
          item_url: this.data.change_item_url,
          title: this.data.title,
          logo: this.data.auctionImages[0]
        }, true).then(res => {
          this.code = res.data
          this.msg = this.data.title + '\n【在售价】' + this.data.origin_price + '元\n【券后价】' + this.data.coupon_price + '元\n---------' + '复制这条信息，' + res.data + ',打开【手机淘宝】即可领券购买'
        })
      } else {
        this.$http.post('/amoy/user/get-url', {
          id: this.$route.query.id,
          item_url: this.data.item_url,
          type: this.$route.query.type
        }, true).then(res => {
          this.data.item_url_state = 1
          this.data.change_item_url = res.data
          this.$http.post('/amoy/user/create-tpwd', {
            id: this.$route.query.id,
            item_url: this.data.change_item_url,
            title: this.data.title,
            logo: this.data.auctionImages[0]
          }, true).then(res => {
            this.code = res.data
            this.msg = this.data.title + '\n【在售价】' + this.data.origin_price + '元\n【券后价】' + this.data.coupon_price + '元\n---------' + '复制这条信息，' + res.data + ',打开【手机淘宝】即可领券购买'
          })
        })
      }
    },
    beforeShare (type, index) {
      // if (this.data.coupon_short_url) {
      //   this.shareHref(type, index)
      // } else {
      //   this.$http.post('/amoy/user/get-url', {
      //     id: this.$route.query.id,
      //     item_url: this.data.item_url,
      //     type: this.$route.query.type
      //   }, true).then(res => {
      //     this.data.change_item_url = res.data
      //     this.shareHref(type, index)
      //   })
      // }
    },
    shareFri () {
      let that = this
      that.$vux.loading.show({
        text: '海报生产中'
      })
      that.select = []
      that.arr = []
      for (let i = 0; i < that.imgs.length; i++) {
        if (that.imgs[i].selected) {
          that.select.push(that.imgs[i].src)
        }
      }
      if (that.select.length === 0) {
        that.$vux.toast.text('请选择分享主图')
        return
      }
      that.select = that.select.slice(0, 1)
      let imgNew = this.link + '/amoy/user/create-share?num_iid=' + this.$route.query.id + '&item_url=' + escape(this.data.coupon_url) + '&type=' + this.$route.query.type + '&title=' + encodeURI(this.data.title) + '&thumb=' + this.select[0] + '&coupon_money=' + this.data.coupon_money + '&coupon_price=' + this.data.coupon_price + '&origin_price=' + this.data.zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
      let format = 'share' + new Date().getTime() + '.png'
      api.download({
        url: imgNew,
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        that.$vux.loading.hide()
        var wx = api.require('wx')
        wx.shareImage({
          scene: 'timeline',
          contentUrl: 'fs://' + format
        }, function (ret, err) {
        })
      })
    },
    shareHref (type, index) {
      let that = this
      that.$vux.loading.show({
        text: '海报生产中'
      })
      that.select = []
      that.arr = []
      for (let i = 0; i < that.imgs.length; i++) {
        if (that.imgs[i].selected) {
          that.select.push(that.imgs[i].src)
        }
      }
      if (that.select.length === 0) {
        that.$vux.toast.text('请选择分享主图')
        return
      }
      if (type === 1) {
        that.select = that.select.slice(0, 1)
      }
      let imgNew = this.link + '/amoy/user/create-share?num_iid=' + this.$route.query.id + '&item_url=' + escape(this.data.coupon_url) + '&type=' + this.$route.query.type + '&title=' + encodeURI(this.data.title) + '&thumb=' + this.select[0] + '&coupon_money=' + this.data.coupon_money + '&coupon_price=' + this.data.coupon_price + '&origin_price=' + this.data.zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
      console.log(imgNew)
      that.select.splice(0, 1)
      that.select.unshift(imgNew)
      that.save(0, index)
    },
    save (j, index) {
      let that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.select[j],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        if (index === 2) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if ((j + 1) >= that.select.length) {
              that.$vux.loading.hide()
              that.$vux.toast.text('图片已经保存到相册')
              // that.shareFri()
            } else {
              that.save(j + 1, index)
            }
          })
        } else {
          if (ret.state === 1) {
            that.arr.push('fs://' + format)
          }
          if ((j + 1) >= that.select.length) {
            that.$vux.loading.hide()
            let sharedModule = api.require('shareAction')
            sharedModule.share({
              images: that.arr,
              type: 'image'
            })
          } else {
            that.save(j + 1, index)
          }
        }
      })
    },
    getUrl () {
      this.$http.post('/amoy/user/get-url', {
        id: this.$route.query.id,
        item_url: this.data.item_url,
        type: this.$route.query.type
      }, true).then(res => {
        this.data.item_url_state = 1
        this.data.change_item_url = res.data
        this.code = res.data
        this.msg = this.data.title + '<br>【在售价】' + this.data.origin_price + '元<br>【券后价】' + this.data.coupon_price + '元<br>---------' + '打开链接' + this.code + '即可领券购买'
      })
    }
  },
  created () {
    this.data = utils.storage.get('supergoods')[this.$route.query.i]
    for (let i = 0; i < this.data.small_images.length; i++) {
      let obj = {
        selected: i === 0,
        src: this.data.small_images[i]
      }
      this.imgs.push(obj)
    }
    let t = Number(this.$route.query.type)
    if (t === 11 || t === 12) {
      this.type = 0
      this.code = this.data.tbk_pwd
      this.msg = this.data.title + '\n【在售价】' + this.data.origin_price + '元\n【券后价】' + this.data.coupon_price + '元\n---------' + '复制这条信息，' + this.data.tbk_pwd + ',打开【手机淘宝】即可领券购买'
    } else if (t === 21) {
      this.type = 2
      if (this.data.item_url_state) {
        this.code = this.data.change_item_url
        this.msg = this.data.title + '<br>【在售价】' + this.data.origin_price + '元<br>【券后价】' + this.data.coupon_price + '元<br>---------' + '打开链接' + this.code + '即可领券购买'
      } else {
        this.getUrl()
      }
    } else if (t === 31) {
      this.type = 3
      this.code = this.data.coupon_url
      this.msg = this.data.title + '<br>【在售价】' + this.data.origin_price + '元<br>【券后价】' + this.data.coupon_price + '元<br>---------' + '打开链接' + this.code + '即可领券购买'
    }
  },
  mounted () {
    document.getElementsByClassName('share_to')[0].style.paddingBottom = api.safeArea.bottom + 'px'
  }
}
</script>
<style lang="less">
  .shareBox{
    .weui-dialog{
      max-width: 6.6rem !important;
      width: 6.6rem !important;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.7);
    }
    .weui-dialog{
      background: none;
    }
    .share{
      width: 6.6rem;
      height: 4rem;
      .classBox{
        position: relative;
        width: 6.6rem;
        height: 2.4rem;
        display: flex;
        background: #fff;
        border-radius: .2rem;
        div{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img{
            width: .9rem;
            height: .9rem;
          }
          p{
            margin-top: .2rem;
            color: #666;
            font-size: .26rem;
          }
        }
      }
      .close{
        margin-top: 0.8rem;
        width: .76rem;
        height: .76rem;
      }
    }
  }
</style>
<style scoped lang="less">
.share_pitchOn_img{
  overflow-x: auto;
  li{
    margin-right: .2rem;
  }
}
</style>
