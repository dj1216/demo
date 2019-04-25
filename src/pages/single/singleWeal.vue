<template>
  <div class="single_weal">
    <div class="weal_body">
      <div class="weal_list">
        <p class="list_one">{{data.title}}</p>
        <div class="list_two" v-html="data.rule"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singleWeal.vue',
    data () {
      return {
        data: ''
      }
    },
    mounted () {
      this.$http.post('/amoy/home/free-rule').then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      })
    }
  }
</script>

<style lang="less">
.single_weal{
  .weal_body{
    padding: 0 .3rem;
    width: 100%;
    box-sizing: border-box;
    .weal_list{
      width: 6.9rem;
      margin-top: 0.5rem;
      background: #ffffff;
      border-radius: .16rem;
      .list_one{
        text-align: center;
        padding: .3rem 0;
        color: #333333;
        font-size: .3rem;
      }
      .list_two{
        padding: 0 .34rem .3rem;
        color: #666666;
        font-size: .26rem;
        text-align: center;
      }
      img{
        max-width: 100%;
      }
    }
  }
}
</style>
