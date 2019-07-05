<template>
  <div>
    <div class="collection-wrapper" v-if="!listinfo">
      <div class="collection-title">空空如也</div>
      <div class="collection-img"><img src="../../../assets/collection.png" alt=""></div>
      <div class="collection-text">
        <div>1.打开优肯，选择你感兴趣的供应链服务</div>
        <div>2.点击右上角的收藏即可添加收藏到这了</div>
      </div>
      <div class="collection-btn">马上去收藏</div>
    </div>
    <div class="pd10" v-if="listinfo">
      <Lists :listinfo="listinfo"></Lists>
    </div>
    <div>
      <canvas canvas-id="myCanvas" style="border: 1px solid;"/>
    </div>
  </div>
</template>

<script>
import Lists from '../../../components/list'
export default {
  data () {
    return {
      listinfo: [
        {
          title: '申领类代办',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        },
        {
          title: '申领类代办2',
          cont: '税薪-工资代发服务咨询标题超过两行显示工资代发服务咨询标题超过两行显示',
          time: '2019.04.29'
        }
      ]

    }
  },
  onLoad () {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  },
  methods: {

  },
  components: {
    Lists
  }
}
</script>

<style lang="scss" scoped>
.collection-wrapper {
  text-align: center;
  .collection-title {
    font-size: 40px;
    font-weight: 600;
    color: rgba(218,235,255,1);
    margin-top: 60px;
  }
  .collection-img {
    width: 215px;
    height: 180px;
    margin: 33px auto 25px;
  }
  .collection-text {
    width: 250px;
    color: #727272;
    margin: auto;
  }
  .collection-btn {
    width: 174px;
    height: 39px;
    line-height: 39px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    color: #fff;
    margin: 50px auto 25px;
    text-align: center;
    border-radius: 20px;
  }
}
</style>
