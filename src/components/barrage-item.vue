<template>
    <div :id="ID" class="barrage-item">

    </div>
</template>
<script>
export default {
  name: "barrage-item",
  props:{
    time:{
      type:Number
    },
    imgSrc:{
      type:String
    },
    list:{
      type:Array
    },
    height:{
      type:Number
    },
    index:{
      type:Number
    }
  },
  data(){
    return {
      IDList:[],
      waitUseList:[],
      lastBox:null,
      ID:"barrage-item",
      count:0,
      barrageItem:null,
      barrageItemWid:null
    }
  },
  methods:{
    addBox(val,imgSrc){
      if(!!val){
        if(!!this.lastBox){
          if(parseInt(this.lastBox.style.right) < 0){
            return;
          }
        }
        let parm = {},
          box = null;
        let speed = 1;//默认速度
        let quicklyshow = 0;//标记其后面的item是否需要快速展示
        //取随机概率是否快速展示
        let number = this.rnd(1,2);
        if(number == 1){
          quicklyshow = 1;
        }
        if(!!this.lastBox){
          let boxquicklyshow = this.lastBox.getAttribute("quicklyshow");
          if(boxquicklyshow == "1"){
            let boxfinish = this.lastBox.getAttribute("finish");
            if(boxfinish == "1"){
              speed = 2;
              quicklyshow = 0;
            }else{
              return;
            }
          }
        }
        if(this.waitUseList.length > 0){
          let ID = this.waitUseList[0].ID;
          parm = {
            ID:ID,
            speed:speed
          };
          this.waitUseList.shift();
          box = document.getElementById(ID);
          if(!!box){
            box.innerHTML = "<span class='barrage-item-box-text'><i class='touxiangImg' style='background-image: url("+imgSrc+")'></i>"+val+"</span>";
            // box.innerHTML = "<span class='barrage-item-box-text'><img class='touxiangImg' src='../assets/img/home/jdshop.png'> "+val+"</span>";
          }
        }else{
          let ID = "barrage-item-" + this.index + "-" + (new Date()).getTime();
          parm = {
            ID:ID,
            speed:speed
          };
          box = document.createElement("span");
          if(!box){
            return;
          }
          box.setAttribute("ID",ID);
          box.setAttribute("class","barrage-item-box");
          console.log(imgSrc)
          // box.innerHTML = "<span class='barrage-item-box-text'><img class='touxiangImg'  src=" + imgSrc + "> "+val+"</span>";
          box.innerHTML = "<span class='barrage-item-box-text'><i class='touxiangImg' style='background-image: url("+imgSrc+")'></i>"+val+"</span>";
          // box.innerHTML = "<span class='barrage-item-box-text'><img class='touxiangImg' src='../assets/img/home/jdshop.png'> "+val+"</span>";
          this.barrageItem.appendChild(box);
        };
        if(!box){
          return;
        }
        box.setAttribute("quicklyshow",quicklyshow);
        box.setAttribute("finish","0");

        let boxWid = box.clientWidth;
        box.style.right = "-" + (boxWid + 10) + "px";
        this.IDList.push(parm);
        this.lastBox = box;
      }
    },
    rnd(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    },
    loopInter(){
      window.RAF(this.loopInter);
      this.count = this.count + 1;
      if(window.isInData){//单线程控制
        return;
      }
      //判断频率
      if(this.count <= this.rnd(10,150)){//控制间隔
        return;
      }
      this.count = 0;
      window.isInData = true;
      if(typeof window.currentIndex == "undefined"){
        window.currentIndex = -1;
      }
      window.currentIndex = window.currentIndex + 1;
      if(window.currentIndex >= this.list.length){
        window.currentIndex = 0;
      }
      let _text = this.list[window.currentIndex];
      this.addBox(_text,this.imgSrc);
      window.isInData = false;
    },
    loopRoll(){
      window.setInterval(() => {
        this.move();
      },10);
    },
    move(){
      if(window.isMove){
        return;
      }
      window.isMove = true;
      let ele = null,
          item = null,
          _IDList = [];
      for(let i = 0; i < this.IDList.length; i++){
        item = this.IDList[i];
        ele = document.getElementById(item.ID);
        if(ele){
          let _cr = ele.style.right;
          let speed = item.speed;
          _cr = parseInt(_cr) + 1*speed;
          ele.style.right = _cr + "px";
          if(_cr > this.barrageItemWid + 10){
            //清除该盒子
            //ele.parentNode.removeChild(ele);
            ele.setAttribute("finish","1");
            this.waitUseList.push(item);
          }else{
            _IDList.push(item);
          }
        }
      }
      this.IDList = _IDList;
      window.isMove = false;
    }
  },
  created:function(){
    this.ID = this.ID + this.index;
  },
  mounted:function(){
    this.barrageItem = document.getElementById(this.ID);
    this.$nextTick(() => {
      this.barrageItem.style.lineHeight = this.height+"px";
      this.barrageItemWid = parseInt(window.getComputedStyle(this.barrageItem, null)["width"]);
      window.RAF(this.loopInter);
      this.loopRoll();
    })
  }
}
</script>
<style lang="less">
    @REM : 50rem;
    .barrage-item {
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    .barrage-item-box{
      position: absolute;
      white-space: nowrap;
      /*top:2rem;*/
      right:-100%;
      //height: 100%;
      display: inline-block;
      height: .48rem;
      line-height: .48rem;
      z-index: 4444;
    }
    .barrage-item-box-text{
      display: inline-block;
      font-size: .2rem;
      color: #fff;
      padding: 0 .27rem 0 .04rem;
      height: .48rem;
      line-height: .46rem;
      border-radius: .24rem;
      background-color: rgba(0,0,0,1);
      opacity:0.5;
      .touxiangImg {
        display: inline-block;
        width: .42rem !important;
        height: .42rem !important;
        border-radius: 50%;
        margin-right: .1rem;
        vertical-align: bottom;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
</style>
