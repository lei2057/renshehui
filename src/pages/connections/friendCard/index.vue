<template>
  <div style="padding: 0 10px;">
    <card :synopsis="synopsis" :userinfo="userinfo" ></card>
    <div class="mycardinfo-btn disflex" @click="call"><div class="icon15 mgr10"><img src="../../../assets/phone.png" alt=""></div>拨打电话</div>
    <div class="mycard-btn disflex" @click="share"><div class="icon15 mgr10"><img src="../../../assets/topMp.png" alt=""></div>分享名片</div>
    <div class="vant-popup">
      <van-popup
        :show="show"
        position="bottom"
        @close="onClose"
      >
        <div class="more-list">
          <div class="more-item" @click="phone">呼叫 13166882057</div>
        </div>
        <div class="more-off" @click="onClose">取消</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Card from '../../../components/card'
export default {
  data () {
    return {
      show: false, // 弹框
      synopsis: '您是否可见的官方纪录时刻的各类考试，最多输入37个字。',
      userinfo: {
        name: '我的姓名',
        job: '职位',
        phone: '1008610086',
        company: '杭州优科达商业管理有限公司',
        email: '1207453420@qq.com',
        address: '浙江省杭州市'
      }
    }
  },
  methods: {
    onClose (event) {
      this.show = false
    },
    call () {
      console.log('拨打电话')
      this.show = true
    },
    share () {
      console.log('分享名片')
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
.mycardinfo-btn {
  width: 264px;
  height: 45px;
  line-height: 45px;
  background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  color: #fff;
  border-radius: 22px;
  font-size: 15px;
  margin: 50px auto 27px;
}
.mycard-btn {
  width: 264px;
  height: 45px;
  line-height: 45px;
  border: 1px solid rgba(58, 175, 252, 1);
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 22px;
  font-size: 15px;
  margin: auto;
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
