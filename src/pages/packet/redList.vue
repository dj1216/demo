<template>
  <div class="red_list">
    <div class="red_list_one">
      <img src="../../assets/mall/img/cart/1/1.jpg" alt="">
      <span>XXXX共收到</span>
      <p><span>￥</span>1530.08</p>
    </div>
    <div class="red_list_two">
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
      <div class="red_list_item">
        <p>2019-01-16</p>
        <span>￥56.39</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'redList.vue'
  }
</script>

<style lang="less">
.red_list{
  height: 100%;
  background: #ffffff;
  overflow-y: auto;
  .red_list_one{
   width: 100%;
   height: 3.73rem;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
    background: #F5F5F7;
   img{
     width: 1.4rem;
     height: 1.4rem;
     border-radius: 50%;
     margin-top: .48rem;
   }
   span{
     color: #333333;
     font-size: .3rem;
     margin-top: .34rem;
   }
   p{
     color: #FF2557;
     font-size: 0.48rem;
     margin-top: 0.1rem;
     font-weight: 600;
     span{
       color: #FF2557;
       font-size: .24rem;
     }
   }
 }
  .red_list_two{
    .red_list_item{
      width: 100%;
      height: 1rem;
      padding: 0 .3rem;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      p{
        color: #666666;
        font-size: .28rem;
      }
      span{
        color: #FF2557;
        font-size: .28rem;
      }
    }
  }
}
</style>
