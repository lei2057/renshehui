<template>
  <div>
    <div class="my-bg"><img src="https://wmqhouse.top/static/system/image/renmaiBg.png"></div>
    <div class="my-cont">
      <div class="my-photo disflex" v-if="!userInfo">
        <div class="icon100"><img src="../../../assets/user.png" alt=""></div>
        <div class="flex"><button class="my-login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登录</button></div>
      </div>
      <div class="my-photo disflex" v-else>
        <div class="photo-wrapper"><img :src="userInfo.avatarUrl" alt=""></div>
        <div class="flex"><div class="my-name">{{userInfo.nickName}}</div></div>
      </div>
      <div class="my-info wrapper-info disflex">
        <div class="border_cell_right flex" @click="mingpian">
          <div class="my-num">{{totalMyCard||0}}</div>
          <div>人脉名片</div>
        </div>
        <div class="border_cell_right flex" @click="collection">
          <div class="my-num">{{totalDataSource||0}}</div>
          <div>资料收藏</div>
        </div>
        <div class="flex" @click="youken">
          <div class="my-num">{{totalChain||0}}</div>
          <div>优肯方案</div>
        </div>
      </div>
      <div class="my-list">
        <div class="my-item border_cell disflex" @click="renmai">
          <div class="icon20"><img src="../../../assets/xiaoxi.png" alt=""></div>
          <div class="my-text flex">人脉消息</div>
          <div class="icon17"><img src="../../../assets/right.png" alt=""></div>
        </div>
        <div class="my-item border_cell disflex" @click="share">
          <div class="icon20"><img src="../../../assets/tuijian.png" alt=""></div>
          <div class="my-text flex">推荐给好友</div>
          <div class="icon17"><img src="../../../assets/right.png" alt=""></div>
        </div>
        <!-- <cover-view @click="share" class="my-item border_cell disflex">
          <cover-image class="icon20" mode="widthFix" src="../../../assets/tuijian.png"></cover-image>
          <cover-view  class="my-text flex">推荐给好友</cover-view>
          <cover-image  class="icon17" mode="widthFix" src="../../../assets/right.png"></cover-image>
        </cover-view> -->
        
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
      <van-popup :show="show1" @close="onClose" catchtouchmove="ture">
        <div class="popup-kefu">
          <Popup text="客服提示" @show="onClose"></Popup>
          <div class="popup-text">有任何问题，请在接下来的页面留言</div>
          <div class="popup-btn" @click="onClose">我知道了</div>
        </div>
      </van-popup>
    </div>
    <van-popup :show="show2" @close="onClose" position="bottom">
      <view class='poste_box' id='canvas-container'>
        <canvas canvas-id="myCanvas" style="width:100%;height:850rpx;" />
      </view>
      <div class="disflex share-bottom">
        <!-- <div class="flex share-btn">
          <div class="share-icon">
            <img src="../../../assets/pyq.png" alt="">
          </div>
          保存海报
        </div> -->
        <button @click="saveShareImg" class="flex share-btn">
          <view  class="share-icon">
            <cover-image  mode="widthFix" src="https://wmqhouse.top/static/system/image/pyq.png"></cover-image>
          </view>
          <view>保存海报</view>
        </button>
        <!-- <div class="flex share-btn">
          <div class="share-icon">
            <img src="../../../assets/haoyou.png" alt="">
          </div>
          分享好友
        </div> -->
        <button openType="share" class="flex share-btn">
          <view  class="share-icon">
            <cover-image  mode="widthFix" src="https://wmqhouse.top/static/system/image/haoyou.png"></cover-image>
          </view>
          <view>分享好友</view>
        </button>
      </div>
    </van-popup>
    <div class="vant-css">
      <van-popup :show="show3" :overlay="false" @close="onClose" catchtouchmove="ture">
        <div class="popup-kefu">
          <!-- <Popup text="客服提示" @show="onClose"></Popup> -->
          <!-- <div class="popup-text">海报</div> -->
        </div>
      </van-popup>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Popup from '../../../components/popup'
export default {
  components: {
    Popup
  },
  data () {
    return {
      show: false, // 声明弹框
      show1: false, // 客服弹框
      show2: false, // 添加弹框
      show3: false, // 海报弹框
      totalMyCard: 0, // 人脉名片总计
      totalDataSource: 0, // 资料收藏总计
      totalChain: 0, // 优肯方案总计
      userInfo: {}, // 用户信息
      cardInfo: {
        name: '微信名字',
        msg1: '向你推荐了人社会',
        msg2: '打开微信扫一扫，即可试用'
      },
      qrCodeImg: ''
    }
  },
  onShareAppMessage (res) {

  },

  methods: {
  //  头像
    getQrCode: function (avaterSrc) {
      wx.showLoading({
        title: '生成中...',
        mask: true
      })
      var that = this
      wx.downloadFile({
        url: that.qrCodeImg, // 二维码路径
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode === 200) {
            var codeSrc = res.tempFilePath
            that.sharePosteCanvas(avaterSrc, codeSrc)
          } else {
            wx.showToast({
              title: '二维码下载失败！',
              icon: 'none',
              duration: 2000,
              success: function () {
                var codeSrc = ''
                that.sharePosteCanvas(avaterSrc, codeSrc)
              }
            })
          }
        }
      })
    },

    /**
   * 开始用canvas绘制分享海报
   * @param avaterSrc 下载的头像图片路径
   * @param codeSrc   下载的二维码图片路径
   */
    sharePosteCanvas: function (avaterSrc, codeSrc) {
      wx.showLoading({
        title: '生成中...',
        mask: true
      })
      var that = this
      // var cardInfo = that.cardInfo // 需要绘制的数据集合
      const ctx = wx.createCanvasContext('myCanvas', this) // 创建画布
      var width = ''
      wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
        // var height = rect.height * 0.15
        // var right = rect.right
        width = rect.width * 0.15
        var left = rect.left + rect.width * 0.05
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, rect.width, rect.height)

        // 头像为正方形
        if (avaterSrc) {
          ctx.drawImage(avaterSrc, left, 15, 60, 60)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        // 微信名字
        if (that.userInfo.nickName) {
          ctx.fillText(that.userInfo.nickName, left + width + 10, 30)
          ctx.setFontSize(14)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        // 推荐语
        if (that.cardInfo.msg1) {
          ctx.fillText(that.cardInfo.msg1, left + width + 10, 65)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        if (that.cardInfo.msg2) {
          ctx.fillText(that.cardInfo.msg2, 90, 390)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }

        //  绘制二维码
        if (codeSrc) {
          ctx.drawImage(codeSrc, 60, 100, 250, 250)
        }
      }).exec()

      setTimeout(function () {
        ctx.draw()
        wx.hideLoading()
      }, 1000)
    },

    getAvaterInfo () {
      wx.showLoading({
        title: '生成中...',
        mask: true
      })
      var that = this
      wx.downloadFile({
        url: that.userInfo.avatarUrl, // 头像图片路径
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode === 200) {
            var avaterSrc = res.tempFilePath // 下载成功返回结果
            that.getQrCode(avaterSrc) // 继续下载二维码图片
          } else {
            wx.showToast({
              title: '头像下载失败！',
              icon: 'none',
              duration: 2000,
              success: function () {
                var avaterSrc = ''
                that.getQrCode(avaterSrc)
              }
            })
          }
        }
      })
    },
    // 点击保存到相册
    saveShareImg () {
    // var that = this
      wx.showLoading({
        title: '正在保存',
        mask: true
      })
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (res) {
            wx.hideLoading()
            var tempFilePath = res.tempFilePath
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success (res) {
              // utils.aiCardActionRecord(19)
                wx.showModal({
                  content: '图片已保存到相册，赶紧晒一下吧~',
                  showCancel: false,
                  confirmText: '好的',
                  confirmColor: '#333',
                  success: function (res) {
                    if (res.confirm) { }
                  },
                  fail: function (res) { }
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: res.errMsg,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }, 1000)
    },
    onClose () {
      this.show = false
      this.show1 = false
      this.show2 = false
      this.show3 = false
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
    share () { // 推荐好友
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.show2 = true
        this.show3 = true
        wx.hideTabBar({})
        this.getAvaterInfo()
      } else {
        wx.showToast({
          title: '请您先登录！',
          icon: 'none'
        })
      }
    },
    kefu () { // 客服
      // this.show1 = true
      wx.makePhoneCall({
        phoneNumber: '0571-85378987'
      })
    },
    renmai () {
      if (!this.userInfo) {
        wx.switchTab({
          url: '../../connections/index/main'
        })
      } else {
        wx.navigateTo({
          url: '../../connections/exchangeCard/main'
        })
      }
    },
    collection () { // 资料查看Go
      wx.navigateTo({
        url: '../../datacenter/personalData/main?key=1'
      })
    },
    mingpian () { // 人脉名片
      getApp().globalData.homeCurrentTab = 1
      wx.switchTab({
        url: '../../connections/index/main'
      })
    },
    youken () { // 优肯方案
      let userId = wx.getStorageSync('userId')
      if (userId) {
        wx.navigateTo({
          url: '../collection/main?id=' + userId
        })
      } else {
        wx.navigateTo({
          url: '../collection/main'
        })
      }
    },
    onGotUserInfo (e) { // 登录授权
      let that = this
      if (e.mp.detail.userInfo) {
        wx.setStorage({
          key: 'userInfo',
          data: e.mp.detail.userInfo
        })
        that.userInfo = e.mp.detail.userInfo
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
                if (wx.getStorageSync('userId') === '' || wx.getStorageSync('userId') === undefined || wx.getStorageSync('userId') === null) {
                  wx.setStorageSync('userId', res.data.userId)
                }
                that.onLoad()
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
  onShow () { // mountend
    let userId = wx.getStorageSync('userId')
    if (userId) {
      this.$http.get({
        url: 'api/appUser/selectUserByUserId',
        data: {
          id: userId
        }
      }).then(res => {
        this.totalMyCard = res.data.list[0].totalMyCard
        this.totalDataSource = res.data.list[0].totalDataSource
        this.totalChain = res.data.list[0].totalChain
      })
    }
  },
  onLoad () { // created
    var userd = wx.getStorageSync('userId')
    wx.checkSession({
      success: (res) => {
        console.log(res, '存在')
        if (!wx.getStorageSync('userInfo')) {
          this.userInfo = ''
        } else {
          this.userInfo = wx.getStorageSync('userInfo')
        }
      },
      fail: (res) => {
        console.log(res, '不存在')
        wx.removeStorageSync('userInfo')
        if (!wx.getStorageSync('userInfo')) {
          this.userInfo = ''
        } else {
          this.userInfo = wx.getStorageSync('userInfo')
        }
      }
    })
    this.$http.get({
      url: '/api/qrcode/getProgramQrcode',
      userId: userd
    }).then(res => {
      // console.log(res)
      this.qrCodeImg = res.data.url
    })
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
    .photo-wrapper {
      width: 90px;
      height: 90px;
      border: 3px solid #fff;
      border-radius: 50%;
      overflow: hidden;
    }
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
    .my-name {
      color: #fff;
      font-size: 20px;
      margin-left: 12px;
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
  background-color: #fff;
  line-height: 1;
  .share-icon {
    width: 31px;
    height: 31px;
    margin-bottom: 5px;
  }
}
</style>
