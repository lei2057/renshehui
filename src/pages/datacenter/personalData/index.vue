<template>
  <div>
     <div class="z-head">
       <div class="z-msg">
          <img src="../../../assets/gongjuicon.png" alt="">
          <span>免费工具</span>
       </div>
       <div class="z-mokuai">
         <div class="gongnneg">
           <img src="../../../assets/chashebao.png" alt="">
           <p>查阅社保</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/wuxianyijin.png" alt="">
           <p>五险一金</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/social.png" alt="">
           <p>社保计算</p>
         </div>
         <div class="gongnneg">
           <img src="../../../assets/gengduo.png" alt="">
           <p>敬请期待</p>
         </div>
       </div>
     </div>
     <div class="z-tab">
       <div class="z-tabtop">
         <p v-for="(item,index) in msgarr" :key="index" :class="activeindex==index?'active':''"  @click="gotap(index)">{{item}}</p>
       </div>
       <div class="z-tabbottom">
         <div>
            <div class="list">
              <div class="listleft">
                <img src="../../../assets/wordicon.png" alt="">
              </div>
              <div class="listright">
                <div class="righttop">
                  <p>入职离职的流程</p>
                </div>
                <div class="rightbottom">
                  <p>10000人浏览</p>
                  <p>10000人收藏</p>
                  <p>2019/04/29</p>
                </div>
              </div>
            </div>
            <div class="line"></div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
// import Popup from '../../../components/popup'
export default {
  data () {
    // components: {Popup},
    return {
      msgarr: ['已获取', '已收藏'],
      activeindex: '0'
    }
  },

  methods: {
    // 点击切换左侧列表
    gotap (index) {
      this.activeindex = index
    }
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
.z-tab{
  margin-top: 45px;
  .z-tabtop{
    display: flex;
    justify-content: space-around;
    width: 360px;
    p{
      width: 140px;
      height: 40px;
      background-color:rgb(244, 244, 244);
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(110,122,142,1);
      text-align: center;
      line-height: 40px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 5px 0 5px #e7e4e4;
    }
    .active{
      color:rgba(55,167,225,1);
      background-color:rgb(250, 250, 250);
    }
  }
  .z-tabbottom{
    width: 360px;
    height: 380px;
    margin: 0 auto;
    background-color: rgb(250, 250, 250);
    .list{
      display: flex;
      .listleft{
        width: 39px;
        height: 45px;
        margin: 9px 12px;
        img{
          width: 39px;
          height: 45px;
        }
      }
      .listright{
        width: 270px;
        margin: 9px 12px;
        .righttop{
          margin-bottom: 10px;
          p{
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(58,58,58,1);
          }
        }
        .rightbottom{
          display: flex;
          p{
            width:80px;
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(114,114,114,1);
            margin-right: 20px;
            &:nth-child(3){
              margin-right: 0;
            }
          }
        }
      }
    }
    .line{
      width:313px;
      height:1px;
      background:rgba(231,230,230,1);
      margin: 0 auto;
    }
  }
}



</style>
