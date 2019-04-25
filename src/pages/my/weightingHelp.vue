<template>
  <div class="we-help" v-html="data.remark" v-if="data.remark">
    <!--<div style="width: 7.1rem;height: 3.62rem;border-radius: .1rem;background: #ffffff;margin: .3rem auto;">-->
      <!--<div style="width:100%;height: 1rem;display: flex;align-items: center;">-->
        <!--<p style="background: #fc3357;color: #fff;margin-left: -3%;padding: .1rem .5rem;border-top-right-radius: 0.3rem;border-bottom-right-radius: 0.3rem;font-size: .28rem;">如何获取分红机会</p>-->
      <!--</div>-->
      <!--<div style="margin-left: .2rem;font-size: .26rem;color: #999999;">-->
        <!--1.注册U券有效会员 <br>-->
        <!--2.成功领取并下单任意商品即可获取一次分红机会 <br>-->
        <!--3.注册U券有效会员 <br>-->
        <!--4.成功领券并下单任意商品即可获取一次分红机会-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'weightingHelp.vue',
    data () {
      return {
        data: {}
      }
    },
    mounted () {
      this.$http.post('amoy/task/shares-info', {}, true).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    }
  }
</script>

<style lang="less">
.we-help{
  width: 7.1rem;
  border-radius: .1rem;
  background: #ffffff;
  margin: .3rem auto;
  padding: .2rem 0;
}
</style>
