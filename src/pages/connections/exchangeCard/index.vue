<template>
  <div>
    <div class="vant-exchange">
      <van-tabs type="card" @change="onChange">
        <van-tab title="人脉圈">阿三大苏打实打实的</van-tab>
        <van-tab title="名片夹">啊实打实大啊啊啊</van-tab>
      </van-tabs>
    </div>
    <div class="vant-sepp">
      <van-swipe-cell :right-width="65">
        <van-cell-group>
          <div style="height:100%;">asdasdasd</div>
        </van-cell-group>
        <span slot="right">删除</span>
      </van-swipe-cell>
    </div>
    
    <!-- <popup text="仅需两步获取海量人脉信息"></popup> -->
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onChange (event) {
      console.log(event.mp.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #f44;
}

</style>
