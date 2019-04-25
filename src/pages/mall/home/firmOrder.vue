<template>
    <div class="firmOrder_main">
        <x-header
          slot="header"
          :left-options="{showBack: false}"
        >
          <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
          确认订单
        </x-header>
      <div class="content">
        <div class="content_top" @click="handAddress()" v-show="obj.address == ''">
            点击添加默认地址
        </div>
        <div class="content_top" @click="jumpTo({name:'mallAddress'})" v-show="obj.address">
          <div class="div1">
              <div class="left_name">
                <i class="iconfont icon-wode1"></i>
                <span>收货人：{{obj.address ? obj.address.username : ''}}</span>
              </div>
              <div class="right_phone">
                {{obj.address ? obj.address.mobile : ''}}
              </div>
          </div>
          <div class="div2">
            <i class="iconfont icon-locationfill"></i>
            <span>{{obj.address ? obj.address.province + obj.address.city + obj.address.district + obj.address.address: ''}}</span>
            <i class="iconfont icon-right1 left"></i>
          </div>
        </div>
        <div class="border">
          <img src="../../../assets/mall/img/home/border.png" alt="">
        </div>
        <div v-for="(items,index) in obj.cartList" :key="index">
          <div class="content_main">
            <div class="list">
              <div class="header">
                <img v-lazy="items.shopInfo.logo" alt="">
                <span>{{items.shopInfo.title}}</span>
              </div>
              <div class="mail" v-for="(item,index) in items.goods" :key="index">
                <div class="left">
                  <img v-lazy="item.thumb" alt="">
                </div>
                <div class="right">
                  <div class="div1">
                    {{item.goodsName}}
                  </div>
                  <div class="div2">
                    <div>
                    {{item.fieldInfo}}
                    </div>
                    <div>
                      ×{{item.goodsNum}}
                    </div>
                  </div>
                  <div class="div3">
                    <div class="price_main"><span>¥</span>{{item.goodsPrice}}</div>
                  </div>
                </div>
              </div>
              <div class="li_main">
                <div class="title_left">快递费</div>
                <div class="title_right">{{items.express.expressName}}</div>
              </div>
              <div class="li_main li_main2">
                <div class="title_left">卖家留言</div>
                <div class="title_right" style="width: 80%"><input type="text" placeholder="（选填），不超过50字" v-model="items.models" style="width: 100%;text-align: left"></div>
              </div>
            </div>
          </div>
          <div class="content_main" style="margin-top:0.1rem;">
            <div class="list">
              <div class="li_main">
                <div class="title_left">商品金额</div>
                <div class="title_right_red">
                  <span>¥</span>{{items.shopInfo.countPrice}}
                </div>
              </div>
              <div class="li_main" v-if="items.express.postagePrice > 0">
                <div class="title_left">运费</div>
                <div class="title_right_red">{{items.express.postagePrice}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
          <div class="footer_main">
            <div class="div1">
              <label>合计</label><span>¥</span>{{obj.countPrice}}
            </div>
            <div class="div_btn" @click="handDetail()">立即购买</div>
          </div>
      </div>
    </div>
</template>

<script>
import * as apiHttp from '../../../api/index'
export default {
  name: 'firmOrder',
  data () {
    return {
      obj: {}
    }
  },
  mounted: function () {
    // 删除
    if (this.$route.query.type) {
      this.getDetail()
    } else {
      this.getDetail('interim', this.$route.query.data)
    }
  },
  methods: {
    getDetail (type, data) {
      apiHttp.cardCheckout(type, data).then(response => {
        if (response.code === 0) {
          this.obj = response.data
          let list = this.obj.cartList
          console.log(list)
          for (let i = 0; i < list.length; i++) {
            list[i].models = ''
          }
        }
      })
    },
    handAddress () {
      this.$router.push({
        name: 'mallAddress'
      })
    },
    queryOrder (data) {
      let noteList = []
      let list = this.obj.cartList
      for (let i = 0; i < list.length; i++) {
        let obj = {}
        obj.id = list[i].shopInfo.id
        obj.content = list[i].models
        noteList[list[i].shopInfo.id] = list[i].models
      }
      // noteList.splice(0,1);
      console.log(noteList)
      console.log(data)
      apiHttp.orderCreate(data, noteList).then(response => {
        if (response.code === 0) {
          this.$router.push({
            name: 'mallPayMent',
            query: {
              orderId: response.data
            }
          })
        }
      })
    },
    handDetail () {
      if (this.$route.query.type) {
        this.queryOrder()
      } else {
        this.queryOrder(this.$route.query.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
