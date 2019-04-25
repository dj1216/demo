<template>
  <div class="header" :style="{background: 'linear-gradient('+$store.state.global.search.bgDeg+'deg,' +$store.state.global.search.bgColor+','+$store.state.global.search.bgSecondColor+')'}">
    <img :src="$store.state.global.search.leftIcon" alt="" class="signIn" @click="jumpTo($store.state.global.search.leftLink.url)" v-if="$store.state.global.search.leftIcon">
    <div class="searchBox" @click="jumpTo('/search')" :style="{background: $store.state.global.search.searchBgColor}">
      <img :src="$store.state.global.search.searchIcon" alt="">
      <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
    </div>
    <img  :src="$store.state.global.search.rightIcon"  alt="" class="shopImg" @click="jumpTo($store.state.global.search.rightLink.url)">
  </div>
</template>

<script>
export default {
  name: 'EditHeader',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
  .header{
    position: absolute;
    left: 0;
    top: -.88rem;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    .searchBox{
      flex: 1;
      height: .6rem;
      border-radius: .3rem;
      background: rgba(255,255,255,.27);
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: .33rem;
      }
      p{
        margin-left: .2rem;
        font-size: .26rem;
      }
    }
    .signIn{
      width: .40rem;
      height: .4rem;
      margin-right: .3rem;
    }
    .shopImg{
      width: .40rem;
      height: .4rem;
      margin-left: .3rem;
    }
    .shop{
      font-size: .6rem;
      line-height: .6rem;
      height: 100%;
      width: .6rem;
      position: relative;
      top: .075rem;
      left: .075rem;
      img{
        width: .45rem;
        height: .45rem;
      }
      .vux-badge{
        background: #fff;
        position: absolute;
        right: 0.01rem;
        top: 0.01rem;
      }
    }
    .iconfont{
      color: #fff;
      font-size: .4rem;
    }
  }
</style>
