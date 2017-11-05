<template>
  <div class="back-nav">
    <a @click="back">
      <i><<</i>
      <slot></slot>
    </a>
  </div>
</template>

<script>
  export default {
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.back-nav{
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 18px;
  padding-left: 20px;
}
</style>
