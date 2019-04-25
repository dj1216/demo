<template>
    <div class="EditImg" :style="{backgroundColor: data.bgColor}">
      <div v-for="(item, index) of data.items" :key="index" class="oneImg" :style="{flex: item.flex}"  @click="jumpLink(item.link)">
        <img  :src="item.img" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: 'EditImg',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.EditImg{
  overflow: hidden;
  width: 100%;
  display: flex;
  .oneImg{
    overflow: hidden;
    img{
      float: left;
    }
  }
}
</style>
