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
        <img src="https://wmqhouse.top/static/system/image/img02.png" alt="">
        <div class="enroll-introduce disflex">
          此活动已有 <div class="enroll-people" v-if="content.personNum<9999">{{content.personNum}}</div><div class="enroll-people" v-else>9999+</div> 人参与，赶紧报名吧！
        </div>
      </div>
      <div class="wrapper activity-table">
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
        <view class='poste_box' id='canvas-container'>
          <canvas canvas-id="myCanvas" style="width:100%;height:700rpx;" />
        </view>
        <div class="disflex share-bottom">
          <!-- <div class="flex share-btn">
            <div class="share-icon">
              <img src="../../../assets/pyq.png" alt="">
            </div>保存海报</div> -->
            <button @click="saveShareImg" class="flex share-btn">
              <view  class="share-icon">
                <cover-image  mode="widthFix" src="../../../assets/pyq.png"></cover-image>
              </view>
              <view>保存海报</view>
            </button>
          <!-- <div class="flex share-btn">
            <div class="share-icon">
              <img src="../../../assets/haoyou.png" alt="">
            </div>分享好友</div> -->
            <button openType="share" class="flex share-btn">
              <view  class="share-icon">
                <cover-image  mode="widthFix" src="../../../assets/pyq.png"></cover-image>
              </view>
              <view>分享好友</view>
            </button>
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
      activityId: '', // 活动ID
      cardInfo: {
        name: '微信名字',
        msg1: '向你推荐了人社会',
        msg2: '长按识别图中小程序码',
        msg3: '进入“人社汇”查看活动'
      },
      qrCodeImg: ''
    }
  },
  onShareAppMessage (res) {

  },
  onLoad (option) {
    this.activityId = option.id
    this.$http.get({
      url: 'api/activity/selectAllActivity'
    }).then(res => {
      res.data.forEach(el => {
        if (option.id === el.id) {
          this.content = el
          console.log(el, 11)
          this.imgBg = el.detailPhoto.split(',')[0]
          this.enroll = JSON.parse(el.registrationConditions)
        }
      })
    })
    this.$http.get({
      url: '/api/qrcode/getProgramQrcode'
    }).then(res => {
      console.log(res)
      this.qrCodeImg = res.data.url
    })
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
        url: that.imgBg, // 二维码路径
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
      // var width = ''
      wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
        // var height = rect.height * 0.15
        // var right = rect.right
        // width = rect.width * 0.15
        // var left = rect.left + rect.width * 0.05
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, rect.width, rect.height)

        // 头像为正方形
        if (avaterSrc) {
          ctx.drawImage(avaterSrc, 20, 250, 50, 50)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        // 推荐语
        if (that.content.title) {
          ctx.fillText(that.content.title, 50, 220)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        if (that.cardInfo.msg2) {
          ctx.fillText(that.cardInfo.msg2, 90, 270)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }
        if (that.cardInfo.msg3) {
          ctx.fillText(that.cardInfo.msg3, 90, 290)
          ctx.setFontSize(16)
          ctx.setFillStyle('#000')
          ctx.setTextAlign('left')
        }

        //  绘制二维码
        if (codeSrc) {
          ctx.drawImage(codeSrc, 0, 0, 375, 200)
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
        url: that.qrCodeImg, // 头像图片路径
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

    /**
   * 多行文字处理，每行显示数量
   * @param text 为传入的文本
   * @param num  为单行显示的字节长度
   */
    textByteLength (text, num) {
      let strLength = 0 // text byte length
      let rows = 1
      let str = 0
      let arr = []
      for (let j = 0; j < text.length; j++) {
        if (text.charCodeAt(j) > 255) {
          strLength += 2
          if (strLength > rows * num) {
            strLength++
            arr.push(text.slice(str, j))
            str = j
            rows++
          }
        } else {
          strLength++
          if (strLength > rows * num) {
            arr.push(text.slice(str, j))
            str = j
            rows++
          }
        }
      }
      arr.push(text.slice(str, text.length))
      return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
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

    message () {
      // this.show = true
      wx.makePhoneCall({
        phoneNumber: '0571-85378987'
      })
    },
    share () {
      this.show1 = true
      this.getAvaterInfo()
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
  background-image: url('https://wmqhouse.top/static/system/image/activityBg.png');
  background-size: 100% 100%;
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
