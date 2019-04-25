<template>
    <div class="index">
      <div class="search">
        <!--<img src="../../assets/img/super.png" alt="">-->
        <img src="../../assets/img/super/8.png" alt="">
        <div class="box_1">
          <img src="../../assets/img/super/9.png" alt="">
          <p>超多商品优惠券等你来领</p>
        </div>
        <div class="box">
          <input type="text" v-model="search" placeholder="输入商品名称或关键词">
          <img src="../../assets/img/super/1.png" alt="">
          <span @click="toSearch">搜索</span>
        </div>
        <div class="types">
          <!--<span v-for="(item, index) of types" :class="{active: index === type}" :key="index" @click="type = index">{{item}}</span>-->
          <img src="../../assets/img/super/12.png" alt="" @click="type = 0">
          <img src="../../assets/img/super/3.png" alt="" @click="type = 1">
          <img src="../../assets/img/super/4.png" alt="" @click="type = 2">
          <img class="types_select" src="../../assets/img/super/5.png" alt="" v-if="type === 0">
          <img class="types_select" style="left:52%" src="../../assets/img/super/5.png" alt="" v-else-if="type === 1">
          <img class="types_select" style="left: 95%" src="../../assets/img/super/5.png" alt="" v-else>
        </div>
      </div>
      <div class="t">
        <img src="../../assets/img/xin.png" alt="">
        <span>猜你喜欢</span>
      </div>
      <div class="like">
        <span v-for="(item, index) of list" :key="index" @click="searchlike(item.keyword)">{{item.keyword}}</span>
      </div>
      <div class="high"></div>
      <div class="t" v-if="data">
        <img src="../../assets/img/jiaocheng.png" alt="">
        <span>{{data.title}}</span>
        <div v-html="data.content" class="content"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      search: '',
      type: 0,
      types: ['淘宝', '京东', '拼多多'],
      data: '',
      list: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.search = ''
    })
  },
  methods: {
    searchlike (item) {
      this.$router.push('/results?search=' + encodeURIComponent(item) + '&type=' + this.type + '&index=0')
    },
    toSearch () {
      this.$router.push('/results?search=' + encodeURIComponent(this.search) + '&type=' + this.type + '&index=0')
    },
    getInfo () {
      this.$http.post('/amoy/home/search-guide', {}, false, true).then(res => {
        this.data = res.data
      })
    },
    getLike () {
      this.$http.post('/amoy/home/search-hot', {}, false, true).then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    }
  },
  activated () {
    this.getLike()
    this.getInfo()
  },
  mounted () {
    // 删除
    this.getLike()
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.index{
  overflow-x: hidden;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  .search{
    width: 100%;
    height: 5.2rem;
    position: relative;
    border-bottom: .2rem solid #F7F7F7;
    img{
      width: 100%;
      height: 100%;
    }
    .box_1{
      position: absolute;
      left: 50%;
      top: 1rem;
      width: 4rem;
      height: 0.58rem;
      margin-left: -2rem;
      img{
        width: 1.82rem;
        height: 0.58rem;
        margin-left: 1.09rem;
      }
      p{
        font-size:.32rem;
        font-weight:500;
        color:rgba(42,52,71,1);
        line-height:20px;
        text-align: center;
        margin-top: .3rem;
      }
    }
    .types{
      position: absolute;
      left: 50%;
      bottom: 0.37rem;
      width: 4.68rem;
      margin-left: -2.34rem;
      display: flex;
      justify-content: space-between;
      img{
        width: .76rem;
        height: .76rem;
      }
      .types_select{
        width: 0.32rem;
        height: 0.32rem;
        position: absolute;
        left: 0.5rem;
        top: -.05rem;
      }
    }
    .box{
      position: absolute;
      left: 0.55rem;
      top: 2.76rem;
      width: 6.40rem;
      height: .8rem;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 26px 0px rgba(173,173,173,0.34);
      border-radius: .4rem;
      input{
        position: absolute;
        left: 0;
        top: 0;
        outline: none;
        border: none;
        height: .8rem;
        width: 5.04rem;
        border-bottom-left-radius: .4rem;
        border-top-left-radius: .4rem;
        color: #666666;
        padding-left: .72rem;
        box-sizing: border-box;
        font-size: .28rem;
      }
      img{
        position: absolute;
        top: .25rem;
        left:.3rem;
        width: .27rem;
        height: .29rem;
      }
      span{
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        width: 1.36rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        /*font-size: 18px;*/
        background: @theme-col;
        color: #fff;
        border-bottom-right-radius: .4rem;
        border-top-right-radius: .4rem;
      }
    }
  }
  .t{
    margin: .4rem 0 .2rem;
    font-size: .3rem;
    text-align: center;
    position: relative;
    img{
      width: .32rem;
      height: .27rem;
      margin-right: .2rem;
    }
    span{
      font-size: .3rem;
      color: #666;
    }
  }
  .t:before{
    content: '';
    position: absolute;
    left: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
  .t:after{
    content: '';
    position: absolute;
    right: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
  .like{
    overflow: hidden;
    font-size: .26rem;
    padding: .2rem 0;
    span{
      display: inline-block;
      padding: 0 0.2rem;
      font-size: .24rem;
      /*height: .46rem;*/
      line-height: .46rem;
      border: 1px solid #cacaca;
      border-radius: .23rem;
      margin-left: .2rem;
      color: #666666;
      margin-top: .2rem;
    }
  }
  .high{
    background: @h-col;
    height: .1rem;
    width: 100%;
  }
  .content{
    padding: .2rem;
    text-align: left;
    img{
      max-width: 100%;
    }
  }
}
</style>
