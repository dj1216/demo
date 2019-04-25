<template>
  <div style="height:100%">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        查看物流
      </x-header>
    </div>
    <!--<v-html-panel :url.asyc="$route.params.http"></v-html-panel>-->
    <iframe :src="url" frameborder="0" width="100%" height="100%" ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'CSD',
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
    }
  }
</script>

<style scoped>
  iframe{
    position:relative;
    top:-2px;
    height: 100%
  }
</style>
