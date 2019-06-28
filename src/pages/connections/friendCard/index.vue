<template>
  <div style="padding: 0 10px;">
    <card :synopsis="synopsis" :userinfo="userinfo" ></card>
    <!-- <div>
      <div class="mycardinfo-btn disflex" @click="call"><div class="icon15 mgr10"><img src="../../../assets/phone.png" alt=""></div>拨打电话</div>
      <div class="mycard-btn disflex" @click="share"><div class="icon15 mgr10"><img src="../../../assets/topMp.png" alt=""></div>分享名片</div>
    </div> -->
    <div>
      <div class="mycardinfo-btn w300 disflex"><div class="icon19-13 mgr10"><img src="../../../assets/cardjiaohuan.png" alt=""></div>交换名片</div>
      <div class="mycardinfo-btn w300 mgt ptr disflex" @click="myCard"><div class="icon15-18 mgr10"><img src="../../../assets/userIcon.png" alt=""></div>我的名片<div class="mycardinfo-num">99</div></div>
    </div>
    <div class="vant-popup">
      <van-popup
        :show="show"
        position="bottom"
        @close="onClose"
      >
        <div class="more-list">
          <div class="more-item" @click="phone">呼叫 13166882057</div>
        </div>
        <div class="more-off" @click="onClose">取消</div>
      </van-popup>
    </div>
    <div class="vant-css">
      <van-popup :show="show1" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-top" style="background-image: url('../../../assets/empowerBg.png'); background-size: 100% 100%;">
            <div class="popup-out">
              <div class="popup-icon" @click="onClose"><img src="../../../assets/out.png" alt=""></div>
            </div>
            <div class="popup-title">温馨提示</div>
          </div>
          <div class="popup-text">您还没有自己的专属名片点击创建后即可查看更多</div>
          <div class="popup-btn" @click="cardGo">即刻创建</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Card from '../../../components/card'
export default {
  data () {
    return {
      show: false, // 弹框
      show1: false,
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
    onClose (event) {
      this.show = false
      this.show1 = false
    },
    call () {
      console.log('拨打电话')
      this.show = true
    },
    share () {
      console.log('分享名片')
    },
    myCard () {
      this.show1 = true
    },
    cardGo () {
      console.log('即刻创建')
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
.mycardinfo-btn {
  width: 264px;
  height: 45px;
  line-height: 45px;
  background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 22px;
  font-size: 15px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 27px;
}
.mycard-btn {
  width: 264px;
  height: 45px;
  line-height: 45px;
  border: 1px solid rgba(58, 175, 252, 1);
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 22px;
  font-size: 15px;
  margin: auto;
}
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
.more-list {
  background: #fff;
  padding: 3px 0;
  .more-item {
    text-align: center;
    padding: 15px 0;
  }
}
.more-off {
  background: #fff;
  text-align: center;
  padding: 15px 0 25px 0;
  margin-top: 10px;
}
.popup {
  width: 275px;
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
  .popup-text {
    width: 155px;
    margin: 35px auto 0;
  }
  .popup-btn {
    width: 174px;
    height: 39px;
    line-height: 39px;
    color: #fff;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    text-align: center;
    margin: 40px auto 25px;
    border-radius: 20px;
  }
}
.icon19-13 {
  width: 19px;
  height: 13px;
}
.icon15-18 {
  width: 15px;
  height: 18px;
}
.w300 {
  width: 300px;
}
.mgt {
  margin-top: 0 !important;
}
.ptr {
  position: relative;
}
</style>
