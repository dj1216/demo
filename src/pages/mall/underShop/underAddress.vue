<template>
  <div style="height:100%">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        商家地址
      </x-header>
    </div>
    <iframe :src="url" frameborder="0" width="100%" height="100%" ></iframe>
  </div>
</template>

<script>
  export default {
    computed: {
      userAll: function () {
        return this.$store.state.user.userAll
      }
    },
    data () {
      return {
        url: this.$route.query.url
      }
    },
    mounted: function () {
      console.log()
      // 删除
    }
  }
</script>

<style scoped>
  iframe{
    position:relative;
    top:-5px;
    height: 100%
  }
</style>
