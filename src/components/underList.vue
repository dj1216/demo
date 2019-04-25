<template>
    <div class="underList">
      <ul>
        <li v-for="(item,i) in list" :key="i" @click="handleDetail(item.id)">
          <div class="left_img">
            <img :src="item.logo || './static/img/under/111.png'" alt="">
          </div>
          <div class="right_text">
            <div class="div1">
                {{item.title}}
            </div>
            <div class="div2">
              <span>{{item.category}}</span>
              <span>人气 {{item.look}}</span>
            </div>
            <div class="div3">
              <div class="left">{{item.birth}}</div>
              <div class="right" v-if="item.distance">{{item.distance}}</div>
            </div>
            <div class="div5">
              <span>评分:</span>
              <div class="img_box">
                <img v-for="i in 5" :src=" i<=parseInt(item.score) ? './static/libs/img/xing_hover.png' : './static/libs/img/xing_.png'" alt="">
              </div>
            </div>
            <div class="div4" v-if="item.coupon2">
              <img src="../assets/mall/img/under/zhe.png" alt="">
              <span>{{item.coupon1.descs}}</span>
            </div>
            <div class="div4" v-if="item.coupon1">
              <img src="../assets/mall/img/under/jian.png" alt="">
              <span>{{item.coupon1.descs}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'underList',
  props: ['list'],
  methods: {
    handleDetail (spid) {
      this.$router.push({name: 'mallUnderdetail', query: {spid: spid}})
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/mall/style/_Variables';
  .underList{
    ul{
      li{
        padding:0.3rem;
        width:100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-top:0.1rem;
        background:#fff;
        align-items: center;
        .left_img{
          width:2.23rem;
          height:2.23rem;
          img{
            width:2.23rem;
            height:2.23rem;
            border-radius:3px;
          }
        }
        .right_text{
          width:4.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          .div1{
            text-align: left;
            font-size:@font-more-big;
          }
          .div2{
            span{
              color: #676767;
              font-size: @font-nomal;
            }
            span:first-child{
              border-right: 1px solid @border-color;
              padding-right: .3rem;
            }
            span:last-child{
              text-align: right;
              padding-left: .3rem;
            }
          }
          .div3{
            color:@font-light-color;
            display: flex;
            justify-content: space-between;
            font-size: @font-nomal;
            .left{
              width:3rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              text-align: left;
            }
          }
          .div4{
            color:@font-light-color;
            height: 0.4rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: @font-small;
            span{
              display: inline-block;
              margin-left: 0.2rem;
              width: 2.5rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              text-align: left;
            }
            img{
              width: 0.3rem;
              height: 0.3rem;
            }
          }
          .div5{
            display: flex;
            font-size:0.26rem;
            color:@font-light-color;
            align-items: center;
            .img_box{
              margin-left:0.5rem;
              img{
                width:0.2rem;
                height:0.2rem;
                margin-right: .05rem;
              }
            }
          }
        }
      }
    }
  }
</style>
