<template>
  <div>
    <img src="/coupon.png" alt="" />
    <div class="coupon">
      <h2>開幕慶優惠!</h2>
      <p>輸入以下代碼，即可獲得全館8折優惠</p>
      <div class="box">
        <input value="afcc000" id="copyInput" />
        <button onclick="copyInput()">複製</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "coupon.scss";
</style>
