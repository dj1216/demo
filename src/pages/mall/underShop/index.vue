<template>
  <div class="UnderIndex Bindex">
    <div class="seach_main" style="height: 0.9rem">
      <div class="home_seach">
        <div class="home_seach_left" @click="selectCity()">
          <p>{{city || '定位'}}</p>
        </div>
        <div class="home_seach_input" @click="jumpTo({name:'search',query:{type:'shop'}})">
          <div class="input_box">
            <img src="../../../assets/mall/img/home/seach.png" alt="">
            <p>请输入关键字</p>
          </div>
        </div>
        <i style="position: absolute;right: .5rem;color: #b6b6b6;" class="iconfont icon-saoyisao" @click.stop="handleQrcode()"></i>
        <img v-if="!$isMallShop" style="width: .4rem;height: .4rem;margin-left: .3rem" src="../../../assets/mall/img/home/bottom/my.png" alt="" @click="jumpTo({name: 'mallUnderMy'})">
      </div>
    </div>
    <div class="allBox">
      <div class="allList" @click='goJump(1)'>
        <img src="../../../assets/mall/img/home/bottom/shouye_active.png">
        <span>首页</span>
      </div>
      <div class="allList" @click='goJump(2)'>
        <img src="../../../assets/mall/img/home/bottom/shop_active.png">
        <span>商家</span>
      </div>
      <div class="allList" @click='goJump(3)'>
        <img src="../../../assets/mall/img/home/bottom/shouye_active.png">
        <span>购物车</span>
      </div>
      <div class="allList" @click='goJump(4)'>
        <img src="../../../assets/mall/img/home/bottom/my_active.png">
        <span>个人中心</span>
      </div>
    </div>
    <div class="mescrollBox" :style="{'bottom': $isMallShop ? '43px' : '0'}">
      <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div ref="mate">
          <div class="home_main" style="padding-bottom: 0.15rem">
            <div class="banner" style="position:relative" v-if="list1.slide">
              <swiper :options="swiperOption" ref="mySwiper" style="height:100%;">
                <swiperSlide v-for="(item,i) in list1.slide" :key="i" @click="jumpTos(item)">
                  <img v-lazy="item.thumb" alt="" style="width:100%;height:3.4rem;">
                </swiperSlide>
              </swiper>
              <div class="swiper-banner" slot="pagination"></div>
            </div>
            <swiper class="banner_list" :options="swiperOption1" ref="navButton" v-if="list1.navInfo">
              <swiper-slide class="allBox" v-for="(item,i) in list1.navInfo" :key="i">
                <div class="allList" v-for="(val,j) in item" :key="j">
                  <img v-lazy="val.thumb" alt="" @click="jumpTos(val)">
                  <p>{{val.title}}</p>
                </div>
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
          <div class="home_header" v-if="list1.fuShopsSlide">
            <img v-lazy="list1.fuShopsSlide ? list1.fuShopsSlide[0].thumb : ''" alt="">
          </div>
        </div>
        <div  ref="tabBox" class="tabBox" :class="{sticky: isIos}">
          <div class="tab">
            <div :class="active == 1 ? 'active' : ''" @click="handChange(1)">
              综合
              <span></span>
            </div>
            <div :class="active == 2 ? 'active' : ''" @click="handChange(2)">
              销量
              <span></span>
            </div>
            <div :class="active == 3 ? 'active' : ''" @click="handChange(3)">
              好评
              <span></span>
            </div>
          </div>
        </div>
        <Under :list="suggest"></Under>
        <div class="tab_main" v-if="!$isMallShop">
          <p @click="jumpTo({name:'home'})" style="margin-bottom: .1rem;">
            <img src="../../../assets/mall/img/fanhui.png" alt="">
          </p>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Under from '../../../components/underList'
  import * as apiHttp from '../../../api/index'
  import './underLess.less'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    name: "index",
    components: {
      swiper,
      swiperSlide,
      Under,
      MescrollVue
    },
    data(){
      return {
        swiperOption: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true,
          disabledClass: 'my-button-disabled',
          hiddenClass: 'my-button-hidden',
          spaceBetween: 5,
          autoplay:true,
          pagination: {
            el: '.swiper-banner'
          }
        },
        finish: false,
        swiperOption1: {
          slidesPerView : 5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
          }
        },
        suggest:[],
        list1:[],
        loading:false,
        active:1,
        isCityShow: false,
        city: null,
        lon: null,
        lat: null,
        isDingwei: true,
        currentCity: null,
        mescroll: null,
        mescrollDown: {
          auto: true,
          callback: this.refresh,
          htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
        },
        mescrollUp: {
          auto: false,
          onScroll: this.handleScroll,
          callback: this.upCallback,
          page: {
            num: 0
          },
          htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
          noMoreSize: 5,
          toTop: {
            src: './static/img/auth/back_top.png',
            offset: 1000
          },
          empty: {
            warpId: '',
            icon: '',
            tip: '暂无相关数据~'
          }
        },
        lastScrollTop: 0, // 路由切换时滚动条的位置
        lastBounce: null, // 路由切换时是否禁止ios回弹
        isIos: api.systemType === 'ios',
        h: api.safeArea.top,
        statusBar: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.mescroll) {
          // 滚动到之前列表的位置
          if (vm.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.lastScrollTop)
            setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
            }, 16)
          }
          // 恢复到之前设置的isBounce状态
          if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce)
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      if (this.mescroll) {
        this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
      }
      if (this.isCityShow) {
        var UICityList = api.require('UICityList');
        UICityList.close()
      }
      next()
    },
    methods:{
        selectCity () {
          console.log(this.h)
          if (this.isDingwei) {
            let that = this
            var UICityList = api.require('UICityList');
            UICityList.open({
              rect: {
                x: 0,
                y: this.h,
                w: api.frameWidth,
                h: api.frameHeight
              },
              resource : 'widget://res/UICityList.json',
              styles: {
                searchBar: {    //（可选项）JSON对象；顶部搜索条的样式
                  height: 40,                 //（可选项）数字类型；搜索框区域高度；默认：40
                  bgColor: '#696969',         //（可选项）字符串类型；搜索条背景色，支持 rgb、rgba、#；默认：'#696969'
                  cancelColor: '#E3E3E3' ,     //（可选项）字符串类型；取消文字颜色，支持 rgb、rgba、#，默认：'#E3E3E3'
                  contentBgColor: '#ffffff',    //（可选项）字符串类型；搜索框输入区域背景色
                  cancelText: '取消',          //(可选项) 字符串类型；取消按钮的文本；默认：'取消'；此参数只在android平台有效
                  hidden: false              //（可选项）布尔类型：是否隐藏搜索框；默认：false
                },
                location: {                     //（可选项）JSON对象；定位提示文字样式
                  color: '#696969',           //（可选项）字符串类型；定位提示文字颜色，支持 rgb、rgba、#，默认：'#696969'
                  size: 12                    //（可选项）数字类型；定位提示文字大小，默认：12.0
                },
                hotCity: {                      //（可选项）JSON对象；热门城市矩阵分布样式配置，若不传则表示热门城市呈列表显示
                  column: 5,                  //（可选项）数字类型；每行显示列数；默认：5
                  width: 48,                  //（可选项）数字类型；按钮的宽；默认：48
                  height: 30,                 //（可选项）数字类型；按钮的高；默认：30
                  interval: 20,               //（可选项）数字类型；按钮排列行间距；默认：20
                  corner: 15,                 //（可选项）数字类型；按钮圆角大小；默认：15
                  color: '#000',              //（可选项）字符串类型；按钮边框和标题常态时的颜色，支持rgb、rgba、#；默认：#000
                  active: '#fc3357'              //（可选项）字符串类型；按钮点击高亮状态色值，支持rgb、rgba、#；默认：#f00
                },
                sectionTitle: {                 //（可选项）JSON对象；标题的样式
                  bgColor: '#eee',            //（可选项）字符串类型；标题的背景色，支持 rgb、rgba、#；默认：'#EEEEEE'
                  color: '#000',              //（可选项）字符串类型；标题文字颜色，支持 rgb、rgba、#；默认：'#000000'
                  size: 12,                   //（可选项）数字类型；标题文字大小；默认：12.0
                  height: 25                  //（可选项）数字类型；区域标题的高度，默认：25.0
                },
                item: {                         //（可选项）JSON对象；列表项的样式
                  bgColor: '#fff',            //（可选项）字符串类型；列表项的背景色，支持 rgb、rgba、#；默认：'#FFFFFF'
                  activeBgColor: '#696969',   //（可选项）字符串类型；列表项按下时的背景色，支持 rgb、rgba、#；默认：'#696969'
                  color: '#000',              //（可选项）字符串类型；列表项的文字颜色，支持 rgb、rgba、#，默认：'#000000'
                  size: 14,                   //（可选项）数字类型；列表项的文字大小，默认：14.0
                  height: 40                  //（可选项）数字类型；列表项的高度，默认：40.0
                },
                indicator: {                    //（可选项）JSON对象；右侧字母导航条样式
                  bgColor: '#fff',            //（可选项）字符串类型；字母导航条背景色，支持 rgb、rgba、#，默认：'#FFFFFF'
                  color: '#696969'            //（可选项）字符串类型；字母导航条字母颜色，支持 rgb、rgba、#，默认：'#696969'
                }
              },
              currentCity: '北京',
              locationWay: 'GPS',
              hotTitle: '热门城市',
              fixedOn: api.frameName,
              placeholder: '输入城市名或首字母查询'
            }, function(ret, err) {
              if (ret) {
                that.isCityShow = true
                if (ret.eventType == 'selected') {
                  that.city = ret.cityInfo.city
                  UICityList.close()
                  var map = api.require('bMap');
                  map.getCoordsFromName({
                    city: that.city,
                    address: that.city
                  }, function(ret, err) {
                    console.log(JSON.stringify(ret))
                    if (ret.status) {
                      that.lon = ret.lon
                      that.lat = ret.lat
                      console.log(that.lon, that.lat)
                      that.upCallback(that.mescrollUp.page, that.mescroll)
                    }
                  });
                }
              } else {
                console.log(JSON.stringify(err))
              }
            });
          } else {
            this.$vux.toast.text('请手动开启定位!')
          }
        },
        seller(id){
          console.log(id)
          this.$router.push({
            name:'seller',
            query:{
              id:id
            }
          })
        },
        goJump (name){
          console.log(name)
          if (name === 1) {
            this.$router.push('/mall/home')
          }else if (name === 2) {
            this.$router.push('/mall/business')
          }else if(name === 3){
            this.$router.push('/mall/cart')
          }else{
            this.$router.push('/mall/my')
          }
        },
        handChange (key){
          this.active = key
          this.suggest = []
          this.mescrollUp.page.num = 1
          this.upCallback(this.mescrollUp.page, this.mescroll)
        },
        getInfo () {
          apiHttp.underIndex().then(res=>{
            if(res.code === 0){
              this.list1=res.data
            }
            this.$nextTick(() => {
              this.mescroll.endSuccess(this.list1, false)
            })
          })
        },
        mescrollInit (mescroll) {
          this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
          this.$http.post('/mall/oto/shops-list',{lng:this.lon,lat:this.lat,disType: this.active, page: page.num}).then(res => {
            if (res.code === 0) {
              let arr = res.data.shopList === '' ? [] : res.data.shopList
              if (page.num === 1) this.suggest = []
              this.suggest = this.suggest.concat(arr)
              this.$nextTick(() => {
                mescroll.endSuccess(res.data.shopList.length, true)
              })
            }
          }).catch((e) => {
            mescroll.endErr()
          })
        },
        refresh: function () {
          this.finish = false
          this.mescrollUp.page.num = 1
          this.getInfo()
          let that = this
          var bMap = api.require('bMap');
          bMap.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
          }, function(ret, err) {
            if (ret.status) {
              // 根据经纬度获取当前位置
              bMap.getNameFromCoords({
                lon: ret.lon,
                lat: ret.lat
              }, function(ret, err) {
                if (ret.status) {
                  console.log(JSON.stringify(ret))
                  that.city = ret.city
                  that.lon = ret.lon
                  that.lat = ret.lat
                  that.upCallback(that.mescrollUp.page, that.mescroll)
                }
              })
            } else {
              that.isDingwei = false
              that.upCallback(that.mescrollUp.page, that.mescroll)
            }
          });
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
        },
        // 扫码
        handleQrcode () {
          var FNScanner = api.require('FNScanner');
          let This = this
          FNScanner.open({
            autorotation: true
          }, function(ret, err) {
            if (ret.eventType == 'success') {
              console.log(ret.content);
              apiHttp.underQrcodeSecc(ret.content).then(res => {
                if (res.code === 0) {
                  if (res.data.type === 'sadmin') {
                    console.log(res.data)
                    This.$router.push({
                      name: 'mallPayUnder',
                      query: {spid: res.data.spid, price: res.data.price}
                    })
                  } else if (res.data.type === 'coupon') {
                    console.log(res.data)
                    This.$router.push({
                      name: 'mallUnderCancel',
                      query: {spid: res.data.spid, id: res.data.id}
                    })
                  } else if (res.data.type === 'goods') {
                    console.log(res.data)
                    This.$router.push({
                      name: 'mallHomeDetail',
                      query: {title: res.data.goodsId}
                    })
                  } else if (res.data.type === 'shops' && res.data.model === 'bbc') {
                    console.log(res.data)
                    This.$router.push({
                      name: 'mallSeller',
                      query: {spid: res.data.spid}
                    })
                  } else if (res.data.type === 'shops' && res.data.model === 'oto') {
                    console.log(res.data)
                    This.$router.push({
                      name: 'mallUnderdetail',
                      query: {spid: res.data.spid}
                    })
                  } else if (res.data.type === 'order') {
                    This.$router.push({
                      name: 'mallOff_order_detail',
                      query: {orderId: res.data.orderId, bdelete: res.data.bdelete}
                    })
                  }
                }
              })
            } else {
              console.log(JSON.stringify(err));
            }
          });
        }
      }
  }
</script>

<style lang="less">
  .allBox {
    overflow: hidden;
    background: #fff;
    display: flex;
    height: 1.05rem;
    .allList {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        margin-bottom: .05rem;
      }

      span {
        font-size: .24rem;
        word-break: keep-all;
      }
    }
  }
  .UnderIndex{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: 2.1rem;
      bottom: 0px;
      height: auto !important;
      .swiper-pagination{
        bottom: 10px;
        width: 100%;
        margin:0 auto;
        left: 0;
      }
      .tabBox{
        width: 100%;
        z-index: 1000;
        background: #fff;
        margin-top: .1rem;
      }
      .fixedTop{
        position: fixed;
        top: 1.2rem;
      }
      .sticky{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
      }
    }
  }
  .swiper-banner{
    bottom: 10px;
    position: absolute;
    z-index: 333;
    width: 100%;
    text-align: center;
  }
  .my-bullet{
    border-radius: .1rem;
    width: .1rem;
    height: .1rem;
    margin: .05rem;
    display:inline-block;
    background:rgba(0,0,0,0.20);
    display: inline-block;
  }
  .my-bullet-active{
    display: inline-block;
    background:#fc3357;
    width: .2rem
  }
  .Bindex ._v-container{
    top:0.9rem;
    height: calc(100% - 0.9rem) !important;
  }
  .back_top{
    position: fixed;
    bottom:1rem;
    right: 0.35rem;
  }
  .back_top>img{
    width: 0.74rem;
    height: 0.74rem;
  }
</style>
