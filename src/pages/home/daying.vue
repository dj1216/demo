<template>
    <div class="daying">
      <div class="desc">
        <textarea name="" id="" v-model="comment"  rows="7" placeholder="描述你和宝贝的故事吧~"></textarea>
        <div class="imgBox">
          <div class="imgs" v-for="(item, index) of imgs" :key="index" :style="{backgroundImage: 'url(' + item +')'}">
            <img src="../../assets/img/home/close.png" alt="" class="close" @click="del(index)"></div>
          <div class="imgs" @click="show = true"><img src="../../assets/img/home/addImg.png" alt="" class="thumb"></div>
        </div>
      </div>
      <div class="select" @click="jumpTo('dayingShop')" style="font-size: .26rem;">选择商品</div>
      <div class="list" v-if="shop">
        <div class="shop">
          <img v-lazy="shop.estimated_revenue" alt="" class="thumb">
          <div class="info">
            <p class="title">{{shop.title}}</p>
            <p class="price">券后价：¥<span>{{shop.product_price}}</span></p>
            <div class="profit">
              <p :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">预估收益</p>
              <span :style="{color: $store.state.global.theme.mainColor}" >已结算</span>
            </div>
          </div>
        </div>
      </div>
      <p class="describe">*请上传图片大小小于2M的图片，系统将自动筛选</p>
      <div class="edit_button btn_login">
        <button class="btn_bright_red" @click="daying" :style="{background: $store.state.global.theme.mainColor}">晒单</button>
      </div>
      <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="select"></actionsheet>
    </div>
</template>

<script>
import {Actionsheet} from 'vux'
import '../../assets/js/api'
import * as utils from '../../utils'
export default {
  name: 'daying',
  components: {
    Actionsheet
  },
  data () {
    return {
      menus: {
        menu1: '从相册选择一张',
        menu2: '拍照'
      },
      show: false,
      imgs: [],
      shop: '',
      comment: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name !== 'dayingShop') {
        vm.comment = ''
        vm.imgs = []
      }
    })
  },
  methods: {
    del (index) {
      this.imgs.splice(index, 1)
    },
    daying () {
      if (!this.shop) {
        this.$vux.toast.text('请选择想要晒的商品')
        return
      }
      if (this.imgs.length === 0) {
        this.$vux.toast.text('请上传至少一张图片')
        return
      }
      this.$http.post('/amoy/drying/goto-drying', {
        comment: this.comment,
        imgs: this.imgs,
        goods_id: this.shop.product_id,
        type: this.shop.type
      }, true).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text('晒单成功')
          this.$router.go(-1)
        }
      })
    },
    select (key) {
      if (key === 'menu1') {
        this.galleryImg()
      } else if (key === 'menu2') {
        this.captureImage()
      }
    },
    // 从相册中选取图片
    galleryImg () {
      let that = this
      api.getPicture({
        sourceType: 'album',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true,
        quality: 100
      }, function (ret, err) {
        if (ret) {
          that.imgs.push(ret.base64Data)
        } else {
          console.log(JSON.stringify(err))
        }
      })
      // let UIAlbumBrowser = api.require('UIAlbumBrowser')
      // UIAlbumBrowser.open({
      //   max: 9,
      //   styles: {
      //     bg: '#FFFFFF',
      //     mark: {
      //       icon: '',
      //       position: 'top_right',
      //       size: 20
      //     },
      //     nav: {
      //       bg: '#999',
      //       cancelColor: '#fff',
      //       cancelSize: 16,
      //       nextStepColor: '#fff',
      //       nextStepSize: 16
      //     }
      //   },
      //   animation: true
      // }, function (ret) {
      //   console.log(ret.list[0].thumbPath)
      //   $api.attr($api.byId('img1'), 'src', ret.list[0].thumbPath)
      //   UIAlbumBrowser.closePicker()
      //   if (ret.eventType === 'nextStep') {
      //     // let arr = []
      //     // for (let i = 0; i < ret.list.length; i++) {
      //     //   that.imgs.push('fs:/' + ret.list[i].path)
      //     // }
      //     // UIAlbumBrowser.batchTransPath({
      //     //   path: arr
      //     // }, function (ret1, err1) {
      //     //   console.log(ret1.path)
      //     //   console.log('error' + err1)
      //     //   // if (ret) {
      //     //   //   alert(JSON.stringify(ret1))
      //     //   // } else {
      //     //   //   alert(JSON.stringify(err1))
      //     //   // }
      //     //   that.imgs = ret1.path
      //     //   UIAlbumBrowser.closePicker()
      //     //   // UIAlbumBrowser.closePicker()
      //     // })
      //   }
      // })
    },
    // 拍照
    captureImage () {
      let that = this
      api.getPicture({
        sourceType: 'camera',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true
      }, function (ret, err) {
        if (ret) {
          that.imgs.push(ret.base64Data)
        } else {
          console.log(JSON.stringify(err))
        }
      })
    }
  },
  activated () {
    this.shop = utils.storage.get('dayingShop')
  }
}
</script>
<style lang="less">
  .daying{
    .weui-actionsheet_toggle{
      bottom: 30px;
      width: 90%;
      left: 5%;
      background: none;
      .weui-actionsheet__menu{
        border-radius: 5px;
      }
      .weui-actionsheet__action{
        border-radius: 5px;
      }
      .vux-actionsheet-menu-default{
        color: #666;
        font-size: .28rem;
      }
      .weui-actionsheet__cell{
        font-size: .3rem;
      }
    }
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
.daying{
  .desc{
    padding: .3rem;
    background: #fff;
    textarea{
      border: none;
      width: 100%;
    }
    .imgBox{
      overflow: hidden;
      .imgs{
        float: left;
        width: 1.65rem;
        height: 1.65rem;
        position: relative;
        margin-right: .1rem;
        margin-bottom: .1rem;
        background-size: cover;
        background-repeat: no-repeat;
        .close{
          position: absolute;
          right: .1rem;
          top: .1rem;
          width: .34rem;
          height: .34rem;
        }
      }
      .imgs:nth-of-type(4n){
        margin-right: 0;
      }
    }
  }
  .select{
    margin-top: .2rem;
    padding: 0 .3rem;
    background: #fff;
    position: relative;
    height: 1.1rem;
    display: flex;
    align-items: center;
  }
  .select:before{
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: .3rem;
  }
  .list{
    background: #fff;
    margin-top: .2rem;
    padding: .3rem;
    .shop{
      overflow: hidden;
      display: flex;
      .thumb{
        width: 1.9rem;
        height: 1.9rem;
        border-radius: .1rem;
        margin: 0 .2rem 0 0;
      }
      .info{
        flex: 1;
        overflow: hidden;
        .title{
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: .26rem;
          margin-bottom: .1rem;
        }
        .price{
          margin-bottom: .1rem;
          font-size: .24rem;
          color: #666;
          span{
            font-size: .3rem;
          }
        }
        .profit{
          display: flex;
          justify-content: space-between;
          p{
            display: flex;
            align-items: center;
            font-size: .22rem;
            height: .4rem;
            padding: 0 .3rem;
            border-radius: .2rem;
            color: #fff;
          }
          span{
            font-size: .28rem;
          }
        }
      }
    }
  }
  .describe{
    font-size: .24rem;
    color: #999;
    padding: .3rem;
  }
}
</style>
