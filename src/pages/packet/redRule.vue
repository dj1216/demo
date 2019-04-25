<template>
  <div class="packet_rule">
    <div class="rule_one">
      <div class="rule_title">
        <p class="rule_get">如何获取抢红包机会</p>
      </div>
      <p class="rule_guize">
        1.注册U券有效会员 <br>
        2.成功领券并下单任意商品即可获取一次抢红包机会 <br>
        3.注册U券有效会员 <br>
        4.成功领券并下单任意商品即可获取一次抢红包机会
      </p>
    </div>
    <div class="rule_one">
      <div class="rule_title">
        <p class="rule_get">抢红包规则</p>
      </div>
      <p class="rule_guize">
        1.注册U券有效会员 <br>
        2.成功领券并下单任意商品即可获取一次抢红包机会 <br>
        3.注册U券有效会员 <br>
        4.成功领券并下单任意商品即可获取一次抢红包机会 <br>
        5.注册U券有效会员 <br>
        6.成功领券并下单任意商品即可获取一次抢红包机会
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'redRule.vue'
  }
</script>

<style lang="less">
.packet_rule{
  .rule_one{
    width: 94%;
    background: #ffffff;
    border-radius: .1rem;
    margin: .3rem 3%;
    position: relative;
    .rule_title{
      height: 1.3rem;
      .rule_get{
        padding: 0 .3rem;
        height: .6rem;
        line-height: .6rem;
        background: #FF2557;
        border-radius:0 .3rem .3rem 0;
        color: #ffffff;
        display: inline-block;
        font-size: .3rem;
        position: absolute;
        top:.44rem;
        left: -4%;
      }
    }
    .rule_guize{
      color: #666666;
      font-size: .28rem;
      padding: 0 .3rem .3rem .3rem;
    }
  }
}
</style>
