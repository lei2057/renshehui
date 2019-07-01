<template>
  <div class="list-wrapper">
    <div  v-for="(item,index) in listinfo" :key="index">
      {{item.title}}
      <div class="list-cont disflex" style="background-image: url('../assets/listBg.png'); background-size: 100% 100%;">
        <img class="list-left" src="../assets/listTou.png" alt="">
        <div class="flex list-right">
          <div class="right-title"><div class="title-text">{{item.title}}</div></div>
          <div class="right-cont">{{item.cont}}</div>
          <span class="right-time">{{item.time}}</span>
        </div>
      </div>
      <div class="disflex pd10">
        <div class="list-bottom-icon"><img src="../assets/youken.png" alt=""></div>
        <div class="flex">优科达商业管理有限责任公司</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listinfo: Object
  },
  onLoad () {
    console.log('qweqweqwe')
    console.log(this.listinfo)
  },
  watch: {
    listinfo (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 5px; 
  .list-cont {
    
    .list-left {
      width: 175px;
      height: 110px;
    }
    .list-right {
      margin-left: 10px;
      .right-title {
        font-size: 10px;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-bottom: 3px;
        .title-text {
          background: #3AAFFC;
          color: #fff;
          width: 62px;
          padding: 2px 0 2px 8px;
          border-bottom-left-radius: 8px;
          border-top-left-radius: 8px;
        }
      }
      .right-cont {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .right-time {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        margin-top: 20px;
        margin-right: 13px;
      }
    }
  }
  .list-bottom-icon {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
  }
}
</style>
