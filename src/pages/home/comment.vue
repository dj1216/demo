<template>
    <div class="comment">
      <textarea name="" id="" v-model="content"  rows="10" placeholder="请输入至少5个字符"></textarea>
      <div class="edit_button btn_login">
        <button class="btn_bright_red" @click="commit">提交</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'comment',
  components: {},
  data () {
    return {
      content: ''
    }
  },
  methods: {
    commit () {
      let word = this.content.replace(/(^\s*)|(\s*$)/g, '')
      if (word.length < 5) {
        this.$vux.toast.text('请输入至少5个字符')
        return
      }
      this.$http.post('/amoy/drying/comment', {
        dry_id: this.$route.query.id,
        content: this.content
      }, true).then(res => {
        if (res.code === 0) {
          this.$vux.toast.text('评论成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.comment{
  height: 100%;
  background: #fff;
  padding: 0.3rem;
  box-sizing: border-box;
  textarea{
    color: #999;
    background: #f7f7f7;
    padding: .1rem;
    border: none;
    width: 100%;
    box-sizing: border-box;
    border-radius: .2rem;
  }
}
</style>
