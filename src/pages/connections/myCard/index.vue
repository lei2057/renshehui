<template>
  <div style="padding: 0 10px;">
    <div class="mycard-wrapper">
      <div class="mycard-cont">
        <img src="../../assets/img03.png" alt="">
        <div class="qrcode-jiao">
          <div class="qrcode"><img src="../../assets/kxin.png" alt=""></div>
        </div>
        <div class="mycard-info">
          <div class="info-top disflex">
            <div class="info-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="info-text flex">
              <div class="text-name">我的姓名</div>
              <div class="text-job">职位</div>
            </div>
            <div class="info-update"><img src="../../assets/xin.png" alt=""></div>
          </div>
          <div class="info-bottom">
            <div class="info-item"><div class="info-icon"><img src="../../assets/dianhua.png" alt=""></div>电话：1008610086</div>
            <div class="info-item"><div class="info-icon"><img src="../../assets/company.png" alt=""></div>公司：杭州优科达商业管理有限公司</div>
            <div class="info-item"><div class="info-icon"><img src="../../assets/email.png" alt=""></div>邮箱：1207453420@qq.com</div>
            <div class="info-item"><div class="info-icon"><img src="../../assets/address.png" alt=""></div>城市：浙江省杭州市</div>
          </div>
        </div>
      </div>
      <div class="synopsis">
        <div class="synopsis-cont">米您是否可见的官方纪录时刻的各类考试，最多输入37个字。</div>
        <div class="tag">简介</div>
      </div>
    </div>
    <div class="mycardinfo-btn" @click="exchange">名片交换信息<div class="mycardinfo-num">99</div></div>
    <div class="disflex">
      <div class="mycard-btn">保存名片</div>
      <div class="mycard-btn">分享名片</div>
    </div>
    <!-- <popup text="仅需两步获取海量人脉信息"></popup> -->
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    exchange () {
      wx.navigateTo({
        url: '../exchangeCard/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.mycard-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .mycard-cont {
    height: 224px;
    position: relative;
    overflow: hidden;
    .qrcode-jiao {
      width: 60px;
      height: 60px;
      box-shadow: 0 0 7px #000 inset;
      transform: rotate(45deg);
      background: #3AAEFB;
      position: absolute;
      right: -30px;
      bottom: -30px;
      overflow: hidden;
      .qrcode {
        width: 20px;
        height: 20px;
        transform: rotate(-45deg);
        position: absolute;
        bottom: 20px;
        right: 50px;
      }
    }
    .mycard-info {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      .info-top {
        padding: 10px 10px 12px 20px;
        .info-photo {
          width: 91px;
          height: 91px;
          margin-top: 4px;
        }
        .info-text {
          margin-left: 10px;
          .text-name {
            font-size: 21px;
            margin-bottom: 10px;
          }
          .text-job {
            font-size: 15px;
          }
        }
        .info-update {
          width: 20px;
          height: 20px;
          margin-bottom: 70px;
        }
      }
      .info-bottom {
        padding-left: 19px;
        .info-item {
          margin-bottom: 5px;
        }
      }
    }
  }
  .synopsis {
    padding: 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    .synopsis-cont {
      text-indent: 2em;
    }
    .tag {
      width: 60px;
      height: 60px;
      background: #3AAEFB;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      transform: rotate(-45deg);
      position: absolute;
      top: -30px;
      left: -30px;
    }
  }
}
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
</style>
