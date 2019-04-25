<template>
    <div class="EditBlank" :style="{height: data.height +'px',backgroundColor: data.bgColor}">
    </div>
</template>

<script>
export default {
  name: 'EditBlank',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.EditBlank{
  overflow: hidden;
  width: 100%;
  font-size: 0;
}
</style>
