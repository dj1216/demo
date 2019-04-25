// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import {XHeader, ToastPlugin, ConfirmPlugin, LoadingPlugin} from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import './pages/mall/home/home.less'
import './pages/mall/my/my.less'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'
import {bizId, isMallUnderShop, isMallShop, aliPay} from './bizId'

require('./api/mock.js')
Vue.use(Clipboard)
Vue.use(Vuex)
Vue.use(ToastPlugin, {position: 'bottom'})
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(VueScroller)
Vue.prototype.$http = http
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
  loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
  preLoad: 2,
  error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
  adapter: 1
})
http.post('/amoy/app/info', {}, false).then(res => {
  if (res.code === 0) {
    if (res.data.defaultImg.DEFAULT_IMG) {
      utils.storage.set('defaultImg', res.data.defaultImg.DEFAULT_IMG)
    }
    if (res.data.defaultImg.FAILURE_IMG) {
      utils.storage.set('errorImg', res.data.defaultImg.FAILURE_IMG)
    }
    Vue.prototype.$logo = res.data.appLoginLogo
    Vue.prototype.$img = res.data.defaultImg.DEFAULT_IMG ? res.data.defaultImg.DEFAULT_IMG : require('@/assets/img/bg.png')
    Vue.use(VueLazyload, {
      loading: res.data.defaultImg.DEFAULT_IMG ? res.data.defaultImg.DEFAULT_IMG : require('@/assets/img/bg.png'),
      preLoad: 2,
      error: res.data.defaultImg.FAILURE_IMG ? res.data.defaultImg.FAILURE_IMG : require('@/assets/img/error.png'),
      adapter: 1
    })
  } else {
    Vue.prototype.$img = require('@/assets/img/bg.png')
    Vue.use(VueLazyload, {
      loading: require('@/assets/img/bg.png'),
      preLoad: 2,
      error: require('@/assets/img/error.png'),
      adapter: 1
    })
  }
})

// 右滑相关代码 —————————————start—————————————————
window.canRightSlipBack = true;
Vue.prototype.rightSlip = function () {
  if (window.canRightSlipBack) {
    router.go(-1)
  }
}
Vue.prototype.forbidRightSlip = function(){
  window.canRightSlipBack = false;
}
Vue.prototype.allowRightSlip = function(){
  setTimeout(() => {
  window.canRightSlipBack = true;
  }, 600);
}
function vueTouch(el, binding, type) { //触屏函数
  var _this = this;
  this.obj = el;
  this.binding = binding;
  this.touchType = type;
  this.vueTouches = {
    x: 0,
    y: 0
  }; //触屏坐标
  this.vueMoves = true;
  this.vueLeave = true;
  this.vueCallBack = typeof (binding.value) == "object" ? binding.value.fn : binding.value;
  this.obj.addEventListener("touchstart", function (e) {
    _this.start(e);
  }, false);
  this.obj.addEventListener("touchend", function (e) {
    _this.end(e);
  }, false);
  this.obj.addEventListener("touchmove", function (e) {
    _this.move(e);
  }, false);
  this.start = function (e) { //监听touchstart事件
    this.vueMoves = true;
    this.vueLeave = true;
    this.longTouch = true;
    this.vueTouches = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
        this.longTouch = false;
      };
    }.bind(this), 1000);
  };
  this.end = function (e) { //监听touchend事件
    var disX = e.changedTouches[0].pageX - this.vueTouches.x; //计算移动的位移差
    var disY = e.changedTouches[0].pageY - this.vueTouches.y;
    clearTimeout(this.time);
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) { //当横向位移大于10，纵向位移大于100，则判定为滑动事件
      this.touchType == "swipe" && this.vueCallBack(this.binding.value, e); //若为滑动事件则返回
      if (Math.abs(disX) > Math.abs(disY)) { //判断是横向滑动还是纵向滑动
        if (disX > 10) {
          this.touchType == "swiperight" && this.vueCallBack(this.binding.value, e); //右滑
        };
        if (disX < -10) {
          this.touchType == "swipeleft" && this.vueCallBack(this.binding.value, e); //左滑
        };
      } else {
        if (disY > 10) {
          this.touchType == "swipedown" && this.vueCallBack(this.binding.value, e); //下滑
        };
        if (disY < -10) {
          this.touchType == "swipeup" && this.vueCallBack(this.binding.value, e); //上滑
        };
      };
    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType == "tap" && this.vueCallBack(this.binding.value, e);
        this.vueLeave = false
      };
    };
  };
  this.move = function (e) { //监听touchmove事件
    this.vueMoves = false;
  }
};

Vue.directive("swiperight", { //右滑事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swiperight");
  }
});
// 右滑相关代码 —————————————end—————————————————

Vue.component('x-header', XHeader)

Vue.use(plugin, {router: router})

Vue.config.productionTip = false
Vue.prototype.link = 'http://www.duoduoshare.com/api/' + bizId
Vue.prototype.$color = '#fc3357'
// 控制线下的内容是否开启
Vue.prototype.$isMallUnderShop = isMallUnderShop
// 支付宝支付模块
Vue.prototype.$aliPay = aliPay
Vue.prototype.$bizId = bizId
// 控制线上的内容是否开启
Vue.prototype.$isMallShop = isMallShop
// 电脑上面调试，打开下面的注释  --start
http.post('/amoy/app/design', {
  type: 1,
}, true).then(res => {
  console.log('design接口返回的数据:',res)
  console.log('design接口的content的数据:',JSON.parse(res.data.content))
  console.log('design接口的footer的数据:',JSON.parse(res.data.footer))
  if (res.data.footer) {
    store.commit('setFooter', JSON.parse(res.data.footer))
  }
  if (res.data.content) {
    store.commit('setContent', JSON.parse(res.data.content))
  }
  if (res.data.theme) {
    store.commit('setTheme', JSON.parse(res.data.theme))
  }
  let content = JSON.parse(res.data.content)
  if (res.data.content) {
    for (let i = 0; i < content.length; i++) {
      if (content[i].name === 'edit-header') {
        store.commit('setSearch', content[i].params)
      }
    }
  }
  http.post('/amoy/app/design', {
    type: 2
  }, true).then(res => {
    if (res.data.content) {
      store.commit('setMyContent', JSON.parse(res.data.content))
    }
  })
  new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
  })
})
// 电脑上面调试，打开下面的注释  --end
window.apiready = function () {
  var ajpush = api.require('ajpush')
  if (api.systemType === 'android') {
    ajpush.init(function (ret) {
      if (ret && ret.status) {
        // ajpush.setListener(
        //   function (ret) {
        //     var title = ret.title
        //     var content = ret.content
        //     var extra = ret.extra
        //     alert('监听' + title)
        //     alert('监听' + content)
        //     alert('监听' + extra)
        //   }
        // )
        let ajpush = api.require('ajpush')
        ajpush.getRegistrationId(function (ret) {
          let registrationId = ret.id
          store.commit('setRegistrationId', registrationId)
        })
        api.addEventListener({
          name: 'appintent'
        }, function (ret, err) {
          if (ret && ret.appParam.ajpush) {
            var ajpush = ret.appParam.ajpush
            if (ajpush.extra.msg_type === '1') {
              utils.storage.set('supergoods', [{}])
              router.push('/supergoods?type=' + ajpush.extra.goods_type + '&id=' + ajpush.extra.goods_id + '&i=0' + '&way=1')
            } else if (ajpush.extra.msg_type === '2') {
              router.push('/notice?type=1')
            } else if (ajpush.extra.msg_type === '3') {
              router.push('/notice')
            }
          }
        })
      }
    })
  } else {
    // ajpush.getRegistrationId(function (ret) {
    //   var registrationId = ret.id
    //   console.log(registrationId)
    //   alert(registrationId)
    // })
    // ajpush.setListener(
    //   function (ret) {
    //     var title = ret.title
    //     var content = ret.content
    //     var extra = ret.extra
    //     alert('监听' + title)
    //     alert('监听' + content)
    //     alert('监听' + extra)
    //   }
    // )
    // var param = {alias: 'myalias', tags: ['tag1', 'tag2']}
    // ajpush.bindAliasAndTags(param, function (ret) {
    //   var statusCode = ret.statusCode
    //   alert(statusCode)
    // })
    // api.addEventListener({
    //   name: 'noticeclicked'
    // }, function (ret, err) {
    //   if (ret && ret.value) {
    //     var ajpush = ret.value
    //     alert('ios')
    //     alert(JSON.stringify(ajpush))
    //   }
    // })
  }
  var app
  http.post('/amoy/app/design', {
    type: 1,
    // version: '2.0.8',
    version: api.appVersion,
    device: (api.systemType === 'android') ? 1 : 2
  }, true, true).then(res => {
    if (res.code === 0) {
      console.log(JSON.parse(res.data.content))
      if (res.data.footer) {
        store.commit('setFooter', JSON.parse(res.data.footer))
      }
      if (res.data.content) {
        store.commit('setContent', JSON.parse(res.data.content))
      }
      if (res.data.theme) {
        store.commit('setTheme', JSON.parse(res.data.theme))
      }
      if (res.data.is_app_store) {
        store.commit('setFirstNav', '/mall/home')
      } else {
        store.commit('setFirstNav', '/home')
      }
      if (res.data.content) {
        let content = JSON.parse(res.data.content)
        for (let i = 0; i < content.length; i++) {
          if (content[i].name === 'edit-header') {
            store.commit('setSearch', content[i].params)
          }
        }
      }
      if (!utils.storage.get('Uquanyun')) {
        http.post('/amoy/app/guide', {
        }, true, true).then(response => {
          utils.storage.set('guideList', response.data)
          http.post('/amoy/app/design', {
            type: 2,
            version: api.appVersion,
            device: (api.systemType === 'android') ? 1 : 2
          }, true, true).then(res => {
            if (res.data.content) {
              store.commit('setMyContent', JSON.parse(res.data.content))
            }
          })
          api.removeLaunchView({
            animation: {
              type: 'fade',
              duration: 500
            }
          })
          app = new Vue({
            el: '#app',
            router,
            store,
            components: { App },
            template: '<App/>'
          })
          if (res.data.is_app_store) {
            router.push('/mall/home')
          } else if (response.code === 0 && response.data.length > 0 && !utils.storage.get('Uquanyun')) {
            router.push('/guide')
          }
        })
      } else {
        app = new Vue({
          el: '#app',
          router,
          store,
          components: { App },
          template: '<App/>'
        })
        if (res.data.is_app_store) {
          router.push('/mall/home')
        } else if (!utils.storage.get('Uquanyun')) {
          router.push('/guide')
        }
        http.post('/amoy/app/design', {
          type: 2,
          version: api.appVersion,
          device: (api.systemType === 'android') ? 1 : 2
        }, true, true).then(res => {
          if (res.code === 0 && res.data.content) {
            store.commit('setMyContent', JSON.parse(res.data.content))
          }
          setTimeout(() => {
            api.removeLaunchView({
              animation: {
                type: 'fade',
                duration: 500
              }
            })
          }, 1000)
        })
      }
      api.addEventListener({
        name: 'supergoods'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=ali')
      })
      api.addEventListener({
        name: 'fromCart'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=cart')
      })
      api.addEventListener({
        name: 'aliBack'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push(ret.value.name)
      })
      let home = res.data.is_app_store ? '/mall/home' : '/home'
      // 返回
      let now = false
      let time = null
      api.addEventListener({
        name: 'keyback'
      }, function (ret, err) {
        if (ret) {
          if (app.$route.path === home || app.$route.path === '/wechatLogin') {
            clearInterval(time)
            if (now) {
              now = false
              api.toLauncher()
            } else {
              now = true
              api.toast({
                msg: '再按一次返回键退出',
                duration: 2000,
                location: 'bottom'
              })
              time = setTimeout(() => {
                now = false
              }, 1000)
            }
            // 如果是内页则执行路由返回操作
          } else if (app.$route.path === '/videoDetail') {
            let browser = api.require('webBrowser')
            browser.historyBack(
              function (ret, err) {
                if (!ret.status) {
                  browser.closeView()
                  router.go(-1)
                }
              }
            )
          } else if (app.$route.path === '/supergoods') {
            if (app.$route.query.from === 'ali') {
              router.go(-1)
              api.openWin({
                name: 'aliWin',
                animation: {
                  type: 'push',
                  subType: 'from_left',
                  duration: 300
                }
              })
            } else if (app.$route.query.from === 'cart') {
              router.go(-1)
              api.openWin({
                name: 'cartWin',
                animation: {
                  type: 'push',
                  subType: 'from_left',
                  duration: 300
                }
              })
            } else {
              router.go(-1)
            }
          } else {
            router.go(-1)
          }
        }
      })
    } else {
      app = new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
      })
      api.addEventListener({
        name: 'supergoods'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=ali')
      })
      api.addEventListener({
        name: 'fromCart'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push('/supergoods?type=12&id=' + ret.value.id + '&i=0&way=1&from=cart')
      })
      api.addEventListener({
        name: 'aliBack'
      }, function (ret, err) {
        utils.storage.set('supergoods', [{}])
        router.push(ret.value.name)
      })
      let home = '/home'
      // 返回
      let now = false
      let time = null
      api.addEventListener({
        name: 'keyback'
      }, function (ret, err) {
        if (ret) {
          if (app.$route.path === home || app.$route.path === '/wechatLogin') {
            clearInterval(time)
            if (now) {
              now = false
              api.toLauncher()
            } else {
              now = true
              api.toast({
                msg: '再按一次返回键退出',
                duration: 2000,
                location: 'bottom'
              })
              time = setTimeout(() => {
                now = false
              }, 1000)
            }
            // 如果是内页则执行路由返回操作
          } else if (app.$route.path === '/videoDetail') {
            let browser = api.require('webBrowser')
            browser.historyBack(
              function (ret, err) {
                if (!ret.status) {
                  browser.closeView()
                  router.go(-1)
                }
              }
            )
          } else if (app.$route.path === '/supergoods') {
            if (app.$route.query.from === 'ali') {
              router.go(-1)
              api.openWin({
                name: 'aliWin',
                animation: {
                  type: 'push',
                  subType: 'from_left',
                  duration: 300
                }
              })
            } else if (app.$route.query.from === 'cart') {
              router.go(-1)
              api.openWin({
                name: 'cartWin',
                animation: {
                  type: 'push',
                  subType: 'from_left',
                  duration: 300
                }
              })
            } else {
              router.go(-1)
            }
          } else {
            router.go(-1)
          }
        }
      })
      setTimeout(() => {
        api.removeLaunchView({
          animation: {
            type: 'fade',
            duration: 500
          }
        })
      }, 1000)
    }
    // Vue.$vux.toast.show({
    //   type: 'text',
    //   text: '自定义出错',
    //   time: 1000,
    //   position: 'middle'
    // })
  })
}
