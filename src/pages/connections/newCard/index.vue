<template>
  <div>
    <div class="newCard-title disflex">
      <div class="newCard-photo"><img :src="userInfo.avatarUrl" alt=""></div>
      <div class="newCard-text flex">
        <div style="margin-bottom: 8px;">昵称：{{userInfo.nickName}}</div>
        <div>号码：{{phone}}</div>
      </div>
    </div>
    <div class="newCard-info">
      <div class="newCard-item disflex">
        <div class="newCard-icon">*</div>
        <input class="newCard-input flex" type="text" placeholder="请填写您的姓名" v-model="name">
      </div>
      <div class="newCard-item disflex">
        <div class="newCard-icon">*</div>
        <input class="newCard-input flex" type="text" placeholder="请填写您的公司" v-model="company">
      </div>
      <div class="newCard-item disflex">
        <div class="newCard-icon">*</div>
        <input class="newCard-input flex" type="text" placeholder="请填写您的职位" v-model="job">
      </div>
      <div class="newCard-item disflex">
        <div class="newCard-icon">*</div>
        <input class="newCard-input flex" type="text" placeholder="请填写您的邮箱" v-model="email">
      </div>
      <div class="newCard-item disflex">
        <div class="newCard-icon">*</div>
        <input class="newCard-input flex" type="text" placeholder="请填写您的城市" v-model="city">
      </div>
      <div class="newCard-textarea">
        <textarea type="text" v-if="textareaShow" maxlength="45" placeholder="来一段简单的介绍，让其他人更好的了解你。本文段最多输入45个文字。" v-model="remarks"></textarea>
      </div>
    </div>
    <div class="newCard-needKnow">
      <checkbox-group @change="checkboxChange" style="float: left;">
        <label class="checkbox">
          <checkbox :value="checkbox" :checked="checkbox"/>
        </label>
      </checkbox-group>
      <div style="display: inline-block;" @click="needKnow">我已阅读并同意名片服务声明 >></div>
    </div>
    <div style="height: 64px;"></div>
    <div class="newCard-btn" @click="cardAdd" v-text="btnText===0?'创建名片':'保存名片'"></div>
    <div class="vant-css">
      <van-popup :show="show" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-title">名片服务声明</div>
          <div class="popup-cont">
            <div class="popup-text">感谢您选择使用"人社汇"小程序人脉名片功能，在创建人脉名片之前您需要清楚以下的信息：</div>
            <div class="popup-list"><div class="list-mark">1</div>人脉名片由用户自己发起创建，用户对自己的信息拥有完整的权利。</div>
            <div class="popup-list"><div class="list-mark">2</div>创建人脉名片需要把你的部分信息展示在人脉圈页面（如姓名微信头像等）但是用户的关键信息如电话号码邮箱等不会公开展示。</div>
            <div class="popup-list"><div class="list-mark">3</div>基于人脉网络创建意愿，其他用户可能会向您发起名片交换申请，但是必须同意申请后双方才可以看到电话号码等关键信息。</div>
            <div class="popup-list"><div class="list-mark">4</div>平台禁止用户恶意传播和贩卖用户名片，欢迎其他用户通过客服通道进行举报。</div>
            <div class="popup-list"><div class="list-mark">5</div>由于用户本身原因造成与其他个人或集体的直接、间接和不可预测的纠纷内容，由该用户自行承担，与平台无关。</div>
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
      show: false, // 弹框
      checkbox: false,
      btnText: 0,
      userInfo: [], // 用户头部名称
      phone: '',
      name: '',
      company: '',
      job: '',
      email: '',
      city: '',
      remarks: '',
      textareaShow: true
    }
  },
  onLoad (option) {
    this.userInfo = wx.getStorageSync('userInfo')
    this.phone = wx.getStorageSync('phone')
    let userId = wx.getStorageSync('userId')
    if (option.id === '1') {
      this.edit()
      this.btnText = 1
      this.$http.get({
        url: 'api/appUser/selectUserById',
        data: {
          id: userId
        }
      }).then(res => {
        this.name = res.data.list[0].name
        this.company = res.data.list[0].company
        this.job = res.data.list[0].userWork
        this.email = res.data.list[0].email
        this.city = res.data.list[0].cityName
        this.remarks = res.data.list[0].briefIntroduction
      })
    }
  },
  methods: {
    onClose (event) {
      this.show = false
      this.textareaShow = true
    },
    needKnow () { // 阅读声明
      this.show = true
      this.textareaShow = false
    },
    needOk () { // 确认已阅读声明
      this.checkbox = true
      this.show = false
      this.textareaShow = true
    },
    checkboxChange (event) {
      let type = event.mp.detail.value
      if (type.length === 0) {
        this.checkbox = false
      } else {
        this.checkbox = true
      }
    },
    cardAdd () {
      let userId = wx.getStorageSync('userId')
      console.log(userId)
      if (this.checkbox) {
        let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        let data = {
          name: this.name,
          company: this.company,
          job: this.job,
          email: this.email,
          city: this.city,
          remarks: this.remarks,
          phone: this.phone
        }
        if (this.name === '' || this.company === '' || this.job === '' || this.email === '' || this.city === '') {
          Toast('请您完善个人信息！')
        } else if (!emailReg.test(this.email)) {
          Toast('请您填写正确的邮箱！')
        } else {
          this.$http.get({
            url: 'api/appUser/updateAppuser',
            data: {
              id: userId,
              data: JSON.stringify(data)
            }
          }).then(res => {
            console.log(res)
            wx.navigateBack({
              delta: 1
            })
          })
        }
      } else {
        Toast('请您阅读并同意名片服务声明！')
      }
    },
    edit () {
      wx.setNavigationBarTitle({
        title: '编辑名片'
      })
    }
  }
}
</script>

<style lang="scss">
/*checkbox 选项框大小  */
checkbox .wx-checkbox-input {
  width: 15px;
  height: 15px;
  background: #f4f4f4;
  border: 1px solid #484848;
  border-radius: 6px;
}
/*checkbox选中后样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background: #f4f4f4;
  border: 1px solid #484848;
  border-radius: 6px;
}
/*checkbox选中后图标样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  font-size: 14px;
  color: #000;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
.newCard-title {
  height: 128px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: 0 13px;
  background-image: url('https://hrotp.com/static/system/image/cardBg.png');
  background-size: 100% 100%;
  .newCard-photo {
    width: 90px;
    height: 90px;
    margin: 0 20px 0 18px;
    border: 3px solid #fff;
    border-radius: 50%;
    overflow: hidden;
  }
  .newCard-text {
    font-size: 18px;
    color: #fff;
  }
}
.newCard-info {
  background: #fff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin: 0 5px;
  padding: 26px 14px 6px 14px;
  .newCard-item {
    width: 100%;
    height: 49px;
    background: rgba(244,244,244,1);
    border-radius: 8px;
    margin-bottom: 10px;
    .newCard-icon {
      color: red;
      margin: 0 5px 0 13px;
    }
    .newCard-input {
      margin-right: 10px;
      color: #727272;
    }
  }
  .newCard-textarea {
    // z-index: 0;
    background: rgba(244,244,244,1);
    border-radius: 8px;
    padding: 15px 20px;
    height: 50px;
    overflow: hidden;
    textarea {
      width: 100%;
      height: 100%;
      line-height: 1.5;
      color: #727272;
    }
  }
}
.newCard-needKnow {
  width: 205px;
  font-size: 12px;
  color: #737373;
  text-align: center;
  margin: 25px auto;
}
.newCard-btn {
  width: 100%;
  height: 64px;
  line-height: 64px;
  background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
  color: #fff;
  font-size: 18px;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
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
</style>
