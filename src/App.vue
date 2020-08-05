<template>
  <div id="app" class="min-vh-100">
    <!--<div id="nav"><router-link to="/">Home</router-link>|</div>-->
    <!--loading.這邊無法跟內頁互用-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <router-view />
  </div>
</template>


<style lang="scss">
@import "./assets/scss/all.scss";
</style>

<script>
export default {
  computed:{ //使用vueX
    isLoading(){
      return this.$store.state.isLoading;
    }
  },
}
</script>
