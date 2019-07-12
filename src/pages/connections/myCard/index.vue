<template>
  <div style="padding: 0 10px;">
    <card :userinfo="userinfo"></card>
    <div class="mycardinfo-btn" @click="exchange">名片交换信息<div class="mycardinfo-num">{{cardNum}}</div></div>
    <div class="disflex">
      <div class="mycard-btn" @click="addCard">保存名片</div>
      <div class="mycard-btn">分享名片</div>
    </div>
    <div class="vant-css">
      <van-popup :show="show" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-out">
            <div class="popup-icon" @click="onClose"><img src="../../../assets/outMp.png" alt=""></div>
          </div>
          <div class="popup-qrcode">
            <img src="../../../assets/user.png" alt="">
          </div>
          <div class="popup-btn">我的二维码</div>
          <div class="popup-text">扫描好友屏幕上的二维码即可添加名片</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Card from '../../../components/mycard'
export default {
  data () {
    return {
      show: false, // 弹框
      userinfo: [],
      cardNum: 0
    }
  },
  onLoad (option) {
    this.cardNum = option.num
    let userId = wx.getStorageSync('userId')
    this.$http.get({
      url: 'api/appUser/selectUserById',
      data: {
        id: userId
      }
    }).then(res => {
      this.userinfo = res.data.list[0]
    })
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
    addCard () {
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
.popup {
  width: 270px;
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
  .popup-qrcode {
    width: 155px;
    height: 155px;
    margin: 20px auto 30px;
  }
  .popup-btn {
    width: 174px;
    height: 39px;
    line-height: 39px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    margin: auto;
    text-align: center;
    border-radius: 20px;
  }
  .popup-text {
    font-size: 12px;
    color: #727272;
    text-align: center;
    margin: 20px 0 22px 0;
  }
}
</style>
