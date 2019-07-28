<template>
  <div>
    <div class="vant-exchange">
      <van-tabs type="card" @change="onChange">
        <van-tab title="收到的申请"></van-tab>
        <van-tab title="发出的申请"></van-tab>
      </van-tabs>
    </div>
    <div v-if="dataarr">
      <div class="vant-cell">
        <div class="cell-item border_cell" v-for="item in dataarr" :key="item.id">
          <van-swipe-cell id="swipe-cell" :right-width="80" :left-width="1" async-close @close="more">
            <div class="cell-cont disflex">
              <div class="cell-photo"><img :src="item.headPhoto" alt=""></div>
              <div class="cell-info flex">
                <div class="cell-name">{{item.name}}</div>
                <div class="cell-text">{{item.company}}</div>
                <div class="cell-text">{{item.userWork}}</div>
              </div>
              <div class="cell-state" v-show="item.notificationType==='0'&&item.notificationState==='1'" @click="tongyi(item.id)">
                <div class="cell-icon"><img src="../../../assets/duihao.png" alt=""></div>
                <div>同意交换</div>
              </div>
              <div class="cell-state" v-show="item.notificationType==='1'&&item.notificationState==='1'">
                <div class="cell-icon"><img src="../../../assets/duihao.png" alt=""></div>
                <div>等待中</div>
              </div>
              <div class="cell-state" v-show="item.notificationState==='0'">
                <div class="cell-icon"><img src="../../../assets/yuanjiaohuan.png" alt=""></div>
                <div>已交换</div>
              </div>
              <div class="cell-state" v-if="show1" v-show="item.notificationState==='2'" @click="tixing(item.id)">
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
        <div class="vant-popup">
          <van-popup
          :show="show"
          position="bottom"
          @close="onClose"
          >
            <div class="more-list">
              <div class="more-item border_cell" @click="share">分享名片</div>
              <div class="more-item" @click="del(item.notificationId)">删除记录</div>
            </div>
            <div class="more-off" @click="onClose">取消</div>
          </van-popup>
        </div>
      </div>
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
      show1: true,
      userId: '',
      dataarr: []
    }
  },
  methods: {
    // 提醒对方
    tixing (attentionId) {
      // this.$http.get({
      //   url: 'api/appUser/acceptUserAttention',
      //   data: {
      //     userId: this.userId, // 接受人id
      //     attentionId: attentionId// 发送人id
      //   }
      // }).then(res => {

      // })
    },
    // 同意交换名片
    tongyi (attentionId) {
      this.$http.get({
        url: 'api/appUser/acceptUserAttention',
        data: {
          userId: this.userId, // 接受人id
          attentionId: attentionId// 发送人id
        }
      }).then(res => {
        console.log(res)
      })
    },
    onChange (event) {
      // 0是收到   1是发出
      console.log(event.mp.detail)
      this.getdata(event.mp.detail.index)
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
    del (id) {
      this.show = false
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.$http.get({
          url: 'api/notification/delNotification',
          data: {
            id: id
          }
        }).then(res => {
          this.getdata(0)
          this.getdata(1)
        })
      })
    },
    getdata (index) {
      if (index === 0) {
        // 说明是收到
        this.$http.get({
          url: 'api/notification/notificationAcceptList', // 收到列表
          data: {
            userId: this.userId
          }
        }).then(res => {
          console.log(res, '0')
          this.dataarr = res.data.list
        })
      } else {
        // 说明是发出
        this.$http.get({
          url: 'api/notification/notificationApplyList', // 发出列表
          data: {
            userId: this.userId
          }
        }).then(res => {
          console.log(res, '1')
          this.dataarr = res.data.list
        })
      }
    }
  },
  onShow () {
    this.getdata(0)
  },
  onLoad () {
    this.userId = wx.getStorageSync('userId')
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
      border-radius: 50%;
      overflow: hidden;
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
