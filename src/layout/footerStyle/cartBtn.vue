<template>
  <div class="cart">
  <em>{{num}}</em>
  <router-link :to="{name:'step1'}">
    <i class="fas fa-shopping-cart"></i>
    <p>購物車</p>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/sass/variables.scss";
@import "cartBtn.scss";
</style>
<script>
export default {
  data(){
    return{
      num:0
    }
  },
  methods:{
    api(){
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.num = response.data.data.carts.length;
        }
      });
    },
  },
  created(){
    this.api()
  }
};
</script>
