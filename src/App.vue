<template>
  <div id="app">
    <!--<div id="nav"><router-link to="/">Home</router-link>|</div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/products`;
    this.$http.get(api).then(response => {
      console.log(0, response.data);
    });
  }
};
</script>

<style lang="scss">
@import "./assets/sass/cssreset.scss";
@import "~bootstrap/scss/bootstrap";
@import "./assets/sass/myset.scss";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
