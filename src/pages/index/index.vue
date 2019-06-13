<template>
  <div class="vant-css">
    <!-- 弹出层  -->
    <!-- <van-button
      plain
      type="primary"
      class="demo-margin-right"
      @click="onClickAlert"
    >
      消息提示
    </van-button>
    <van-dialog id="van-dialog" /> -->
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
    <!-- 内容区开始  -->
    <scroll-view :scroll-y="setFixed" v-if="cont == 0" class="content">
      <ul class="item-wrapper">
        <li class="list-wrapper">
          <img class="list-bg" src="../assets/listBg.png" alt="">
          <div class="list-cont disflex">
            <img class="list-left" src="../assets/listTou.png" alt="">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">申领类代办</div></div>
              <div class="right-cont">税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示</div>
              <span class="right-time">2019.04.29</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img src="../assets/listTou.png" alt=""></div>
            <div class="flex">
              优科达商业管理有限责任公司
            </div>
          </div>
        </li>
        <li class="list-wrapper">
          <img class="list-bg" src="../assets/listBg.png" alt="">
          <div class="list-cont disflex">
            <img class="list-left" src="../assets/listTou.png" alt="">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">申领类代办</div></div>
              <div class="right-cont">税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示</div>
              <span class="right-time">2019.04.29</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img src="../assets/listTou.png" alt=""></div>
            <div class="flex">
              优科达商业管理有限责任公司
            </div>
          </div>
        </li> 
        <li class="list-wrapper">
          <img class="list-bg" src="../assets/listBg.png" alt="">
          <div class="list-cont disflex">
            <img class="list-left" src="../assets/listTou.png" alt="">
            <div class="flex list-right">
              <div class="right-title"><div class="title-text">申领类代办</div></div>
              <div class="right-cont">税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示</div>
              <span class="right-time">2019.04.29</span>
            </div>
          </div>
          <div class="disflex pd10">
            <div class="list-bottom-icon"><img src="../assets/listTou.png" alt=""></div>
            <div class="flex">
              优科达商业管理有限责任公司
            </div>
          </div>
        </li> 
      </ul>
    </scroll-view>
  </div>
</template>

<script>
import Dialog from '@/../static/vant/dialog/dialog'
export default {
  data () {
    return {
      setFixed: false, // menu吸顶
      scrollY: false,
      headHeight: '', // 距离顶部的高度
      // active: 0,
      cont: 0,
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: true
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
  methods: {
    onClickAlert () {
      Dialog.alert({
        title: '标题',
        message: '有赞是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者'
      })
    },
    getOffsetHeight () {
      let self = this
      this.query = wx.createSelectorQuery()
      this.query
        .select('#head_wrapper')
        .boundingClientRect(res => {
          self.headHeight = res.height
        })
        .exec()
    },
    onChange (event) {
      wx.showToast({
        title: `切换到标签 ${event.mp.detail.index + 1}`,
        icon: 'none'
      })
      this.cont = event.mp.detail.index
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
      position: relative;
      .list-bg {
        width: 100%;
        height: 110px;
      }
      .list-cont {
        position: absolute;
        top: 0;
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

</style>
