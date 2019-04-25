<template>
    <div class="setting">
      <x-header :left-options="{showBack: false}"><a slot="left" @click="goBack()"  class="backBox">
        <i class="iconfont icon-back"></i></a>
        设置<span class="save" :style="{color: $store.state.global.theme.mainColor}"  slot="right" @click="save()">保存</span>
      </x-header>
      <div class="photo">
        <div :style="{backgroundImage: 'url(' + data.avatar + ')'}" v-if="data.avatar"></div>
        <div  v-else></div>
          <!--<img :src="data.avatar" alt="" v-if="data.avatar">-->
          <!--<img src="../../assets/img/my/avater.png" alt="" v-else>-->
        <p>ID：{{data.uid}}</p>
        <span @click = "handlePhoto(1)" :style="{background: $store.state.global.theme.mainColor}">更换头像</span>
      </div>
      <group>
        <x-input title="昵称：" placeholder="请输入昵称" v-model="data.nickname"></x-input>
        <x-input title="真实姓名：" placeholder="请输入真实姓名" v-model="data.realname"></x-input>
        <x-input title="个性签名：" placeholder="请输入个性签名" v-model="data.person_signature"></x-input>
        <x-input title="专属客服微信号：" placeholder="请输入专属客服微信号" v-model="data.wx_number" v-if="data.operator == 1"></x-input>
        <cell title="清除缓存" :value="size" is-link @click.native ="show1 = size !== ''"></cell>
        <cell title="修改密码" value="" is-link link="/revise"></cell>
        <cell title="绑定微信"  is-link @click.native="bind" :value="this.data.wechat_openid ? '已绑定' : '未绑定'"></cell>
        <!--<cell title="微信解绑" value="" is-link @click.native="show2 = true"></cell>-->
        <cell title="检查更新" :value="wgtVer" is-link @click.native="getVersion"></cell>
      </group>
      <div class="uploadingLogo" v-if="data.operator == 1">
        <p>请上传运营商二维码：</p>
        <img src="../../assets/mall/img/shop/1.png" alt="" @click="handlePhoto(2)" v-if="!data.service_qrcode && !QRCode">
        <div style="position: relative" v-if="data.service_qrcode || QRCode" @click="handlePhoto(2)">
          <img :src="data.service_qrcode || QRCode" alt="" style="width:1.87rem;height: 1.87rem;">
        </div>
      </div>
      <div class="primary_btn" :style="{background: $store.state.global.theme.mainColor}" @click="layout">退出登录</div>
      <p class="power" v-for="(item, index) of company" :key="index">{{item}}</p>
      <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="click"></actionsheet>
      <confirm v-model="show1"
               @on-confirm="onConfirm"
               title="清除缓存">
        <p style="text-align:center;">清除媒体缓存？</p>
      </confirm>
      <confirm v-model="show2"
               @on-confirm="untying"
               title="微信解绑">
        <p style="text-align:center;">确定解除与微信号的绑定吗？</p>
      </confirm>
      <div v-transfer-dom>
        <x-dialog v-model="showToast1" class="updateBox">
          <!--<div class="weui-mask"></div>-->
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
            <div class="add">
              <p class="t">新版本特性</p>
              <!--<p class="info" v-for="(item, index) of update.featyre" :key="index">{{index + 1}}、{{item}}</p>-->
              <p class="info">{{version.update_log}}</p>
            </div>
            <div class="update_btn" ><span @click="showToast1 = false" v-if="!version.is_force">稍后提醒</span><span @click="downWgt" >立即升级</span></div>
            <!--<img src="../../assets/img/my/close.png" alt="" @click="showToast = false" class="close">-->
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast3" class="updateBox">
          <!--<div class="weui-mask"></div>-->
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn" ><span @click="showToast3 = false">稍后提醒</span><span @click="startSmart" >立即升级</span></div>
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast4" class="updateBox">
          <!--<div class="weui-mask"></div>-->
          <div class="update">
            <img src="../../assets/img/my/update.png" alt="" class="bg">
            <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn" ><span @click="reboot" >立即重启</span></div>
            </div>
          </div>
        </x-dialog>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showToast2" hide-on-blur :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}" class="progressBox">
          <div >
            <span style="color:#fff; font-size: .3rem" class="title">{{progressState}}</span>
            <x-progress :percent="percent" :show-cancel="false"></x-progress>
          </div>
        </x-dialog>
      </div>
    </div>
</template>

<script>
import {Group, XInput, XHeader, Actionsheet, Cell, Confirm, XDialog, XProgress, TransferDomDirective as TransferDom} from 'vux'
export default {
  name: 'setting',
  components: {
    Group, XInput, XHeader, Actionsheet, Cell, Confirm, XDialog, XProgress
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      name: 'hello',
      info: '我很青春',
      menus: {
        menu1: '从相册选择一张',
        menu2: '拍照'
      },
      show: false,
      showCode: false,
      QRCode: '',
      show1: false,
      show2: false,
      avatar: '',
      data: this.$store.state.user.userInfo,
      showToast1: false,
      result: '',
      wgtVer: api.appVersion,
      size: '',
      wgtUrl: '',
      update: '',
      company: (this.$store.state.user.userInfo && this.$store.state.user.userInfo.web_icp) ? this.$store.state.user.userInfo.web_icp.split(',') : [],
      version: '',
      showToast3: false,
      showToast2: false,
      showToast4: false,
      smart: '',
      percent: 0,
      perCon: '0%',
      progressState: '准备中'
    }
  },
  inject: ['reload'],
  methods: {
    handlePhoto (val) {
      this.show = true
      if (val === 1) {
        this.showCode = false
      } else {
        this.showCode = true
      }
    },
    click (key) {
      console.log(key)
      if (key === 'menu1') {
        this.galleryImg()
      } else if (key === 'menu2') {
        this.captureImage()
      }
    },
    save () {
      this.$http.post('/amoy/user/update-nick', {
        avatar: this.avatar,
        nickname: this.data.nickname,
        realname: this.data.realname,
        person_signature: this.data.person_signature,
        service_qrcode: this.QRCode,
        wx_number: this.data.wx_number
      }).then(response => {
        if (this.avatar !== '') {
          this.data.avatar = response.data.avatar
          this.avatar = ''
        }
        if (this.QRCode !== '') {
          this.data.service_qrcode = response.data.service_qrcode
          this.QRCode = ''
        }
        this.data.nickname = response.data.nickname
        this.data.realname = response.data.realname
        this.data.person_signature = response.data.person_signature
        this.data.wx_number = response.data.wx_number
        this.$store.commit('setUserInfo', this.data)
        this.$vux.toast.text('保存成功')
        this.$router.go(-1)
      })
    },
    // 从相册中选取图片
    galleryImg () {
      let This = this
      api.getPicture({
        sourceType: 'album',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true
      }, function (ret, err) {
        if (ret) {
          console.log(JSON.stringify(ret))
          if (!This.showCode) {
            if (This.data.avatar) {
              This.data.avatar = ret.base64Data
            }
            This.avatar = ret.base64Data
          } else {
            if (This.data.service_qrcode) {
              This.data.service_qrcode = ret.base64Data
            }
            This.QRCode = ret.base64Data
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 拍照
    captureImage () {
      let This = this
      api.getPicture({
        sourceType: 'camera',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true
      }, function (ret, err) {
        console.log('拍照' + JSON.stringify(ret))
        if (ret) {
          if (!This.showCode) {
            if (This.data.avatar) {
              This.data.avatar = ret.base64Data
            }
            This.avatar = ret.base64Data
          } else {
            if (This.data.service_qrcode) {
              This.data.service_qrcode = ret.base64Data
            }
            This.QRCode = ret.base64Data
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    untying () {
      this.$http.post('/amoy/user/bind-wx', {
        type: 'unbind'
      }, true).then((res) => {
        this.data.wechat_openid = ''
        this.$store.commit('setUserInfo', this.data)
      })
    },
    onConfirm () {
      let that = this
      console.log(that.size === '')
      if (that.size === '') {
        return
      }
      api.clearCache(function () {
        that.size = ''
        api.toast({
          msg: '清除完成'
        })
      })
    },
    getSize () {
      let size = api.getCacheSize({
        sync: true
      })
      console.log('缓存' + size)
      let kbCache = Math.round(Number(size) / 1024)
      if (kbCache < 1) {
        if (size) {
          this.size = size + 'B'
        } else {
          this.size = ''
        }
      } else if (kbCache < 1024) {
        this.size = kbCache + 'KB'
      } else {
        this.size = Math.round(Number(kbCache) / 1024) + 'MB'
      }
    },
    bind () {
      if (this.data.wechat_openid) {
        // this.$vux.toast.text('已经绑定过微信')
        this.show2 = true
      } else {
        this.$router.push('/binding')
      }
    },
    downWgt () {
      let that = this
      if (that.version.download_type === 1) {
        if (api.systemType === 'android') {
          that.showToast1 = false
          that.showToast2 = true
          api.download({
            url: that.version.download_url,
            report: true
          }, function (ret, err) {
            if (ret && ret.state === 0) {
              that.percent = parseInt(ret.percent)
              // that.perCon = parseInt(ret.percent) + '%'
              that.progressState = '下载中' + that.percent + '%'
            }
            if (ret && ret.state === 1) {
              that.progressState = '安装中'
              let savePath = ret.savePath
              api.installApp({
                appUri: savePath
              })
            }
          })
        }
        if (api.systemType === 'ios') {
          api.installApp({
            appUri: that.version.download_url
          })
        }
      } else {
        api.openApp({
          uri: that.version.download_url,
          iosUrl: that.version.download_url
        })
      }
    },
    startSmart () {
      let that = this
      let mam = api.require('mam')
      mam.startSmartUpdate(function (ret, err) {
        if (ret) {
          that.showToast3 = false
          that.showToast2 = true
          that.percent = parseInt(ret.progress)
          if (ret.state === 0) {
            that.progressState = '准备中' + that.percent + '%'
          } else if (ret.state === 1) {
            that.progressState = '下载中' + that.percent + '%'
          } else if (ret.state === 2) {
            that.progressState = '解压中' + that.percent + '%'
          } else if (ret.state === 3) {
            api.rebootApp()
          } else if (ret.state === 4) {
            that.showToast2 = false
          }
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    getVersion () {
      let that = this
      this.$http.post('/amoy/app/version', {
        deviceType: (api.systemType === 'android') ? 1 : 2,
        version: api.appVersion,
        type: this.$route.query.type
      }, false, true).then(res => {
        if (res.code === 0) {
          this.version = res.data
          this.showToast1 = true
        } else {
          let mam = api.require('mam')
          mam.checkSmartUpdate(function (ret, err) {
            console.log('检测到' + JSON.stringify(ret))
            if (ret) {
              if (ret.packages[0].silent) {
                that.smart = ret.packages[0]
                mam.startSmartUpdate(function (ret, err) {
                  if (ret) {
                    if (that.smart && that.smart.extra) {
                      api.addEventListener({
                        name: 'smartupdatefinish'
                      }, function (ret, err) {
                        that.showToast4 = true
                      })
                    }
                  } else {
                    console.log(JSON.stringify(err))
                  }
                })
              } else {
                that.showToast3 = true
                that.smart = ret.packages[0]
              }
            } else {
              that.$vux.toast.text('当前已是最新版本')
            }
          })
        }
      })
    },
    reboot () {
      api.rebootApp()
    },
    layout () {
      // let ajpush = api.require('ajpush')
      // let param = {alias: null}
      // ajpush.bindAliasAndTags(param, function (ret) {
      // })
      this.$store.commit('logout')
      this.reload()
      this.$router.replace('/wechatLogin')
    }
  },
  created () {
    this.getSize()
  }
}
</script>

<style lang="less">
@import "../../assets/less/common";
  .progressBox{
    .weui-dialog{
      border-radius: 0;
    }
    .weui-progress__bar{
      height: 4px;
      border-radius: 2px;
    }
    .weui-progress__inner-bar{
      background: @theme-col;
      border-radius: 2px;
    }
    .title{
      display: block;
      margin-bottom: 10px;
    }
  }
  .setting{
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
  }
</style>
<style scoped lang="less">
@import "../../assets/less/common";
@import "../../assets/mall/style/_Variables";
.setting{
  height: 100%;
  background: #fff;
  .power{
    text-align: center;
    font-size: .3rem;
    color: #999;
  }
  .vux-header{
    position: relative !important;
  }
  .photo{
    display: flex;
    height: 1.54rem;
    align-items: center;
    padding: 0 .3rem;
    div{
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('../../assets/img/my/avater.png');
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p{
      margin-left: .5rem;
      font-size: .28rem;
      flex: 1;
    }
    span{
      color: #fff;
      width: 1.87rem;
      height: .67rem;
      text-align: center;
      line-height: .67rem;
      font-size: .3rem;
      border-radius: .05rem;
    }
  }
  .uploadingLogo{
    height: 2.4rem;
    background: #ffffff;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 1.87rem;
      height: 1.87rem;
    }
    p{
      color: @font-main-color;
      font-size: @font-big;
      text-align: left;
    }
  }
}
</style>
