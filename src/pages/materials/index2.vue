<template>
  <div id="materials">
    <div class="shareArea" v-show="show3" v-transfer-dom>
      <div class="outBox">
        <p class="aim">分享到</p>
        <div class="ulbox">
          <ul>
            <li @click="articleShare(1)"><img src="../../assets/img/share/wx.png" alt="">
              <p>微信</p>
            </li>
            <li @click="articleShare(2)"><img src="../../assets/img/share/pyq.png" alt="">
              <p>朋友圈</p>
            </li>
            <li @click="articleShare(3)"><img src="../../assets/img/share/QQ.png" alt="">
              <p>QQ</p>
            </li>
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>sdf</p>-->
            <!--</li>-->
            <li @click="articleDownOne(4)"><img src="../../assets/img/share/one.png" alt="">
              <p>保存图片</p>
            </li>
            <!--<li><img src="../../assets/img/share/plct.png" alt="">-->
              <!--<p>批量存图</p>-->
            <!--</li>-->
          </ul>
        </div>
        <div @click="show3=false" class="cancle">
          取消
        </div>
      </div>
    </div>
    <div class="shareArea" v-show="show2" v-transfer-dom>
      <div class="outBox">
        <p class="aim">分享到</p>
        <div class="ulbox">
          <ul>
            <li @click="imgShare()"><img src="../../assets/img/share/wx.png" alt="">
              <p>微信</p>
            </li>
            <li @click="friend"><img src="../../assets/img/share/pyq.png" alt="">
              <p>朋友圈</p>
            </li>
            <li @click="imgShare()"><img src="../../assets/img/share/QQ.png" alt="">
              <p>QQ</p>
            </li>
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
            <!--<p>sdf</p>-->
            <!--</li>-->
            <li @click="imgDown(0)" v-if="imgArr.length === 1"><img src="../../assets/img/share/one.png" alt="">
              <p>保存图片</p>
            </li>
            <li v-else @click="imgDown(0)"><img src="../../assets/img/share/plct.png" alt="">
            <p>批量存图</p>
            </li>
          </ul>
        </div>
        <div @click="show2=false" class="cancle">
          取消
        </div>
      </div>
    </div>
    <div class="shareArea" v-show="show1" v-transfer-dom>
      <div class="outBox">
        <p class="aim">分享到</p>
        <div class="ulbox">
          <ul>
            <li @click="imgShare()"><img src="../../assets/img/share/wx.png" alt="">
              <p>微信</p>
            </li>
            <li @click="friend"><img src="../../assets/img/share/pyq.png" alt="">
              <p>朋友圈</p>
            </li>
            <li @click="imgShare()"><img src="../../assets/img/share/QQ.png" alt="">
              <p>QQ</p>
            </li>
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
            <!--<p>sdf</p>-->
            <!--</li>-->
            <li @click="imgDown(0)" v-if="imgArr.length === 1"><img src="../../assets/img/share/one.png" alt="">
              <p>保存图片</p>
            </li>
            <li v-else @click="imgDown(0)"><img src="../../assets/img/share/plct.png" alt="">
              <p>批量存图</p>
            </li>
          </ul>
        </div>
        <div @click="show1=false" class="cancle">
          取消
        </div>
      </div>
    </div>
    <!--<div class="shareArea" v-show="show">-->
      <!--<div class="outBox">-->
        <!--<p class="aim">分享到</p>-->
        <!--<div class="ulbox">-->
          <!--<ul>-->
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>微信</p>-->
            <!--</li>-->
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>朋友圈</p>-->
            <!--</li>-->
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>QQ</p>-->
            <!--</li>-->
            <!--&lt;!&ndash;<li><img src="../../assets/img/home/tbshop.png" alt="">&ndash;&gt;-->
            <!--&lt;!&ndash;<p>sdf</p>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>保存图片</p>-->
            <!--</li>-->
            <!--<li><img src="../../assets/img/home/tbshop.png" alt="">-->
              <!--<p>批量存图</p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <!--<div @click="show=false" class="cancle">-->
          <!--取消-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="mate_her">
        <img src="../../assets/img/source/banner.png" alt="">
        <!--<barrage :linecount="4" :data="textlist" class="barrage1" :imgSrc="imgSrc" v-if="show"></barrage>-->
      </div>
      <div class="tabBox">
        <tab :line-width="2" custom-bar-width=".6rem" active-color="#FF453A" default-color="#333" v-model="cateIndex">
          <tab-item v-for="(item, index) of cate" :key="index" @on-item-click="changeCate('all')">{{item.title}}</tab-item>
        </tab>
      </div>
    <div id="store" v-if="cate[cateIndex].sonList && cate[cateIndex].sonList.length > 0">
      <ul >
        <li :class="{selected: secondIndex === 'all'}" @click="changeCate('all')">全部</li>
        <li v-for="(second, index) of cate[cateIndex].sonList" :class="{selected: secondIndex === second.id}" :key="index" @click="changeCate(second.id)">{{second.title}}</li>
      </ul>
    </div>
      <template v-for="(item, index) of list">
        <div class="recommendBox"  :key="index" v-if="(item.type === '0' || item.type === '1') && (item.items.length === 3 || item.items.length === 5 || item.items.length === 6 || item.items.length === 7 || item.items.length === 8 || item.items.length === 9)">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <p class="userName"><span>{{item.nickname}} </span> <span class="share" @click="share(item)">{{item.share_num}}</span></p>
            <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            <p class="earn" v-if="item.type === '0' && item.estimated_earn > 0"><img src="../../assets/img/source/money.png" alt="">预估赚￥{{item.estimated_earn}}</p>
            <div class="text" v-html="item.title">
              <!--<p>深夜福利，先抢券，后下单<br>深夜福利，先抢券，后下单<br>深夜福利，先抢券，后下单 <span>查看详情 <img src="../../assets/img/source/go.png" alt=""></span></p>-->
            </div>
            <div class="imgBox">
              <ul>
                <li v-for="(imgs,i) of item.items" :key="i" @click="detail(imgs)"><img :src="imgs.img_url" alt=""></li>
              </ul>
            </div>
            <div class="copyBox" v-if="item.type === '0' && (item.items[0].from_id === '11' || item.items[0].from_id === '12')&& item.items[0].zk_final_price">
              <p>
                {{item.items[0].title}}&nbsp;&nbsp;&nbsp;&nbsp;原价：{{item.items[0].zk_final_price}}券后：{{item.items[0].coupon_price}}，复制本条消息{{item.ambush}}打开【手机TAO宝】
              </p>
              <div @click="getWord(item)">复制<br>口令</div>
            </div>
          </div>
        </div>
        <div class="recommendBox conductBox" :key="index" v-else-if="(item.type === '0' || item.type === '1') && (item.items.length === 1 || item.items.length === 2 || item.items.length === 4)">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <p class="userName"><span>{{item.nickname}} </span> <span class="share" @click="share(item)">{{item.share_num}}</span></p>
            <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            <p class="earn" v-if="item.type === '0' && item.estimated_earn > 0"><img src="../../assets/img/source/money.png" alt="" >预估赚￥{{item.estimated_earn}}</p>
            <div class="text" v-html="item.title">
            </div>
            <div class="imgBox">
              <ul>
                <li v-for="(imgs,i) of item.items" :key="i" @click="detail(imgs)"><img :src="imgs.img_url" alt=""></li>
              </ul>
            </div>
            <div class="copyBox" v-if="item.type === '0' && (item.items[0].from_id === '11' || item.items[0].from_id === '12')&& item.items[0].zk_final_price">
              <p>
                {{item.items[0].title}}&nbsp;&nbsp;&nbsp;&nbsp;原价：{{item.items[0].zk_final_price}}券后：{{item.items[0].coupon_price}}，复制本条消息{{item.ambush}}打开【手机TAO宝】
              </p>
              <div @click="getWord(item)">复制<br>口令</div>
            </div>
          </div>
        </div>
        <div class="recommendBox"  :key="index" v-if="(item.type === '2')  && (item.items.length === 3 || item.items.length === 5 || item.items.length === 6 || item.items.length === 7 || item.items.length === 8 || item.items.length === 9)">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <p class="userName"><span>{{item.nickname}}</span> <span class="share" @click="share(item)">{{item.share_num}}</span></p>
            <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            <div class="text" v-html="item.title">
            </div>
            <div class="imgBox">
              <ul>
                <li v-for="(imgs,i) of item.items" :key="i"><img :src="imgs.img_url" alt=""></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="recommendBox conductBox" :key="index" v-else-if="(item.type === '2')  && (item.items.length === 1 || item.items.length === 2 || item.items.length === 4)">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <p class="userName"><span>{{item.nickname}} </span> <span class="share" @click="share(item)">{{item.share_num}}</span></p>
            <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            <div class="text" v-html="item.title">
            </div>
            <div class="imgBox">
              <ul>
                <li v-for="(imgs,i) of item.items" :key="i"><img :src="imgs.img_url" alt=""></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="recommendBox schoolBox" :key="index" v-else-if="(item.type === '3')  && item.video_img !== ''">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <div class="topBox">
              <p class="userName"><span>{{item.nickname}}</span> <span class="share" @click.stop="share(item)">{{item.share_num}}</span></p>
              <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            </div>
            <div class="titleText"  v-html="item.title"  @click="article(item)"></div>
            <img :src="item.video_img" alt="" class="videoC"  @click="article(item)">
            <p class="contentText"  @click="article(item)">{{item.article_title}}</p>
            <p class="go2"  @click="article(item)"><span>查看文章</span> <img src="../../assets/img/source/go.png" alt=""></p>
            <!--<p class="earn"><img src="../../assets/img/source/money.png" alt="">预估赚￥6.08</p>-->
            <!--<div class="text">-->
            <!--<p>深夜福利，先抢券，后下单<br>深夜福利，先抢券，后下单<br>深夜福利，先抢券，后下单</p>-->
            <!--</div>-->
            <!--<div class="imgBox">-->
            <!--<ul>-->
            <!--<li><img src="../../assets/img/source/test.png" alt=""></li>-->
            <!--<li><img src="../../assets/img/source/test.png" alt=""></li>-->
            <!--<li><img src="../../assets/img/source/test.png" alt=""></li>-->
            <!--<li><img src="../../assets/img/source/test.png" alt=""></li>-->
            <!--<li><img src="../../assets/img/source/test.png" alt=""></li>-->
            <!--&lt;!&ndash;<li><img src="../../assets/img/source/test.png" alt=""></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><img src="../../assets/img/source/test.png" alt=""></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><img src="../../assets/img/source/test.png" alt=""></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li><img src="../../assets/img/source/test.png" alt=""></li>&ndash;&gt;-->
            <!--</ul>-->
            <!--</div>-->
          </div>
        </div>
        <div class="recommendBox schoolBox" :key="index" v-else-if="(item.type === '3') && item.video_img === ''" @click="article(item)">
          <div class="headLeft"><img :src="item.head_img" alt=""></div>
          <div class="contentRight">
            <div class="topBox">
              <p class="userName"><span>{{item.nickname}}</span> <span class="share" @click.stop="share(item)">{{item.share_num}}</span></p>
              <p class="time">{{item.created_at*1000 | dateFormat}}</p>
            </div>
            <div class="titleText" v-html="item.title"  @click="article(item)"></div>
            <div class="intreduce"  @click="article(item)">
              <img :src="item.article_img" alt="">
              <div>
                <p class="text1">{{item.article_title}}</p>
                <p class="go2"><span>查看文章</span> <img src="../../assets/img/source/go.png" alt=""></p>
              </div>
            </div>

          </div>
        </div>
      </template>
      <div id="empty"></div>
      <!--<div v-transfer-dom class="preview">-->
        <!--<previewer :list="imgs" ref="previewer"></previewer>-->
      <!--</div>-->
    </mescroll-vue>
  </div>
</template>

<script>
import {Tab, TabItem, dateFormat, TransferDomDirective as TransferDom} from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import barrage from '../../components/barrage.vue'
import * as utils from '../../utils'
export default {
  name: 'materials',
  directives: {
    TransferDom
  },
  data () {
    return {
      downArr: [],
      imgArr: [],
      item: '',
      show: false,
      show2: false,
      show3: false,
      textlist: ['这是第一条弹幕', '这是第二条弹幕', '这是第三条弹幕', '这是第四条弹幕'],
      imgSrc: require('../../assets/img/home/jdshop.png'),
      // imgSrc:"http://b-ssl.duitang.com/uploads/item/201812/05/20181205211932_xvslr.jpeg",
      show1: false,
      list: [],
      cate: '',
      cateIndex: 0,
      secondIndex: 'all',
      mescroll: null,
      mescrollDown: {
        auto: true,
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
      }
    }
  },
  filters: {
    dateFormat
  },
  components: {
    Tab, TabItem, MescrollVue, barrage
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.show = false
      vm.$nextTick(() => {
        vm.show = true
      })
    })
  },
  methods: {
    getWord (item) {
      if (!this.$store.state.user.token) {
        this.$router.push('/wechatLogin')
        return
      }
      let that = this
      if (item.ambush !== '$淘口令$') {
        let clipBoard = api.require('clipBoard')
        clipBoard.set({
          value: item.ambush
        }, function (ret, err) {
          if (ret) {
            utils.storage.set('copyWord', item.ambush)
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
          id: item.items[0].goods_id,
          item_url: item.items[0].coupon_url,
          type: item.items[0].from_id
        }, false, true).then(res => {
          if (res.code === 0) {
            this.$http.post('/amoy/user/create-tpwd', {
              id: item.items[0].goods_id,
              item_url: item.items[0].coupon_url,
              title: item.items[0].title,
              logo: item.items[0].img_url
            }, false, true).then((res) => {
              if (res.code === 0) {
                that.$vux.loading.hide()
                item.ambush = res.data
                let clipBoard = api.require('clipBoard')
                clipBoard.set({
                  value: item.copy_comment
                }, function (ret, err) {
                  if (ret) {
                    utils.storage.set('copyWord', res.data)
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
    detail (goods) {
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=' + goods.from_id + '&id=' + goods.goods_id + '&i=0&way=1')
    },
    friend () {
      this.show2 = false
      this.show1 = false
      this.friendOne(0)
    },
    friendOne () {
      this.$store.commit('show')
      let that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgArr[0],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        that.$store.commit('hide')
        var wx = api.require('wx')
        wx.shareImage({
          scene: 'timeline',
          contentUrl: 'fs://' + format
        }, function (ret, err) {
          that.$http.post('/amoy/material/share-num-add', {
            id: that.item.id
          }, false, true).then((res) => {
            if (res.code === 0) {
              that.item.share_num = Number(that.item.share_num) + 1
            }
          })
        })
      })
    },
    shareArr (j) {
      this.$store.commit('show')
      let that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgArr[j],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        if (ret.state === 1) {
          that.downArr.push('fs://' + format)
        }
        if ((j + 1) >= that.imgArr.length) {
          that.$store.commit('hide')
          that.$http.post('/amoy/material/share-num-add', {
            id: that.item.id
          }, false, true).then((res) => {
            if (res.code === 0) {
              that.item.share_num = Number(that.item.share_num) + 1
            }
          })
          let sharedModule = api.require('shareAction')
          sharedModule.share({
            images: that.downArr,
            type: 'image'
          })
        } else {
          that.shareArr(j + 1)
        }
      })
    },
    imgShare () {
      this.show2 = false
      this.show1 = false
      this.shareArr(0)
    },
    imgDown () {
      this.show2 = false
      this.show1 = false
      this.save(0)
    },
    save (j) {
      this.$store.commit('show')
      let that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: that.imgArr[j],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        api.saveMediaToAlbum({
          path: 'fs://' + format
        }, function (ret, err) {
          if ((j + 1) >= that.imgArr.length) {
            that.$store.commit('hide')
            that.$vux.toast.text('图片已经保存到相册')
          } else {
            that.save(j + 1)
          }
        })
      })
    },
    articleDownOne () {
      this.show3 = false
      let that = this
      let img = that.item.video_img ? that.item.video_img : that.item.article_img
      let format = 'share' + new Date().getTime() + '.jpg'
      api.download({
        url: img,
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        api.saveMediaToAlbum({
          path: 'fs://' + format
        }, function (ret, err) {
          that.$vux.toast.text('图片已经保存到相册')
        })
      })
    },
    articleShare (type) {
      this.show3 = false
      let that = this
      // alert()
      // that.$http.post('/amoy/material/share-num-add', {
      //   id: that.item.id
      // }, false, true).then()
      if (type === 1) {
        let wx = api.require('wx')
        wx.shareWebpage({
          scene: 'session',
          title: that.item.title,
          description: that.item.article_title,
          contentUrl: that.item.article_url
        }, function (ret, err) {
          that.$http.post('/amoy/material/share-num-add', {
            id: that.item.id
          }, false, true).then((res) => {
            if (res.code === 0) {
              that.item.share_num = Number(that.item.share_num) + 1
            }
          })
        })
      } else if (type === 2) {
        let wx = api.require('wx')
        wx.shareWebpage({
          scene: 'timeline',
          title: that.item.title,
          description: that.item.article_title,
          contentUrl: that.item.article_url
        }, function (ret, err) {
          that.$http.post('/amoy/material/share-num-add', {
            id: that.item.id
          }, false, true).then((res) => {
            if (res.code === 0) {
              that.item.share_num = Number(that.item.share_num) + 1
            }
          })
        })
      } else if (type === 3) {
        let sharedModule = api.require('shareAction')
        sharedModule.share({
          text: that.item.article_url,
          type: 'text'
        })
        that.$http.post('/amoy/material/share-num-add', {
          id: that.item.id
        }, false, true).then((res) => {
          if (res.code === 0) {
            that.item.share_num = Number(that.item.share_num) + 1
          }
        })
      }
    },
    share (item) {
      this.item = item
      this.imgArr = []
      this.downArr = []
      if (item.type === '3') {
        this.show3 = true
      } else if (item.type === '2') {
        for (let i = 0; i < this.item.items.length; i++) {
          this.imgArr.push(this.item.items[i].img_url)
        }
        this.show2 = true
      } else if (item.type === '1') {
        for (let i = 0; i < this.item.items.length; i++) {
          let img
          if (this.item.items[i].goods_id) {
            img = this.link + '/amoy/user/create-share?num_iid=' + this.item.items[i].goods_id + '&item_url=' + this.item.items[i].coupon_url + '&type=' + this.item.items[i].from_id + '&title=' + encodeURI(this.item.items[i].title) + '&thumb=' + this.item.items[i].img_url + '&coupon_money=' + this.item.items[i].coupon_money + '&coupon_price=' + this.item.items[i].coupon_price + '&origin_price=' + this.item.items[i].zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
          } else {
            img = this.item.items[i].img_url
          }
          this.imgArr.push(img)
        }
        this.show1 = true
      } else if (item.type === '0') {
        for (let i = 0; i < this.item.items.length; i++) {
          let img
          if (this.item.items[i].goods_id) {
            img = this.link + '/amoy/user/create-share?num_iid=' + this.item.items[i].goods_id + '&item_url=' + this.item.items[i].coupon_url + '&type=' + this.item.items[i].from_id + '&title=' + encodeURI(this.item.items[i].title) + '&thumb=' + this.item.items[i].img_url + '&coupon_money=' + this.item.items[i].coupon_money + '&coupon_price=' + this.item.items[i].coupon_price + '&origin_price=' + this.item.items[i].zk_final_price + '&uid=' + this.$store.state.user.userInfo.uid
          } else {
            img = this.item.items[i].img_url
          }
          this.imgArr.push(img)
        }
        this.show1 = true
      }
    },
    article (item) {
      if (item.type === '3') {
        let browser = api.require('webBrowser')
        browser.open({
          url: item.article_url,
          titleBar: {
            textColor: '#333',
            bg: '#fff'
          }
        })
      }
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      if (page.num !== 1) {
        page.num--
      }
      this.$http.post('/amoy/material/material-list', {
        page: page.num,
        fcid: this.cate[this.cateIndex].id,
        cid: this.secondIndex
      }, true, true).then((res) => {
        if (res.code === 0) {
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          if (res.data[0] && res.data[0].min_id) {
            this.mescrollUp.page.num = res.data[0].min_id
          } else {
            this.mescrollUp.page.num += 1
          }
          if (this.list.length === 0) {
            this.mescrollUp.page.num = 1
          }
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    changeCate (cid) {
      this.secondIndex = cid
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    },
    getList () {
      this.$http.post('/amoy/material/material-cate').then((res) => {
        this.cate = res.data.materCate
      })
    }
  },
  beforeCreate () {
    window.RAF = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
    })()
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
  },
  mounted () {
    this.getList()
  }
}
</script>
<style lang="less">
  .shareArea {
    z-index: 2001;
    position: absolute;
    top: 0;
    font-size: .3rem;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    .outBox {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-top: .11rem;
      background-color: #222;
      border-radius:.2rem .2rem 0px 0px;
      overflow: hidden;

      .aim {
        padding: .54rem 0;
        font-size: .32rem;
        color: #999;
        text-align: center;
      }
      .ulbox {
        width: 100%;
        overflow-x: scroll;
        ul {
          overflow: hidden;
          display: flex;
          li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding-bottom: .84rem;
            img {
              display: inline-block;
              width: .98rem;
              height: .98rem;
            }
            p {
              margin-top: 0.2rem;
              color: #fff;
              text-align: center;
              font-size: .24rem;
            }
          }
        }
      }
      .cancle {
        font-size: .28rem;
        line-height: 1rem;
        color: #999;
        text-align: center;
        background-color: #333;
      }
    }
  }
</style>
<style lang="less">
  .preview{
    .pswp__button--fs{
      display: none !important;
    }
  }
  #materials{

  }
</style>
<style scoped lang="less">
  #materials{
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    .mate_her {
      position: relative;
    }
    .top2 {
      margin-top: .2rem;
    }
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
    }
    #store {
      padding: .28rem 0;
      width: 100%;
      overflow-x: scroll;
      ul {
        display: -webkit-box;
        flex-wrap: nowrap;
        line-height: 1.1rem;
        overflow-x: auto;
        padding: 0 .18rem;
        -webkit-overflow-scrolling:touch;
        li {
          font-size: .28rem;
          height: .56rem;
          margin: 0 .11rem;
          padding: 0 .6rem;
          line-height: .56rem;
          text-align: center;
          border-radius: .28rem;
          background-color: #fff;
        }
        li.selected {
          color: #FF453A;
        }
      }
    }
    .recommendBox {
      font-size: .28rem;
      padding: .3rem .4rem .3rem .2rem;
      background-color: #fff;
      .headLeft {
        float: left;
        width: .66rem;
        height: .66rem;
        img {
          width: 100%;
        }
      }
      .contentRight {
        padding-left: .77rem;
        .userName {
          font-size: .3rem;
          line-height: .3rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          img {
            display: inline-block;
            width: .32rem;
            height: .32rem;
            vertical-align: middle;
          }
          .share {
            position: relative;
            height: .42rem;
            color: #FF5847;
            line-height: .42rem;
            font-size: .26rem;
            border-radius: .21rem;
            padding: 0 .2rem 0 .5rem;
            box-sizing: border-box;
            background-color: #FFEDED;
            &:before {
              content: "";
              display: inline-block;
              width: .24rem;
              height: .24rem;
              position: absolute;
              top: .1rem;
              left: .2rem;
              background-image: url(../../assets/img/source/share.png);
              background-size:cover;
              background-repeat: no-repeat;
            }
          }
        }
        .time {
          font-size: .2rem;
          color: #999;
          margin-bottom: .1rem;
        }
        .earn {
          color: #FF5847;
          img {
            display: inline-block;
            width: .28rem;
            height: .28rem;
            margin-right: .1rem;
          }
        }
        .text {
          color: #333333 !important;
          font-size: .28rem !important;
          p {
            font-size: .28rem;
            line-height: .4rem;
            span {
              color: #FF5847;
              img {
                display: inline-block;
                width: .18rem;
                height: .16rem;
              }
            }
          }
        }
        .imgBox {
          overflow: hidden;
          margin-top: .15rem;
          ul {
            width: 105%;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 1.96rem;
              height: 1.96rem;
              margin: 0 .13rem .13rem 0;
              img {
                width: 100%;
              }
            }
          }
        }
        .copyBox {
          display: flex;
          padding: .2rem;
          border: 1px dashed #FF5847;
          border-radius: .1rem;
          margin-top: .3rem;
          p {
            flex: 1;
            font-size: .24rem;
            color: #666;
            line-height: .4rem;
            height: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          div {
            width: .84rem;
            font-size: .24rem;
            color: #FF5847;
            line-height: .44rem;
            padding: .27rem 0;
            text-align: center;
            background-color: #FCEDEE;
            border-radius: .1rem;
            box-sizing: border-box;
          }
        }
      }
    }
    .conductBox {
      font-size: .28rem;
      padding: .3rem .4rem .3rem .2rem;
      background-color: #fff;
      .headLeft {
        float: left;
        width: .66rem;
        height: .66rem;
        img {
          width: 100%;
        }
      }
      .contentRight {
        padding-left: .77rem;
        .userName {
          font-size: .3rem;
          line-height: .3rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          img {
            display: inline-block;
            width: .32rem;
            height: .32rem;
            vertical-align: middle;
          }
          .share {
            position: relative;
            height: .42rem;
            line-height: 1;
            font-size: .26rem;
            border-radius: .21rem;
            padding: .1rem .2rem .1rem .5rem;
            box-sizing: border-box;
            background-color: #FFEDED;
            &:before {
              content: "";
              display: inline-block;
              width: .24rem;
              height: .24rem;
              position: absolute;
              top: .1rem;
              left: .2rem;
              background-image: url(../../assets/img/source/share.png);
              background-size:cover;
              background-repeat: no-repeat;
            }
          }
        }
        .time {
          font-size: .2rem;
          color: #999;
          margin-bottom: .1rem;
        }
        .earn {
          color: #FF5847;
          img {
            display: inline-block;
            width: .28rem;
            height: .28rem;
            margin-right: .1rem;
          }
        }
        .text {
          p {
            font-size: .28rem;
            line-height: .4rem;
            span {
              color: #FF5847;
              img {
                display: inline-block;
                width: .18rem;
                height: .16rem;
              }
            }
          }
        }
        .imgBox {
          overflow: hidden;
          margin-top: .15rem;
          ul {
            width: 105%;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 2.87rem;
              height: 2.87rem;
              margin: 0 .1rem .1rem 0;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .schoolBox {
      font-size: .28rem;
      padding: .3rem .4rem .3rem .2rem;
      background-color: #fff;
      .headLeft {
        float: left;
        width: .66rem;
        height: .66rem;
        img {
          width: 100%;
        }
      }
      .go2 {
        font-size: .26rem;
        color: #FF453A;
        display: flex;
        align-items: center;
        img {
          height: .2rem;
          width: 0.25rem;
          margin-top: -0.04rem;
        }
      }
      .contentRight {
        padding-left: .77rem;
        .videoC{
          width: 5rem;
          height: 2.7rem;
        }
        .userName {
          font-size: .3rem;
          line-height: .3rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          img {
            display: inline-block;
            width: .32rem;
            height: .32rem;
            vertical-align: middle;
          }
          .share {
            position: relative;
            height: .42rem;
            line-height: 1;
            font-size: .26rem;
            border-radius: .21rem;
            padding: .1rem .2rem .1rem .5rem;
            box-sizing: border-box;
            background-color: #FFEDED;
            &:before {
              content: "";
              display: inline-block;
              width: .24rem;
              height: .24rem;
              position: absolute;
              top: .1rem;
              left: .2rem;
              background-image: url(../../assets/img/source/share.png);
              background-size:cover;
              background-repeat: no-repeat;
            }
          }
        }
        .time {
          font-size: .2rem;
          color: #999;
          margin-bottom: .1rem;
        }
        .earn {
          color: #FF5847;
          img {
            display: inline-block;
            width: .28rem;
            height: .28rem;
            margin-right: .1rem;
          }
        }
        .text {
          p {
            font-size: .28rem;
            line-height: .4rem;
            span {
              color: #FF5847;
              img {
                display: inline-block;
                width: .18rem;
                height: .16rem;
              }
            }
          }
        }
        .topBox {
          border-bottom: 1px solid #eee;
        }
        .titleText {
          font-size: .28rem;
          color: #333;
        }
        .contentText {
          font-size: .26rem;
          color: #666666;
          line-height: .38rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      .intreduce {
        display: flex;
        margin-top: .15rem;
        img {
          display: inline-block;
          width: 1.6rem;
          height: 1.6rem;
          margin-right: .2rem;
        }
        .text1 {
          flex: 1;
          font-size: .26rem;
          color: #666666;
          height: 1.14rem;
          line-height: .38rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          /*span {*/
            /*font-size: .26rem;*/
            /*img {*/
              /*display: inline-block;*/
              /*height: .26rem;*/
              /*width: .3rem;*/
              /*vertical-align: middle;*/
            /*}*/
          /*}*/
        }
        .go2 {
          font-size: .26rem;
          color: #FF453A;
          display: flex;
          align-items: center;
          img {
            height: .2rem;
            width: 0.25rem;
            margin-top: -0.04rem;
          }
        }
      }
    }
    .fixedTop{
      position: fixed;
      top: 0;
    }
  }
</style>
