<template>
  <div>
    <div class="vant-exchange">
      <van-tabs type="card" @change="onChange">
        <van-tab title="收到的申请"></van-tab>
        <van-tab title="发出的申请"></van-tab>
      </van-tabs>
    </div>
    <div class="vant-cell">
      <div class="cell-item border_cell">
        <van-swipe-cell id="swipe-cell" :right-width="80" :left-width="1" async-close @close="more">
          <div class="cell-cont disflex">
            <div class="cell-photo"><img src="../../../assets/user.png" alt=""></div>
            <div class="cell-info flex">
              <div class="cell-name">用户名字</div>
              <div class="cell-text">用户公司</div>
              <div class="cell-text">用户职位</div>
            </div>
            <div class="cell-state">
              <div class="cell-icon"><img src="../../../assets/duihao.png" alt=""></div>
              <div>同意交换</div>
            </div>
            <div class="cell-state">
              <div class="cell-icon"><img src="../../../assets/yuanjiaohuan.png" alt=""></div>
              <div>已交换</div>
            </div>
            <div class="cell-state" v-if="show1">
              <div class="cell-icon"><img src="../../../assets/tixing.png" alt=""></div>
              <div>提醒对方</div>
            </div>
          </div>
          <span slot="right">
            <div class="cell-right"><img src="../../../assets/more.png" alt=""></div>
            <div>更多操作</div>
          </span>
        </van-swipe-cell>
      </div>
      <van-popup
        :show="show"
        position="bottom"
        @close="onClose"
      >
        <div class="more-list">
          <div class="more-item border_cell" @click="share">分享名片</div>
          <div class="more-item" @click="del">删除记录</div>
        </div>
        <div class="more-off" @click="onClose">取消</div>
      </van-popup>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '../../../../static/vant/dialog/dialog'
export default {
  data () {
    return {
      show: false, // 弹框
      type: '',
      show1: true
    }
  },
  methods: {
    onChange (event) {
      console.log(event.mp.detail)
    },
    more (event) {
      this.show = true
      console.log('more')
      console.log(event.mp.detail)
      this.type = event.mp.detail.position
    },
    onClose (event) {
      this.show = false
    },
    del () {
      this.show = false
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        console.log('ss')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-item {
  padding: 10px 0 13px 0;
  .cell-cont {
    margin: 0 13px 0 14px;
    .cell-photo {
      width: 70px;
      height: 70px;
    }
    .cell-info {
      margin-left: 10px;
      .cell-name {
        font-size: 16px;
        font-weight: 600;
      }
      .cell-text {
        font-size: 12px;
        color: #6A6A6A;
        margin-top: 5px;
      }
    }
    .cell-state {
      font-size: 12px;
      .cell-icon {
        width: 29px;
        height: 29px;
        margin: 0 auto 5px;
      }
    }
  }
}
.cell-right {
  width: 29px;
  height: 29px;
  margin: 0 auto 5px;
}
.share-title {
  text-align: center;
  margin: 10px 0;
}
.more-list {
  background: #fff;
  padding: 3px 0;
  .more-item {
    text-align: center;
    padding: 15px 0;
  }
}
.more-off {
  background: #fff;
  text-align: center;
  padding: 15px 0 25px 0;
  margin-top: 10px;
}
</style>
