<template>
  <div id="sort">
    <div class="header" :style="{paddingTop: statusH + 'rem',color: $store.state.global.search.color,background: 'linear-gradient('+$store.state.global.search.bgDeg+'deg,' +$store.state.global.search.bgColor+','+$store.state.global.search.bgSecondColor+')'}">
      <div class="searchBox" @click="jumpTo('/search?type=0')"  :style="{background: $store.state.global.search.searchBgColor}">
        <img :src="$store.state.global.search.searchIcon" alt="">
        <p :style="{color:$store.state.global.search.color}">{{$store.state.global.search.searchPlaceholder}}</p>
      </div>
    </div>
    <div class="sort_con" v-if="data" :style="{top: (0.88 + statusH) + 'rem'}">
      <div class="sort_left" ref="left">
        <ul>
          <template v-for="(item, index) in data">
            <li  :key="index" v-if="colorIndex === index" class="red" :style="{color: $store.state.global.theme.mainColor}"  @click="change(item, index)">{{item.main_name}}</li>
            <li :key="index" v-else @click="change(item, index)">{{item.main_name}}</li>
          </template>
        </ul>
        <span :style="{'top': offTop,background: $store.state.global.theme.mainColor}"></span>
      </div>
      <div class="sort_right" ref="right">
        <div ref="right">
          <div class="sort_right_for"  v-for="(item, index) in data[colorIndex].data" :ref="'right'+index" :key="index" :class="[colorIndex === index ? 'redCopy' : '']">
            <!--<h2 @click="jumpTo('/list?type=11&title=' + item.next_name + '&cid=' + data[colorIndex].cid)">-->
            <h2>
              <span></span>
              <p>{{item.next_name}}</p>
              <span></span>
              <!--<i>更多</i>-->
            </h2>
            <ul>
              <li v-for="(t, i) in item.info" :key="i" @click="jumpTo('/list?type=11&title=' + t.son_name + '&cid=' + data[colorIndex].cid)">
                <img v-lazy="t.imgurl" alt="" :key="t.imgurl">
                <p>{{t.son_name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort',
  data () {
    return {
      data: '',
      colorIndex: 0,
      offTop: '.4rem',
      width: '',
      flag: true,
      right: false,
      statusH: ''
    }
  },
  created () {
    this.width = document.documentElement.clientWidth || document.body.clientWidth
    this.size = this.width / 750 * 100
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  methods: {
    getInfo () {
      this.$http.post('/amoy/hao/super-classify', {}, true).then(res => {
        this.data = res.data
      })
    },
    change (item, index) {
      this.colorIndex = index
      this.$nextTick(() => {
        let red = document.getElementsByClassName('red')
        this.offTop = red[0].offsetTop / this.size + 0.4 + 'rem'
        this.$refs.right.scrollTop = 0
      })
    }
  },
  updated () {
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
#sort{
  background: #fff;
  position: relative;
  .searchBox{
    img{
      width: .3rem;
    }
    p{
      margin-top: 0.02rem;
    }
  }
  .sort_con{
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
  }
}
</style>
