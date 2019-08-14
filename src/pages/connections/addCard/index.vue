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
      userinfo: {},
      id: '',
      userId: ''
    }
  },
  onShow () {
    this.$http.get({
      url: 'api/appUser/selectUserById',
      data: {
        id: this.id
      }
    }).then(res => {
      this.userinfo = res.data.list[0]
    })
  },
  onLoad (option) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    this.id = decodeURIComponent(option.scene)
    console.log(this.id)
    this.userId = wx.getStorageSync('userId')
    console.log(this.userId)
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // const scene = decodeURIComponent(option.scene)
  },
  methods: {
    addCard () {
      this.$http.get({
        url: 'api/appUser/saoUser',
        data: {
          userId: this.userId,
          attentionId: this.id
        }
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      })
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
