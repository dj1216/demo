<template>
    <div id="barrage" class="barrage">
      <div :style="{height:linehei+'px'}" class="line" v-for="(item,index) in count">
        <barrage-item :imgSrc="imgSrc" :list="data" :height="linehei" :index="index"></barrage-item>
      </div>
    </div>
</template>
<script>
import barrageItem from './barrage-item.vue'
export default {
name: "barrage",
props:{
  linecount:{
    type:Number
  },
  imgSrc:{
    type:String
  },
  data:{
    type:Array
  }
},
components: {
    barrageItem
},
watch:{
  data(val){
    this.data = val;
  }
},
data(){
  return {
    list:[],
    linehei:0,
    currentIndex:0,//当前索引
    isInData:false,//是否正在取数据
  }
},
computed:{
  count(){
    let _c = [];
    for(let i = 0; i < this.linecount; i++){
      _c.push({
        item:10
      });
    }
    return _c;
  }
},
methods:{
  rnd(n, m){
      var random = Math.floor(Math.random()*(m-n+1)+n);
      return random;
  }
},
mounted:function(){
  this.list = this.data;
  let barrageHei = window.getComputedStyle(document.getElementById("barrage"), null)["height"];
  console.log(barrageHei)
  this.linehei = parseInt(barrageHei)/this.linecount;
}
}
</script>
<style lang="less">
    @REM : 50rem;
    .barrage {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
</style>
