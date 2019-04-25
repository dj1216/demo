<template>
    <div class="circleBox">
      <div class="head">
        <p class="title">
          <span>{{other.name}}</span>
          <span>活动时间：{{other.activity_start_time*1000 | dateFormat('MM/DD')}} - {{other.activity_end_time*1000 | dateFormat('MM/DD')}}</span>
        </p>
        <img :src="other.cms_image" alt="" class="bg">
        <p class="info" v-html="other.show_text"></p>
      </div>
      <goods-item v-bind:list = list  @detail="detail"></goods-item>
    </div>
</template>

<script>
import * as utils from '../../utils'
import {dateFormat} from 'vux'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'circleBox',
  components: {
    dateFormat,
    GoodsItem
  },
  filters: {
    dateFormat
  },
  data () {
    return {
      other: utils.storage.get('circle'),
      list: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.other = utils.storage.get('circle')
      if (from.name === 'materials') {
        this.list = []
        this.getInfo()
      }
    }
  },
  methods: {
    detail (item) {
      utils.storage.set('supergoods', [{}])
      this.$router.push('/supergoods?type=' + item.type + '&id=' + item.id + '&i=0' + '&way=1')
    },
    getInfo () {
      this.$http.post('/amoy/hao/get-subject-item', {
        id: this.$route.query.id
      }, true).then(res => {
        for (let i = 0; i < res.data.info.length; i++) {
          res.data.info[i].description = res.data.info[i].goods_desc
          res.data.info[i].zk_final_price = res.data.info[i].origin_price
        }
        this.list = res.data.info
      })
    }
  },
  mounted () {
    // 删除
    this.getInfo()
  }
}
</script>

<style scoped lang="less">
.circleBox{
  .head{
    background: #fff;
    padding: .3rem;
    .title{
      display: flex;
      justify-content: space-between;
      margin: .2rem 0;
      span:first-of-type{
        font-size: .3rem;
        color: #333;
      }
      span:last-of-type{
        font-size: .22rem;
        color: #666;
      }
    }
    .bg{
      width: 100%;
      border-radius: .1rem;
    }
    .info{
      color: #666;
      font-size: .26rem;
      line-height: .4rem;
    }
  }
}
</style>
