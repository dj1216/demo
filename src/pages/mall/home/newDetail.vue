<template>
    <div class="newdetail">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        公告详情
      </x-header>
      <div class="articleInfo">
        <table></table>
        <div class="articleInfo_main">
          <div class="title">
            {{content.title}}
          </div>
          <div class="time">
            {{parseInt(content.created_at) | formatDate}}
          </div>

          <div class="content" v-html="content.info">
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import {formatDate} from '../../../plugin/data'
export default {
  name: 'newDetail',
  data () {
    return {
      content: ''
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    // 删除
    let id = this.$route.query.id
    this.$http.post('/mall/index/notice-detail?i=1', {id: id}).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.content = res.data.detail
      } else {
        this.$vux.toast.text(res.msg)
      }
    })
  }
}
</script>

<style scoped>

</style>
