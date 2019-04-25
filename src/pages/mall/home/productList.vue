<template>
    <div class="productList">
      <x-header :left-options="{showBack: false}" class="category-head" >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        <a  class="head-right">{{title}}</a>
      </x-header>
      <div class="productList-nav">
        <div :class="{'focus':select===1}" @click="selectItem(1)">全部</div>
        <div :class="{'focus':select===2}" @click="selectItem(2)">最新</div>
        <div :class="{'focus':select===3}" @click="selectItem(3)">
          价格
          <img src="../../../assets/mall/img/business/logo/jiantou.jpg" alt="" v-if="price">
          <img src="../../../assets/mall/img/business/logo/jiantou1.jpg" alt="" v-if="!price">
        </div>
        <div :class="{'focus':select===4}" @click="selectItem(4)">
          销量
          <img src="../../../assets/mall/img/business/logo/jiantou.jpg" alt="" v-if="sales">
          <img src="../../../assets/mall/img/business/logo/jiantou1.jpg" alt="" v-if="!sales">
        </div>
      </div>
      <List :list="list" style="margin-top: 1.9rem;height: calc(100% - 105px);overflow-y: auto"></List>
    </div>
</template>

<script>
import {XHeader} from 'vux'
import List from '../../../components/list'
export default {
  name: 'productList',
  components: {
    XHeader,
    List
  },
  data () {
    return {
      price: true,
      sales: true,
      select: 1,
      title: '',
      list: ''
    }
  },
  methods: {
    selectItem (type) {
      this.select = type
      if (type === 3) {
        this.price = !this.price
      } else if (type === 4) {
        this.sales = !this.sales
      }
      let obj = {}
      if (type === 1) {
        obj = {
          isRecommend: 1,
          cid: this.$route.query.id,
          keyword: this.$route.query.keyword
        }
      } else if (type === 2) {
        obj = {
          time: 1,
          cid: this.$route.query.id,
          keyword: this.$route.query.keyword
        }
      } else if (type === 3) {
        if (this.price === true) {
          obj = {
            price: 1,
            desc: 0,
            cid: this.$route.query.id,
            keyword: this.$route.query.keyword
          }
        } else if (this.price === false) {
          obj = {
            price: 1,
            desc: 1,
            cid: this.$route.query.id,
            keyword: this.$route.query.keyword
          }
        }
      } else if (type === 4) {
        if (this.sales === true) {
          obj = {
            sales: 1,
            desc: 0,
            cid: this.$route.query.id,
            keyword: this.$route.query.keyword
          }
        } else if (this.sales === false) {
          obj = {
            sales: 1,
            desc: 1,
            cid: this.$route.query.id,
            keyword: this.$route.query.keyword
          }
        }
      }
      this.$http.post('/mall/index/goods-list', obj).then(res => {
        if (res.code === 0) {
          this.list = res.data.list
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    },
    getList () {
      if (this.$route.query.id) {
        this.$http.post('/mall/index/goods-list', {
          cid: this.$route.query.id,
          keyword: this.$route.query.keyword
        }).then(res => {
          if (res.code === 0) {
            this.list = res.data.list
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      } else if (this.$route.query.spid) {
        this.$http.post('/mall/index/goods-list', {
          spid: this.$route.query.spid,
          keyword: this.$route.query.keyword
        }).then(res => {
          if (res.code === 0) {
            this.list = res.data.list
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      } else {
        this.$http.post('/mall/index/goods-list', {
          // spid: this.$route.query.spid,
          keyword: this.$route.query.keyword
        }).then(res => {
          if (res.code === 0) {
            this.list = res.data.list
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      }
    },
    setTitle () {
      if (this.$route.query.keyword) {
        this.title = this.$route.query.keyword.substring(0, 4) + '...'
      } else if (this.$route.query.title) {
        this.title = this.$route.query.title
      } else {
        this.title = '商品列表'
      }
    }
  },
  mounted () {
    // 删除
    this.getList()
    this.setTitle()
  }
}
</script>

<style scoped>

</style>
