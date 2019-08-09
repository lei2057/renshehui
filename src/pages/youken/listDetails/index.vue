<template>
  <div class="pd10">
    <div class="details-wrapper">
      <div class="details-cont">
        <div class="disflex">
          <div class="title-text flex">{{contList.title}}</div>
          <div class="title-icon" @click="collect" v-if="!xin"><img src="../../../assets/kxin.png" alt=""></div>
          <div class="title-icon" @click="collect" v-if="xin"><img src="../../../assets/xin.png" alt=""></div>
        </div>
        <div class="details-item">服务费用<span class="item-cont">{{contList.price}}</span></div>
        <div class="details-item">服务类型<span class="item-cont">{{contList.typeName1}} — {{contList.typeName2}}</span></div>
        <div class="details-item">服务城市<span class="item-cont">{{contList.city}}</span></div>
        <div class="details-item">联系电话<span class="item-cont">{{contList.phone}}</span></div>
      </div>
    </div>
    <div class="wrapper pd10 disflex">
      <div class="icon34" style="margin: 0 9px 0 7px;"><img :src="contList.serviceCompanyImg" alt=""></div>
      <div class="flex">{{contList.serviceCompany}}</div>
      <!-- <div style="width: 17px;height: 17px;"><img src="../../../assets/right.png"></div> -->
    </div>
    <div class="wrapper pd10">
      <div class="service" v-for="item in serviceList" :key="item">
        <div class="service-title">{{item.titles}}</div>
        <div class="service-cont" v-html="item.details"></div>
      </div>
    </div>
    <div class="service-wrapper">
      <button class="disflex service-btn" @click="share" open-type="share">
        <div class="service-icon"><img src="../../../assets/top.png" alt=""></div>
        分享好友
      </button>
      <div class="disflex service-btn" @click="phoneCall">
        <div class="service-icon"><img src="../../../assets/phone.png" alt=""></div>
        马上咨询
      </div>
    </div>
    <!-- 弹出层  -->
    <div class="vant-css">
      <van-popup :show="show" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-top">
            <div class="popup-out">
              <div class="popup-icon" @click="onClose"><img src="../../../assets/out.png"></div>
            </div>
            <div class="popup-title">温馨提示</div>
          </div>
          <div class="popup-cont">
            <div class="popup-text">为了带来更好的用户体验我们建议你使用微信登录</div>
            <div class="popup-empower disflex">
              <div class="empower-icon"><img src="../../../assets/user.png"></div>
              <div class="empower-center-icon"><img src="../../../assets/jiaohuan.png"></div>
              <div class="empower-icon"><img src="../../../assets/youken.png"></div>
            </div>
            <button class="popup-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">微信登陆</button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xin: false,
      categoryId: '', // 资料ID
      userId: '', // 用户ID
      contList: [], // 详情内容
      serviceList: [], // 内容列表
      show: false// 授权弹框
    }
  },
  onLoad (option) {
    this.userId = wx.getStorageSync('userId')
    this.categoryId = option.id
    this.$http.get({
      url: 'api/SupplyChain/selectById',
      data: {
        id: option.id
      }
    }).then(res => {
      console.log(res)
      this.contList = res.data.list
      this.serviceList = JSON.parse(res.data.list.keyNotes.replace(/\n|\r\n/g, '<br/>'))
    })
    this.$http.get({
      url: 'api/SupplyChain/showMyfavoritesState',
      data: {
        userId: this.userId,
        categoryId: option.id
      }
    }).then(res => {
      // 1是未收藏
      if (res.data.res === '1') {
        this.xin = false
      } else {
        this.xin = true
      }
    })
  },
  methods: {
    collect () { // 收藏
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        this.show = true
      } else {
        if (!this.xin) {
          this.$http.get({
            url: 'api/SupplyChain/insertMyfavorites',
            data: {
              userId: this.userId,
              categoryId: this.categoryId
            }
          }).then(res => {
            this.xin = true
            wx.showToast({
              title: '已收藏',
              icon: 'none'
            })
            setTimeout(() => {
              wx.hideLoading()
            }, 2000)
          })
        } else {
          this.$http.get({
            url: 'api/SupplyChain/delMyfavoritesChain',
            data: {
              userId: this.userId,
              categoryId: this.categoryId
            }
          }).then(res => {
            this.xin = false
            wx.showToast({
              title: '取消收藏',
              icon: 'none'
            })
            setTimeout(() => {
              wx.hideLoading()
            }, 2000)
          })
        }
      }
    },
    phoneCall () { // 客服拨打电话
      wx.makePhoneCall({
        phoneNumber: this.contList.phone
      })
    },
    share () { // 分享好友
      this.onShareAppMessage()
    },
    onClose () {
      this.show = false
    },
    onGotUserInfo (e) { // 登录授权
      let that = this
      that.show = false
      if (e.mp.detail.userInfo) {
        wx.setStorage({
          key: 'userInfo',
          data: e.mp.detail.userInfo
        })
        wx.login({
          success (res) {
            if (res.code) {
              // 发起网络请求
              that.$http.get({
                url: 'api/appUserLoginApi/userAuthorizedOk',
                data: {
                  code: res.code,
                  headPhoto: e.mp.detail.userInfo.avatarUrl,
                  name: e.mp.detail.userInfo.nickName,
                  sex: e.mp.detail.userInfo.gender
                }
              }).then(res => {
                // let userId = wx.getStorageSync('userId')
                // if (userId === '') {
                console.log(res)
                wx.setStorageSync('userId', res.data.userId)
                wx.setStorageSync('sessionkey', res.data.sessionkey)
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          },
          fail: (res) => {
            console.log(res)
          }
        })
      } else {
        console.log('拒绝授权')
      }
    }
  },
  onShareAppMessage () {
    var shareObj = {
      title: '转发',
      path: '/pages/youken/listDetails/main?id=' + this.categoryId,
      imageUrl: 'https://wmqhouse.top/static/system/image/null.png',
      success: function (res) {
        console.log('成功', res)
      }
    }
    return shareObj
  }
}
</script>

<style lang="scss" scoped>
.details-wrapper {
  width: 100%;
  height: 240px;
  margin-bottom: 15px;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-image: url('https://wmqhouse.top/static/system/image/detailsBg.png'); 
  background-size: 100% 100%;
  .details-cont {
    margin-left: 18px;
    padding-top: 12px;
    .title-text {
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title-icon {
      width: 20px;
      height: 19px;
      margin-right: 5px;
    }
    .details-item {
      margin-top: 25px;
      .item-cont {
        margin-left: 10px;
      }
    }
  }
}
.service {
  border-bottom: 1px dashed #545454;
  margin: 7px;
  .service-title {
    font-size: 15px;
    margin-bottom: 4px;
  }
  .service-cont {
    margin-bottom: 10px;
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
  .popup-cont {
    margin-top: 15px;
    .popup-text {
      width: 155px;
      text-align: center;
      margin: auto;
    }
    .popup-empower {
      margin-top: 14px;
      .empower-icon {
        width: 66px;
        height: 66px;
      }
      .empower-center-icon {
        width: 31px;
        height: 17px;
        margin: 0 33px;
      }
    }
    .popup-btn {
      margin: 13px auto;
      width: 200px;
      height: 39px;
      line-height: 39px;
      background: #87D850;
      color: #fff;
      box-shadow:1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius:20px;
      .btn-icon {
        width: 17px;
        height: 13px;
        margin-right: 10px;
      }
    }
  }
}
</style>
