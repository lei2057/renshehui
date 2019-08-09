<template>
  <div>
    <div v-for="item in listinfo" :key="item">
      <div class="list-wrapper" @click="items(item.id)">
        <div class="list-cont disflex">
          <img class="list-left" :src="item.mainImg" alt="">
          <div class="flex list-right">
            <div class="right-title"><div class="title-text">{{item.category}}</div></div>
            <div class="right-cont">{{item.title}}</div>
            <span class="right-time">{{item.publishTime}}</span>
          </div>
        </div>
        <div class="disflex pd10">
          <div class="list-bottom-icon"><img :src="item.serviceCompanyImg" alt=""></div>
          <div class="flex">{{item.serviceCompany}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listinfo: Object
  },
  methods: {
    items (id) {
      wx.navigateTo({
        url: '/pages/youken/listDetails/main?id=' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px; 
  .list-cont {
    background-image: url('https://wmqhouse.top/static/system/image/listBg.png');
    background-size: 100% 100%;
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
          // width: 62px;
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
