<template>
  <div>
      <div class="z-head">
        <!-- 输入框 -->
        <div class="sousuo-wrapper" id="head_wrapper">
          <div class="sousuo disflex" >
            <div class="sousuo-icon"><img src="../../assets/sousuo.png" alt=""></div>
            <input class="flex sousuo-input" v-model="sousuo" type="text" placeholder="请搜索关键字" placeholder-style="font-size: 12px;text-align: center;">
            <div class="sousuobtn" @click ="sousuomsg()">搜索</div>
          </div>
        </div>
        <!-- 热门搜索 -->
        <div class="z-hotss">
          <p class="">人资规划方案</p>
          <p>五险一金</p>
          <p>绩效指标设定</p>
          <p>劳务关系</p>
        </div>
        <div class="z-gerenzhuanshu">
          <img src="../../assets/huangg.png" alt="">
          <span>个人专属</span>
        </div>
      </div>
      <div class="z-tab">
        <div class="z-tableft">
          <p v-for="(item,index) in msgarr" :key="index" :class="activeindex==index?'active':''"  @click="gotap(index)">{{item}}</p>
        </div>
        <div class="z-tabright">

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
      sousuo: '',
      msgarr: ['基础人事', '招聘管理', '员工培训', '绩效管理', '薪酬管理', '员工关系', '人资规划', '企业文化', '行政管理'],
      activeindex: '0'
    }
  },

  methods: {
    gotap (index) {
      this.activeindex = index
    },
    sousuomsg () {
      console.log('点击了搜索按钮')
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
  width: 100%;
  height: 126px;
  background-color: #3AAFFC;
  border: 1px solid #3AAFFC;
  position: relative;
}
.sousuo-wrapper {
  width: 343px;
  height: 34px;
  margin: 16px auto;
}
.sousuo {
  height: 34px;
  border-radius: 17px;
  background: #fff;
  z-index: 9;
  margin: 7px 5px 0 5px;
  position: relative;
  .sousuo-icon {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 8px;
  }
  .sousuo-input {
    margin: 0 40px;
  }
  .del-icon {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 5px;
  }
}
.sousuobtn{
  position: absolute;
  right: 0;
  top: 0;
  width:53px;
  height:34px;
  border-bottom-right-radius:15px;
  border-top-right-radius:15px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:15px;
  text-align: center;
  line-height: 34px;
  background-color: #1C8CD6;
}
.z-hotss{
  display: flex;
  width: 343px;
  margin: 0 auto;
  p{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-right: 29px;
    &:nth-child(4){
      margin-right: 0;
    }
  }
}
.z-gerenzhuanshu{
  width:95px;
  height:30px;
  background:rgba(28,140,214,1);
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  display: flex;
  line-height: 30px;
  position: absolute;
  left: 0;
  bottom: 0;
  span{
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  img{
    vertical-align: middle;
    width: 15px;
    height: 13px;
    display: inline-block;
    margin: 9px 6px 7px 12px;
  }
}
.z-tableft{
  width: 95px;
  height: 400px;
  // border: 1px solid black;
  background:rgba(255,255,255,1);
  overflow: auto;
  p{
    width:93px;
    height:44px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(37,37,37,1);
    border:1px dashed rgba(255,77,29,1);
    text-align: center;
    line-height: 44px;
    margin: 10px 0;
  }
  .active{
    font-size:15px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(58,175,252,1);
  }
}

</style>
