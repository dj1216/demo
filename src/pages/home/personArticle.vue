<template>
  <div class="personArticle">
    <div class="articleBox" v-if="list">
      <img :src="list.article_banner" alt="">
      <p class="title">{{list.name}}</p>
      <div class="author">
        <img :src="list.head_img" alt="" v-if="list.head_img">
        <p>{{list.talent_name}}</p>
        <span>{{list.readtimes}}</span>
      </div>
      <div v-html="articles" class="text-html"></div>
      <div class="box" v-for="(item,index) in list.items" :key="index" @click="detail(item)">
        <div class="commodity">
          <div class="left">
            <img v-lazy="item.thumb" alt="" :key="item.thumb">
          </div>
          <div class="right">
            <div class="top">
              <div class="tao">
                <img src="../../assets/img/home/tblogo.png" alt="" v-if="item.type === 11">
                <img src="../../assets/img/home/tmlogo.png" alt="" v-else>
              </div>
              <div class="text">{{item.title}}</div>
            </div>
            <div class="middle">
              <div class="left">
                <span>券</span>
                <span>￥{{item.coupon_money}}</span>
              </div>
              <span class="right">已售: {{item.volume}}件</span>
            </div>
            <div class="bottom">
              <div class="Bleft">
                <span class="price">券后价￥:</span>
                <span class="money">{{item.coupon_price}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="../../assets/img/home/arqd.png" alt="" class="drqd" @click="show = true">
    <div v-transfer-dom class="articleBox">
      <popup v-model="show" position="bottom" max-height="50%">
        <goods-item v-bind:list = list.items @detail="detail"></goods-item>
      </popup>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils/index'
import {TransferDomDirective as TransferDom, Popup} from 'vux'
import '../../assets/js/api'
import GoodsItem from '../../components/GoodsList'
export default {
  name: 'person-article',
  data () {
    return {
      list: [],
      id: '',
      articles: '',
      show: false
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    GoodsItem
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'personArticle' && from.name !== 'supergoods') {
        this.list = []
        this.articles = ''
        this.get()
      }
    }
  },
  methods: {
    get () {
      let that = this
      this.id = this.$route.query.id
      this.$http.post('/amoy/hao/talent-article', {id: this.id}, true).then(res => {
        this.list = res.data
        this.articles = this.list.article
        this.$nextTick(() => {
          for (let i = 0; i < $api.domAll('.single-info').length; i++) {
            $api.addEvt($api.domAll('.single-info')[i], 'click', function () {
              let itemid = $api.attr(this, 'id')
              let id = itemid.replace('itemid', '')
              utils.storage.set('supergoods', [{}])
              that.$router.push('/supergoods?type=11&id=' + id + '&i=0' + '&way=1')
            })
          }
        })
      })
    },
    detail (item) {
      utils.storage.set('supergoods', [item])
      this.$router.push('/supergoods?type=11&id=' + item.origin_id + '&i=0')
    }
  },
  mounted () {
    this.get()
  }
}
</script>
<style lang="less">
  @import "../../assets/less/common";
  .articleBox{
    /*.goods_list_2{*/
      /*.goods_ul{*/
        /*.goods_li{*/
          /*height: 2.2rem;*/
          /*.preview{*/
            /*width: 1.6rem;*/
            /*height: 1.6rem;*/
          /*}*/
          /*.con_right{*/
            /*width: 5rem;*/
            /*height: 2.2rem;*/
            /*.brand{*/
              /*padding-top: .25rem;*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
  }
  .personArticle{
    .text-html{
      p{
        font-size: .28rem !important;
        line-height: .46rem;
        color: #666;
       span{
         font-size: .28rem !important;
         line-height: .46rem;
         color: #666;
       }
        img{
          margin: .2rem auto !important;
          display: block !important;
        }
      }
    }
    .single-content{
      margin-top: 0.2rem!important;
      .sigle-info,.js_tobuy{
        width: 6rem!important;
        padding: 0.2rem!important;
        margin: 0 auto 0.1rem!important;
        height: 1.6rem!important;
        border-radius: 5px !important;
        box-sizing: content-box;
        .getitemid{
          height: 1.6rem !important;
          width: 1.6rem!important;
        }
        >div:nth-of-type(2){
         width: calc(100% - 1.6rem) !important;
        }
        .phone-title{
          font-size: .28rem !important;
        }
        div{
          padding-left: 0.1rem!important;
          .single-bottom{
            .single-couponmoney{
              border: 1px solid @theme-col !important;
              color: @theme-col !important;
            }
            span{
              font-size: .26rem !important;
            }
          }
          .single-message{
            .single-price{
              width: 100%;
              border-right: none !important;
              span{
                color: @theme-col !important;
                display: inline-block !important;
                font-size: .26rem !important;
              }
            }
            .single-tkmoney{
              display: none !important;
            }
            .single-tkrates{
              display: none !important;
            }
            span{
              padding:0.05rem!important;
              width: 1rem;
              span{
                font-size: 0.3rem!important;
              }
            }
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  @import "../../assets/less/common";
  .personArticle{
    padding: 0.2rem;
    max-width: 100%;
    background: #fff;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    .articleBox{
      height: 100%;
      overflow-y: auto;
      .title{
        font-size: .28rem;
        color: #333;
      }
      .author{
        display: flex;
        align-items: center;
        padding: .2rem 0;
        img{
          width: .84rem;
          height: .84rem;
          border-radius: 50%;
        }
        p{
          flex: 1;
          padding: 0 .2rem;
          font-size: .28rem;
          color: #666;
        }
        span{
          font-size: .24rem;
          color: #666;
        }
      }
    }
    .drqd{
      position: absolute;
      right: .34rem;
      bottom: 110px;
      width: 36px;
      height: 36px;
    }
    .praise{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: @theme-col;
      position: fixed;
      opacity: 0.2;
      bottom: 0.5rem;
      right: 0.4rem;
      text-align: center;
      .imgBox{
        margin: 0.1rem auto 0rem auto;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #fff;
        border-radius: 50%;
      }
      span{
        display: block;
        font-size: 0.16rem;
        color: #fff;
      }
    }
    .box{
      margin-bottom: 0.2rem;
      >p {
        font-size: 0.24rem;
        letter-spacing:0.03rem;
        color: #676767;
      }
      .commodity{
        height: 2.2rem;
        border: 1px solid #E8E8E8;
        border-radius: 5px;
        margin-top: 0.2rem;
        padding: 0.1rem;
        .left{
          float: left;
          height: 2.2rem;
          width: 2.2rem;
          /*background-color: pink;*/
          border-radius: 0.08rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          float: left;
          height: 2.2rem;
          padding-left: 0.24rem;
          color: black;
          .top{
            height: 0.96rem;
            .tao{
              position: relative;
              float: left;
              width: 0.34rem;
              height: 0.34rem;
              background-color: pink;
              margin-top: 0.12rem;
              border-radius: 0.05rem;
              img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
            .text{
              width: 3.8rem;
              float: left;
              font-size: 0.32rem;
              text-overflow:ellipsis;
              white-space:nowrap;
              overflow:hidden;
              padding-left: 0.2rem;
              color: black;
            }
          }
          .middle{
            height: 0.5rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .left{
              position: relative;
              width: 1.8rem;
              height: 0.50rem;
              text-align: center;
              line-height: 0.5rem;
              font-size: 0.3rem;
              color: @theme-col;
              span{
                border: 1px solid @theme-col;
                width: 0.5rem;
                display: inline-block;
              }
              span:nth-child(2){
                border-left: none;
                position: relative;
                left: -0.1rem;
                width: 1rem;
              }
            }
            .left::after{
              left: 1.1rem;
            }
            .right{
              font-size: 0.2rem;
              width: 2rem;
              line-height: 0.5rem;
              text-align: right;
              color: #999999;
            }
          }
          .bottom{
            margin-top: 0.3rem;
            height: 0.32rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .Bleft {
              width: 60%;
              display: flex;
              justify-content: left;
              /*margin-left: -0.1rem;*/
              .price {
                width: 52%;
                font-size: 0.26rem;
                color: @theme-col;
                line-height: 0.32rem;
              }
              .money {
                line-height: 0.32rem;
                width:0.5rem;
                font-size: 0.3rem;
                color: @theme-col;
              }
            }
          }
        }
      }
    }
  }
</style>
