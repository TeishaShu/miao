<template>
  <div class="cart">
  <em v-show="num!==0">{{ num }}</em>
  <router-link :to="{name:'step1'}">
    <i class="fas fa-shopping-cart"></i>
    <p>購物車</p>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .cart {
    color: $or_light;
    border: 2px solid $or_light;
    padding: 16px 17px 10px 18px;
    border-radius: 100%;
    cursor: pointer;
    position: fixed;
    right: 44px;
    z-index: 90;
    bottom: 90px;
    vertical-align: middle;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 3px #fff;
    &:hover{
      color: $or;
      border: 2px solid $or;
      transition-property: color, border;
      transition-duration: 1s, 1s;
    }
  }
  i {
    font-size: 27px;
  }
  p {
    font-size: 12px;
    text-align: center;
    font-weight: bold;
  }
  em {
    background: $red;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    border-radius: 100%;
    width: 18px;
    text-align: center;
  }
  a{
    color: $or;
  }
  @media (max-width: 768px) {
    .cart {
      padding: 12px 13px 9px 15px;
      right: 37px;
      bottom: 45px;
      text-align: center;
    }
    i {
      font-size: 21px;
      margin-left: -6px;
    }
  }
</style>

<script>
export default {
  computed: {
    num(){
      return this.$store.state.addCartModules.cartBtnNum;
    }
  },
  methods:{
    api(){
      this.$store.dispatch('addCartModules/cartBtnApi');
    },
  },
  created(){
    this.api()
  }
};
</script>
