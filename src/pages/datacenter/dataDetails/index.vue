<template>
  <div>
     <div class="z-top">
       <img class="bgtu" src="../../../assets/bg.png" alt="">
       <img class="wjtu" src="../../../assets/wordicon.png" alt="">
       <img class="fxtu" src="../../../assets/fenxiang.png" alt="">
       <p class="p1">文件名称：入离职的流程</p>
       <p class="p2">存储模式：百度云盘</p><p  class="p3">文件格式：Word</p>
       <p class="p4">共享时间：2019-04-10</p>
       <img class="sctu" src="../../../assets/shoucang.png" alt="">
     </div>
     <div class="btnf" v-show="!isfrist">
       <div class="btn1">获取文件</div>
       <div class="btn2">上报网盘文件失效</div>
     </div>
     <div class="btnf" v-show="isfrist">
       <div class="btn2">获取文件</div>
     </div>
     <div class="tishiyu">
       <p class="msg">*获取文件方法</p>
       <p>1.点击获取文件 (取消百度云盘小程序码图片)</p>
       <p>2.长按图片并选择"识别图中小程序码"</p>
       <p>3.显示对应文件后即可保存到你的百度云盘</p>
       <p>4.每次首次无限制查看文件提取码</p>
     </div>
     <div class="gobaiduyun">
       <p>看不懂？点击右边问号查看图文教程</p>
       <img @click="gogetdataCourse" src="../../../assets/wenhao.png" alt="">
     </div>
  </div>
</template>

<script>
// import Popup from '../../../components/popup'
export default {
  data () {
    // components: {Popup},
    return {
      isfrist: true
    }
  },

  methods: {
    gogetdataCourse () {
      wx.navigateTo({
        url: '../getdataCourse/main'
      })
    }
  },
  onShow () { // mountend

  },
  onload () { // created

  }
}
</script>

<style lang="scss" scoped>
.z-top{
  width:363px;
  height:202px;
  margin: 0 auto;
  position: relative;
  margin-top: 63px;
  margin-bottom: 7px;
  // border: 1px solid red;
  .bgtu{
    position: absolute;
    left: 0;
    top: 0;
    width:363px;
    height:202px;
    z-index: 2;
  }
  .wjtu{
    width: 103px;
    height: 119px;
    position: absolute;
    top: -50px;
    left: 130px;
    z-index: 3;
  }
  .fxtu{
    width: 21px;
    height: 21px;
    position: absolute;
    right: 13px;
    top: 9px;
    z-index: 3;
  }
  p{
    position: absolute;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
    z-index: 3;
  }
  .p1{
    left: 19px;
    top: 85px;
  }
  .p2{
    left: 19px;
    top: 121px;
  }
  .p3{
    left: 204px;
    top: 121px;
  }
  .p4{
    left: 19px;
    top: 157px;
  }
  .sctu{
    width: 20px;
    height: 19px;
    position: absolute;
    right: 13px;
    bottom: 16px;
    z-index: 3;
  }
}
.btnf{
  width: 296px;
  height: 93px;
  margin: 0 auto;
  div{
    width:296px;
    height:44px;
    box-shadow:1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius:22px;
    line-height: 44px;
    text-align: center;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
  .btn1{
    background:linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    color:rgba(255,255,255,1);
    margin-bottom: 15px;
  }
  .btn2{
    color:rgba(114,114,114,1);
    background:rgba(255,255,255,1);
  }
}
.tishiyu{
  margin: 49px 0 24px 24px;
  p{
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
  }
  .msg{
    margin-bottom: 24px;
  }
}
.gobaiduyun{
  display: flex;
  p{
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
    width: 286px;
    text-align: right;
    margin-right: 4px;
  }
  img{
    width: 16px;
    height: 15px;
    display: inline-block;
    margin-top: 3px;
    vertical-align:middle;
  }
}
</style>
