<template>
  <div>
    <div class="mycard-wrapper">
      <div class="mycard-cont">
        <img src="https://zodeng.com/static/system/image/img03.png" alt="">
        <div class="mycard-info">
          <div class="info-top disflex">
            <div class="info-photo"><img :src="userinfo.headPhoto" alt=""></div>
            <div class="info-text flex">
              <div class="text-name">{{userinfo.name}}</div>
              <div class="text-job">{{userinfo.userWork}}</div>
            </div>
          </div>
          <div class="info-bottom" v-if="pageType === '1'">
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/dianhua.png" alt=""></div><span class="flex">电话：{{phone}}</span><span>(交换后可查看)</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/company.png" alt=""></div><span class="flex">公司：{{userinfo.company}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/email.png" alt=""></div><span class="flex">邮箱：{{email}}</span><span>(交换后可查看)</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/address.png" alt=""></div><span class="flex">城市：{{userinfo.cityName}}</span></div>
          </div>
          <div class="info-bottom" v-else>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/dianhua.png" alt=""></div><span class="flex">电话：{{userinfo.phone}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/company.png" alt=""></div><span class="flex">公司：{{userinfo.company}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/email.png" alt=""></div><span class="flex">邮箱：{{userinfo.email}}</span></div>
            <div class="info-item disflex"><div class="info-icon"><img src="../assets/address.png" alt=""></div><span class="flex">城市：{{userinfo.cityName}}</span></div>
          </div>
        </div>
      </div>
      <div class="synopsis">
        <div class="synopsis-cont">{{userinfo.briefIntroduction}}</div>
        <div class="tag">简介</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userinfo: Array,
    pageType: String
  },
  data () {
    return {
      phone: '',
      email: ''
    }
  },
  watch: {
    'userinfo' (res) { // 密码遮挡
      console.log(res, 'friend')
      let phx = res.phone.substring(3, 6)
      let emx = res.email.substring(3, 6)
      this.phone = res.phone.replace(phx, '****')
      this.email = res.email.replace(emx, '****')
    }
  }
}
</script>

<style lang="scss" scoped>
.mycard-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  .mycard-cont {
    height: 224px;
    position: relative;
    overflow: hidden;
    .mycard-info {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      .info-top {
        padding: 10px 10px 12px 20px;
        .info-photo {
          width: 91px;
          height: 91px;
          margin-top: 4px;
          border: 3px solid #fff;
          border-radius: 50%;
          overflow: hidden;
        }
        .info-text {
          margin-left: 10px;
          .text-name {
            font-size: 21px;
            margin-bottom: 10px;
          }
          .text-job {
            font-size: 15px;
          }
        }
      }
      .info-bottom {
        padding-left: 19px;
        font-weight: 300;
        margin-right: 10px;
        .info-item {
          margin-bottom: 5px;
          .info-icon {
            width: 15px;
            height: 15px;
            margin-right: 9px;
          }
        }
      }
    }
  }
  .synopsis {
    padding: 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    .synopsis-cont {
      text-indent: 2em;
    }
    .tag {
      width: 60px;
      height: 60px;
      background: #3AAEFB;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      transform: rotate(-45deg);
      position: absolute;
      top: -30px;
      left: -30px;
    }
  }
}
</style>
