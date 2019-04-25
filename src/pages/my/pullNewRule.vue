<template>
  <div class="pn-rule">
    <div class="rule-content" v-if="data.remark">
      <div class="pn-one">
        <p>返现规则</p>
      </div>
      <div class="pn-two" v-html="data.remark"></div>
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
      this.$http.post('/amoy/user/new-user', {}, true, true).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    }
  }
</script>

<style lang="less">
  .pn-rule{
    .rule-content{
      width: 7.1rem;
      border-radius: .1rem;
      background: #ffffff;
      margin: .3rem auto;
      .pn-one{
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        p{
          background: #fc3357;
          color: #fff;
          margin-left: -3%;
          padding: .1rem .5rem;
          border-top-right-radius: 0.3rem;
          border-bottom-right-radius: 0.3rem;
          font-size: .28rem;
        }
      }
      .pn-two{
        font-size: .26rem;
        color: #6E6E6E;
        padding: 0 .2rem .3rem;
        box-sizing: border-box;
      }
    }
  }
</style>
