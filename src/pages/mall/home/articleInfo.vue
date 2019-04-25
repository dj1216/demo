<template>
  <div>
    <x-header
      slot="header"
      :left-options="{showBack: false}"
    >
      <a @click="jumpTo({name:'mallHome'})" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
      文章详情
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
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
export default {
  name: 'articleInfo',
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
  mounted: function () {
    // 删除
    apiHttp.articleDetail(this.$route.query.id).then(response => {
      if (response.code === 0) {
        this.content = response.data.detail
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
