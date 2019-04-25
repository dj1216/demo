 <template>
   <div class="load_box">
     <div class="loading_container">
       <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*1 + 'rem'}">
       </div>
       <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
         <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
       </svg>
     </div>
   </div>

</template>

<script>
export default {
  data () {
    return {
      positionY: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.positionY++
    }, 600)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
    @import '../assets/mall/style/mixin';
@keyframes load{
  0%   {transform: translateY(0px);}
  50%  {transform: translateY(-50px);}
  100% {transform: translateY(0px);}
}
@keyframes ellipse{
  0%   {transform: scale(1);}
  50%  {transform: scale(0.3);}
  100% {transform: scale(1);}
}
  .loading_container{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .wh(1rem, 1rem);
    background-size:cover;
  }
  .load_img{
    .wh(100%, 100%);
    background: url(../assets/mall/img/icon_loading.png) no-repeat 0 0;
    background-size: 1rem auto;
    transform: translateY(0px);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
  }
.load_ellipse{
  position: absolute;
  .wh(2.6rem, 2rem);
  top: 1.2rem;
      left: 0;
  z-index: 10;
  animation: ellipse .6s infinite ease-in-out;
}
  .load_box{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#ccc;
  }
</style>
