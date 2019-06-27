<template>
  <div>
     <div class="z-head">
       <div class="z-msg">
          <img src="../../../assets/gongjuicon.png" alt="">
          <span>免费工具</span>
       </div>
       <div class="z-mokuai">
         <div class="gongnneg">
           <img src="../../../assets/wuxianyijin.png" alt="">
           <p>查阅社保</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/social.png" alt="">
           <p>五险一金</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/wuxianyijin.png" alt="">
           <p>社保计算</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/social.png" alt="">
           <p>敬请期待</p>
         </div>
       </div>
     </div>
     <div>
       
     </div>
  </div>
</template>

<script>
// import Popup from '../../../components/popup'
export default {
  data () {
    // components: {Popup},
    return {

    }
  },

  methods: {

  },
  onShow () { // mountend

  },
  onload () { // created

  }
}
</script>

<style lang="scss" scoped>
.z-head{
  position: relative;
  width: 373px;
  height: 112px;
  background-color: #1C8CD6;
  border: 1px solid #1C8CD6;
  .z-msg{
    display: flex;
    margin: 12px 0 0 9px;
    img{
      width: 18px;
      height: 17px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 5px;
    }
    span{
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
  .z-mokuai{
    position: absolute;
    left: 6px;
    top: 35px;
    width: 360px;
    height: 110px;
    background-color: rgba(255,255,255,1);
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    .gongnneg{
      width: 49px;
      height: 110px;
      img{
        width: 49px;
        height: 49px;
        display: inline-block;
        margin: 14px 0;
      }
      p{
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(58,58,58,1);
        text-align: center;
      }
    }
  }
}



</style>
