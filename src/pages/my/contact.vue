<template>
    <div class="contact">
      <div class="t vux-1px-b">
        <span class="info">在线客服时间：</span>
        <p><span v-html="data.customerServiceTime"></span></p>
      </div>
      <div class="way vux-1px-b">
        <p>客服渠道</p>
        <p>QQ：<span>{{data.customerQQ}}</span></p>
        <!--<p>微信：<span>{{data.customerwechat}}</span></p>-->
        <!--<p>电话：<a :href="'tel:' + data.customerPhone">{{data.customerPhone}}</a></p>-->
      </div>
    </div>
</template>

<script>
export default {
  name: 'contact',
  components: {},
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/user/customer-service', {},true).then(res => {
        this.data = res.data
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.contact{
  height: 100%;
  background: #fff;
  .t{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    height: .9rem;
    .info{
      font-size: .28rem;
      color: #666;
    }
    p{
      font-size: .24rem;
      span{
        color: #999;
        font-size: .24rem;
        margin-left: .1rem;
      }
    }
  }
  .way{
    p{
      font-size: .28rem;
      color: #666;
      line-height: .4rem;
      padding: .2rem 0 .2rem .5rem;
    }
    p:first-of-type{
      padding-left: .2rem;
    }
    p:last-of-type{
      a{
        color: #a1e3bd;
      }
    }
  }
}
</style>
