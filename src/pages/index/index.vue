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
    <div class="head-wrapper" id="head_wrapper">
      <img src="../assets/img.png" alt="">  
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
    <scroll-view :scroll-y="setFixed" v-if="cont == 1" class="content">
      <ul class="item-wrapper">
        <li>
asds
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
      cont: 0
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

<style lang="scss">
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
    padding-top: 50px;
  }
}

</style>
