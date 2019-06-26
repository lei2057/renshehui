<template>
  <div :class="show?'height':''">
    <div style="height:190px;">
      <img src="../../../assets/listBg.png" alt="">
    </div>
    <div class="pd10">
      <div class="wrapper activity">
        <div class="activity-title">活动内容标题不超过18个字，超过显示超过显示超过显示</div>
        <div class="activity-time">
          <div class="time-text">2019.04.29</div>
        </div>
        <div class="activity-cont">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
        </div>
      </div>
      <div class="enroll-wrapper disflex">
        <img src="../../../assets/img02.png" alt="">
        <div class="enroll-introduce disflex">
          此活动已有 <div class="enroll-people">9999+</div> 人参与，赶紧报名吧！
        </div>
      </div>
      <div class="wrapper activity-table">
        <img src="../../../assets/activityBg.png" alt="">
        <div class="activity-table-cont">
          <div class="activity-table-title">活动报名</div>
          <div class="activity-table-input disflex">
            <div class="input-title">报名条件一：</div>
            <input class="flex" type="text" placeholder="表单内容">
          </div>
          <div class="activity-table-input disflex">
            <div class="input-title">报名条件二：</div>
            <input class="flex" type="text" placeholder="表单内容">
          </div>
          <div class="activity-table-input disflex">
            <div class="input-title">报名条件三：</div>
            <input class="flex" type="text" placeholder="表单内容">
          </div>
          <div class="activity-table-btn">提交报名</div>
        </div>
      </div>
      <div class="service-wrapper">
        <div class="disflex service-btn" @click="message">
          <div class="service-icon"><img src="../../../assets/ermai.png" alt=""></div>
          联系客服
        </div>
        <div class="disflex service-btn" @click="share">
          <div class="service-icon"><img src="../../../assets/top.png" alt=""></div>
          分享活动
        </div>
      </div>
      <!-- 弹出层  -->
      <div  class="vant-css">
        <van-popup :show="show" @close="onClose">
          <div class="popup">
            <popup text="温馨提示" @show="onClose"></popup>
            <div class="popup-cont">
              <div class="popup-text">有任何问题，请在接下来的页面留言</div>
              <div class="popup-btn">立即留言</div>
            </div>
          </div>
        </van-popup>
      </div>
      <van-popup
        :show="show1"
        position="bottom"
        @close="onClose"
      >
        <div class="share-title">分享活动</div>
        <div class="disflex share-bottom">
          <div class="flex share-btn">
            <div class="share-icon">
              <img src="../../../assets/pyq.png" alt="">
            </div>保存海报</div>
          <div class="flex share-btn">
            <div class="share-icon">
              <img src="../../../assets/haoyou.png" alt="">
            </div>分享好友</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Popup from '../../../components/popup'
export default {
  data () {
    return {
      show: false, // 弹框
      show1: false // 弹框
    }
  },
  components: {
    Popup
  },
  methods: {
    message () {
      this.show = true
    },
    share () {
      this.show1 = true
    },
    onClose () {
      this.show = false
      this.show1 = false
    }
  }
}
</script>

<style lang="scss" scoped>
.height {//蒙层后禁止滚动
  height: 100vh;
  overflow: hidden;
}
.activity {
  margin-top: -45px;
  .activity-title {
    width: 280px;
    font-weight: 600;
    font-size: 15px;
    margin: auto;
    padding: 10px 0 5px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .activity-time {
    display: flex;
    justify-content: flex-end;
    .time-text {
      height: 18px;
      line-height: 18px;
      padding: 0 5px;
      font-size: 10px;
      font-weight:400;
      color:rgba(255,255,254,1);
      background: #3AAFFC;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  } 
  .activity-cont {
    padding: 5px 10px 10px 10px;
    text-indent: 2em;
  }
}
.enroll-wrapper {
  position: relative;
  height: 43px;
  margin-bottom: 15px;
  .enroll-introduce {
    position: absolute;
    top: 12px;
    text-align: center;
    .enroll-people {
      width: 54px;
      height: 27px;
      line-height: 27px;
      margin: 0 5px;
      color: #fff;
      background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
    }
  }
}
.activity-table {
  height: 266px;
  margin-bottom: 50px;
  position: relative;
  .activity-table-cont {
    position: absolute;
    top: 0;
    width: 100%;
    .activity-table-title {
      font-size: 17px;
      font-weight: 600;
      text-align: center;
      margin-top: 15px;
    }
    .activity-table-input {
      margin-top: 20px;
      .input-title {
        font-size: 15px;
        margin-left: 23px;
        margin-right: 15px;
      }
      input {
        background: rgba(244,244,244,1);
        border-radius: 14px;
        padding-left: 20px;
        margin-right: 24px;
        height: 28px;
        line-height: 28px;
      }
    }
    .activity-table-btn {
      width: 294px;
      height: 39px;
      line-height: 39px;
      background: #fff;
      color: rgba(58, 175, 252, 1);
      border: 1px solid rgba(58, 175, 252, 1);
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius: 20px;
      text-align: center;
      margin: 31px auto 0;
    }
  }
}
.service-wrapper {
  position: fixed;
  bottom: 10px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  .service-btn {
    width: 116px;
    height: 34px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 17px;
    color: #fff;
    .service-icon {
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
  }
}
.popup {
  width: 275px;
  .popup-cont {
    margin-top: 15px;
    .popup-text {
      text-align: center;
      margin: 25px auto 0;
    }
    .popup-btn {
      margin: 13px auto 20px;
      width: 200px;
      height: 39px;
      line-height: 39px;
      background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      color: #fff;
      border-radius:20px;
      text-align: center;
    }
  }
}
.share-title {
  text-align: center;
  margin: 10px 0;
}
.share-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #727272;
  .share-icon {
    width: 31px;
    height: 31px;
    margin-bottom: 5px;
  }
}
</style>
