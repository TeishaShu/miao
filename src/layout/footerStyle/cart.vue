<template>
  <div class="cart">
    <i class="fas fa-shopping-cart"></i>
    <p>購物車</p>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
.cart{
  color: $or;
    border: 2px solid $or;
    padding: 16px 17px 10px 18px;
    border-radius: 100%;
    cursor: pointer;
    position: fixed;
    right: 44px;
    z-index: 20;
    bottom: 90px;
    vertical-align: middle;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 0 3px #fff;
}
i {
    font-size: 27px;
}
p{
  font-size:12px;
  text-align:center;
  font-weight:bold;
}
</style>
<script>
export default {};
</script>
