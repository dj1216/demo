<template>
    <div class="about" v-if="data">
      <div v-html="data" class="content"></div>
    </div>
</template>

<script>
export default {
  name: 'about',
  components: {},
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/user/get-user-agreement', {}, true).then(res => {
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
.about{
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
  .content{
    padding: .2rem;
    font-size: .28rem;
    img{
      max-width: 100%;
    }
  }
}
</style>
