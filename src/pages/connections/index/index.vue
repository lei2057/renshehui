<template>
  <div>
    <div class="connectionsBg">
      <img src="../../assets/renmaiBg.png" alt="">
    </div>
    <div class="sousuo-wrapper" id="head_wrapper" v-if="!souShow">
      <div class="sousuo disflex" >
        <div class="sousuo-icon"><img src="../../assets/sousuo.png" alt=""></div>
        <input class="flex sousuo-input" v-model="sousuo" type="text" placeholder="搜索姓名或公司名称" placeholder-style="font-size: 12px;text-align: center;">
        <div class="del-icon" v-if="sousuo" @click="del"><img src="../../assets/del.png" alt=""></div>
      </div>
    </div>
    <div class="scrollTop-wrapper" :class="{'fixed':setFixed}" v-if="souShow">
      <div class="sousuo disflex">
        <div class="sousuo-icon"><img src="../../assets/sousuo.png" alt=""></div>
        <input class="flex sousuo-input" v-model="sousuo" type="text" placeholder="搜索姓名或公司名称" placeholder-style="font-size: 12px;text-align: center;">
        <div class="del-icon" v-if="sousuo" @click="del"><img src="../../assets/del.png" alt=""></div>
      </div>
      <div class="scrollTop disflex" @click="scrollTop">
        <div class="top-icon"><img src="../../assets/scrollTop.png" alt=""></div>
      </div>
    </div>
    <div class="pd10 connections">
      <div class="disflex card-item">
        <div class="item-photo"><img src="../../assets/user.png" alt=""></div>
        <div class="item-cont flex">
          <div class="cont-name">用户姓名</div>
          <div class="cont-text">查看我的名片</div>
        </div>
        <div class="item-qrcode" v-if="!qrcode"><img src="../../assets/qrcode.png" alt=""></div>
        <div class="item-num" v-else>99</div>
        <div class="item-icon"><img src="../../assets/right.png" alt=""></div>
      </div>
      <div class="wrapper-item pd10 vant-blue">
        <van-tabs type="card" @change="onChange">
          <van-tab title="人脉圈"></van-tab>
          <van-tab title="名片夹"></van-tab>
        </van-tabs>
      </div>
      <div v-if="cont === 0">
        <scroll-view :scroll-y="setFixed">
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
          <div class="wrapper-list disflex">
            <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
            <div class="list-cont flex">
              <div class="list-name">用户姓名</div>
              <div class="list-text">用户公司</div>
              <div class="list-text">用户职位</div>
            </div>
            <div class="list-icon">
              <div class="jiaohuan-icon"><img src="../../assets/jiaohuan.png" alt=""></div>
              <div>互换名片</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div v-if="cont === 1">
        <div class="wrapper-list disflex" @click="myCard">
          <div class="list-photo"><img src="../../assets/user.png" alt=""></div>
          <div class="list-cont flex">
            <div class="list-name">用户姓名</div>
            <div class="list-text">用户公司</div>
            <div class="list-text">用户职位</div>
          </div>
          <div class="list-icon">
            <div class="phone-icon"><img src="../../assets/phoneMp.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <popup text="仅需两步获取海量人脉信息"></popup> -->
  </div>
</template>

<script>
import Popup from '../../../components/popup'
export default {
  data () {
    return {
      cont: 0, // 内容切换
      qrcode: false, // 二维码切换
      sousuo: '', // 搜索内容
      setFixed: false,
      headHeight: '', // 获取搜索框高度
      souShow: false
    }
  },
  onShow () {
    this.$nextTick(() => { // 稍微延迟一下，获取头部部分高度
      this.getOffsetHeight()
    })
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
  methods: {
    getOffsetHeight () { // 获取指定DOM高度
      this.query = wx.createSelectorQuery()
      this.query
        .select('#head_wrapper')
        .boundingClientRect(res => {
          this.headHeight = res.height
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
    del () { // 搜索框删除内容
      this.sousuo = ''
    },
    myCard () {
      wx.navigateTo({
        url: '../myCard/main'
      })
    }
  },
  components: {
    Popup
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
      width: 91px;
      height: 91px;
      margin-left: 10px;
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
</style>
