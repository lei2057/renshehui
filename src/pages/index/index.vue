<template>
  <div class="vant-css">
    <!-- 弹出层  -->
    <van-popup :show="show" @close="onClose" catchtouchmove="ture">
      <div class="popup">
        <div class="popup-top" style="background-image: url('../assets/empowerBg.png'); background-size: 100% 100%;">
          <div class="popup-out">
            <div class="popup-icon" @click="onClose"><img src="../assets/out.png" alt=""></div>
          </div>
          <div class="popup-title">温馨提示</div>
        </div>
        <div class="popup-cont">
          <div class="popup-text">为了带来更好的用户体验我们建议你使用微信登录</div>
          <div class="popup-empower disflex">
            <div class="empower-icon"><img src="../assets/user.png" alt=""></div>
            <div class="empower-center-icon"><img src="../assets/jiaohuan.png" alt=""></div>
            <div class="empower-icon"><img src="../assets/youken.png" alt=""></div>
          </div>
          <div class="popup-btn disflex"><div class="btn-icon"><img src="../assets/weixin.png" alt=""></div>微信登陆</div>
        </div>
      </div>
    </van-popup>
    <!-- 轮播图 -->
    <div class="head-wrapper" id="head_wrapper">
      <swiper :indicator-dots="indicatorDots" circular="true" style="height:100%" previous-margin="20px" next-margin="20px">
        <block v-for="item in imgUrls" :key="item">
          <swiper-item>
            <img :src="item" class="slide-image" width="100%" height="100%"/>
          </swiper-item>
        </block>
      </swiper>
    </div> 
    <!-- 导航 -->
    <div class="menu-wrapper">
      <div class="menu" :class="{'fixed':setFixed}">
        <van-tabs @change="onChange">
          <van-tab title="最新发布"></van-tab>
          <van-tab title="企业招聘"></van-tab>
          <van-tab title="企业培训"></van-tab>
          <van-tab title="代办业务"></van-tab>
          <van-tab title="敬请期待" disabled></van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 内容区  -->
    <scroll-view :scroll-y="setFixed" v-if="cont == 0" class="content">
      <ul class="item-wrapper">
        <li class="list-wrapper" v-for="(item,index) in count" :key="index" @click="next(index)" style="background-image: url('../assets/listBg.png'); background-size: 100% 100%;">
          <div class="list-cont disflex">
            <img class="list-left" src="../assets/listTou.png" alt="">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">{{item.title}}</div></div>
              <div class="right-cont">{{item.cont}}</div>
              <span class="right-time">{{item.time}}</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img src="../assets/youkenf.png" alt=""></div>
            <div class="flex">优科达商业管理有限责任公司</div>
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
      // active: 0,
      cont: 0,
      indicatorDots: true,
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      count: [
        {
          title: '申领类代办',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        },
        {
          title: '申领类代办2',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        },
        {
          title: '申领类代办3',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        },
        {
          title: '申领类代办4',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        }
      ],
      show: true// 授权弹框
    }
  },
  onShow () {
    this.$nextTick(() => { // 稍微延迟一下，获取头部部分高度
      this.getOffsetHeight()
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
    wx.setBackgroundColor({
      backgroundColorBottom: '#00FA9A' // 底部窗口的背景色为绿
    })
  },
  methods: {
    onClose () {
      this.show = false
    },
    getOffsetHeight () {
      // let self = this
      this.query = wx.createSelectorQuery()
      this.query
        .select('#head_wrapper')
        .boundingClientRect(res => {
          this.headHeight = res.height
        })
        .exec()
    },
    onChange (event) {
      wx.showToast({
        title: `切换到标签 ${event.mp.detail.index + 1}`,
        icon: 'none'
      })
      this.cont = event.mp.detail.index
    },
    next (index) {
      console.log(index)
      wx.navigateTo({
        url: '../listDetails/main'
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
      .list-bg {
        width: 100%;
        height: 110px;
      }
      .list-cont {
        
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
              width: 62px;
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
          }
          .right-time {
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
            margin-top: 20px;
            margin-right: 13px;
          }
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
  height: 275px;
  border-radius: 8px;
  .popup-top {
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
    // width: 100%;

    .popup-text {
      width: 155px;
      text-align: center;
      margin: 25px auto 0;
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
      margin: 13px auto 0;
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
