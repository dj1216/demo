<template>
    <div class="EditText" @click="jumpLink(data.link)" :style="{padding: data.padding +'px',backgroundColor: data.bgColor, fontSize: data.size + 'px',color: data.color,textAlign:data.align}">{{data.text}}</div>
</template>

<script>
export default {
  name: 'EditText',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.EditText{
  overflow-y: hidden;
}
</style>
