<template>
  <div class="popup-top">
    <div class="popup-out">
      <div class="popup-icon" @click="onClose"><img src="../assets/out.png" alt=""></div>
    </div>
    <div class="popup-title">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-top {
  height: 65px;
  background-image: url('https://wmqhouse.top/static/system/image/empowerBg.png');
  background-size: 100% 100%;
  .popup-out {
    height: 25px;
    display: flex;
    justify-content: flex-end;
    .popup-icon {
      width: 13px;
      height: 13px;
      margin-top: 10px;
      margin-right: 10px;
    }
  }
  .popup-title {
    font-size: 24px;
    text-align: center;
    color: #fff;
    text-shadow:1px 2px 5px rgba(166,27,27,0.15);
  }
}
</style>
