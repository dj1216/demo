<template>
  <div class="payMent yuWithdraw">
    <div class="header">
      <x-header
        slot="header"
        :left-options="{showBack: false}"
      >
        <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
        {{titleInfo.credit1}}转{{titleInfo.credit2}}
        <a slot="right" @click="jumpTo({name:'mallPointsYueList'})">记录</a>
      </x-header>
    </div>
    <div class="content" v-if="isShow">
      <div class="headerList">
        <div class="list">
          <div>总{{titleInfo.credit1}}</div>
          <div class="red">{{userInfo.credit1}}</div>
        </div>
        <div class="list">
          <div>手续费</div>
          <div>{{config.poundage + '%'}}</div>
        </div>
        <div class="list">
          <div>兑换比率</div>
          <div>{{config.scaling + '%'}}</div>
        </div>
      </div>
      <div class="payMent_yu">
        <table></table>
        <div class="title">
          兑换额度
        </div>
        <div class="input_box">
          <input type="text" placeholder="请输入兑换额度" v-model="price">
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="handShow">确定兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as apiHttp from '../../../../api/index'
  import * as utils from '../../../../utils'
  export default {
    data () {
      return {
        data: {},
        price: '',
        isShow: false,
        titleInfo: utils.storage.get('titleInfo'),
        config: {},
        userInfo: {}
      }
    },
    mounted () {
      this.getNew()
    },
    methods: {
      getNew () {
        apiHttp.jifenYue().then(response => {
          if (response.code === 0) {
            this.isShow = true
            this.data = response.data
            this.config = response.data.config
            this.userInfo = response.data.userInfo
          }
        })
      },
      handShow () {
        if (!this.price) {
          this.$vux.toast.text('兑换额度不能为空')
          return
        }
        apiHttp.jifenYueSub('save', this.price).then(res => {
          if (res.code === 0) {
            this.$vux.toast.text(res.msg)
            setTimeout(()=>{
              this.$router.push({name: 'mallPointsYueList'})
            }, 1000)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
