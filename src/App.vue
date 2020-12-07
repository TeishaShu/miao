<template>
  <div
    id="app"
    class="min-vh-100"
  >
    <div class="vld-parent">
      <loading :active.sync="isLoading" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
