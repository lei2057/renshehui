<template>
  <div>
    <div class="connectionsBg">
      <img src="https://hrotp.com/static/system/image/renmaiBg.png" alt="">
    </div>
    <div class="sousuo-wrapper" id="head_wrapper" v-if="!souShow">
      <div class="sousuo disflex">
        <div class="sousuo-icon" @click="cha"><img src="../../../assets/sousuo.png" alt=""></div>
        <input class="flex sousuo-input" v-model="sousuo" type="text" @confirm="saveKeyword" placeholder="搜索姓名或公司名称" placeholder-style="font-size: 12px;text-align: center;">
        <div class="del-icon" v-if="sousuo" @click="del"><img src="../../../assets/del.png" alt=""></div>
      </div>
    </div>
    <div class="scrollTop-wrapper" :class="{'fixed':setFixed}" v-if="souShow">
      <div class="sousuo disflex">
        <div class="sousuo-icon" @click="cha"><img src="../../../assets/sousuo.png" alt=""></div>
        <input class="flex sousuo-input" v-model="sousuo" type="text" @confirm="saveKeyword" placeholder="搜索姓名或公司名称" placeholder-style="font-size: 12px;text-align: center;">
        <div class="del-icon" v-if="sousuo" @click="del"><img src="../../../assets/del.png" alt=""></div>
      </div>
      <div class="scrollTop disflex" @click="scrollTop">
        <div class="top-icon"><img src="../../../assets/scrollTop.png" alt=""></div>
      </div>
    </div>
    <div class="pd10 connections">
      <div class="disflex card-item">
        <div class="item-photo" :class="userInfo.length === 0?'item-photo':'photo-icon'"><img :src="userInfo.avatarUrl||'../../../assets/user.png'" alt=""></div>
        <div class="item-cont flex">
          <div class="cont-name" v-text="userInfo.nickName||'用户姓名'"></div>
          <div class="cont-text" @click="myCard">查看我的名片</div>
        </div>
        <div class="item-qrcode" @click="qrCodeInfo"><img src="../../../assets/qrcode.png" alt=""></div>
        <!-- <div class="item-num" v-else @click="cardInfo">{{cardNum}}</div> -->
        <!-- <div class="item-icon"><img src="../../../assets/right.png" alt=""></div> -->
      </div>
      <div class="wrapper-item pd10 vant-blue">
        <van-tabs :active="active" type="card" @change="onChange">
          <van-tab title="人脉圈"></van-tab>
          <van-tab title="名片夹" :info="cardNum"></van-tab>
        </van-tabs>
      </div>
      <div v-if="cont === 0">
        <scroll-view :scroll-y="setFixed">
          <div class="wrapper-list disflex" v-for="item in dataquan" :key="item.id" @click="myQuan(item.id,item.state)">
            <div class="list-photo"><img :src="item.headPhoto"></div>
            <div class="list-cont flex">
              <div class="list-name">{{item.name}}</div>
              <div class="list-text">{{item.company}}</div>
              <div class="list-text">{{item.userWork}}</div>
            </div>
            <div class="list-icon" v-if="item.state === '1'">
              <div class="jiaohuan-icon"><img src="../../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
            <div class="list-icon" v-else-if="item.state === '2'">
              <div class="jiaohuan-icon"><img src="../../../assets/jiaohuan.png" alt=""></div>
              <div>等待通过</div>
            </div>
            <div class="list-icon" v-else>已交换名片</div>
          </div>
        </scroll-view>
      </div>
      <div v-if="cont === 1">
        <div v-if="datamingpian.length !== 0">
          <div class="wrapper-list disflex" v-for="item in datamingpian" :key="item" @click="myMingpian(item.id)">
            <div class="list-photo"><img :src="item.headPhoto" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">{{item.name}}</div>
              <div class="list-text">{{item.company}}</div>
              <div class="list-text">{{item.userWork}}</div>
            </div>
            <div class="list-icon">
              <div class="phone-icon"><img src="../../../assets/phoneMp.png" alt=""></div>
            </div>
          </div>
        </div>
        <div v-else>
          <null text="你还没有收到名片哦赶紧去人脉圈交换吧" img="https://hrotp.com/static/system/image/null.png"></null>
        </div>
      </div>
    </div>
    <!-- 弹出层  -->
    <div class="vant-css">
      <van-popup :show="show" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-top">
            <div class="popup-out">
              <div class="popup-icon" @click="onClose"><img src="../../../assets/out.png" alt=""></div>
            </div>
            <div class="popup-title">仅需两步获取海量人脉信息</div>
          </div>
          <div class="popup-cont">
            <div class="disflex">
              <div class="popup-dian" v-if="dian1"></div>
              <div class="popup-text">第一步：授权使用微信登录</div>
            </div>
            <button class="popup-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" v-if="empower">点击授权</button>
            <div class="popup-btn bg2" v-if="pass">已通过</div>
            <div class="disflex">
              <div class="popup-dian" v-if="dian2"></div>
              <div class="popup-text">第二步：验证号码完善信息</div>
            </div>
            <div class="popup-btn bg1" v-if="one">请先完成第一步</div>
            <button class="popup-btn" open-type='getPhoneNumber' @getphonenumber="getPhoneNumber" v-if="two">验证并完善</button>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 我的二维码 -->
    <div class="vant-css">
      <van-popup :show="show1" @close="onClose" catchtouchmove="ture">
        <div class="popup">
          <div class="popup-out">
            <div class="popup-icon" @click="onClose"><img src="../../../assets/outMp.png" alt=""></div>
          </div>
          <div class="popup-qrcode">
            <img :src="qrCodeImg" alt="">
          </div>
          <div class="popup-btn">我的二维码</div>
          <div class="popup-zi">扫描好友屏幕上的二维码即可添加名片</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Null from '../../../components/nullCont'
export default {
  components: {
    Null
  },
  data () {
    return {
      cont: 0, // 内容切换
      qrcode: 0, // 二维码切换
      sousuo: '', // 搜索内容
      setFixed: false,
      headHeight: '', // 获取搜索框高度
      souShow: false,
      dataquan: [], // 人脉圈的数据
      datamingpian: [], // 名片夹的数据
      userInfo: [],
      cardNum: 0, // 名片数量
      sessionkey: '',
      show: false,
      dian1: true,
      dian2: false,
      empower: true,
      pass: false,
      one: true,
      two: false,
      show1: false,
      qrCodeImg: '',
      active: 0,
      msg: '', // 用户是否存在
      userInfoShow: false
    }
  },
  onPageScroll (e) { // 根据滚动的距离执行状态
    var height = Math.floor(this.headHeight) // 高度向下取整
    if (e.scrollTop >= height) {
      this.setFixed = true
      this.souShow = true
    } else {
      this.setFixed = false
      this.souShow = false
    }
  },
  onLoad () {
    let userId = wx.getStorageSync('userId')
    this.userInfo = wx.getStorageSync('userInfo')
    this.$http.get({// 二维码
      url: '/api/qrcode/getUserQrcode',
      data: {
        url: 'pages/connections/addCard/main',
        userId: userId
      }
    }).then(res => {
      this.qrCodeImg = res.data.url
    })
  },
  onShow () {
    let key = getApp().globalData.homeCurrentTab
    if (key) {
      this.active = key
      this.cont = key
    }
    let userId = wx.getStorageSync('userId')
    this.userInfo = wx.getStorageSync('userInfo')
    let phone = wx.getStorageSync('phone')
    this.$nextTick(() => { // 稍微延迟一下，获取头部部分高度
      this.getOffsetHeight()
    })
    wx.checkSession({
      success: (res) => {
        if (!phone) {
          this.show = true
          this.pass = true
          this.empower = false
          this.one = false
          this.two = true
          this.dian1 = false
          this.dian2 = true
        }
      },
      fail: () => {
        this.show = true
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('userId')
      }
    })
    this.cont = 0// 默认查看人脉圈信息，避免页面缓存数据
    // 请求人脉圈的数据
    this.$http.get({
      url: 'api/appUser/selectAllUsers',
      data: {
        data: userId
      }
    }).then(res => {
      console.log(res, '1')
      this.dataquan = res.data.list
    })
    // 请求名片夹的数据
    this.$http.get({
      url: 'api/appUser/selectMyCard',
      data: {
        userId: userId
      }
    }).then(res => {
      console.log(res)
      if (res.code === '0000011') {

      } else {
        this.datamingpian = res.data.list
        this.cardNum = res.data.total
      }
    })
  },
  methods: {
    onClose () {
      this.show = false
      this.show1 = false
    },
    getOffsetHeight () { // 获取指定DOM高度
      this.query = wx.createSelectorQuery()
      this.query
        .select('#head_wrapper')
        .boundingClientRect(res => {
          if (res) {
            this.headHeight = res.height
          } else {
            this.headHeight = 0
          }
        })
        .exec()
    },
    scrollTop () { // 回到顶部
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    onChange (event) {
      this.cont = event.mp.detail.index
      this.qrcode = event.mp.detail.index
    },
    qrCodeInfo () {
      this.show1 = true
    },
    cardInfo () { // 信息小红点跳转
      if (!this.userInfo) {
        this.show = true
      } else {
        wx.navigateTo({
          url: '../exchangeCard/main'
        })
      }
    },
    del () { // 搜索框删除内容
      this.sousuo = ''
    },
    cha () { // 搜索模糊查询
      let userId = wx.getStorageSync('userId')
      if (this.cont === 0) {
        this.$http.get({
          url: 'api/appUser/selectAllUsers',
          data: {
            data: userId,
            name: this.sousuo
          }
        }).then(res => {
          this.dataquan = res.data.list
        })
      } else {
        this.$http.get({
          url: 'api/appUser/selectMyCard',
          data: {
            userId: userId,
            query: this.sousuo
          }
        }).then(res => {
          this.datamingpian = res.data.list
        })
      }
    },
    saveKeyword () {
      this.cha()
    },
    myCard () {
      if (!this.userInfo) {
        this.show = true
      } else {
        wx.navigateTo({
          url: '../myCard/main?num=' + this.cardNum
        })
      }
    },
    myQuan (id, state) { // 1:表示不是好友状态
      if (!this.userInfo) {
        wx.navigateTo({
          url: '../friendCard/main?id=' + id + '&key=' + state + '&num=0'
        })
      }
      wx.navigateTo({
        url: '../friendCard/main?id=' + id + '&key=' + state + '&num=' + this.cardNum
      })
    },
    myMingpian (id) {
      wx.navigateTo({
        url: '../friendCard/main?id=' + id
      })
    },
    onGotUserInfo (e) { // 登录授权
      let that = this
      if (e.mp.detail.userInfo) {
        that.pass = true
        that.empower = false
        that.one = false
        that.two = true
        that.dian1 = false
        that.dian2 = true
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
                wx.setStorageSync('userId', res.data.userId)
                wx.setStorageSync('sessionkey', res.data.sessionkey)
                that.msg = res.msg
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          },
          fail: (res) => {
            console.log(`res 异常`)
          }
        })
      } else {
        console.log('拒绝授权')
      }
    },
    getPhoneNumber (e) {
      let that = this
      let sessionkey = wx.getStorageSync('sessionkey')
      let encryptedData = e.mp.detail.encryptedData
      let iv = e.mp.detail.iv
      if (encryptedData) {
        that.$http.get({
          url: 'api/appUserLoginApi/getPhone',
          data: {
            sessionkey: sessionkey,
            encryptedData: encryptedData,
            iv: iv
          }
        }).then(res => {
          wx.setStorageSync('phone', res.purePhoneNumber)
          if (that.msg === '该用户已经存在' || sessionkey) {
            this.userInfo = wx.getStorageSync('userInfo')
          } else {
            wx.navigateTo({
              url: '../newCard/main'
            })
          }
          that.show = false
        })
      } else {
        console.log('拒绝授权')
      }
    }
  },
  watch: {
    userInfoShow (res) {
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.connectionsBg {
  height: 170px;
}
.scrollTop-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  &.fixed {
    background: #3AAFFC;   //吸顶的时候改为fixed布局
    z-index: 9;
  }
  .sousuo {
    width: 78%;
    float: left;
  }
  .scrollTop {
    width: 60px;
    height: 34px;
    border-radius: 17px;
    background: #fff;
    float: right;
    margin: 7px 5px 0 5px;
    .top-icon {
      width: 13px;
      height: 16px;
    }
  }
}
.sousuo-wrapper {
  width: 100%;
  height: 85px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.sousuo {
  height: 34px;
  border-radius: 17px;
  background: #fff;
  z-index: 9;
  margin: 7px 5px 0 5px;
  position: relative;
  .sousuo-icon {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 8px;
  }
  .sousuo-input {
    margin: 0 40px;
  }
  .del-icon {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 5px;
  }
}
.connections {
  position: relative;
  top: -120px;
  left: 0;
  .card-item {
    margin-bottom: 5px;
    .item-photo {
      width: 90px;
      height: 90px;
      margin-left: 10px;
    }
    .photo-icon {
      width: 90px;
      height: 90px;
      border: 3px solid #fff;
      border-radius: 50%;
      overflow: hidden;
    }
    .item-cont {
      color: #fff;
      margin-left: 12px;
      .cont-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
      }
    }
    .item-qrcode {
      width: 24px;
      height: 24px;
      margin-right: 2px;
    }
    .item-icon {
      width: 17px;
      height: 17px;
    }
    .item-num {
      width: 22px;
      height: 22px;
      line-height: 22px;
      background: rgba(255,78,0,1);
      color: rgba(255,255,255,1);
      font-weight: 400;
      font-size: 12px;
      border-radius: 50%;
      text-align: center;
      margin-right: 10px;
    }
  }
  .wrapper-list {
    padding: 0 5px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 5px;
    .list-photo {
      width: 56px;
      height: 56px;
    }
    .list-cont {
      margin-left: 10px;
      .list-name {
        font-size: 16px;
        font-weight: 600;
        margin: 5px 0;
      }
      .list-text {
        font-size: 12px;
        color: #6A6A6A;
        margin-bottom: 5px;
      }
    }
    .list-icon {
      margin-right: 15px;
      .jiaohuan-icon {
        width: 31px;
        height: 17px;
        margin: 0 auto 4px;
      }
      .phone-icon {
        width: 21px;
        height: 21px;
      }
    }
  }
}
.popup {
  width: 275px;
  .popup-top {
    height: 65px;
    background-image: url('https://hrotp.com/static/system/image/empowerBg.png'); 
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
      font-size: 16px;
      text-align: center;
      color: #fff;
      text-shadow:1px 2px 5px rgba(166,27,27,0.15);
    }
  }
  .popup-qrcode {
    width: 155px;
    height: 155px;
    margin: 20px auto 30px;
  }
  .popup-qrcode img{
    width: 155px;
    height: 155px;
  }
  .popup-btn {
    width: 174px;
    height: 39px;
    line-height: 39px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    margin: auto;
    text-align: center;
    border-radius: 20px;
  }
  .popup-zi {
    font-size: 12px;
    color: #727272;
    text-align: center;
    margin: 20px 0 22px 0;
  }
  .popup-cont {
    margin-top: 15px;
    .popup-dian {
      width: 7px;
      height: 7px;
      background: #3AAFFC;
      border-radius: 50%;
    }
    .popup-text {
      margin-left: 10px;
      font-size: 15px;
    }
    .popup-btn {
      margin: 13px auto;
      width: 160px;
      height: 39px;
      line-height: 39px;
      background:linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
      color: #fff;
      box-shadow:1px 2px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius:20px;
      text-align: center;
      font-size: 14px;
    }
    .bg1 {
      background: #A9A9A9;
    }
    .bg2 {
      background: #86E06A;
    }
  }
}
</style>
