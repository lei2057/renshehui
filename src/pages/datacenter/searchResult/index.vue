<template>
  <div>
     <div class="z-head">
       <!-- 输入框 -->
        <div class="sousuo-wrapper" id="head_wrapper">
          <div class="sousuo disflex" >
            <div class="sousuo-icon"><img src="../../../assets/sousuo.png" alt=""></div>
            <input class="flex sousuo-input" v-model="sousuo" type="text" placeholder="请搜索关键字" placeholder-style="font-size: 12px;text-align: center;">
            <div class="sousuobtn" @click ="sousuomsg()">搜索</div>
          </div>
        </div>
     </div>
     <van-toast id="van-toast" />
  </div>
</template>

<script>
// import Popup from '../../../components/popup'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    // components: {Popup},
    return {
      sousuo: ''
    }
  },

  methods: {
    // 点击搜索按钮
    sousuomsg () {
      if (this.sousuo === '') {
        Toast('输入框不能为空')
        return
      }
      wx.navigateTo({
        url: '../searchResult/main?sousuo=' + this.sousuo
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
.z-head{
  width: 100%;
  height: 126px;
  background-color: #3AAFFC;
  border: 1px solid #3AAFFC;
  position: relative;
  .sousuo-wrapper {
    width: 343px;
    height: 34px;
    margin: 16px auto;
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
    }
  }
}



</style>
