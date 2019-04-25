<template>
  <div class="link-man">
    <img src="../../assets/img/auth/5.png" alt="">
    <div class="link-man-body">
      <div class="man-one" v-if="data.operator_qrcode">
        <div class="man-title">
          <img src="../../assets/img/auth/2.png" alt="">
          <div>
            <img src="../../assets/img/auth/3.png" alt="">
            <p>专属客服二维码</p>
          </div>
        </div>
        <div class="man-content">
          <img :src="data.operator_qrcode" alt="" @touchstart="start(1)" @touchmove="move" @touchend="end">
          <p>长按保存二维码</p>
        </div>
        <div class="man-foot" v-if="data.wx_number" @click="onCopy(data.wx_number)">
          <p>专属客服微信号：{{data.wx_number}}</p>
        </div>
      </div>
      <div class="man-one">
        <div class="man-title">
          <img src="../../assets/img/auth/1.png" alt="">
          <div>
            <img v-lazy="$logo"  alt="">
            <p>官方客服二维码</p>
          </div>
        </div>
        <div class="man-content">
          <img v-lazy="data.official_qrcode" alt="" @touchstart="start(2)" @touchmove="move" @touchend="end">
          <p>长按保存二维码</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.$http.post('/amoy/user/service-qrcode', {}, true).then(res => {
      if (res.code === 0) {
        this.data = res.data
      }
    })
  },
  methods: {
    // 复制
    onCopy (wx_number) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: wx_number
      }, function (ret, err) {
        if (ret) {
          that.$vux.toast.text('复制成功')
        } else {
          that.$vux.toast.text('请重试')
        }
      })
    },
    start (val) {
      let that = this
      this.timeOutEvent = setTimeout(function () {
        if (val === 1) {
          that.save(1)
        } else {
          that.save(2)
        }
      }, 500)
    },
    move () {
      clearTimeout(this.timeOutEvent)
    },
    end () {
      clearTimeout(this.timeOutEvent)
    },
    save (val) {
      let that = this
      let link = ''
      let format = 'share' + new Date().getTime() + '.jpg'
      if (val === 1) {
        link = that.data.operator_qrcode
      } else if (val === 2) {
        link = that.data.official_qrcode
      }
      api.download({
        url: link,
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      },function(ret, err){
        if (ret.state == 1) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function(ret, err) {
            if (ret && ret.status) {
              that.$vux.toast.text('图片已经保存到相册')
            } else {
              that.$vux.toast.text('保存失败')
            }
          });
        }
      })
    }
  }
}
</script>

<style lang="less">
.link-man{
  width: 100%;
  height: 100%;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .link-man-body{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: auto;
    overflow-y: auto;
    .man-one{
      width: 4.4rem;
      background: #ffffff;
      margin: 1rem auto;
      border-radius: 0.2rem;
      .man-title{
        position: relative;
        height: 1.2rem;
        width: 100%;
        div{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            position: absolute;
            top: -0.5rem;
            left: 1.7rem;
          }
          p{
            margin-top: .45rem;
            height: .75rem;
            text-align: center;
            line-height: .75rem;
            color: #fff;
            font-size: .28rem;
          }
        }
      }
      .man-content{
        width: 100%;
        height: 3.45rem;
        img{
          width: 1.95rem;
          height: 1.95rem;
          margin: .3rem 1.225rem;
        }
        p{
          color: #fc3357;
          text-align: center;
          font-size: .26rem;
        }
      }
      .man-foot{
        width: 100%;
        height: .8rem;
        background: linear-gradient(to right, #874DFF, #C45BFE);
        border-bottom-left-radius: .1rem;
        border-bottom-right-radius: .1rem;
        color: #ffffff;
        p{
          line-height: .8rem;
          text-align: center;
          font-size: .26rem;
        }
      }
    }
  }
}
</style>
