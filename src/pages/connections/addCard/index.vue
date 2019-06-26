<template>
  <div style="padding: 0 10px;">
    <card :synopsis="synopsis" :userinfo="userinfo" ></card>
    <div class="mycardinfo-btn" @click="addCard">添加到名片夹</div>
  </div>
</template>

<script>
import Card from '../../../components/card'
export default {
  data () {
    return {
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
    addCard () {
      console.log('添加到名片夹')
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
  margin: 60px auto 27px;
}
</style>
