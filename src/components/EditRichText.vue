<template>
    <div class="EditRichText" v-html="decodeURIComponent(data.html)" @click="jumpLink(data.link)" :style="{padding: data.padding +'px',backgroundColor: data.bgColor}">
    </div>
</template>

<script>
export default {
  name: 'EditRichText',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.EditRichText{
  overflow-y: hidden;
  img{
    max-width: 100% !important;
  }
}
</style>
