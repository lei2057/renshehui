<template>
  <div style="padding: 0 10px;">
    <!-- <div class="mycard-wrapper">
      <div class="mycard-cont">
        <img src="../../../assets/img03.png" alt="">
        <div class="qrcode-jiao">
          <div class="qrcode"><img src="../../../assets/kxin.png" alt=""></div>
        </div>
        <div class="mycard-info">
          <div class="info-top disflex">
            <div class="info-photo"><img src="../../../assets/user.png" alt=""></div>
            <div class="info-text flex">
              <div class="text-name">我的姓名</div>
              <div class="text-job">职位</div>
            </div>
            <div class="info-update"><img src="../../../assets/xin.png" alt=""></div>
          </div>
          <div class="info-bottom">
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/dianhua.png" alt=""></div><span class="flex">电话：1008610086</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/company.png" alt=""></div><span class="flex">公司：杭州优科达商业管理有限公司</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/email.png" alt=""></div><span class="flex">邮箱：1207453420@qq.com</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/address.png" alt=""></div><span class="flex">城市：浙江省杭州市</span></div>
          </div>
        </div>
      </div>
      <div class="synopsis">
        <div class="synopsis-cont">米您是否可见的官方纪录时刻的各类考试，最多输入37个字。</div>
        <div class="tag">简介</div>
      </div>
    </div> -->
    <card :synopsis="synopsis" :userinfo="userinfo" ></card>
    <div class="mycardinfo-btn" @click="exchange">名片交换信息<div class="mycardinfo-num">99</div></div>
    <div class="disflex">
      <div class="mycard-btn" @click="aa">保存名片</div>
      <div class="mycard-btn">分享名片</div>
    </div>
    <van-popup :show="show" @close="onClose" catchtouchmove="ture">
      <div class="popup-top">
        <div class="popup-out">
          <div class="popup-icon" @click="onClose"><img src="../../../assets/out.png" alt=""></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Card from '../../../components/mycard'
export default {
  data () {
    return {
      show: false, // 弹框
      synopsis: '您是否可见的官方纪录时刻的各类考试，最多输入37个字。',
      userinfo: {
        name: '我的姓名',
        job: '职位',
        phone: '1008610086',
        company: '杭州优科达商业管理有限公司',
        email: '1207453420@qq.com',
        address: '浙江省杭州市'
      }
    }
  },
  methods: {
    exchange () {
      wx.navigateTo({
        url: '../exchangeCard/main'
      })
    },
    onClose () {
      this.show = false
    },
    aa () {
      this.show = true
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
.mycardinfo-btn {
  width: 300px;
  height: 45px;
  line-height: 45px;
  background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 22px;
  font-size: 15px;
  margin: 60px auto 27px;
  text-align: center;
  position: relative;
  .mycardinfo-num {
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 50%;
    background: #FF4E00;
    color: #fff;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: 12px;
    right: 20px;
  }
}
.mycard-btn {
  width: 125px;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgba(58, 175, 252, 1);
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  color: #3AAFFC;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  margin: 0 22px;
}
.popup-top {
  height: 65px;
  .popup-out {
    height: 25px;
    display: flex;
    justify-content: flex-end;
    .popup-icon {
      width: 13px;
      height: 13px;
      margin-top: 10px;
      margin-right: 10px;
    }
  }
  .popup-title {
    font-size: 24px;
    text-align: center;
    color: #fff;
    text-shadow:1px 2px 5px rgba(166,27,27,0.15);
  }
}
</style>
