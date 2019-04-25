<template>
    <div class="turnOut">
      <p class="title">您当前持有的区块币</p>
      <p class="num">{{data.coinNum}}</p>
      <div class="out">
        <input type="number" placeholder="请输入转出数量" v-model="num"><span  :style="{color: $store.state.global.theme.mainColor}" @click="num = data.coinNum">全部转出</span>
      </div>
      <p class="exchange">转出集分宝数量{{result}}个</p>
      <p class="exchange" :style="{color: $store.state.global.theme.mainColor}">注：一个区块币可以兑换{{data.exchange_ratio}}个集分宝</p>
      <div class="btns" :style="{background: $store.state.global.theme.mainColor}" @click="sure">确定转出</div>
    </div>
</template>

<script>
export default {
  name: 'turnOut',
  components: {},
  data () {
    return {
      data: this.$store.state.global.block,
      num: ''
    }
  },
  computed: {
    result () {
      return (this.num * this.data.exchange_ratio).toFixed(2)
    }
  },
  methods: {
    sure () {
      if (Number(this.num) <= 0) {
        this.$vux.toast.text('请输入要转出的区块币数量')
        return
      }
      if (Number(this.num) > Number(this.data.coinNum)) {
        this.$vux.toast.text('您的账号区块币不足')
        return
      }
      this.$http.post('/amoy/blockchain/transfer-point', {
        coinNum: this.num
      }, true).then((res) => {
        this.$vux.toast.text(res.msg)
        if (res.code === 0) {
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style>
  .weui-toast__content{
    font-size: 12px;
  }
</style>
<style scoped lang="less">
.turnOut{
  height: 100%;
  overflow-y: auto;
  background: #fff;
  .title{
    text-align: center;
    font-size: .26rem;
    color: #333;
    margin-top: .56rem;
  }
  .num{
    text-align: center;
    font-size: .6rem;
    color: #333;
    margin-top: .36rem;
  }
  .out{
    padding: 0.2rem 0;
    margin: 0 .3rem;
    display: flex;
    border-bottom: 1px solid #E5E5E5;
    input{
      flex: 1;
      border: none;
      outline: none;
    }
    span{
      font-size: .26rem;
    }
  }
  .exchange{
    font-size: .28rem;
    color: #333;
    margin-top: .3rem;
    padding-left: .3rem;
  }
  .btns{
    color: #fff;
    font-size: .32rem;
    width: 5.6rem;
    height: .9rem;
    border-radius: .45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem auto 0;
  }
}
</style>
