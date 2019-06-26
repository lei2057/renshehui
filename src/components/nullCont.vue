<template>
  <div>
    <div class="nullCont-img"><img :src="img" alt=""></div>
    <div class="nullCont-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    img: String
  }
}
</script>

<style lang="scss" scoped>
.nullCont-img {
  width: 178px;
  height: 149px;
  margin: 65px auto 10px;
}
.nullCont-text {
  width: 130px;
  margin: auto;
  color: #727272;
}
</style>
