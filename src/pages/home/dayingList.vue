<template>
    <div class="dayingList">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>晒单<img
        src="../../assets/img/home/camera.png" alt="" slot="right" @click="daying" class="camera">
      </x-header>
      <div class="boxs">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="person">
        <div class="avater" :style="{backgroundImage: 'url(' + userInfo.avatar + ')'}" v-if="userInfo && userInfo.avatar" @click="jumpTo('info')"></div>
        <div class="avater" v-else @click="jumpTo('info')"></div>
        <div class="info" >
          <!--<p class="name">認真的雪</p>-->
          <p class="sign" v-if="userInfo && userInfo.person_signature" @click="jumpTo('info')">{{userInfo.person_signature}}<img src="../../assets/img/home/pencil.png" alt=""></p>
          <p class="sign" v-else @click="jumpTo('info')">您还没有写签名哦~<img src="../../assets/img/home/pencil.png" alt=""></p>
        </div>
      </div>
      <div class="lists">
        <div class="list" @click="jumpTo('dayingDetail?id=' + item.dry_id)" v-for="(item, index) of list" :key="index">
          <div class="per">
            <div class="avater" :style="{backgroundImage: 'url(' + item.avatar + ')'}" v-if="item.avatar"></div>
            <div class="avater"  v-else></div>
            <div class="info">
              <p class="name">{{item.nickname}}</p>
              <p class="sign">{{item.publish_time*1000 | dateFormat}}</p>
            </div>
            <div class="praise" @click.stop="praise(item)">
              <img src="../../assets/img/home/praise.png" alt="" v-if="item.is_zan === 0"><img src="../../assets/img/home/praised.png" alt="" v-else><span>{{item.zan_num}}</span>
            </div>
          </div>
          <div class="desc">{{item.comment}}</div>
          <div class="imgBox">
            <div :style="{backgroundImage: 'url('+ srcUrl +')'}" v-for="srcUrl of item.img" :key="srcUrl"></div>
            <!--<img v-lazy="srcUrl" alt="" v-for="srcUrl of item.img" :key="srcUrl">-->
            <div></div>
          </div>
          <div class="other">
            <img src="../../assets/img/home/message.png" alt="">
            <span class="num">{{item.commentCount}}</span><p></p>
            <div class="share" @click.stop="share(item)" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}"><img src="../../assets/img/home/share.png" alt="">一键分享</div>
          </div>
        </div>
      </div>
        <div id="empty"></div>
      </mescroll-vue>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast" class="shareBox">
          <div class="share">
            <div class="classBox">
              <div><img src="../../assets/img/materials/dt.png" alt="" @click="oneShare"><p>单图分享</p></div>
              <div><img src="../../assets/img/materials/dtfx.png" alt="" @click="moreShare"><p>多图分享</p></div>
              <div><img src="../../assets/img/materials/bcdxc.png" alt="" @click="saveImg"><p>保存到相册</p></div>
            </div>
            <img src="../../assets/img/my/close.png" alt="" @click="showToast = false" class="close">
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import {XDialog, TransferDomDirective as TransferDom, dateFormat} from 'vux'
import * as utils from '../../utils'
export default {
  name: 'dayingList',
  components: {
    MescrollVue,
    dateFormat,
    XDialog
  },
  directives: {
    TransferDom
  },
  filters: {
    dateFormat
  },
  data () {
    return {
      userInfo: this.$store.state.user.userInfo,
      showToast: false,
      item: '',
      imgs: [],
      arr: [],
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
        noMoreSize: 5,
        toTop: {
          src: './static/img/auth/back_top.png',
          offset: 1000
        },
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'dayingDetail' || from.name === 'info') {
        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
      } else {
        vm.reset()
        vm.getInfo()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
    next()
  },
  methods: {
    reset () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    share (item) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      this.item = item
      this.showToast = true
    },
    oneShare () {
      this.getGoods(1)
    },
    moreShare () {
      this.getGoods(2)
    },
    saveImg () {
      this.getGoods(3)
    },
    getGoods (type) {
      this.showToast = false
      this.$vux.loading.show({
        text: '数据加载中'
      })
      this.imgs = []
      this.$http.post('/amoy/taobao/goods-item', {
        item_id: this.item.goods_id
        // item_id: 537313545393
      }, false, true).then(res => {
        if (res.code === 0) {
          let imgNew = this.link + '/amoy/user/create-share?num_iid=' + this.item.goods_id + '&item_url=' + escape(res.data.coupon_url) + '&type=' + res.data.type + '&title=' + encodeURI(res.data.title) + '&thumb=' + res.data.thumb + '&coupon_money=' + res.data.coupon_money + '&coupon_price=' + res.data.coupon_price + '&origin_price=' + res.data.zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
          this.imgs.push(imgNew)
          if (type !== 1) {
            this.imgs = this.imgs.concat(this.item.img)
          }
          this.save(0, type)
        } else {
          this.$vux.loading.hide()
          this.$vux.toast.show({
            type: 'text',
            text: res.msg,
            time: 1000,
            position: 'middle'
          })
          // this.$vux.toast.text(res.msg)
        }
      })
    },
    save (j, type) {
      let that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgs[j],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        if (type === 3) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if ((j + 1) >= that.imgs.length) {
              that.$vux.loading.hide()
              that.$vux.toast.text('图片已经保存到相册')
            } else {
              that.save(j + 1, type)
            }
          })
        } else {
          if (ret.state === 1) {
            that.arr.push('fs://' + format)
          }
          if ((j + 1) >= that.imgs.length) {
            that.$vux.loading.hide()
            let sharedModule = api.require('shareAction')
            sharedModule.share({
              images: that.arr,
              type: 'image'
            })
          } else {
            that.save(j + 1, type)
          }
        }
      })
    },
    praise (item) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      this.$http.post('/amoy/drying/zan', {
        dry_id: item.dry_id
      }, true).then(res => {
        if (res.code === 0) {
          if (item.is_zan === 0) {
            item.is_zan = 1
            item.zan_num = Number(item.zan_num) + 1
          } else {
            item.is_zan = 0
            item.zan_num = Number(item.zan_num) - 1
          }
        }
      })
    },
    daying () {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      utils.storage.remove('dayingShop')
      this.$router.push('/daying')
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      this.$http.post('/amoy/drying/drying-list', {
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          let p = page.num
          if (arr !== '') {
            this.list = this.list.concat(arr)
          }
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
            if (this.scrollH && p === 1) {
              this.mescroll.scrollTo(this.$refs.recommend.offsetTop)
            }
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    getInfo () {
      if (this.$store.state.user.token) {
        this.$http.post('/amoy/user/user-info', {}).then(res => {
          if (res.code === 0) {
            this.userInfo = res.data
            this.$store.commit('setUserInfo', res.data)
          }
        }).catch((e) => {
          this.mescroll.endErr()
        })
      }
    }
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
@import "../../assets/less/common";
.dayingList{
  height: 100%;
  .boxs{
    position: relative;
    height: 100%;
    overflow-y: auto;
  }
  .camera{
    width: .38rem;
    height: .33rem;
    float: left;
  }
  .person{
    text-align: center;
    /*display: flex;*/
    /*align-items: center;*/
    height: 2.9rem;
    background: url("../../assets/img/home/dayingBg.png") no-repeat;
    background-size: contain;
    padding: 0.3rem .3rem 0;
    .avater{
      margin: 0 auto 0;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('../../assets/img/my/avater.png');
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
    }
    .info{
      margin-top: .3rem;
      /*display: flex;*/
      /*flex-direction: column;*/
      /*justify-content: space-around;*/
      /*height: 1.3rem;*/
      .name{
        font-size: .32rem;
      }
      .sign{
        font-size: .26rem;
        color: #fff;
        img{
          width: .25rem;
          height: .28rem;
          margin-left: .2rem;
        }
      }
    }
  }
  .lists{
    .list{
      margin-top: .2rem;
      background: #fff;
      padding: .3rem;
      .per{
        display: flex;
        align-items: center;
        height: 1.3rem;
        .avater{
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('../../assets/img/my/avater.png');
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-right: .2rem;
        }
        .info{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 1rem;
          .name{
            font-size: .3rem;
          }
          .sign{
            font-size: .24rem;
            color: #999;
          }
        }
        .praise{
          display: flex;
          align-items: center;
          img{
            width: .3rem;
            height: .29rem;
            vertical-align: middle;
            margin-right: .05rem;
          }
          span{
            font-size: .28rem;
            color: #888;
          }
        }
      }
      .desc{
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: .28rem;
        color: #666;
      }
      .imgBox{
        overflow: hidden;
        div{
          float: left;
          width: 2.2rem;
          height: 2.2rem;
          margin-right: 0.15rem;
          margin-top: .15rem;
          background-size: cover;
          background-repeat: no-repeat;
        }
        div:nth-of-type(3n){
          margin-right: 0;
        }
      }
      .other{
        padding-top: .2rem;
        height: .8rem;
        display: flex;
        align-items: center;
        img{
          width: .27rem;
          height: .25rem;
          margin-right: .2rem;
        }
        span{
          font-size: .28rem;
          color: #888;
        }
        p{
          flex: 1;
        }
        .share{
          display: flex;
          align-items: center;
          img{
            width: .24rem;
            height: .24rem;
            margin-right: .05rem;
          }
          padding: 0 .2rem;
          height: .54rem;
          line-height: .54rem;
          border-radius: .27rem;
          color: #fff;
          font-size: .24rem;
        }
      }
    }
  }
}
</style>
