<template>
    <div class="EditNav">
      <div class="allBox"  :style="{background: data.bgColor}">
        <div class="allList" v-for="(item, index) of data.items" :key="index" @click="jumpLink(item.link)">
          <img v-lazy="item.img" alt="" :key="item.img">
          <span :style="{color: item.color}">{{item.text}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EditNav',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {},
  computed: {
    w () {
      return ((1 / this.data.items.length).toFixed(4) * 100) + '%'
    }
  },
  created () {
    console.log(this.icons)
  }
}
</script>

<style scoped lang="less">
  .allBox{
    overflow: hidden;
    /*padding: .2rem 0 0;*/
    /*margin: .2rem 0;*/
    background: #fff;
    display: flex;
    .allList{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-bottom: .05rem;
      }
      span{
        font-size: .24rem;
        word-break: keep-all;
      }
    }
  }
</style>
