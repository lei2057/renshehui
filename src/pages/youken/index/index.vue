<template>
  <div class="vant-css">
    <!-- 弹出层  -->
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
          <div class="popup-btn disflex"><div class="btn-icon"><img src="../../../assets/weixin.png"></div>微信登陆</div>
        </div>
      </div>
    </van-popup>
    <!-- 轮播图 -->
    <div class="head-wrapper" id="head_wrapper">
      <swiper :indicator-dots="indicatorDots" circular="true" style="height:100%" previous-margin="20px" next-margin="20px">
        <block v-for="item in imgUrls" :key="item">
          <swiper-item>
            <img :src="item.headPhoto" class="slide-image" width="100%" height="100%" @click="activity(item.id)"/>
          </swiper-item>
        </block>
      </swiper>
    </div> 
    <!-- 导航 -->
    <div class="menu-wrapper">
      <div class="menu" :class="{'fixed':setFixed}">
        <van-tabs @change="onChange" >
          <!-- <van-tab title="最新发布"></van-tab> -->
          <van-tab v-for="item in navList" :key="item" :title="item.name"></van-tab>
          <!-- <van-tab title="敬请期待" disabled></van-tab> -->
        </van-tabs>
      </div>
    </div>
    <!-- 内容区  -->
    <!-- <scroll-view :scroll-y="setFixed" v-if="contIndex === 0" class="content">
      <ul class="item-wrapper">
        <li class="list-wrapper" v-for="item in newListUp" :key="item" @click="next(item.id)">
          <div class="list-cont disflex">
            <img class="list-left" :src="item.serviceCompanyImg">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">{{item.category}}</div></div>
              <div class="right-cont">{{item.title}}</div>
              <span class="right-time">{{item.publishTime}}</span>
            </div>
            <div class="tag">置顶</div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img :src="item.mainImg"></div>
            <div class="flex">{{item.serviceCompany}}</div>
          </div>
        </li>
        <li class="list-wrapper" v-for="item in newList" :key="item" @click="next(item.id)">
          <div class="list-cont disflex">
            <img class="list-left" :src="item.serviceCompanyImg">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">{{item.category}}</div></div>
              <div class="right-cont">{{item.title}}</div>
              <span class="right-time">{{item.publishTime}}</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img :src="item.mainImg"></div>
            <div class="flex">{{item.serviceCompany}}</div>
          </div>
        </li>
      </ul>
    </scroll-view> -->
    <scroll-view :scroll-y="setFixed" class="content">
      <ul class="item-wrapper">
        <li class="list-wrapper" v-for="item in contList" :key="item" @click="next(item.id)">
          <div class="list-cont disflex">
            <img class="list-left" :src="item.mainImg">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">{{item.category}}</div></div>
              <div class="right-cont">{{item.title}}</div>
              <span class="right-time">{{item.publishTime}}</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img :src="item.serviceCompanyImg"></div>
            <div class="flex">{{item.serviceCompany}}</div>
          </div>
        </li>
      </ul>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      setFixed: false, // menu吸顶
      scrollY: false,
      headHeight: '', // 距离顶部的高度
      indicatorDots: true, // 是否显示面板指示点
      contIndex: 0, // 最新活动内容区展示
      navList: [], // 导航栏
      imgUrls: [], // 轮播图
      newList: [], // 最新活动内容
      newListUp: [], // 最新活动内容置顶
      contList: [], // 其他导航栏内容
      show: false// 授权弹框
    }
  },
  onLoad () {
    // this.userInfo = wx.getStorageSync('userInfo')
    // wx.checkSession({
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: () => {
    //     this.show = true
    //     wx.removeStorageSync('userInfo')
    //     wx.removeStorageSync('userId')
    //   }
    // })
    this.$http.get({
      url: 'api/SupplyChain/selectAllChainType'
    }).then(res => {
      this.navList = res.data.list
      this.$http.get({
        url: 'api/SupplyChain/queryChildTypesById',
        data: {
          parentId: this.navList[this.contIndex].id
        }
      }).then(res => {
        this.contList = res.data.list
      })
    })
  },
  onShow () {
    this.$nextTick(() => { // 稍微延迟一下，获取头部部分高度
      this.getOffsetHeight()
    })
    this.$http.get({
      url: 'api/activity/selectAllActivity'
    }).then(res => {
      this.imgUrls = res.data.slice(0, 5)
    })
  },
  onPageScroll (e) {
    var height = Math.floor(this.headHeight) // 高度向下取整
    if (e.scrollTop >= height) {
      if (this.setFixed) { // 当滚动到menu的时候，添加吸顶样式
        return // 已经为true时直接return
      }
      this.setFixed = true
    } else {
      this.setFixed = false
    }
  },
  onReachBottom: function () {
    console.log('页面上拉触底事件的处理函数')
    // wx.setBackgroundColor({
    //   backgroundColorBottom: '#00FA9A' // 底部窗口的背景色为绿
    // })
  },
  methods: {
    onClose () {
      this.show = false
    },
    getOffsetHeight () {
      this.query = wx.createSelectorQuery()
      this.query
        .select('#head_wrapper')
        .boundingClientRect(res => {
          this.headHeight = res.height
        })
        .exec()
    },
    onChange (event) {
      // let index = event.mp.detail.index
      // if (index === 0) {
      //   wx.showLoading({
      //     title: '加载中'
      //   })
      //   this.$http.get({
      //     url: 'api/SupplyChain/selectAllSupplyChain'
      //   }).then(res => {
      //     this.contIndex = event.mp.detail.index
      //     this.newListUp = []
      //     this.newList = []
      //     res.data.list.forEach(el => {
      //       if (el.isUp === '0') {
      //         this.newListUp.push(el)
      //       } else {
      //         this.newList.push(el)
      //       }
      //     })
      //     wx.hideLoading()
      //   })
      // } else {
      let id = this.navList[event.mp.detail.index].id
      wx.showLoading({
        title: '加载中'
      })
      this.$http.get({
        url: 'api/SupplyChain/queryChildTypesById',
        data: {
          parentId: id
        }
      }).then(res => {
        this.contIndex = event.mp.detail.index
        this.contList = res.data.list
        wx.hideLoading()
      })
      // }
    },
    activity (id) { // 活动页面详情跳转
      console.log(id)
      wx.navigateTo({
        url: '../activity/main?id=' + id
      })
    },
    next (id) { // 列表页面详情跳转
      console.log(id)
      wx.navigateTo({
        url: '../listDetails/main?id=' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head-wrapper {
  width: 100%;
  height: 180px;
}
.menu-wrapper {
  position: relative;
  z-index: 3;
  .menu {
    position: absolute; //未吸顶之前是绝对定位
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    &.fixed {
      position: fixed;   //吸顶的时候改为fixed布局
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  .item-wrapper {
    min-height: 100px; 
    padding: 50px 10px;
    .list-wrapper {
      background: #fff;
      border-radius: 8px;
      margin-bottom: 5px; 
      overflow: hidden;
      .list-bg {
        width: 100%;
        height: 110px;
      }
      .list-cont {
        position: relative;
        overflow: hidden;
        background-image: url('https://wmqhouse.top/static/system/image/listBg.png');
        background-size: 100% 100%;
        .list-left {
          width: 175px;
          height: 110px;
        }
        .list-right {
          margin-left: 10px;
          .right-title {
            font-size: 10px;
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            margin-bottom: 3px;
            .title-text {
              background: #3AAFFC;
              color: #fff;
              // width: 62px;
              padding: 2px 0 2px 8px;
              border-bottom-left-radius: 8px;
              border-top-left-radius: 8px;
            }
          }
          .right-cont {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-right: 10px;
          }
          .right-time {
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
            margin-top: 20px;
            margin-right: 13px;
          }
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
          top: -33px;
          left: -33px;
          font-size: 12px;
          padding: 3px;
        }
      }
      .list-bottom-icon {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 10px;
      }
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
