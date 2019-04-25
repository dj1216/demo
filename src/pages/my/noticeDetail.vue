<template>
    <div class="noticeDetail" v-if="data">
      <div class="title">{{data.title}}</div>
      <div class="time">{{data.created_at}}</div>
      <div class="content" v-html="data.content"></div>
    </div>
</template>

<script>
export default {
  name: 'noticeDetail',
  components: {},
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/home/announcement-detail', {
        id: this.$route.query.id
      }, true).then(res => {
        this.data = res.data
      })
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.noticeDetail{
  height: 100%;
  background: #fff;
  overflow-y: auto;
  padding: .2rem;
  box-sizing: border-box;
  .title{
    font-size: .3rem;
  }
  .time{
    padding: .2rem 0;
    font-size: .24rem;
    color: #999;
  }
  .content{
    img{
      max-width: 100% !important;
    }
  }
}
</style>
