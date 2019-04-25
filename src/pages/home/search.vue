<template>
    <div class="search">
      <div class="header">
        <i class="iconfont icon-back" @click="goBack()"></i>
        <div class="searchBox">
          <i class="iconfont icon-search"></i>
          <input placeholder="请输入关键字" v-model="keyword" @keyup.enter="search" v-focus/>
        </div>
        <span @click="search" :style="{color: $store.state.global.theme.mainColor}" >搜索</span>
      </div>
      <div class="high"></div>
      <div class="history">
        <div class="t">
          <span>搜索记录</span>
          <i class="iconfont icon-delete" @click="del"></i>
        </div>
        <div class="listBox">
          <span v-for="(item,index) in keywords" v-bind:key="index" @click="history(item)">{{item}}</span>
        </div>
      </div>
      <div class="high"></div>
      <div class="history">
        <div class="t">
          <span>大家都在搜</span>
        </div>
        <div class="listBox">
          <span v-for="(item, index) of list" :key="index" @click="history(item.keyword)">{{item.keyword}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'search',
  components: {},
  data () {
    return {
      keyword: this.$route.query.key ? this.$route.query.key : '',
      keywords: JSON.parse(utils.storage.get('keyword')) || [],
      type: Number(this.$route.query.type) === 1 || Number(this.$route.query.type) === 2 ? this.$route.query.type : 0,
      list: []
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {
    searchlike (item) {
      this.$router.push('/results?search=' + encodeURIComponent(item) + '&type=0&index=0')
    },
    history (item) {
      this.keyword = item
      this.search()
    },
    del () {
      utils.storage.set('keyword', JSON.stringify([]))
      this.keywords = []
    },
    search () {
      let keyCode = this.keyword
      if (keyCode === '') {
        this.$vux.toast.text('请输入关键词')
        return
      }
      let key = JSON.parse(utils.storage.get('keyword'))
      if (key) {
        const index = key.indexOf(keyCode)
        if (index !== -1) {
          key.splice(index, 1)
        }
        key.unshift(keyCode)
      } else {
        key = []
        key.unshift(keyCode)
      }
      key = key.slice(0, 10)
      utils.storage.set('keyword', JSON.stringify(key))
      // this.$router.replace({path: '/search', query: {key: keyCode}})
      this.$router.replace('/results?search=' + encodeURIComponent(keyCode) + '&type=' + this.type + '&index=0')
    },
    getLike () {
      this.$http.post('/amoy/home/search-hot', {}, false, true).then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getLike()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.search{
  background: #fff;
  height: 100%;
  .header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .88rem;
    background: #fff;
    .icon-back{
      font-size: .4rem;
      color: #000;
      margin-top: .02rem;
    }
    .searchBox{
      width: 5.5rem;
      height: .6rem;
      border-radius: .3rem;
      background: #efefef;
      display: flex;
      align-items: center;
      padding-left: .3rem;
      .icon-search{
        font-size: .27rem;
        color: #999;
      }
      input{
        background: #efefef;
        margin-left: .2rem;
        width: 4.8rem;
        font-size: .26rem;
        color: #999;
        outline: none;
        border: none;
      }
    }
    span{
      font-size: .3rem;
      margin-right: .2rem;
    }
  }
  .high{
    background: @h-col;
    height: .1rem;
    width: 100%;
  }
  .history{
    padding: .2rem;
    .t{
      display: flex;
      justify-content: space-between;
      span{
        font-size: .3rem;
        color: #666;
      }
      i{
        font-size: .3rem;
        color: #666;
      }
    }
  }
  .listBox{
    overflow: hidden;
    font-size: .26rem;
    padding: .2rem 0;
    span{
      display: inline-block;
      padding: 0 .2rem;
      font-size: 12px;
      /*height: .46rem;*/
      line-height: 24px;
      border: 1px solid #cacaca;
      border-radius: 12px;
      margin-left: .2rem;
      color: #666666;
      margin-top: .2rem;
    }
  }
}
</style>
