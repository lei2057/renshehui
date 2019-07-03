<template>
  <div>
     <div class="z-head">
        <div class="z-select">
          <div class="list" @click="xuanzepaixu(1)">
            <p>发布时间</p>
            <img src="../../../assets/updown.png" alt="">
            <div class="xuanxiang" v-show="selectbol1">
              <p @click="zuanzefuzhi(1,1)">从早到晚</p>
              <p @click="zuanzefuzhi(1,2)">从晚到早</p>
            </div>
          </div>
          <div class="list" @click="xuanzepaixu(2)">
            <p>浏览量</p>
            <img src="../../../assets/updown.png" alt="">
            <div class="xuanxiang" v-show="selectbol2">
              <p @click="zuanzefuzhi(2,1)">从多到少</p>
              <p @click="zuanzefuzhi(2,2)">从少到多</p>
            </div>
          </div>
          <div class="list" @click="xuanzepaixu(3)">
            <p>收藏数</p>
            <img src="../../../assets/updown.png" alt="">
            <div class="xuanxiang" v-show="selectbol3">
              <p @click="zuanzefuzhi(3,1)">从多到少</p>
              <p @click="zuanzefuzhi(3,2)">从少到多</p>
            </div>
          </div>
          <div class="list" @click="xuanzepaixu(4)">
            <p>格式</p>
            <img src="../../../assets/updown.png" alt="">
            <div class="xuanxiang" v-show="selectbol4">
              <p @click="zuanzefuzhi(4,0)">Word</p>
              <p @click="zuanzefuzhi(4,1)">Excel</p>
              <p @click="zuanzefuzhi(4,2)">ppt</p>
              <p @click="zuanzefuzhi(4,3)">pdf</p>
              <p @click="zuanzefuzhi(4,4)">压缩包</p>
              <p @click="zuanzefuzhi(4,5)">其他</p>
            </div>
          </div>
        </div>
     </div>
     <div class="z-tabbottom">
         <div v-for="item in dataarr" :key="item.id">
            <div class="list" @click="godataDetails(item.id)">
              <div class="listleft">
                <img :src="item.type==0?'../../../assets/wordicon.png':item.type==1?'../../../assets/tabericon.png':item.type==2?'../../../assets/ppticon.png':item.type==3?'../../../assets/picon.png':item.type==4?'../../../assets/yasuoicon.png':'../../../assets/qitaicon.png'" alt="">
              </div>
              <div class="listright">
                <div class="righttop">
                  <p>{{item.title}}</p>
                </div>
                <div class="rightbottom">
                  <p>{{item.readCount}}人浏览</p>
                  <p>{{item.likeCount}}人收藏</p>
                  <p>{{item.publishTime}}</p>
                </div>
              </div>
            </div>
            <div class="line"></div>
         </div>
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
      id: '',
      sousuo: '',
      selectbol1: false,
      selectbol2: false,
      selectbol3: false,
      selectbol4: false,
      order: '',
      geshi: '',
      dataarr: []
    }
  },

  methods: {
    // 跳转到详情
    godataDetails (id) {
      wx.navigateTo({
        url: '../dataDetails/main?id=' + id
      })
    },
    // 排序赋值
    zuanzefuzhi (indexf, indexz) {
      if (indexf === 1) {
        this.order = 'p' + indexz
        this.geshi = ''
      } else if (indexf === 2) {
        this.order = 'l' + indexz
        this.geshi = ''
      } else if (indexf === 3) {
        this.order = 's' + indexz
        this.geshi = ''
      } else if (indexf === 4) {
        this.order = ''
        this.geshi = indexz
      }
      this.getdata()
      // console.log(this.order, this.geshi)
    },
    // 选择排序规则
    xuanzepaixu (index) {
      if (index === 1) {
        this.selectbol1 = !this.selectbol1
        this.selectbol2 = false
        this.selectbol3 = false
        this.selectbol4 = false
      } else if (index === 2) {
        this.selectbol2 = !this.selectbol2
        this.selectbol1 = false
        this.selectbol3 = false
        this.selectbol4 = false
      } else if (index === 3) {
        this.selectbol3 = !this.selectbol3
        this.selectbol2 = false
        this.selectbol1 = false
        this.selectbol4 = false
      } else if (index === 4) {
        this.selectbol4 = !this.selectbol4
        this.selectbol2 = false
        this.selectbol3 = false
        this.selectbol1 = false
      }
    },
    // 点击搜索按钮
    sousuomsg () {
      if (this.sousuo === '') {
        Toast('输入框不能为空')
        return
      }
      wx.navigateTo({
        url: '../searchResult/main?sousuo=' + this.sousuo
      })
    },
    // 获取对应数据加排序
    getdata () {
      this.$http.get({
        url: '/api/dataSource/selectAllByCategoryId',
        data: {
          categoryId: this.id,
          order: this.order,
          type: this.geshi
        }
      }).then(res => {
        console.log(res)
        this.dataarr = res.data.list
      })
    }
  },
  onShow () { // mountend
    this.getdata()
  },
  onLoad (options) { // created
    this.id = options.id
  }
}
</script>

<style lang="scss" scoped>
.z-head{
  width: 100%;
  height: 44px;
  background-color: #3AAFFC;
  border: 1px solid #3AAFFC;
  .z-select{
    width: 343px;
    height: 44px;
    margin: 0 auto;
    display: flex;
    .list{
      display: flex;
      width:68px;
      height:44px;
      margin-right: 30px;
      position: relative;
      &:nth-child(4){
        margin-right: 0px;
      }
      p{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 4px;
        line-height: 44px;
      }
      img{
        width:8px;
        height:10px;
        display: inline-block;
        margin-top: 19px;
      }
      .xuanxiang{
        position: absolute;
        left: 0;
        top: 44px;
        background:rgba(58,175,252,1);
        box-shadow:0px 6px 8px 0px rgba(0, 0, 0, 0.24);
        p{
          width: 100%;
          height:44px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-align: center;
          line-height: 44px;
        }
      }
    }
  }
}
.z-tabbottom{
    width: 360px;
    // height: 380px;
    margin: 7px auto;
    border-radius:8px;
    background-color: rgb(250, 250, 250);
    .list{
      display: flex;
      .listleft{
        width: 39px;
        height: 45px;
        margin: 9px 12px;
        img{
          width: 39px;
          height: 45px;
        }
      }
      .listright{
        width: 270px;
        margin: 9px 12px;
        .righttop{
          margin-bottom: 10px;
          p{
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(58,58,58,1);
          }
        }
        .rightbottom{
          display: flex;
          p{
            width:80px;
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(114,114,114,1);
            margin-right: 20px;
            &:nth-child(3){
              margin-right: 0;
            }
          }
        }
      }
    }
    .line{
      width:313px;
      height:1px;
      background:rgba(231,230,230,1);
      margin: 0 auto;
    }
  }



</style>
