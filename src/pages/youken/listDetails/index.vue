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
        <div class="service-cont">{{item.details}}</div>
      </div>
    </div>
    <div style="height: 30px;"><img :src="qrCode" alt=""></div>
    <div class="service-wrapper">
      <button class="disflex service-btn" @click="share" open-type="share">
        <div class="service-icon"><img src="../../../assets/top.png" alt=""></div>
        分享好友
      </button>
      <!-- <div class="disflex service-btn" @click="phoneCall">
        <div class="service-icon"><img src="../../../assets/phone.png" alt=""></div>
        马上咨询
      </div> -->
      <div class="disflex service-btn" @click="aaa">
        <div class="service-icon"><img src="../../../assets/phone.png" alt=""></div>
        马上咨询
      </div>
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
      qrCode: ''
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
      this.serviceList = JSON.parse(res.data.list.keyNotes.replace(/\n/g, '\\n').replace(/\r/g, '\\r'))
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
    },
    phoneCall () { // 客服拨打电话
      wx.makePhoneCall({
        phoneNumber: '0571-85378987'
      })
    },
    share () { // 分享好友
      this.onShareAppMessage()
    },
    aaa () {
      this.$http.get({
        url: 'api/qrcode/getAccessToken'
      }).then(res => {
        console.log(res)
        this.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + res.data.accessToken,
          data: { path: 'pages/youken/listDetails/main' },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            console.log(res)
          },
          fail: function () {
            console.log('index.js wx.request CheckCallUser fail')
          }
        })
      })
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: '/pages/youken/listDetails/main?id=' + this.categoryId,
      imageUrl: 'https://wmqhouse.top/static/system/image/null.png',
      success: function (res) {
        console.log('成功', res)
      }
    }
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
      margin-top: 28px;
      .item-cont {
        margin-left: 27px;
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

</style>
