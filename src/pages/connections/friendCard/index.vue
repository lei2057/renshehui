<template>
  <div style="padding: 0 10px;">
    <div class="mycard-wrapper">
      <div class="mycard-cont">
        <img src="https://wmqhouse.top/static/system/image/img03.png" alt="">
        <div class="mycard-info">
          <div class="info-top disflex">
            <div class="info-photo"><img :src="userinfo.headPhoto" alt=""></div>
            <div class="info-text flex">
              <div class="text-name">{{userinfo.name}}</div>
              <div class="text-job">{{userinfo.userWork}}</div>
            </div>
          </div>
          <div class="info-bottom" v-if="pageType === '1'||pageType === '2'">
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/dianhua.png" alt=""></div><span class="flex">电话：{{phone}}</span><span>(交换后可查看)</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/company.png" alt=""></div><span class="flex">公司：{{userinfo.company}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/email.png" alt=""></div><span class="flex">邮箱：{{email}}</span><span>(交换后可查看)</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/address.png" alt=""></div><span class="flex">城市：{{userinfo.cityName}}</span></div>
          </div>
          <div class="info-bottom" v-else>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/dianhua.png" alt=""></div><span class="flex">电话：{{userinfo.phone}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/company.png" alt=""></div><span class="flex">公司：{{userinfo.company}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/email.png" alt=""></div><span class="flex">邮箱：{{userinfo.email}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../../../assets/address.png" alt=""></div><span class="flex">城市：{{userinfo.cityName}}</span></div>
          </div>
        </div>
      </div>
      <div class="synopsis">
        <div class="synopsis-cont">{{userinfo.briefIntroduction}}</div>
        <div class="tag">简介</div>
      </div>
    </div>
    <div v-if="pageType === '1'">
      <div class="mycardinfo-btn w300 disflex" @click="exchangeCard"><div class="icon19-13 mgr10"><img src="../../../assets/cardjiaohuan.png" alt=""></div>交换名片</div>
      <div class="mycardinfo-btn w300 mgt ptr disflex" @click="myCard"><div class="icon15-18 mgr10"><img src="../../../assets/userIcon.png" alt=""></div>我的名片<div class="mycardinfo-num">{{cardNum}}</div></div>
    </div>
    <div v-else-if="pageType === '2'">
      <div class="mycardinfo-btn w300 bg1 disflex">名片已发送交换申请</div>
      <div class="mycardinfo-btn w300 mgt ptr disflex" @click="myCard"><div class="icon15-18 mgr10"><img src="../../../assets/userIcon.png" alt=""></div>我的名片<div class="mycardinfo-num">{{cardNum}}</div></div>
    </div>
    <div v-else>
      <div class="mycardinfo-btn disflex" @click="call"><div class="icon15 mgr10"><img src="../../../assets/phone.png" alt=""></div>拨打电话</div>
      <div class="mycard-btn disflex" @click="share"><div class="icon15 mgr10"><img src="../../../assets/topMp.png" alt=""></div>分享名片</div>
    </div>
    <div class="vant-popup">
      <van-popup
        :show="show"
        position="bottom"
        @close="onClose"
      >
        <div class="more-list">
          <div class="more-item" @click="phone">呼叫 {{userinfo.phone}}</div>
        </div>
        <div class="more-off" @click="onClose">取消</div>
      </van-popup>
    </div>
    <div class="vant-css">
      <van-popup :show="show1" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-top">
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
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../../../static/vant/toast/toast'
import Card from '../../../components/card'
export default {
  components: {
    Card
  },
  data () {
    return {
      show: false, // 弹框
      show1: false,
      userinfo: [],
      friendId: '', // 交换好友ID
      pageType: '', // 访问页面类型
      cardNum: 0,
      btnShow: true,
      phone: '',
      email: ''
    }
  },
  onLoad (option) {
    console.log(option.key)
    this.friendId = option.id
    this.pageType = option.key
    this.cardNum = option.num
    this.$http.get({
      url: 'api/appUser/selectUserById',
      data: {
        id: option.id
      }
    }).then(res => {
      this.userinfo = res.data.list[0]
    })
  },
  onShow () {

  },
  methods: {
    onClose (event) {
      this.show = false
      this.show1 = false
    },
    call () {
      this.show = true
    },
    phone () {
      wx.makePhoneCall({
        phoneNumber: this.userinfo.phone
      })
    },
    share () {
      console.log('分享名片')
    },
    exchangeCard () {
      let userId = wx.getStorageSync('userId')
      this.$http.get({
        url: 'api/appUser/applyUserAttention',
        data: {
          userId: userId,
          attentionId: this.friendId
        }
      }).then(res => {
        if (res.code === '0000000') {
          Toast('已经发送交换申请')
          this.pageType = '2'
        }
      })
    },
    myCard () {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        wx.navigateTo({
          url: '../myCard/main?num=' + this.cardNum
        })
      } else {
        this.show1 = true
      }
    },
    cardGo () {
      wx.navigateTo({
        url: '../newCard/main'
      })
    }
  },
  watch: {
    'userinfo' (res) { // 密码遮挡
      let phx = res.phone.substring(3, 6)
      let emx = res.email.substring(3, 6)
      this.phone = res.phone.replace(phx, '****')
      this.email = res.email.replace(emx, '****')
    }
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
.mycard-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .mycard-cont {
    height: 224px;
    position: relative;
    overflow: hidden;
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
          border: 3px solid #fff;
          border-radius: 50%;
          overflow: hidden;
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
      }
      .info-bottom {
        padding-left: 19px;
        font-weight: 300;
        margin-right: 10px;
        .info-item {
          margin-bottom: 5px;
          .info-icon {
            width: 15px;
            height: 15px;
            margin-right: 9px;
          }
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
.popup {
  width: 275px;
  .popup-top {
    height: 65px;
    background-image: url('https://wmqhouse.top/static/system/image/empowerBg.png'); 
    background-size: 100% 100%;
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
.bg1 {
  background: #BEBEBE;
  color: #000;
}
</style>
