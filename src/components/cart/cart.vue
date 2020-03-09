<template>
  <div class="container out">
    <div class="row">
      <!--步驟-->
      <div class="col-md-12">
        <div class="step">
          <div class="line active-step active-round">
            <span>1</span>
            <p>
              訂單資料
            </p>
          </div>
          <div class="line">
            <span>2</span>
            <p>
              確認訂單並付款
            </p>
          </div>
          <div>
            <span>3</span>
            <p>
              完成訂單
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--內容-->
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import "../../assets/sass/variables.scss";
@import "cart.scss";
</style>
