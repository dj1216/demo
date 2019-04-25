<template>
    <div class="videoList" v-if="data">
      <div class="videoBox" >
        <div v-for="(item, index) of videoList" :key="index" @click="watchVideo(item)"><img :src="item.src" alt=""><span>{{item.title}}</span></div>
      </div>
      <div class="btn" @click="jumpTo('/videoPay?price=' +  data.price)" v-if="data.result === 0 && data.price > 0">购买代理</div>
      <div class="btn" @click="jumpTo('videoCard')" v-else-if="data.result !== 0">查看卡密</div>
      <div v-if="data.rule" v-html="data.rule" class="rule"></div>
      <div v-transfer-dom class="videoPower">
        <confirm v-model="show"
                 show-input
                 ref="confirm"
                 title="输入卡密"
                 @on-confirm="onConfirm">
        </confirm>
      </div>
    </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'videoList',
  directives: {
    TransferDom
  },
  components: {
    Confirm
  },
  data () {
    return {
      videoList: [{src: require('../../assets/img/home/video/tx.png'), title: '腾讯视频', path: 'https://v.qq.com/'},
        {src: require('../../assets/img/home/video/aqy.png'), title: '爱奇艺', path: 'https://www.iqiyi.com/'},
        // {src: require('../../assets/img/home/video/guangaotoufang.png'), title: '广告投放', path: '/ads'},
        {src: require('../../assets/img/home/video/mgu.png'), title: '咪咕视频', path: 'http://m.miguvideo.com/'},
        {src: require('../../assets/img/home/video/fx.png'), title: '风行视频', path: 'http://m.fun.tv/'},
        {src: require('../../assets/img/home/video/bf.png'), title: '暴风影音', path: 'http://m.baofeng.com/'},
        {src: require('../../assets/img/home/video/sh.png'), title: '搜狐视频', path: 'https://m.tv.sohu.com/'},
        {src: require('../../assets/img/home/video/mg.png'), title: '芒果TV', path: 'https://m.mgtv.com/'},
        {src: require('../../assets/img/home/video/1905.png'), title: '1905', path: 'http://m.1905.com/'},
        {src: require('../../assets/img/home/video/ls.png'), title: '乐视视频', path: 'http://m.le.com/'},
        {src: require('../../assets/img/home/video/yk.png'), title: '优酷视频', path: 'http://youku.com/'},
        {src: require('../../assets/img/home/video/pptv.png'), title: 'PPTV', path: 'http://m.pptv.com'}],
      power: 0,
      show: false,
      data: ''
    }
  },
  methods: {
    onConfirm (value) {
      this.$http.post('/amoy/movie/key-check', {
        cdkey: value
      }, true).then(res => {
        if (res.code === 0) {
          this.power = 1
          this.$vux.toast.show({
            type: 'text',
            text: res.msg,
            time: 500,
            position: 'middle'
          })
        }
      })
    },
    watchVideo (item) {
      if (this.power === 1) {
        this.$router.push('/videoDetail?url=' + item.path + '&title=' + item.title)
      } else {
        this.show = true
      }
    }
  },
  created () {
    $api.css($api.dom('.weui-dialog__btn_primary'), 'color:' + this.$store.state.global.theme.mainColor)
    this.$http.post('/amoy/movie/power-check', {}, true, true).then(res => {
      this.data = res.data
      if (res.code === 0) {
        this.power = 1
      } else if (res.code === 1) {
        this.power = 0
        this.$vux.toast.show({
          type: 'text',
          text: res.msg,
          time: 500,
          position: 'middle'
        })
      }
    })
  }
}
</script>
<style scoped lang="less">
.videoList{
  .videoBox{
    background: #fff;
    overflow: hidden;
    div{
      float: left;
      box-sizing: border-box;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img{
        width: 1rem;
        height: 1rem;
        margin-bottom: .2rem;
      }
      span{
        font-size: .24rem;
      }
    }
  }
  .btn{
    margin: 1rem 1rem .5rem;
    height: .9rem;
    border-radius: .45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .34rem;
    color: #333;
    background: linear-gradient(to right, #f3d4ac, #f8bf7b);
  }
  .rule{
    padding: .3rem;
    img{
      max-width: 100%;
    }
  }
}
</style>
