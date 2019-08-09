<template>
  <div>
      <div class="z-head">
        <!-- 输入框 -->
        <div class="sousuo-wrapper" id="head_wrapper">
          <div class="sousuo disflex" >
            <div class="sousuo-icon"><img src="../../../assets/sousuo.png" alt=""></div>
            <input class="flex sousuo-input" v-model="sousuo" type="text" placeholder="请搜索关键字" placeholder-style="font-size: 12px;text-align: center;">
            <div class="sousuobtn" @click ="sousuomsg()">搜索</div>
          </div>
        </div>
        <!-- 热门搜索 -->
        <div class="z-hotss">
          <p v-for="(item,index) in hotarr" :key="index" @click="hotsosuo(item)">{{item}}</p>
        </div>
        <div class="z-gerenzhuanshu" @click="gogerenzhuanshu">
          <img src="../../../assets/huangg.png" alt="">
          <span>个人专属</span>
        </div>
      </div>
      <div class="z-tab">
        <div class="z-tableft">
          <p v-for="(item,index) in msgarr" :key="index" :class="activeindex==index?'active':''"  @click="gotap(index,item.id)">{{item.name}}</p>
        </div>
        <div class="z-tabright">
          <div class="list">
            <div class="content" @click="goselection(item.id)" v-for="item in erjidata" :key="item.id">
              <div class="contentlist">
                <p>{{item.name}}</p>
                <img src="https://zodeng.com/static/system/image/jichurenshi.png" alt="">
              </div>
            </div>
          </div>
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
      sousuo: '',
      msgarr: [],
      activeindex: '0',
      erjidata: [],
      hotarr: ['人资规划方案', '五险一金', '绩效指标设定', '劳务关系']
    }
  },

  methods: {
    // 点击热门搜索
    hotsosuo (msg) {
      this.sousuo = msg
    },
    // 点击切换左侧列表
    gotap (index, id) {
      this.activeindex = index
      this.geterjidata(id)
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
    goselection (id) {
      wx.navigateTo({
        url: '../selectionResults/main?id=' + id
      })
    },
    // 点击个人专属
    gogerenzhuanshu () {
      wx.navigateTo({
        url: '../personalData/main'
      })
    },
    // 根据id请求二级数据
    geterjidata (id) {
      this.$http.get({
        url: '/api/dataSource/queryChildTypesById',
        data: {
          parentId: id
        }
      }).then(res => {
        this.erjidata = res.data.list
      })
    }

  },
  onShow () { // mountend
    this.$http.get({
      url: 'api/dataSource/selectAllDataSourceType',
      data: {
      }
    }).then(res => {
      this.msgarr = res.data
      this.geterjidata(res.data[0].id)
      this.activeindex = 0
    })
  },
  onLoad () { // created

  }
}
</script>

<style lang="scss" scoped>
.z-head{
  width: 100%;
  height: 126px;
  background-color: #3AAFFC;
  border: 1px solid #3AAFFC;
  position: relative;
}
.sousuo-wrapper {
  width: 343px;
  height: 34px;
  margin: 16px auto;
}
.sousuo {
  height: 34px;
  border-radius: 17px;
  background: #fff;
  z-index: 9;
  margin: 7px 5px 0 5px;
  position: relative;
  .sousuo-icon {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 8px;
  }
  .sousuo-input {
    margin: 0 40px;
  }
  .del-icon {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 5px;
  }
}
.sousuobtn{
  position: absolute;
  right: 0;
  top: 0;
  width:53px;
  height:34px;
  border-bottom-right-radius:15px;
  border-top-right-radius:15px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:15px;
  text-align: center;
  line-height: 34px;
  background-color: #1C8CD6;
}
.z-hotss{
  display: flex;
  width: 343px;
  margin: 0 auto;
  p{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-right: 29px;
    &:nth-child(4){
      margin-right: 0;
    }
  }
}
.z-gerenzhuanshu{
  width:95px;
  height:30px;
  background:rgba(28,140,214,1);
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  display: flex;
  line-height: 30px;
  position: absolute;
  left: 0;
  bottom: 0;
  span{
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  img{
    vertical-align: middle;
    width: 15px;
    height: 13px;
    display: inline-block;
    margin: 9px 6px 7px 12px;
  }
}
.z-tab{
  display: flex;
  .z-tableft{
    width: 95px;
    height: 400px;
    // border: 1px solid black;
    background:rgba(255,255,255,1);
    overflow: auto;
    p{
      width:93px;
      height:44px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(37,37,37,1);
      // border:1px dashed rgba(255,77,29,1);
      text-align: center;
      line-height: 44px;
      margin: 10px 0;
    }
    .active{
      font-size:15px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(58,175,252,1);
    }
  }
  .z-tabright{
    width: 280px;
    .contentlist{
      position: relative;
      width: 263px;
      height: 118px;
      margin: 13px auto;
      p{
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        width: 263px;
        height: 28px;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      img{
        width: 263px;
        height: 118px;
      }
    }
  }
}


</style>
