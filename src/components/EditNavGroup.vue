<template>
  <div class="tool" :style="{backgroundColor: data.bgColor}">
    <div class="headers" >{{data.title}}</div>
    <div class="option">
      <div v-for="(item, index) of data.items" :key="index" @click="jumpLink(item.link)">
        <div class="imgBox"><img :src="item.img" alt=""></div>
        <div :style="{color: item.color}">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditNavGroup',
  props: ['data'],
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
  .tool{
    border-radius: 10px;
    background: #fff;
    .option{
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        margin-bottom: .4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .headers{
      float: left;
      line-height: 1rem;
      font-size: 0.3rem;
      width: 100%;
      padding-left: 0.2rem;
      position: relative;
      box-sizing: border-box;
      text-align: left !important;
    }
    .headers:before{
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #eeeeee;
      bottom: 0;
      left: 0;
    }
  }
</style>
