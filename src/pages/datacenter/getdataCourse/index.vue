<template>
  <div class="content">
     <div class="buzhou">
       <div class="landian"></div>
       <div class="msg1">第一步：点击上方"获取文件"按钮</div>
     </div>
     <div class="tu1">
       <img src="../../../assets/jiaochengtu1.png" alt="">
     </div>
     <div class="msg2">当屏幕上出现小程序码的预览图片时</div>
     <div class="tu2">
       <img src="../../../assets/jiaochengtu2.png" alt="">
     </div>
     <div class="msg2">按住手机屏幕，点击识别图中小程序码</div>
     <div class="tu3">
       <img src="../../../assets/jiaochengtu3.png" alt="">
     </div>
     <div class="buzhou">
       <div class="landian"></div>
       <div class="msg1">第二步：在识别后打开的页面即可保存文件</div>
     </div>
     <div class="tu4">
       <img src="../../../assets/jiaochengtu4.png" alt="">
     </div>
     <div class="msg2">按住手机屏幕，点击识别图中小程序码</div>
     <div class="btn">看懂了，马上去试试</div>
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
.content{
  width:360px;
  height:1028px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  margin: 7px auto;
  .buzhou{
    display: flex;
    margin-bottom: 14px;
    .landian{
      width:10px;
      height:10px;
      background:linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
      border-radius:50%;
      margin: 24px 21px 0 24px;
    }
    .msg1{
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(58,58,58,1);
      margin-top: 19px;
    }
  }
  .tu1{
    display: inline-block;
    margin: 0 0 9px 112px;
    img{
      width: 141px;
      height: 133px;
    }
  }
  .msg2{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
    text-align: center;
  }
  .tu2{
    display: inline-block;
    margin: 11px 0 31px 112px;
    img{
      width: 140px;
      height: 140px;
    }
  }
  .tu3{
    display: inline-block;
    margin: 11px 0 28px 112px;
    img{
      width: 200px;
      height: 161px;
    }
  }
  .tu4{
    display: inline-block;
    margin: 28px 0 28px 112px;
    img{
      width: 200px;
      height: 164px;
    }
  }
  .btn{
    width:296px;
    height:44px;
    background:linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow:1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius:22px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 28px;
    text-align: center;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height: 44px;
  }
}


</style>
