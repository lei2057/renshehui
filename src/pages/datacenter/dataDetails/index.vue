<template>
  <div>
     <div class="z-top">
       <img class="bgtu" src="../../../assets/bg.png" alt="">
       <img class="wjtu" :src="data.type==0?'../../../assets/wordicon.png':data.type==1?'../../../assets/tabericon.png':data.type==2?'../../../assets/ppticon.png':data.type==3?'../../../assets/picon.png':data.type==4?'../../../assets/yasuoicon.png':'../../../assets/qitaicon.png'" alt="">
       <img class="fxtu" src="../../../assets/fenxiang.png" alt="">
       <p class="p1">文件名称：{{data.title}}</p>
       <p class="p2">存储模式：百度云盘</p><p  class="p3">文件格式：{{type}}</p>
       <p class="p4">共享时间：{{data.publishTime}}</p>
       <img class="sctu" :src="islike==1?'../../../assets/shoucang.png':'../../../assets/shoucang2.png'" alt="" @click="shoucang">
     </div>
     <div class="btnf" v-show="!isfrist">
       <div class="btn1" @click="huoquwenjian()">获取文件</div>
       <div class="btn2" @click="shangchuanshixiao">上报网盘文件失效</div>
     </div>
     <div class="btnf" v-show="isfrist">
       <div class="btn2" @click="huoquwenjian()">获取文件</div>
     </div>
     <div class="tishiyu">
       <p class="msg">*获取文件方法</p>
       <p>1.点击获取文件 (取消百度云盘小程序码图片)</p>
       <p>2.长按图片并选择"识别图中小程序码"</p>
       <p>3.显示对应文件后即可保存到你的百度云盘</p>
       <p>4.每次首次无限制查看文件提取码</p>
     </div>
     <div class="gobaiduyun">
       <p>看不懂？点击右边问号查看图文教程</p>
       <img @click="gogetdataCourse" src="../../../assets/wenhao.png" alt="">
     </div>
     <van-toast id="van-toast" />
  </div>
</template>

<script>
// import Popup from '../../../components/popup'
import Toast from '../../../../static/vant/toast/toast'
export default {
  data () {
    // components: {Popup},
    return {
      isfrist: true,
      id: '',
      data: '',
      type: '',
      userid: '1',
      islike: ''
    }
  },

  methods: {
    // 上传网盘文件失效
    shangchuanshixiao () {
      this.$http.get({
        url: 'api/dataSource/ApplyDatasource',
        data: {
          userId: this.userid,
          dataSourceId: this.id
        }
      }).then(res => {
        Toast('感谢您的反馈，正在处理')
      })
    },
    // 获取文件
    huoquwenjian () {
      wx.previewImage({
        current: this.data.cloudInformation, // 当前显示图片的http链接
        urls: [this.data.cloudInformation] // 需要预览的图片http链接列表
      })
      this.isfrist = false
    },
    // 收藏或取消
    shoucang () {
      if (this.islike === '0') {
        // 说明已经收藏。这时候是取消收藏
        this.$http.get({
          url: 'api/dataSource/delMyfavoritesDataSource',
          data: {
            userId: this.userid,
            categoryId: this.id
          }
        }).then(res => {
          this.islike = '1' // 1是没有收藏0是收藏
        })
      } else {
        // 说明没有收藏。这时候是收藏
        this.$http.get({
          url: 'api/dataSource/insertMyfavorites',
          data: {
            userId: this.userid,
            categoryId: this.id
          }
        }).then(res => {
          this.islike = '0' // 1是没有收藏0是收藏
        })
      }
    },
    // 跳转教程
    gogetdataCourse () {
      wx.navigateTo({
        url: '../getdataCourse/main'
      })
    }
  },
  onShow () { // mountend
    this.$http.get({
      url: '/api/dataSource/selectDataSourceById',
      data: {
        id: this.id
      }
    }).then(res => {
      this.data = res.data[0]
      if (Number(res.data[0].type) === 0) {
        this.type = 'Word'
      } else if (Number(res.data[0].type) === 1) {
        this.type = 'Excel'
      } else if (Number(res.data[0].type) === 2) {
        this.type = 'Ppt'
      } else if (Number(res.data[0].type) === 3) {
        this.type = 'Pdf'
      } else if (Number(res.data[0].type) === 4) {
        this.type = '压缩包'
      } else if (Number(res.data[0].type) === 5) {
        this.type = '其他'
      }
    })
    this.$http.get({
      url: 'api/dataSource/showMyfavoritesState',
      data: {
        userId: this.userid,
        categoryId: this.id
      }
    }).then(res => {
      this.islike = res.data.res // 1是没有收藏0是收藏
    })
  },
  onLoad (options) { // created
    this.id = options.id
  }
}
</script>

<style lang="scss" scoped>
.z-top{
  width:363px;
  height:202px;
  margin: 0 auto;
  position: relative;
  margin-top: 63px;
  margin-bottom: 7px;
  // border: 1px solid red;
  .bgtu{
    position: absolute;
    left: 0;
    top: 0;
    width:363px;
    height:202px;
    z-index: 2;
  }
  .wjtu{
    width: 103px;
    height: 119px;
    position: absolute;
    top: -50px;
    left: 130px;
    z-index: 3;
  }
  .fxtu{
    width: 21px;
    height: 21px;
    position: absolute;
    right: 13px;
    top: 9px;
    z-index: 3;
  }
  p{
    position: absolute;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
    z-index: 3;
  }
  .p1{
    left: 19px;
    top: 85px;
  }
  .p2{
    left: 19px;
    top: 121px;
  }
  .p3{
    left: 204px;
    top: 121px;
  }
  .p4{
    left: 19px;
    top: 157px;
  }
  .sctu{
    width: 20px;
    height: 19px;
    position: absolute;
    right: 13px;
    bottom: 16px;
    z-index: 3;
  }
}
.btnf{
  width: 296px;
  height: 93px;
  margin: 0 auto;
  div{
    width:296px;
    height:44px;
    box-shadow:1px 2px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius:22px;
    line-height: 44px;
    text-align: center;
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
  .btn1{
    background:linear-gradient(-17deg,rgba(58,175,252,1),rgba(50,200,255,1));
    color:rgba(255,255,255,1);
    margin-bottom: 15px;
  }
  .btn2{
    color:rgba(114,114,114,1);
    background:rgba(255,255,255,1);
  }
}
.tishiyu{
  margin: 49px 0 24px 24px;
  p{
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
  }
  .msg{
    margin-bottom: 24px;
  }
}
.gobaiduyun{
  display: flex;
  p{
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(58,58,58,1);
    width: 286px;
    text-align: right;
    margin-right: 4px;
  }
  img{
    width: 16px;
    height: 15px;
    display: inline-block;
    margin-top: 3px;
    vertical-align:middle;
  }
}
</style>
