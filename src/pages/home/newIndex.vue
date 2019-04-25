<template>
  <div class="new_index"  :style="{'paddingTop': marginTop}">
    <div class="home_seach">
    <!--<div class="home_seach" style="margin-top: .53rem">-->
      <div class="home_seach_left backBox" @click="goBack">
        <div style="width: 100%; height: 100%">
          <i class="iconfont icon-back" style="font-size: .4rem;color: #ffffff"></i>
        </div>
      </div>
      <div class="home_seach_input">
        <div class="input_box" style="background: #FF9F7F" @click="jumpTo('/search')">
          <img src="../../assets/img/home/searchIcon.png" alt="">
          <p style="color: #ffffff;">请输入宝贝名称或标题</p>
        </div>
      </div>
    </div>
    <img style="width: 66%;margin: 1rem 17%;" src="../../assets/img/chaoji.png" alt="">
    <div class="new_content">
      <div class="new_one" v-for="(item, index) of list" :key="index">
        <div class="new_center">
          <div class="new_one_head">
            <span v-for="(title, i) of item.title" :key="i">{{title}}</span>
          </div>
        </div>
        <div class="new_one_info">
          <div v-for="(result, i) of item.result" :key="i" @click="open(result.url)">
            <img :src="result.img" alt="">
            <p>{{result.name}}</p>
            <span>{{result.describe}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new_index.vue',
  data () {
    return {
      marginTop: '',
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post('/amoy/user/super-enter', {}, true).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].title = res.data[i].title.split('')
        }
        this.list = res.data
      })
    },
    open (url) {
      api.openWin({
        name: 'aliWin',
        url: '../html/main.html',
        reload: true,
        pageParam: {
          url: url,
          back: 'newIndex'
        },
        animation: {
          type: 'push',
          subType: 'from_right',
          duration: 300
        },
        bounces: false,
        slidBackEnabled: false,
        allowEdit: true
      })
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.marginTop = (api.safeArea.top / size) + 'rem'
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less">
.new_index{
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow-y: auto;
  background: url("../../assets/img/background.png") no-repeat;
  background-size:cover;
  padding-bottom: .5rem;
  .new_content{
    padding: 0 .2rem;
    .new_one{
      width: 100%;
      background: #ffffff;
      box-shadow:0 .04rem .3rem 0 rgba(255,88,71,0.5);
      border-radius: .2rem;
      position: relative;
      margin-top: 1rem;
      .new_center{
        display: flex;
        justify-content: center;
        height: .88rem;
        position: absolute;
        top: -.44rem;
        width: 100%;
        .new_one_head{
          padding: 0 .5rem;
          height: .88rem;
          box-shadow:0 .07rem .27rem 0 rgba(233,121,48,0.23);
          border-radius:.44rem;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            display: inline-block;
            width: .5rem;
            height: .5rem;
            border-radius: .05rem;
            background:linear-gradient(37deg,#F86E64,#FAB065);
            margin-right: .13rem;
            color: #ffffff;
            text-align: center;
            line-height: .46rem;
            font-size: .34rem;
            font-weight:bold;
          }
          span:last-of-type {
            margin-right: 0;
          }
        }
      }

      .new_one_info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 1rem .44rem .3rem;
        box-sizing: border-box;
        flex-wrap: wrap;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: .2rem;
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
          p{
            color: #333333;
            font-size: .26rem;
            opacity:0.9;
            margin-top: .15rem;
          }
          span{
            color: #999999;
            font-size: .2rem;
            opacity:0.9;
          }
        }
        .new_one_div{
          width: 1.65rem;
          padding: .2rem 0;
          background: #FFF8EC;
          justify-content: center;
        }
      }
    }
    .new_one:first-of-type{
      margin-top: 0;
    }
  }
}
</style>
