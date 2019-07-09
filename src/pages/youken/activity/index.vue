<template>
  <div :class="show||show1?'height':''">
    <div style="height:190px;">
      <img :src="imgBg" alt="">
    </div>
    <div class="pd10">
      <div class="wrapper activity">
        <div class="activity-title">{{content.title}}</div>
        <div class="activity-time">
          <div class="time-text">{{content.publishTime}}</div>
        </div>
        <div class="activity-cont">{{content.detail}}</div>
      </div>
      <div class="enroll-wrapper disflex">
        <img src="../../../assets/img02.png" alt="">
        <div class="enroll-introduce disflex">
          此活动已有 <div class="enroll-people" v-if="content.personNum<9999">{{content.personNum}}</div><div class="enroll-people" v-else>9999+</div> 人参与，赶紧报名吧！
        </div>
      </div>
      <div class="wrapper activity-table" style="background-image: url('../../../assets/activityBg.png');background-size: 100% 100%;">
        <div class="activity-table-title">活动报名</div>
        <div class="activity-table-input disflex" v-for="(item,index) in enroll" :key="index">
          <div class="input-title">{{item.codition}}：</div>
          <input class="flex" type="text" :placeholder="item.detail" v-model="data[index]">
        </div>
        <div class="activity-table-btn" @click="subEnroll">提交报名</div>
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
      show1: false, // 弹框
      content: [], // 活动信息
      imgBg: '', // 活动背景图
      enroll: [], // 报名列表
      data: [], // 报名信息
      activityId: '' // 活动ID
    }
  },
  onLoad (option) {
    this.activityId = option.id
    this.$http.get({
      url: 'api/activity/selectAllActivity'
    }).then(res => {
      res.data.forEach(el => {
        if (option.id === el.id) {
          this.content = el
          this.imgBg = el.detailPhoto.split(',')[0]
          this.enroll = JSON.parse(el.registrationConditions)
        }
      })
    })
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
    },
    subEnroll () {
      let userId = wx.getStorageSync('userId')
      this.enroll.forEach(el => {
        if (el.codition === '电话') {
          let indx = this.enroll.indexOf(el)
          let phoneReg = /^1[3456789]\d{9}$/
          if (this.data.length !== this.enroll.length) {
            wx.showToast({
              title: '请完善报名信息',
              icon: 'none'
            })
            setTimeout(() => {
              wx.hideLoading()
            }, 2000)
          } else if (!phoneReg.test(this.data[indx])) {
            wx.showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            })
            setTimeout(() => {
              wx.hideLoading()
            }, 2000)
          } else {
            this.$http.get({
              url: 'api/activity/insertSignList',
              data: {
                activityId: this.activityId,
                userId: userId,
                remarks: JSON.stringify(this.data)
              }
            }).then(res => {
              wx.showToast({
                title: '报名成功',
                icon: 'success'
              })
              setTimeout(() => {
                wx.hideLoading()
              }, 2000)
              this.data = []
            })
          }
        }
      })
    }
  },
  components: {
    Popup
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
  height: 100%;
  margin-bottom: 50px;
  .activity-table-title {
    font-size: 17px;
    font-weight: 600;
    text-align: center;
    padding-top: 12px;
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
    margin: 31px auto 22px;
  }
}
.service-wrapper {
  position: fixed;
  bottom: 10px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  z-index: 99;
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
