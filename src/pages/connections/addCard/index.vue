<template>
  <div style="padding: 0 10px;">
    <card :userinfo="userinfo"></card>
    <div class="mycardinfo-btn" @click="addCard">添加到名片夹</div>
  </div>
</template>

<script>
import Card from '../../../components/card'
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  onLoad (option) {
    console.log(option)
    this.userinfo = ''
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
  text-align: center;
}
</style>
