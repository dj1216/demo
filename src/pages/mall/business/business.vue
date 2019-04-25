<template>
    <div class="business">
      <div v-for="(item,i) in list" :key="i">
          <div class="lists" v-if="showCancel && item.goodsList.length != 0">
            <div class="list-head">
              <div class="list-logo" @click="jump(item.id)"><img :src="item.logo || './static/img/under/111.png'" alt=""></div>
              <div class="list-center" @click="jump(item.id)">
                <div>
                  <span>{{item.title|str}}</span>
                  <span><rater v-model="item.score" active-color="#fc3357" disabled></rater></span>
                </div>
                <div><span>销量 {{item.sales}}</span><span>收藏 {{item.care}}</span></div>
              </div>
              <div class="list-right">
                <p @click="deleteItem(item.id,i)"><span>取消收藏</span></p>
              </div>
            </div>
            <div class="list-body">
              <div v-for="(val,i) in item.goodsList" :key="i" @click="jumpTo({name:'mallHomeDetail',query:{pid:val.pid}})">
                <img :src="val.thumb || './static/img/under/111.png'" alt="">
                <p><span>￥{{val.ex_price}}</span></p>
              </div>
            </div>
          </div>
          <div class="lists" v-if="!showCancel && item.goodsList.length != 0">
            <div class="list-head" @click="jump(item.id)">
              <div class="list-logo"><img v-lazy="item.logo" alt=""></div>
              <div class="list-center">
                <div>
                  <span>{{item.title|str}}</span>
                  <span><rater v-model="item.score" active-color="#fc3357" disabled></rater></span>
                </div>
                <div><span>销量 {{item.sales}}</span><span>收藏 {{item.care}}</span></div>
              </div>
              <div class="list-right"><p style="margin-top: .1rem;border: none">了解更多 >></p></div>
            </div>
            <div class="list-body">
              <div v-for="(val,i) in item.goodsList" :key="i" v-if="i<4" @click="jumpTo({name:'mallHomeDetail',query:{title:val.id}})">
                <img v-lazy="val.thumb" alt="">
                <p><span>￥{{val.ex_price}}</span></p>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import './business.less'
import { Rater } from 'vux'
export default {
  name: 'business',
  components: {Rater},
  data () {
    return {
      txtStyle: ''
    }
  },
  methods: {
    setTxt () {
      if (this.txtStyle === '') {
        this.txtStyle = 'transform:translateX(-2rem)'
      } else {
        this.txtStyle = ''
      }
    },
    // 删除
    deleteItem: function (index, i) {
      console.log(index)
      this.$http.post('/mall/users/shops-care-delete', {careId: index}).then(res => {
        this.$vux.toast.text('取消成功')
        this.$emit('f5')
        this.list.shopList.splice(i, 1)
      })
    },
    jump (id) {
      this.$emit('jump', id)
    }
    // goto(id){
    //   this.$router.push({
    //     name:'homeDetail',
    //     query:{
    //       title:id
    //     }
    //   })
    // }
  },
  props: ['showCancel', 'list'],
  filters: {
    str (val) {
      if (val.length <= 7) {
        return val
      } else if (val.length > 7) {
        return val.substring(0, 7) + '...'
      }
    }
  }
}
</script>

<style scoped>
.business{
  text-align: center;
}
</style>
