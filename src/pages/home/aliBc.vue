<template>
    <div class="aliBc">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        {{title}}<span class="save" slot="right"  id="aliBcReload" @click="closeAli">关闭</span>
      </x-header>
    </div>
</template>

<script>
export default {
  name: 'aliBc',
  components: {},
  data () {
    return {
      title: this.$route.query.title
    }
  },
  methods: {
    goBack () {
      let that = this
      let aliBC = api.require('aliBC')
      aliBC.webGoBack(function (ret, err) {
        aliBC.removeWeb()
        api.closeFrame()
        that.$router.go(-1)
      })
      // let browser = api.require('webBrowser')
      // browser.historyBack(
      //   function (ret, err) {
      //     if (!ret.status) {
      //       browser.closeView()
      //       that.$router.go(-1)
      //     }
      //   }
      // )
    },
    closeAli () {
      let aliBC = api.require('aliBC')
      aliBC.removeWeb()
      api.closeFrame()
      this.$router.go(-1)
      // window.location.reload()
      // let aliBC = api.require('aliBC')
      // aliBC.addJsToPage({
      //   javaScript: 'javascript:{window.location.reload()}'
      // }, function (ret, err) {
      // })
    }
  },
  mounted () {
    // let that = this
    api.openWin({
      name: 'aliWin',
      url: '../html/main.html',
      bounces: false,
      slidBackEnabled: false,
      allowEdit: true
    })
    // let h = (document.documentElement.clientWidth / 7.5) * 0.88
    // let y = h + api.safeArea.top
    // let aliBC = api.require('aliBC')
    // aliBC.asyncInit({}, function () {
    //   aliBC.showPageByUrlWeb({
    //     url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3Dn9dE%2FLa54c0cQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMQhkSKOpbe0Mt4hWD5k2kjMZyVEA%2BCCsxcnB6lZ%2BBrWEUyjcnX93fgY5do%2FkD4ynkJwIqRHwxvj3MfKrdHtGywGOywGtw1KzNs7ebxIp7nyFQBRB1XJCO29hk6JLL7xynxHogqwb5LKSl%2BDJT1%2BSuSzGJe8N%2FwNpGw%3D%3D',
    //     rect: {
    //       x: 0,
    //       y: Number(y),
    //       w: 'auto',
    //       h: 'auto'
    //     },
    //     jsObjectName: 'aliBCWin'
    //   })
    //   aliBC.addPageFinListener(function (ret, err) {
    //     if (ret.status) {
    //       // that.title = ret.title
    //     }
    //   })
    //   aliBC.addJsToPage({
    //     // appointUrl: 'https://detail.m.tmall',
    //     javaScript: "javascript:{var script=document.createElement('script');script.type='text/javascript';script.src='http://libs.baidu.com/jquery/2.0.0/jquery.min.js';document.getElementsByTagName('head')[0].appendChild(script);$('a').click(function(e){var hrefUrl=$(this).attr('href');var sear=new RegExp('detail.*tmall.');alert(sear.test(hrefUrl));if(sear.test(hrefUrl)){e.preventDefault();window.aliBCWin.jsCallBack(hrefUrl,null,null)}})}"
    //   }, function (ret, err) {
    //     if (ret.added) {
    //     } else if (ret.status) {
    //       that.$router.push('/my')
    //     } else {
    //       alert(JSON.stringify(err))
    //     }
    //   })
    // })
    // console.log(y)
    // api.openFrame({
    //   name: 'page2',
    //   url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3Dn9dE%2FLa54c0cQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMQhkSKOpbe0Mt4hWD5k2kjMZyVEA%2BCCsxcnB6lZ%2BBrWEUyjcnX93fgY5do%2FkD4ynkJwIqRHwxvj3MfKrdHtGywGOywGtw1KzNs7ebxIp7nyFQBRB1XJCO29hk6JLL7xynxHogqwb5LKSl%2BDJT1%2BSuSzGJe8N%2FwNpGw%3D%3D',
    //   rect: {
    //     x: 0,
    //     y: y,
    //     w: 'auto',
    //     h: 'auto'
    //   },
    //   pageParam: {
    //     name: 'test'
    //   }
    // })
    // let aliBC = api.require('aliBC')
    // aliBC.showPageByUrlWeb({
    //   url: 'https://s.click.taobao.com/t?e=m%3D2%26s%3Dn9dE%2FLa54c0cQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMQhkSKOpbe0Mt4hWD5k2kjMZyVEA%2BCCsxcnB6lZ%2BBrWEUyjcnX93fgY5do%2FkD4ynkJwIqRHwxvj3MfKrdHtGywGOywGtw1KzNs7ebxIp7nyFQBRB1XJCO29hk6JLL7xynxHogqwb5LKSl%2BDJT1%2BSuSzGJe8N%2FwNpGw%3D%3D',
    //   rect: {
    //     x: 0,
    //     y: y,
    //     w: 'auto',
    //     h: 'auto'
    //   },
    //   // fixedOn: 'main',
    //   fixed: false,
    //   jsObjectName: 'aliBCWin'
    // })
    // aliBC.addPageFinListener(function (ret, err) {
    //   if (ret.status) {
    //     that.title = ret.title
    //   }
    // })
    // aliBC.addJsToPage({
    //   appointUrl: 'https://detail.m.tmall',
    //   javaScript: 'javascript:{document.getElementById(\'s-actionBar-container\').style.display = \'none\';document.getElementById(\'head\').style.display = \'none\';document.getElementById(\'aliBcReload\').onclick = function () {\n' +
    //     '        window.location.reload()\n' +
    //     '      }}'
    // }, function (ret, err) {
    // })
    // aliBC.asyncInit({
    // }, function (ret, err) {
    //   console.log(ret)
    //   if (ret.status) {
    //     aliBC.showPageByUrlWeb({
    //       url: 'https://s.click.taobao.com/M4buKHw',
    //       rect: {
    //         x: 0,
    //         y: 300,
    //         w: 'auto',
    //         h: 'auto'
    //       },
    //       fixedOn: api.frameName,
    //       // fixed: false,
    //       jsObjectName: 'aliBC'
    //     })
    //     aliBC.addJsToPage({
    //       // appointUrl: 'https://detail.m.tmall',
    //       javaScript: 'javascript:{document.getElementById(\'s-actionBar-container\').style.display = \'none\';document.getElementById(\'head\').style.display = \'none\';document.getElementById(\'aliBcReload\').onclick = function () {\n' +
    //         '        window.location.reload()\n' +
    //         '      }}'
    //     }, function (ret, err) {
    //     })
    //   }
    // })
  }
}
</script>
<style lang="less">
  /*.aliBc{*/
    /*position: relative;*/
    /*#aliBcReload{*/
      /*color: #666;*/
    /*}*/
    /*.vux-header{*/
      /*position: fixed !important;*/
      /*z-index: 100000000000000;*/
    /*}*/
  /*}*/
</style>
