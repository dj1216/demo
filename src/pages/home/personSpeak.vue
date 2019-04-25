<template>
  <div class="personSpeak" id="personSpeak">
    <div class="swiperBox">
      <div class="bgc"><img src="../../assets/img/my/kq.jpg" alt=""></div>
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(item, index) in list.topdata" :key="index" :class="{active:index == 0, shadow:true}">
          <!--<img :src="item.article_banner" style="width: 100%;height: 100%">-->
          <div @click="detail(item.id)">
            <div class="banner">
              <img v-lazy="item.article_banner" alt="">
            </div>
            <div class="explain">
              {{item.shorttitle}}
            </div>
            <div class="items">
              <div class="piece">
                <span>{{item.highquality}}</span>
                <span>单品</span>
              </div>
              <div class="img">
                <img :src="item.image" alt="">
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
      <div class="productionNew">
        <div class="abs"></div>
        <span class="text">本周新作</span>
          <div class="production">
            <div class="box">
              <div class="single" v-for="(item,index) in list.newdata" :key="index" @click="detail(item.id)">
                <div class="imgBox">
                  <img v-lazy="item.article_banner" alt="">
                </div>
                <span>&nbsp;{{item.name}} </span>
                <div class="texts">
                  <div>
                    <img :src="item.head_img" alt="">
                  </div>
                  <span>{{item.talent_name}}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="stroll">
        <span>大家都在逛</span>
      </div>
    <div class="tab">
      <tab :line-width="2"  :active-color="$store.state.global.theme.mainColor" default-color="#333" v-model="type" custom-bar-width="0.5rem">
        <tab-item  v-for="n in names" :key="n">{{n}}</tab-item>
      </tab>
    </div>
      <div class="everyone">
        <div class="box" v-for="(item,index) in list.clickdata" :key="index" v-if="type == parseInt(item.talentcat)?true:type==0?true:false" @click="detail(item.id)">
          <div class="imgs">
            <img v-lazy="item.article_banner" alt="">
          </div>
          <span>
          {{item.article}}
          </span>
          <div class="my">
            <div class="left">
              <div class="headrImg">
                <img :src="item.head_img" alt="">
              </div>
              <span class="name">{{item.talent_name}}</span>
            </div>
            <div class="time"></div>
          </div>
        </div>
      </div>
    <!--<div class="goods_back_top" @click="backTop()"></div>-->
    </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'person-speak',
  data () {
    return {
      dot: false,
      list: [],
      type: 0,
      names: ['全部', '好物', '时尚', '美食', '生活'],
      swiperOption: {
        effect: 'coverflow',
        autoplay: 3000,
        speed: 1000,
        width: 250,
        coverflowEffect: {
          rotate: 2,
          stretch: -20,
          depth: 80,
          modifier: 2,
          slideShadows: false
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    Tab,
    TabItem
  },
  mounted () {
    // 删除
    this.get()
  },
  methods: {
    backTop () {
      let body = document.getElementById('vux_view_box_body')
      console.log(body.scrollTop)
      let time = ''
      time = setInterval(() => {
        let scroll = body.scrollTop
        let speed = Math.floor(scroll / 10)
        if (speed <= 5) {
          body.scrollTop = 0
          clearInterval(time)
        } else {
          body.scrollTop = scroll - speed
        }
      }, 10)
    },
    detail (index, talentcat) {
      this.$router.push('/personArticle?id=' + index)
    },
    get () {
      this.$http.post('/amoy/hao/talent-info').then(res => {
        this.list = res.data
      })
    }
  }
}
</script>
<style lang="less">
  .personSpeak{
    .vux-tab-container{
      border-bottom: 1px solid #e5e5e5;
    }
  }
</style>
<style scoped lang="less">
  .vux-tab-item{
    background: none !important;
  }
  .active{
    margin-left: 1.1rem;
  }
  .shadow{
    box-shadow:0 21px 36px -3px #EAEAEA;;
  }
  .personSpeak{
    background: #fff;
    .swiperBox{
      height: 3.5rem;
      position: relative;
      .swiper{
        margin-top: 0.5rem;
      }
      .bgc{
        width: 100%;
        height: 2rem;
        position: absolute;
        top: -0.5rem;
        left: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .items{
        position: absolute;
        width: 0.80rem;
        height: 1.7rem;
        top: 1.14rem;
        right: 0.16rem;
        .piece{
          width: 0.8rem;
          height: 0.8rem;
          color: red;
          font-size: 0.26rem;
          text-align: center;
          background-color: #fff;
          opacity: 0.7;
          border-radius: 4px;
          span{
            display: block;
          }
        }
        .img{
          width: 0.8rem;
          height: 0.8rem;
          top: 0.1rem;
          position: relative;
          img{
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .banner{
      height: 2.1rem;
      width: 100%;
      background-color: #f7f7f7;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .swiper-box{
      display: flex;
      justify-content: space-between;
      background-color: #f7f7f7;
      .item{
        height:50px;
        width: 60px;
        overflow: hidden;
        position: relative;
        top:-10px;
        right: 10px;
        .item-image{
          width: 50px;
          height: 60px;
        }
      }
    }
    .explain{
      width: 100%;
      font-size: 0.3rem;
      line-height: 0.9rem;
      padding-left: 0.2rem;
      color: black;
    }
    .productionNew{
      margin-top: 0.2rem;
      position: relative;
      padding: 0.2rem;
      .abs{
        position: absolute;
        width: 100%;
        left:0;
        right: 0;
        height: 0.2rem;
        background-color: #f7f7f7;
        top: 3.8rem;
      }
      .text{
        display: block;
        height: 0.65rem;
        font-size: 0.3rem;
        color: #333333;
        border-bottom: 1px solid #e3e2e2;
      }
      .production{
        width: 100%;
        padding: 0.3rem 0rem;
        overflow: scroll;
        .single{
          width: 3.36rem;
          height: 2.4rem;
          margin: 0rem 0.1rem;
          float: left;
          border-radius: 5px;
          background-color: #f7f7f7;
          overflow: hidden;
          .imgBox{
            width: 100%;
            height: 1.2rem;
            -webkit-border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          >span{
            display: block;
            width: 100%;
            line-height: 0.6rem;
            font-size: 0.26rem;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
          }
          .texts{
            height: 0.6rem;
            width: 100%;
            margin: 0 5px;
            div{
              position: relative;
              height: 0.44rem;
              width: 0.44rem;
              float: left;
              border-radius: 50%;
              margin-right: 0.2rem;
              overflow: hidden;
              img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            }
            span{
              padding-top: 0.06rem;
              float: left;
              font-size: 0.2rem;
              color: #ccc;
            }
          }
        }
      }
    }
    .stroll{
      padding: 0rem 0.2rem;
      span{
        display: block;
        width: 100%;
        line-height: 0.9rem;
        font-size: 0.3rem;
        border-bottom: 1px solid #e3e2e2;
      }
    }
    .tab{
      .vux-tab-wrap{
        .vux-tab-container{
          .vux-tab{
            .vux-tab-item{
              width: 20%!important;
            }
          }
        }
      }
    }
    .everyone{
      background-color: #fff;
      padding: 0.2rem;
      .box{
        background-color: #F5F5F5;
        height: 5rem;
        padding: 0.2rem;
        width: 94%;
        border-radius: 5px;
        margin-bottom: 0.2rem;
        .imgs{
          width: 100%;
          height: 3rem;
          img{
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
        >span{
          display: block;
          font-size: 0.28rem;
          height: 0.9rem;
          width: 97%;
          margin: 0.28rem 0rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .my{
          height: 0.8rem;
          width: 94%;
          .left{
            float: left;
            .headrImg{
              position: relative;
              width: 0.5rem;
              height: 0.5rem;
              margin-right: 0.2rem;
              float: left;
              border-radius: 50%;
              overflow: hidden;
              img{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
              }
            }
            .name{
              display: block;
              float: left;
              font-size: 0.20rem;
              padding-top: 0.08rem;
            }
          }
          .time{
            float: right;
            font-size: 0.2rem;
            padding-top: 0.06rem;
          }
        }
      }
    }
  }
  .box{
    width: 1000rem;
  }
</style>
