<template>
  <div class="shopProductList_main">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        商品分类
      </x-header>
    </div>
    <div class="content">
      <div class="left_main" ref="left">
        <ul>
          <li v-for="(item,index) in list" :key="index" :class="active === index ? 'active' : ''" @click="handChange(index,item.id)">
            {{item.title}}
          </li>
        </ul>
        <span :style="{'top': offTop}"></span>
      </div>
      <div class="right_main">
        <!--<div class="img_main">-->
          <!--<img :src="img" alt="">-->
        <!--</div>-->
        <div class="list_main" v-for="(items,i) in content" :key="i">
          <div class="title">
            <span></span>
            <p>{{items.title}}</p>
            <span></span>
          </div>
          <div class="list">
            <div class="list_box" v-for="(item,i) in items.list" :key="i" @click="jumpTo({name:'mallProductList',query:{id:item.id,title:item.title}})">
              <img :src="item.thumb || './static/img/under/111.png'" alt="">
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
export default {
  name: 'shopProductList',
  data () {
    return {
      list: [],
      content: [],
      active: 0,
      img: '',
      offTop: '.3rem',
      width: ''
    }
  },
  mounted: function () {
    // 删除
    this.getList()
  },
  created () {
    this.width = document.documentElement.clientWidth || document.body.clientWidth
    this.size = this.width / 750 * 100
  },
  methods: {
    handChange (index, id) {
      console.log(index)
      this.active = index
      apiHttp.categoryList(id).then(response => {
        if (response.code === 0) {
          this.img = this.list[index].thumb
          this.content = response.data.list
        }
      })
      this.$nextTick(() => {
        let active = document.getElementsByClassName('active')
        this.offTop = active[0].offsetTop / this.size + 0.3 + 'rem'
        this.$refs.right.scrollTop = 0
      })
    },
    getList () {
      apiHttp.indexCategory().then(response => {
        if (response.code === 0) {
          this.img = response.data.list[0].thumb
          this.list = response.data.list
          this.content = response.data.category
        }
      })
    }
  }
}
</script>

<style scoped>
  .shopProductList_main{
    text-align: center;
    height: 100%;
    overflow: hidden;
  }
</style>
