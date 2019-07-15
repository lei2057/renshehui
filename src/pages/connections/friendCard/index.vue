<template>
  <div style="padding: 0 10px;">
    <card :userinfo="userinfo" :pageType="pageType"></card>
    <div v-if="pageType === '1'">
      <div class="mycardinfo-btn w300 disflex" @click="exchangeCard" v-if="btnShow"><div class="icon19-13 mgr10"><img src="../../../assets/cardjiaohuan.png" alt=""></div>交换名片</div>
      <div class="mycardinfo-btn w300 bg1 disflex" v-else>名片已交换</div>
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
      userinfo: {},
      friendId: '', // 交换好友ID
      pageType: '', // 访问页面类型
      cardNum: 0,
      btnShow: true
    }
  },
  onLoad (option) {
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
      console.log('拨打电话')
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
        console.log(res)
        if (res.code === '0000000') {
          if (res.data.res) {
            this.btnShow = false
          }
        } else if (res.code === '121') {
          Toast('已经发送交换申请')
          this.btnShow = false
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
.bg1 {
  background: #BEBEBE;
  color: #000;
}
</style>
