<template>
  <div id="materials" ref="materials">
    <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="mate_her" ref="mate">
        <img src="../../assets/img/materials/materials_img.png" alt="">
      </div>
      <div  ref="tabBox" class="tabBox" :class="{sticky: isIos}" :style="{paddingTop: h + 'px'}">
        <tab :line-width="2" custom-bar-width=".6rem" :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type">
          <tab-item @on-item-click="reset">精选单品</tab-item>
          <tab-item @on-item-click="reset">好货专场</tab-item>
          <tab-item @on-item-click="reset">小店精选</tab-item>
        </tab>
      </div>
      <div v-transfer-dom class="preview">
        <previewer :list="imgs" ref="previewer"></previewer>
      </div>
      <div class="list">
        <div class="mate_con" v-if="type === 0" v-for="(item, index) in list" :key="index">
          <div class="mate_con_title">
            <img class="mate_img" :src="$logo" v-if="$logo" alt="">
            <div class="mate_title">
              <h2>精选单品</h2>
              <p>{{item.add_time*1000 | dateFormat('YYYY-MM-DD')}}</p>
            </div>
            <div class="mate_share mate_buy" @click="showShare(item, item.copy_content)" :style="{background:'linear-gradient(' + $store.state.global.theme.deg+'deg,' + $store.state.global.theme.mainColor + ',' + $store.state.global.theme.secondColor + ')'}">
              <i  class="iconfont icon-fenxiang"></i>
              <span>{{item.dummy_click_statistics}}</span>
            </div>
            <div class="mate_share" @click="buy(item)" :style="{background:'linear-gradient(' + $store.state.global.theme.deg+'deg,' + $store.state.global.theme.mainColor + ',' + $store.state.global.theme.secondColor + ')'}">
              <img src="../../assets/img/materials/gwc.png" alt="">
              <span>领券购买</span>
            </div>
          </div>
          <div class="mate_con_img">
            <p v-html="item.copy_content"></p>
            <ul>
              <li v-for="(e, i) in item.itempic" :key="i" @click="look(item.itempic, i)">
                <img v-lazy="e" alt="" :key="e">
              </li>
            </ul>
          </div>
          <div class="mate_con_copy" v-show="flag" :style="{borderColor: $store.state.global.theme.mainColor}">
            <p v-html="item.copy_comment"></p>
            <div @click="onCopy(item)" class="copyObj" :style="{color: $store.state.global.theme.mainColor}"><span>复制</span><span>口令</span></div>
          </div>
        </div>
        <div class="mate_con" v-if="type === 1" v-for="(item, index) in list" :key="index">
          <div class="mate_con_title">
            <img class="mate_img" :src="$logo" v-if="$logo" alt="">
            <div class="mate_title">
              <h2>好货专场</h2>
              <p>{{item.addtime*1000 | dateFormat('YYYY-MM-DD')}}</p>
            </div>
            <div class="mate_share mate_buy" @click="showShare(item.item_data, item.copy_text)"  :style="{background:'linear-gradient(' + $store.state.global.theme.deg+'deg,' + $store.state.global.theme.mainColor + ',' + $store.state.global.theme.secondColor + ')'}">
              <i  class="iconfont icon-fenxiang"></i>
              <span>{{item.share_times}}</span>
            </div>
          </div>
          <div class="mate_con_img">
            <!--<h2>{{item.name}}</h2>-->
            <p v-html="item.copy_text"></p>
            <ul>
              <li v-for="(e, i) in item.item_data" :key="i" @click="looks(item.item_data, i)" >
                <img v-lazy="e.itempic" alt="" :key="e.itempic">
                <span v-if="e.couponmoney" :style="{background: $store.state.global.theme.mainColor}">{{e.couponmoney}}元券</span>
              </li>
            </ul>
          </div>
          <!--<div class="mate_con_copy" v-show="flag">-->
          <!--<p v-html="item.copy_text"></p>-->
          <!--<span @click="onCopy()" class="copyObj" :data-clipboard-text="'￥NNE10Gqpmi1￥'">复制</span>-->
          <!--</div>-->
        </div>
        <div class="box" v-if="type === 2" v-for="(item, index) in list" :key="index" @click="circle(item)">
          <div class="imgBox">
            <img v-lazy="item.cms_image" alt="" :key="item.cms_image">
            <p class="time"><img src="../../assets/img/super/2.png" alt="">：<span>{{item.activity_start_time*1000 | dateFormat('MM/DD')}} - {{item.activity_end_time*1000 | dateFormat('MM/DD')}}</span></p>
          </div>
          <p class="t">{{item.name}}</p>
          <p class="info" v-html="item.show_text"></p>
        </div>
      </div>
    </mescroll-vue>
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
import {Actionsheet, Tab, TabItem, dateFormat, Previewer, XDialog, XCircle, TransferDomDirective as TransferDom} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'materials',
  data () {
    return {
      text: '',
      menus: {
        menu1: '好货发现',
        menu2: '精选单品',
        menu3: '营销素材'
      },
      showToast: false,
      flag: true,
      type: 1,
      url: ['/amoy/hao/selected-item', '/amoy/hao/subject-hot', '/amoy/hao/get-subject'],
      list: [],
      page: 1,
      finish: false,
      loading: false,
      code: '',
      arr: [],
      select: [],
      imgs: [],
      item: '',
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.reset,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      mescrollUp: {
        onScroll: this.handleScroll,
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
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
      lastBounce: null, // 路由切换时是否禁止ios回弹
      isIos: api.systemType === 'ios',
      h: api.safeArea.top,
      statusBar: false
      // isIos: false,
      // h: 25,
      // statusBar: false
    }
  },
  directives: {
    TransferDom
  },
  filters: {
    dateFormat
  },
  components: {
    Actionsheet, Tab, TabItem, Previewer, XDialog, XCircle, MescrollVue
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    // this.$refs.previewer.close()
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      if (page.num !== 1) {
        page.num--
      }
      this.$http.post(this.url[this.type], {
        page: page.num
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data.info
          if (page.num === 1) this.list = []
          let p = page.num
          this.list = this.list.concat(arr)
          if (res.data.page && res.data.page.min_id) {
            this.mescrollUp.page.num = res.data.page.min_id
          } else {
            this.mescrollUp.page.num += 1
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
    saveImg () {
      this.showToast = false
      if (this.type === 0) {
        this.getOtherUrl(this.item, 2, 2)
      } else if (this.type === 1) {
        this.share(this.item, 2, 2)
      }
      let that = this
      let text = that.text.replace(/<br>/g, '\n')
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: text
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', text)
          that.$vux.toast.text('文案已复制')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    oneShare () {
      this.showToast = false
      if (this.type === 0) {
        this.getOtherUrl(this.item, 1)
      } else if (this.type === 1) {
        this.share(this.item, 1)
      }
      let that = this
      let text = that.text.replace(/<br>/g, '\n')
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: text
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', text)
          that.$vux.toast.text('文案已复制')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    moreShare () {
      this.showToast = false
      if (this.type === 0) {
        this.getOtherUrl(this.item, 2)
      } else if (this.type === 1) {
        this.share(this.item, 2)
      }
      let that = this
      let text = that.text.replace(/<br>/g, '\n')
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: text
      }, function (ret, err) {
        if (ret) {
          utils.storage.set('copyWord', text)
          that.$vux.toast.text('文案已复制')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    showShare (item, text) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      this.item = item
      this.showToast = true
      if (text) {
        this.text = text
      } else {
        this.text = ''
      }
    },
    looks (item, index) {
      this.imgs = []
      for (let i = 0; i < item.length; i++) {
        let obj = {
          src: item[i].itempic
        }
        this.imgs.push(obj)
      }
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
      })
    },
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
    shareother (item, type, index) {
      if (type === 1) {
        this.select = []
      } else if (type === 2) {
        this.select = JSON.parse(JSON.stringify(item.itempic))
      }
      this.arr = []
      let imgNew = this.link + '/amoy/user/create-share?num_iid=' + item.itemid + '&item_url=' + item.item_url + '&type=' + item.type + '&title=' + encodeURI(item.itemtitle) + '&thumb=' + item.sola_image + '&coupon_money=' + item.couponmoney + '&coupon_price=' + item.itemendprice + '&origin_price=' + item.itemprice + '&uid=' + this.$store.state.user.userInfo.uid
      this.select.unshift(imgNew)
      this.save(0, index)
    },
    getCode (i) {
      this.$http.post('/amoy/user/get-url', {
        id: this.list[i].itemid,
        item_url: this.list[i].couponurl,
        type: this.list[i].type
      }).then(res => {
        this.list[i].item_url = res.data
        this.$http.post('/amoy/user/create-tpwd', {
          id: this.list[i].itemid,
          item_url: this.list[i].item_url,
          title: this.list[i].title,
          logo: this.list[i].sola_image
        }).then((res) => {
          this.list[i].code = res.data
          this.list[i].copy_comment = this.list[i].copy_comment.replace('$淘口令$', res.data)
          // console.log(this.list[i].comment.replace('$淘口令$', res.data))
          if ((i + 1) < this.list.length) {
            this.getCode(i + 1)
          }
        })
      })
    },
    buy (item) {
      // let info = {
      //   title: item.itemtitle,
      //   type: item.type,
      //   volume: item.dummy_click_statistics,
      //   zk_final_price: item.itemprice,
      //   coupon_money: item.couponmoney,
      //   coupon_price: item.itemendprice,
      //   thumb: item.sola_image
      // }
      // utils.storage.set('supergoods', [info])
      // this.$router.push('/supergoods?type=11&id=' + item.itemid + '&i=0')
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=11&id=' + item.itemid + '&i=0' + '&way=1')
    },
    getOtherUrl (item, type, index) {
      this.$http.post('/amoy/user/extension', {}, false, true).then(res => {
        if (res.code === 0) {
          if (item.item_url) {
            this.shareother(item, type, index)
          } else {
            this.$http.post('/amoy/user/get-url', {
              id: item.itemid,
              item_url: item.couponurl,
              type: item.type
            }, false).then(res => {
              item.item_url = res.data
              this.shareother(item, type, index)
            })
          }
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    getUrl (info, i, index) {
      if (info[i].itemid) {
        let item = {id: info[i].itemid, item_url: info[i].couponurl, type: info[i].shoptype === 'C' ? 11 : 12}
        this.$http.post('/amoy/user/get-url', item, true, true).then(res => {
          if (res.code === 0) {
            let imgNew = this.link + '/amoy/user/create-share?num_iid=' + info[i].itemid + '&item_url=' + res.data + '&type=' + (info[i].shoptype === 'C' ? 11 : 12) + '&title=' + encodeURI(info[i].itemtitle) + '&thumb=' + info[i].itempic + '&coupon_money=' + info[i].couponmoney + '&coupon_price=' + info[i].itemendprice + '&origin_price=' + info[i].itemprice + '&uid=' + this.$store.state.user.userInfo.uid
            this.select.push(imgNew)
            let k = ++i
            if (k >= info.length) {
              this.save(0, index)
            } else {
              this.getUrl(info, k, index)
            }
          } else {
            this.select.push(info[i].itempic)
            let k = ++i
            if (k >= info.length) {
              this.save(0, index)
            } else {
              this.getUrl(info, k, index)
            }
          }
        })
      } else {
        this.select.push(info[i].itempic)
        let k = ++i
        if (k >= info.length) {
          this.save(0, index)
        } else {
          this.getUrl(info, k, index)
        }
      }
    },
    share (info, type, index) {
      this.$http.post('/amoy/user/extension', {}, true, true).then(res => {
        if (res.code === 0) {
          this.select = []
          this.arr = []
          if (type === 1) {
            this.$http.post('/amoy/user/get-url', {
              id: info[0].itemid,
              item_url: info[0].couponurl,
              type: info[0].shoptype === 'C' ? 11 : 12
            }, true).then(res => {
              let imgNew = this.link + '/amoy/user/create-share?num_iid=' + info[0].itemid + '&item_url=' + res.data + '&type=' + (info[0].shoptype === 'C' ? 11 : 12) + '&title=' + encodeURI(info[0].itemtitle) + '&thumb=' + info[0].itempic + '&coupon_money=' + info[0].couponmoney + '&coupon_price=' + info[0].itemendprice + '&origin_price=' + info[0].itemprice + '&uid=' + this.$store.state.user.userInfo.uid
              this.select.push(imgNew)
              this.save(0, index)
            })
          } else if (type === 2) {
            this.getUrl(info, 0, index)
          }
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    save (j, index) {
      this.$store.commit('show')
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
              that.$store.commit('hide')
              that.$vux.toast.text('图片已经保存到相册')
            } else {
              that.save(j + 1, index)
            }
          })
        } else {
          if (ret.state === 1) {
            that.arr.push('fs://' + format)
          }
          if ((j + 1) >= that.select.length) {
            that.$store.commit('hide')
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
    circle (item) {
      utils.storage.set('circle', item)
      this.$router.push('/circle?id=' + item.id)
    },
    onCopy (item) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      if (item.code) {
        let clipBoard = api.require('clipBoard')
        clipBoard.set({
          value: item.copy_comment
        }, function (ret, err) {
          if (ret) {
            utils.storage.set('copyWord', item.copy_comment)
            that.$vux.toast.text('复制成功')
          } else {
            that.$vux.toast.text('请重试')
          }
        })
      } else {
        this.$vux.loading.show({
          text: '生成淘口令'
        })
        this.$http.post('/amoy/user/get-url', {
          id: item.itemid,
          item_url: item.couponurl,
          type: item.type
        }, false, true).then(res => {
          if (res.code === 0) {
            item.item_url = res.data
            this.$http.post('/amoy/user/create-tpwd', {
              id: item.itemid,
              item_url: item.item_url,
              title: item.title,
              logo: item.sola_image
            }, false, true).then((res) => {
              if (res.code === 0) {
                that.$vux.loading.hide()
                item.code = res.data
                item.copy_comment = item.copy_comment.replace('$淘口令$', res.data)
                let clipBoard = api.require('clipBoard')
                clipBoard.set({
                  value: item.copy_comment
                }, function (ret, err) {
                  if (ret) {
                    utils.storage.set('copyWord', item.copy_comment)
                    that.$vux.toast.text('复制成功')
                  } else {
                    that.$vux.toast.text('请重试')
                  }
                })
              } else {
                that.$vux.loading.hide()
                that.$vux.toast.text(res.msg)
              }
            })
          } else {
            that.$vux.loading.hide()
            that.$vux.toast.text(res.msg)
          }
        })
      }
    },
    reset () {
      this.mescrollUp.htmlLoading = ''
      this.loading = false
      this.finish = false
      this.list = []
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    getList () {
      this.$http.post(this.url[this.type], {
        page: this.page
      }, false, true).then((res) => {
        if (res.code === 0) {
          this.list = res.data.info
          this.$refs.my_scroller.finishInfinite(true)
        } else {
          this.$refs.my_scroller.finishInfinite(true)
          this.finish = true
          if (this.page === 1) {
            this.$vux.toast.text(res.msg)
          } else {
            this.$vux.toast.text('已加载全部内容')
          }
        }
      })
    },
    handleScroll (mescroll, y, isUp) {
      let that = this
      if (that.isIos) {
        return
      }
      if (y >= that.$refs.mate.offsetHeight) {
        that.$refs.tabBox.className = 'tabBox fixedTop'
      } else {
        that.$refs.tabBox.className = 'tabBox'
      }
    }
  },
  mounted: function () {
    console.log('系统' + this.isIos)
  }
}
</script>
<style lang="less">
  .preview{
    .pswp__button--fs{
      display: none !important;
    }
  }
  #materials{
    .vux-tab-wrap{
      padding-top: .88rem;
      .vux-tab-container{
        height: .88rem;
        .vux-tab{
          height: .88rem;
          .vux-tab-item{
            line-height: .88rem;
          }
        }
      }
    }
  }
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
  #materials{
    position: relative;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    .mescroll{
    }
    .tabBox{
      width: 100%;
      z-index: 1000;
      background: #fff;
      margin-bottom: .1rem;
      .vux-tab-item{
        background: none !important;
      }
      /*.statusBar{*/
        /*width: 100%;*/
        /*background: #fff;*/
        /*img{*/
          /*width: 100%;*/
          /*height: 100%;*/
          /*display: none;*/
        /*}*/
      /*}*/
    }
    .fixedTop{
      position: fixed;
      top: 0;
    }
    .sticky{
      position: -webkit-sticky;
      position: sticky;
      top: 0;
    }
    .list{
      overflow-x: hidden;
      /*height: calc(100% - .88rem);*/
      /*position: absolute;*/
      /*top: 4.98rem;*/
      /*bottom: 0;*/
      .box{
        padding: .3rem;
        background: #fff;
        margin-top: .2rem;
        .imgBox{
          width: 100%;
          position: relative;
          img{
            width: 100%;
            height: 3.35rem;
            border-radius: .1rem;
          }
          .time{
            position: absolute;
            right: .2rem;
            bottom: .2rem;
            font-size: .26rem;
            height: .5rem;
            border-radius: .25rem;
            color: #ffffff;
            padding: 0 .3rem;
            background: rgba(0,0,0,1);
            opacity:0.5;
            display: flex;
            align-items: center;
            img{
              width: .28rem;
              height: .26rem;
            }
            span{
              display: inline-block;
              line-height: .5rem;
            }
          }
        }
        .t{
          margin-top: .1rem;
          font-size: .3rem;
          color: #333;
        }
        .info{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: .26rem;
          color: #666;
        }
      }
    }
  }
</style>
