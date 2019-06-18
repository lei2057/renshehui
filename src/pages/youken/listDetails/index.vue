<template>
  <div class="pd10">
    <div class="details-wrapper" style="background-image: url('../../assets/detailsBg.png'); background-size: 100% 100%;">
      <div class="details-cont">
        <div class="disflex">
          <div class="title-text">税薪-工资代发服务咨询文字超过显示字超过显示字超过显示</div>
          <div class="title-icon" @click="collect" v-if="!xin"><img src="../../assets/kxin.png" alt=""></div>
          <div class="title-icon" @click="collect" v-if="xin"><img src="../../assets/xin.png" alt=""></div>
        </div>
        <div class="details-item">服务费用<span class="item-cont">咨询议价</span></div>
        <div class="details-item">服务类型<span class="item-cont">代办业务 — 申领类代办</span></div>
        <div class="details-item">服务城市<span class="item-cont">杭州</span></div>
        <div class="details-item">联系电话<span class="item-cont">17756238319</span></div>
      </div>
    </div>
    <div class="wrapper pd10 disflex">
      <div class="icon" style="margin: 0 9px 0 7px;"><img src="../../assets/youkenf.png" alt=""></div>
      <div class="flex">优科达商业管理有限责任公司</div>
      <div style="width: 17px;height: 17px;"><img src="../../assets/right.png"></div>
    </div>
    <div class="wrapper pd10">
      <div class="service">
        <div class="service-title">服务内容</div>
        <div class="service-cont">定制化薪酬咨询、时间管理、薪酬计算、薪酬发放及个税全国服务等</div>
      </div>
      <div class="service">
        <div class="service-title">服务内容</div>
        <div class="service-cont">定制化薪酬咨询、时间管理、薪酬计算、薪酬发放及个税全国服务等</div>
      </div>
      <div class="service">
        <div class="service-title">服务内容</div>
        <div class="service-cont">定制化薪酬咨询、时间管理、薪酬计算、薪酬发放及个税全国服务等</div>
      </div>
    </div>
    <div class="service-wrapper">
      <div class="disflex service-btn">
        <div class="service-icon"><img src="../../assets/top.png" alt=""></div>
        分享好友
      </div>
      <div class="disflex service-btn">
        <div class="service-icon"><img src="../../assets/phone.png" alt=""></div>
        马上咨询
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xin: false
    }
  },
  methods: {
    collect () {
      this.xin = !this.xin
    }
  }
}
</script>

<style lang="scss" scoped>
.details-wrapper {
  width: 100%;
  height: 240px;
  margin-bottom: 15px;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .details-cont {
    margin-left: 18px;
    padding-top: 12px;
    .title-text {
      width: 311px;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title-icon {
      width: 20px;
      height: 19px;
    }
    .details-item {
      margin-top: 28px;
      .item-cont {
        margin-left: 27px;
      }
    }
  }
}
.service {
  border-bottom: 1px dashed #545454;
  margin: 7px;
  .service-title {
    font-size: 15px;
    margin-bottom: 4px;
  }
  .service-cont {
    margin-bottom: 10px;
  }
}
.service-wrapper {
  position: fixed;
  bottom: 10px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  .service-btn {
    width: 116px;
    height: 34px;
    background: linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 17px;
    color: #fff;
    .service-icon {
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
  }
}

</style>
