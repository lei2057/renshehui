<template>
  <div>
    <div @click="needKnow">服务免责声明>></div>
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
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    return {
      show: false // 弹框
    }
  },
  methods: {
    onClose (event) {
      this.show = false
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
    cardAdd () {
      Toast('请您阅读并同意名片服务声明')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
