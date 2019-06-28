<template>
  <div>
    <div class="my-bg"><img src="../../../assets/renmaiBg.png"></div>
    <div class="my-cont">
      <div class="my-photo disflex">
        <div class="icon100"><img src="../../../assets/user.png" alt=""></div>
        <div class="flex"><div class="my-login">登录</div></div>
      </div>
      <div class="my-info wrapper-info disflex">
        <div class="border_cell_right flex">
          <div class="my-num">10</div>
          <div>人脉名片</div>
        </div>
        <div class="border_cell_right flex" @click="collection">
          <div class="my-num">10</div>
          <div>资料收藏</div>
        </div>
        <div class="flex">
          <div class="my-num">10</div>
          <div>优肯方案</div>
        </div>
      </div>
      <div class="my-list">
        <div class="my-item border_cell disflex">
          <div class="icon20"><img src="../../../assets/xiaoxi.png" alt=""></div>
          <div class="my-text flex">人脉消息</div>
          <div class="icon17"><img src="../../../assets/right.png" alt=""></div>
        </div>
        <div class="my-item border_cell disflex" @click="share">
          <div class="icon20"><img src="../../../assets/tuijian.png" alt=""></div>
          <div class="my-text flex">推荐给好友</div>
          <div class="icon17"><img src="../../../assets/right.png" alt=""></div>
        </div>
        <div class="my-item disflex" @click="kefu">
          <div class="icon20"><img src="../../../assets/kefu.png" alt=""></div>
          <div class="my-text flex">联系客服</div>
          <div class="icon17"><img src="../../../assets/right.png" alt=""></div>
        </div>
      </div>
      <div class="my-needKnow" @click="needKnow">服务免责声明>></div>
    </div>
    <div class="vant-css">
      <van-popup :show="show" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-title">服务免责声明</div>
          <div class="popup-cont">
            <div class="popup-text">感谢您选择使用"人社汇"微信小程序，在你使用过程中请务必遵守以下条款：</div>
            <div class="popup-list"><div class="list-mark">1</div>用户使用过程必须遵守所属地区和国家的法律规定。</div>
            <div class="popup-list"><div class="list-mark">2</div>用户分享或转发时，包含但不仅限于所使用的图片文字及其附属特征不得侵犯他人合法权益。</div>
            <div class="popup-list"><div class="list-mark">3</div>若用户使用过程中违反相关规定、存在侵犯他人或集体的权益等行为，平台有权利删除对应用户至永久。</div>
            <div class="popup-list"><div class="list-mark">4</div>用户不得自行修改或者使用"人社汇"相关标识发布与平台不符的信息，由此造成的与其他纠纷与平台无关。</div>
            <div class="popup-list"><div class="list-mark">5</div>同时"人社汇"致力于用户信息隐私的保护，未经用户本人允许，不会泄露用户的相关信息。</div>
            <div class="popup-list"><div class="list-mark">6</div>对于用户执意在条款明确禁止的范围内进行操作，以及由此造成的任何直接、间接、不可预测的风险由该用户自行承担。</div>
          </div>
          <div class="popup-btn" @click="needOk">我已阅读并知晓</div>
        </div>
      </van-popup>
    </div>
    <div class="vant-css">
      <van-popup :show="show1" :overlay="false" @close="onClose" catchtouchmove="ture">
        <div class="popup-kefu">
          <Popup text="客服提示" @show="onClose"></Popup>
          <div class="popup-text">有任何问题，请在接下来的页面留言</div>
          <div class="popup-btn">我知道了</div>
        </div>
      </van-popup>
    </div>
    <van-popup :show="show2" @close="onClose" position="bottom">
      <div class="share-title">推荐小程序</div>
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
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../../../static/vant/toast/toast'
import Popup from '../../../components/popup'
export default {
  data () {
    return {
      show: false, // 声明弹框
      show1: false, // 客服弹框
      show2: false // 添加弹框
    }
  },
  methods: {
    onClose (event) {
      this.show = false
      this.show1 = false
      this.show2 = false
      setTimeout(() => {
        wx.showTabBar({})
      }, 300)
    },
    needKnow () { // 阅读声明
      this.show = true
      wx.hideTabBar({})
    },
    needOk () { // 确认已阅读声明
      this.show = false
      setTimeout(() => {
        wx.showTabBar({})
      }, 300)
    },
    share () {
      this.show1 = true
      this.show2 = true
      wx.hideTabBar({})
    },
    kefu () {
      this.show1 = true
    },
    cardAdd () {
      Toast('请您阅读并同意名片服务声明')
    },
    collection () {
      wx.navigateTo({
        url: '../collection/main'
      })
    }
  },
  components: {
    Popup
  }
}
</script>

<style lang="scss" scoped>
.my-bg {
  height: 173px;
}
.my-cont {
  width: 100%;
  position: absolute;
  top: 0;
  .my-photo {
    padding: 18px 20px 15px 20px;
    .my-login {
      width: 116px;
      height: 34px;
      line-height: 34px;
      background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      color: #fff;
      text-align: center;
      border-radius: 17px;
      margin-left: 24px;
    }
  }
  .my-info {
    margin-left: 13px;
    margin-right: 13px;
    padding: 12px 0;
    text-align: center;
    .my-num {
      font-size: 18px;
      margin: 5px 0 8px 0;
    }
  }
  .my-list {
    background: #fff;
    .my-item {
      padding: 23px 15px 23px 20px;
      .my-text {
        margin-left: 17px;
      }
    }
  }
  .my-needKnow {
    text-align: center;
    color: #646464;
    font-size: 12px;
    margin-top: 25px;
  }
}
.popup {
  width: 340px;
  .popup-title {
    height: 68px;
    line-height: 68px;
    background: #3AAFFC;
    color: #fff;
    text-shadow: 1px 2px 5px rgba(166,27,27,0.15);
    font-size: 22px;
    text-align: center;
  }
  .popup-cont {
    padding: 14px 11px;
    .popup-text {
      margin-bottom: 15px;
      font-weight: 600;
    }
    .popup-list {
      margin-bottom: 12px;
      .list-mark {
        width: 14px;
        height: 14px;
        line-height: 14px;
        background: #3AAFFC;
        color: #fff;
        text-align: center;
        font-size: 12px;
        border-radius: 50%;
        margin: 2px 2px 0 5px;
        float: left;
        zoom: 1;
      }
      &:after {
        content: " ";
        clear: both;
        display: block;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
  .popup-btn {
    width: 154px;
    height: 39px;
    line-height: 39px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    margin: 0 auto 25px;
    text-align: center;
    border-radius: 20px;
  }
}
.popup-kefu {
  width: 275px;
  .popup-text {
    margin: 15px auto 30px;
    text-align: center;
  }
  .popup-btn {
    width: 154px;
    height: 39px;
    line-height: 39px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    margin: 0 auto 25px;
    text-align: center;
    border-radius: 20px;
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
