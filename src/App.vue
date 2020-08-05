<template>
  <div id="app" class="min-vh-100">
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
  computed:{ 
    isLoading(){
      return this.$store.state.isLoading;
    }
  },
}
</script>
