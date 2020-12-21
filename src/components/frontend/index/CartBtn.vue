<template>
  <div class="cart">
    <em v-show="num!==0">{{ num }}</em>
    <router-link :to="{name:'step1'}">
      <i class="fas fa-shopping-cart" />
      <p>購物車</p>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    num () {
      return this.$store.state.AddCartModules.cartBtnNum
    }
  },
  created () {
    this.api()
  },
  methods: {
    api () {
      this.$store.dispatch('AddCartModules/cartBtnApi')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .cart {
    color: $primary1_light;
    border: 2px solid $primary1_light;
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
      color: $primary1;
      border: 2px solid $primary1;
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
    background: $primary2;
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
    color: $primary1;
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
