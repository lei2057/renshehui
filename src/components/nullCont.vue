<template>
  <div>
    <div style="width: 178px;height: 149px;main"><img :src="img" alt=""></div>
    <div>{{text}}</div>
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

</style>
