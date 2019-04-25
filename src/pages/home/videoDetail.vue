<template>
    <div class="videoDetail">
      <x-header :left-options="{showBack: false}"><a slot="left"  class="backBox">
        <i class="iconfont icon-back" @click="goBack()"></i><span class="closeWeb" @click="closeWeb">关闭</span></a>
        {{title}}<span class="save" slot="right"  id="aliBcReload" @click="refresh">{{name}}</span>
      </x-header>
      <div v-transfer-dom>
        <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="changeVip" @on-click-mask="ways"></actionsheet>
      </div>
    </div>
</template>

<script>
import {Actionsheet, TransferDomDirective as TransferDom} from 'vux'
export default {
  name: 'videoDetail',
  components: {Actionsheet},
  directives: {
    TransferDom
  },
  data () {
    return {
      menus: {},
      show: false,
      title: this.$route.query.title,
      urlName: '',
      name: 'VIP路径1'
    }
  },
  methods: {
    refresh () {
      if (this.data.length === 1) {
        return
      }
      let browser = api.require('webBrowser')
      browser.closeView()
      this.show = true
    },
    changeVip (key) {
      if (key !== 'cancel') {
        this.urlName = this.data[key]
        this.name = this.menus[key]
      }
      this.ways()
    },
    ways (keys) {
      let h = (document.documentElement.clientWidth / 7.5) * 0.88
      let y = h + api.safeArea.top
      let browser = api.require('webBrowser')
      browser.closeView()
      let lan = "var url = window.location.href;if(url.indexOf('iqiyi.com') == -1){var script=document.createElement('script');script.type='text/javascript';script.src='http://libs.baidu.com/jquery/2.0.0/jquery.min.js';document.getElementsByTagName('head')[0].appendChild(script);}var para=document.createElement('p');para.style.position = 'absolute';para.style.width = '100%';para.style.backgroundColor = 'black';para.style.zIndex = '99999999999999999999';para.style.textAlign = 'center';para.innerHTML='vip通道已为您解析  请点击播放';para.style.color = '#FFF';" +
        "if(url.indexOf('https://m.v.qq.com') != -1){if(url.indexOf('play.html') != -1 || url.indexOf('cover') != -1 ){para.style.top = '0';var h = document.querySelector('.site_player').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.site_player').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('iqiyi.com') != -1){var reg = /\\w{10,15}.html/;var arr = url.match(reg);if(arr){document.getElementById('videoZone').innerHTML='';para.style.top = '0';var h = document.querySelector('.m-video-player').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.m-video-player').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('http://m.fun.tv') != -1){if(url.indexOf('http://m.fun.tv/vplay') != -1 || url.indexOf('http://m.fun.tv/mplay') != -1){$('.m-h5v-player').hide();para.style.top = '0';var h = document.querySelector('.v-player-par').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.v-player-par').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('http://m.baofeng.com') != -1){if(url.indexOf('http://m.baofeng.com/play') != -1){$('#videoplayer').find('video').eq(0).hide();para.style.top = '0';var h = document.querySelector('.video-player').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.video-player').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('m.miguvideo.com') != -1){if(url.indexOf('m.miguvideo.com/wap/resource/migu/miguH5/detail/detail.jsp?') != -1){$('#video').hide();para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.header').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.header').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('m.mgtv.com') != -1){if(url.indexOf('m.mgtv.com/b') != -1){para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.video-area').offsetHeight;document.querySelector('.mg-video').style.display='none';para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.video-area').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('m.le.com') != -1){if(url.indexOf('m.le.com/vplay') != -1){para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('#j-player').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('#j-player').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('youku.com') != -1){if(url.indexOf('m.youku.com/video/') != -1 || url.indexOf('https://m.youku.com/alipay_video') != -1){para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.player-box').offsetHeight;document.querySelector('.player-box').style.display='none';para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('#app').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('1905.com') != -1){if(url.indexOf('1905.com/play') != -1){para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.areaShow').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.areaShow').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('m.pptv.com') != -1){if(url.indexOf('m.pptv.com/show') != -1){para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.playbox').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.playbox').appendChild(para);para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}" +
        "else if(url.indexOf('sohu.com') != -1){if(url.indexOf('https://m.tv.sohu.com/v') != -1 || url.indexOf('https://m.tv.sohu.com/u/vw/') != -1 || url.indexOf('https://m.film.sohu.com/album') != -1){$('#video').hide();if (document.querySelector('.player-view')){$('.player').hide();para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.player-view').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.player-view').appendChild(para);}else if(document.querySelector('.top-poster')){$('#center_control').hide();$('#film_player_container').hide();para.style.fontSize = '16px';para.style.top = '0';var h = document.querySelector('.top-poster').offsetHeight;para.style.lineHeight = h + 'px';para.style.height = h+ 'px';document.querySelector('.top-poster').appendChild(para);};para.onclick=function (){var videoUrl='" + this.urlName + "'+url;window.location.href=videoUrl;}}}"
      browser.openView({
        name: 'video',
        url: this.$route.query.url,
        rect: {
          x: 0,
          y: parseInt(y),
          w: 'auto',
          h: 'auto'
        }
      }, function (ret, err) {
        if (ret.state === 2) {
          browser = api.require('webBrowser')
          browser.loadScript({
            script: lan
          })
        }
      })
    },
    closeWeb () {
      var browser = api.require('webBrowser')
      browser.closeView()
      this.$router.go(-1)
    },
    goBack () {
      let that = this
      let browser = api.require('webBrowser')
      browser.historyBack(
        function (ret, err) {
          if (!ret.status) {
            browser.closeView()
            that.$router.go(-1)
          }
        }
      )
    }
  },
  mounted () {
    this.$http.post('/amoy/movie/video-path').then(res => {
      if (res.code === 0) {
        let menus = {}
        for (let i = 0; i < res.data.length; i++) {
          menus[i] = 'VIP线路' + (i + 1)
        }
        this.menus = menus
        this.data = res.data
        this.urlName = res.data[0]
        this.ways()
      }
    })
  }
}
</script>
<style lang="less">
  .videoDetail{
    .weui-cells{
      margin-top: 0;
      font-size: 12px;
      .weui-cell{
        padding: 10px 15px !important;
      }
      .weui-cell:before{
        right: 15px;
      }
      .weui-input{
        font-size: 14px;
        color: #999;
      }
      .weui-label{
        font-size: 14px;
      }
      /*.weui-cell__bd{*/
      /*display: flex;*/
      /*}*/
    }
    .weui-cells:after,.weui-cells:before{
      left: 15px;
      right: 15px;
    }
    .weui-mask{
      background: rgba(0, 0, 0, 0.4);
    }
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
    .vux-header{
      .backBox{
        display: flex !important;
        align-items: center;
        .closeWeb{
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .vux-header-right{
        color: #666;
      }
    }
  }
</style>
<style scoped lang="less">

</style>
