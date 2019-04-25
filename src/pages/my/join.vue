<template>
    <div class="join">
        <div class="top">
          <div class="header">
            <div><img :src="user.avatar" alt=""></div>
            <span>{{user.lv}}</span>
          </div>
          <div class="grow">
            <span>{{numm}}</span>
            <span>我的成长值</span>
          </div>
          <div class="progress" ref="overspread">
            <div class="overspread" ref="progress">
            </div>
            <span></span>
            <span></span>
            <span></span>
            <div class="number">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
        <div class="bottom">
        <div class="header">如何成为运营商</div>
        <div class="option" >
          <div class="row">
            <div>
              <div style="width:1.6rem;height:1.6rem;margin: 0 auto;margin-top: 0.3rem;margin-bottom: 0.2rem">
                <x-circle
                  :percent="datas.straight/datas.operator.invitation*100 < 100 ? datas.straight/datas.operator.invitation*100 : 100 "
                  :stroke-width="2"
                  stroke-color="#fc3357"
                  anticlockwise>
                  <span>{{datas.operator.invitation}}人</span>
                </x-circle>
              </div>
              <div class="texts">
                <span>推荐直属有效粉丝</span>
                <span>当前<span class="people">{{datas.straight}}</span>人</span>
              </div>
            </div>
            <div>
              <div style="width:1.6rem;height:1.6rem;margin: 0 auto;margin-top: 0.3rem;margin-bottom: 0.2rem">
                <x-circle
                  :percent="datas.team/datas.operator.team*100 < 100 ? datas.team/datas.operator.team*100 : 100"
                  :stroke-width="2"
                  stroke-color="#fc3357"
                  anticlockwise>
                  <span>{{datas.operator.team}}人</span>
                </x-circle>
              </div>
              <div class="texts">
                <span>推荐有效非直属粉丝</span>
                <span>当前<span class="people">{{datas.team}}</span>人</span>
              </div></div>
          </div>
          <div class="row">
            <div>
              <div style="width:1.6rem;height:1.6rem;margin: 0 auto;margin-top: 0.3rem;margin-bottom: 0.2rem">
                <x-circle
                  :percent="datas.orderquantity/datas.operator.orderquantity*100 < 100 ? datas.orderquantity/datas.operator.orderquantity*100 : 100"
                  :stroke-width="2"
                  stroke-color="#fc3357"
                  anticlockwise>
                  <span>{{datas.operator.orderquantity}}单</span>
                </x-circle>
              </div>
              <div class="texts">
                <span>粉丝总订单数量</span>
                <span>当前<span class="people">{{datas.orderquantity}}</span>单</span>
              </div>
            </div>
            <div>
              <div style="width:1.6rem;height:1.6rem;margin: 0 auto;margin-top: 0.3rem;margin-bottom: 0.2rem">
                <x-circle
                  :percent="datas.profit/datas.operator.profit*100 < 100 ? datas.profit/datas.operator.profit*100 : 100"
                  :stroke-width="3"
                  stroke-color="#fc3357"
                  anticlockwise>
                  <span>{{datas.operator.profit}}元</span>
                </x-circle>
              </div>
              <div class="texts">
                <span>个人累计收益</span>
                <span>当前<span class="people">{{datas.profit}}</span>元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { XCircle, Range, Icon, Flow, FlowState, FlowLine } from 'vux'
export default {
  name: 'join',
  data () {
    return {
      opposite: true,
      percent: 60,
      chang: 0,
      grow: null,
      sum: null,
      datas: '',
      user: this.$store.state.user.userInfo,
      index: 0,
      numm: null,
      proportion: null
    }
  },
  methods: {
    getlist () {
      this.$http.get('/amoy/user/operator').then((res) => {
        if (res.code === 0) {
          this.datas = res.data
          this.grow = parseInt(res.data.straight) + parseInt(res.data.team) + parseInt(res.data.orderquantity) + parseInt(res.data.profit)
          this.sum = parseInt(res.data.operator.invitation) + parseInt(res.data.operator.team) + parseInt(res.data.operator.orderquantity) + parseInt(res.data.operator.profit)
          if (parseInt(res.data.straight) / parseInt(res.data.operator.invitation) >= 1) {
            this.index++
          }
          if (parseInt(res.data.team) / parseInt(res.data.operator.team) >= 1) {
            this.index++
          }
          if (parseInt(res.data.orderquantity) / parseInt(res.data.operator.orderquantity) >= 1) {
            this.index++
          }
          if (parseInt(res.data.profit) / parseInt(res.data.operator.profit) >= 1) {
            this.index++
          }
          this.$refs.progress.style.width = (this.index * 0.25) * 100 + '%'
          this.numm = (this.index * 0.25) * 100
        }
      })
    }
  },
  mounted () {
    // 删除
    this.getlist()
  },
  created () {
  },
  components: {
    XCircle,
    Range,
    Icon,
    Flow,
    FlowState,
    FlowLine
  }
}
</script>

<style scoped lang="less">
  .vux-circle-demo {
    text-align: center;
  }
  .vux-circle-demo > div {
    margin-left: auto;
    margin-right: auto;
  }
  .circle-demo-range {
    width: 250px;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .join{
    background-color: #f7f7f7;
    .top{
      background-color: #fff;
      padding-bottom: 1rem;
      .header{
        padding: 0.4rem 0;
        position: relative;
        div{
          width: 1.4rem;
          height: 1.4rem;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        span{
          position: absolute;
          width: 0.94rem;
          height: 0.36rem;
          background: -webkit-linear-gradient(left,#ff9b17,#ffd17b);
          border-radius: 10px;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0.24rem;
          font-size: 0.28rem;
          color: #fff;
          text-align: center;
          /*line-height: 0.36rem;*/
          display: table-cell;
          vertical-align: middle;
        }
      }
      .grow{
        margin-top: 0.1rem;
        span{
          display: block;
          text-align: center;
          font-size: 0.36rem;
          color: #fc3357;
        }
        span:nth-child(2){
          font-size: 0.24rem;
          color: #999;
        }
      }
      .progress{
        position: relative;
        margin: 0 0.3rem;
        height: 0.16rem;
        background-color: #e8e8e8;
        border-radius: 5px;
        margin-top: 0.6rem;
        .overspread{
          position: absolute;
          /*width: 60%;*/
          height: 100%;
          background-color: #ff9eb0;
          border-radius: 5px;
        }
        span{
          position: absolute;
          width: 0.26rem;
          height: 0.26rem;
          border-radius: 50%;
          background: #fd4264;
          left: -0.2rem;
          top: -0.042rem;
          z-index: 2;
        }
        span:nth-child(2){
          left: 50%;
          transform: translateX(-50%);
        }
        span:nth-child(3){
          left: 98.8%;
        }
        .number{
          font-size: 0.24rem;
          top: 0.2rem;
          span{
            top: 0.4rem;
            background-color: #fff;
            color: #fd4768;
          }
          span:nth-child(1){
            left: 0.05rem;
          }
          span:nth-child(3){
            left: 95%;
          }
        }
      }
    }
    .bottom{
      margin-top: 0.2rem;
      padding: 0 0.3rem;
      box-sizing: border-box;
      background-color: #fff;
      .header{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.28rem;
        text-align: center;
        position: relative;
      }
      .header:before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #ebebeb;
      }
      .option{
        width: 100%;
        .row{
          display: flex;
          position: relative;
          >div{
            flex: 1;
            height: 3.2rem;
            div{
              font-size: 0.28rem;
            }
            .texts{
              span{
                display: block;
                text-align: center;
              }
              .people{
                display: inline-block;
                color: #f93f60;
              }
            }
          }
          >div:nth-child(1){
            position: relative;
          }
          >div:nth-child(1):before{
            content: '';
            position: absolute;
            width: 1px;
            height: 70%;
            background-color: #ebebeb;
            right: 0;
            top: 0.36rem;
          }
        }
        .row:nth-child(1):before{
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: #ebebeb;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
