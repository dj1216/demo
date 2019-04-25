<template>
    <div class="GoodsList">
      <div :class="{goods_list_2 : !styles, goods_list_1 : styles}">
        <ul class="goods_ul">
          <li class="goods_li" v-for="item of list" :key="item.origin_id" @click="detail(item)">
            <div class="preview">
              <img v-lazy="item.thumb" alt="" :key="item.thumb">
              <img src="../assets/img/home/video.png" alt="" class="video" v-if="item.video_url && showVideo"  @click.stop="openVideo(item)">
              <p class="commission_money" v-if="item.commission_money">分享赚：{{item.commission_money}}</p>
            </div>
            <div class="con_right">
              <p class="brand">
                <img src="../assets/img/home/tblogo.png" alt="" v-if="Number(item.type) === 11">
                <img src="../assets/img/home/tmlogo.png" alt="" v-else-if="Number(item.type) === 12">
                <img src="../assets/img/home/jdlogo.png" alt="" v-else-if="Number(item.type) === 21">
                <img src="../assets/img/home/pddlogo.png" alt="" v-else-if="Number(item.type) === 31">
                {{item.title}}
              </p>
              <p class="listinfo">{{item.description}}</p>
              <div class="original"><p>原价:&nbsp;&nbsp;<del>￥{{item.zk_final_price}}</del></p><i>已售: {{item.volume}}</i></div>
              <div class="price"><span class="later" :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">券后价</span><p :style="{color: $store.state.global.theme.mainColor}">￥<span>{{item.coupon_price}}</span></p><b :style="{background: 'linear-gradient('+$store.state.global.theme.deg+'deg,' +$store.state.global.theme.mainColor+','+$store.state.global.theme.secondColor+')'}">{{item.coupon_money || 0}}元券</b></div>
              <div class="up_gain" v-if="$bizId !== 1 && item.level_commission_money && item.level_commission_money != 0">
                <span v-if="item.commission_money">预估赚:￥{{item.commission_money}}</span>
                <span v-if="item.level_commission_money && item.level_commission_money != 0 && (item.commission_money != item.level_commission_money)">升级赚:￥{{item.level_commission_money}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div id="empty"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'GoodsList',
  components: {},
  props: ['list', 'styles', 'showVideo'],
  data () {
    return {}
  },
  methods: {
    detail (item) {
      this.$emit('detail', item)
    },
    openVideo (item) {
      this.$emit('openVideo', item)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">

</style>
