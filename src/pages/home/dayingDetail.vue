<template>
    <div class="dayingDetail" v-if="data">
      <div class="listBox">
        <div class="author">
          <div class="per">
            <img :src="data.avatar" alt="" class="avater" v-if="data.avatar">
            <img src="../../assets/img/my/avater.png" alt="" class="avater" v-else>
            <div class="info">
              <p class="name">{{data.nickname}}</p>
              <p class="sign">{{data.publish_time*1000 | dateFormat}}</p>
            </div>
          </div>
          <div class="desc">{{data.comment}}</div>
          <div class="imgBox">
            <img :src="item" alt="" v-for="item of data.imgs" :key="item">
          </div>
          <div class="other">
            <div @click="jumpTo('/comment?id=' + data.dry_id)">
              <img src="../../assets/img/home/message.png" alt="">
              <span class="num">{{data.commentCount}}</span>
            </div>
            <div @click="praise">
              <img src="../../assets/img/home/praise.png" alt="" v-if="data.is_zan === 0"><img src="../../assets/img/home/praised.png" alt="" v-else>
              <span>{{data.zan_num}}</span>
            </div>
            <p></p>
            <div class="share" @click="share" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}"><img src="../../assets/img/home/share.png" alt="">一键分享</div>
          </div>
        </div>
        <div class="high"></div>
        <div class="shop" @click="detail">
          <p class="introduce">在这买</p>
          <div class="detail">
            <img :src="data.goodsInfo.thumb" class="thumb" alt="">
            <div class="info">
              <p class="title"><img src="../../assets/img/home/tblogo.png" alt="">{{data.goodsInfo.title}}</p>
              <p class="coupon" :style="{color: $store.state.global.theme.mainColor,borderColor:$store.state.global.theme.mainColor}" ><span :style="{borderRightColor:$store.state.global.theme.mainColor}">券</span><span>¥{{data.goodsInfo.coupon_money}}</span></p>
              <div class="price">
                <p :style="{color: $store.state.global.theme.mainColor}" >券后价：<span>{{data.goodsInfo.payment_price}}</span></p>
                <span :style="{background: $store.state.global.theme.mainColor}">去看看</span>
              </div>
            </div>
          </div>
        </div>
        <div class="high" v-if="data.userList.length > 0"></div>
        <div class="likes" v-if="data.userList.length > 0">
          <p class="introduce">Ta们也喜欢</p>
          <div class="avaters">
            <img :src="item.avatar" alt=""  v-for="item of data.userList"  :key="item.avatar">
          </div>
        </div>
        <div class="high" v-if="data.commentList.length > 0"></div>
        <div class="comments" v-if="data.commentList.length > 0">
          <p class="introduce">评论</p>
          <div class="comment" v-for="(item, index) of data.commentList" :key="index">
            <div class="info">
              <img :src="item.avatar" alt="" :key="item.avatar">
              <div>
                <p class="name">{{item.nickname}}</p>
                <p class="rank">#{{index}}</p>
              </div>
              <p class="time">{{item.public_time*1000 | dateFormat}}</p>
            </div>
            <p class="content">{{item.content}}</p>
          </div>
        </div>
      </div>
      <div class="publish" @click="jumpTo('/comment?id=' + data.dry_id)"><img src="../../assets/img/home/publish.png" alt="">发表评论</div>
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
import {XDialog, TransferDomDirective as TransferDom, dateFormat} from 'vux'
import * as utils from '../../utils/index'
export default {
  name: 'dayingDetail',
  filters: {
    dateFormat
  },
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      data: '',
      imgs: [],
      arr: [],
      showToast: false
    }
  },
  methods: {
    detail () {
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=11&id=' + this.data.goodsInfo.product_id + '&i=0' + '&way=1')
    },
    share (item) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
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
        item_id: this.data.goodsInfo.product_id
        // item_id: 537313545393
      }, false, true).then(res => {
        if (res.code === 0) {
          let imgNew = this.link + '/amoy/user/create-share?num_iid=' + this.data.goodsInfo.product_id + '&item_url=' + escape(res.data.coupon_url) + '&type=' + res.data.type + '&title=' + encodeURI(res.data.title) + '&thumb=' + res.data.thumb + '&coupon_money=' + res.data.coupon_money + '&coupon_price=' + res.data.coupon_price + '&origin_price=' + res.data.zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
          this.imgs.push(imgNew)
          if (type !== 1) {
            this.imgs = this.imgs.concat(this.data.imgs)
          }
          this.save(0, type)
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
    praise () {
      this.$http.post('/amoy/drying/zan', {
        dry_id: this.data.dry_id
      }, true).then(res => {
        if (res.code === 0) {
          if (this.data.is_zan === 0) {
            this.data.is_zan = 1
            this.data.zan_num = Number(this.data.zan_num) + 1
            let info = {
              uid: this.$store.state.user.userInfo.uid,
              avatar: this.$store.state.user.userInfo.avatar
            }
            this.data.userList.unshift(info)
          } else {
            this.data.is_zan = 0
            this.data.zan_num = Number(this.data.zan_num) - 1
            let info = {
              uid: this.$store.state.user.userInfo.uid,
              avatar: this.$store.state.user.userInfo.avatar
            }
            for (let i = 0; i < this.data.userList.length; i++) {
              if (Number(this.data.userList[i].uid) === Number(info.uid)) {
                this.data.userList.splice(i, 1)
              }
            }
          }
        }
      })
    },
    getInfo () {
      this.$http.post('/amoy/drying/drying-detail', {
        dry_id: this.$route.query.id
      }, true).then(res => {
        this.data = res.data
      })
    }
  },
  mounted () {
    this.getInfo()
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
.dayingDetail{
  background: #fff;
  height: 100%;
  overflow: hidden;
  position: relative;
  .listBox{
    height: calc(100% - 0.98rem);
    padding-bottom: .5rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
  }
  .high{
    height: .2rem;
    width: 100%;
    overflow: hidden;
    background: @h-col;
  }
  .author{
    background: #fff;
    padding: .3rem;
    .desc{
      font-size: .28rem;
      color: #666;
      margin: 0.1rem 0 0.2rem;
    }
    .per{
      display: flex;
      align-items: center;
      height: 1.3rem;
      .avater{
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
    .imgBox{
      img{
        width: 100% !important;
        border-radius: .2rem;
        margin-bottom: .1rem;
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
        margin-right: .1rem;
      }
      span{
        font-size: .28rem;
        color: #888;
        margin-right: .2rem;
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
        border-radius: .27rem;
        color: #fff;
        font-size: .24rem;
      }
    }
  }
  .shop{
    padding: .3rem;
    .introduce{
      font-size: .28rem;
      padding-bottom: .3rem;
    }
    .detail{
      display: flex;
      .thumb{
        width: 1.8rem;
        height: 1.8rem;
        margin-right: .2rem;
        flex-shrink:0
      }
      .info{
        overflow: hidden;
        flex: 1;
        .title{
          width: 100%;
          img{
            width: 0.28rem;
            height: 0.28rem;
            vertical-align: middle;
            margin-right: 0.05rem;
          }
          font-size: .28rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .coupon{
          display: inline-block;
          font-size: .28rem;
          height: .36rem;
          line-height: .36rem;
          border-radius: 0.05rem;
          border: 1px solid;
          margin: 0.2rem 0 0.2rem;
          span{
            display: inline-block;
          }
          span:first-of-type{
            border-right: 1px solid;
            padding: 0 0.05rem;
          }
          span:last-of-type{
            padding: 0 .2rem;
          }
        }
        .price{
          display: flex;
          align-items: center;
          p{
            flex: 1;
            overflow: hidden;
            font-size: .24rem;
            span{
              font-size: .34rem;
            }
          }
          >span{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: .45rem;
            border-radius: .225rem;
            font-size: .24rem;
            color: #fff;
          }
        }
      }
    }
  }
  .likes{
    padding: .3rem;
    .introduce{
      font-size: .28rem;
      padding-bottom: .3rem;
    }
    .avaters{
      display: -webkit-box;
      flex-wrap: nowrap;
      overflow-x: auto;
      img{
        display: block;
        width: .88rem;
        height: .88rem;
        border-radius: 50%;
        margin-right: .1rem;
      }
    }
  }
  .comments{
    padding: .3rem 0 0;
    background: #fff;
    .introduce{
      padding-left: .3rem;
      font-size: .28rem;
    }
    .comment{
      padding:0.3rem;
      border-bottom: 1px solid @h-col;
      .info{
        display: flex;
        img{
          width: .88rem;
          height: .88rem;
          border-radius: 50%;
          margin-right: .1rem;
        }
        div{
          flex: 1;
          align-items: center;
          overflow: hidden;
          margin-right: .1rem;
          .name{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: .28rem;
          }
          .rank{
            font-size: .24rem;
            color: #999;
          }
        }
        .time{
          font-size: .24rem;
          color: #999;
        }
      }
      .content{
        margin: .3rem 0 0;
        font-size: .28rem;
        color: #999;
      }
    }
  }
  .publish{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .98rem;
    line-height: .98rem;
    text-align: center;
    background: #fff;
    box-shadow: 0 -2px 0 #f4f4f4;
    font-size: .3rem;
    img{
      width: .25rem;
      height: .27rem;
      margin-right: .2rem;
    }
  }
}
</style>
