<template>
  <div>
    <div class="container-fluid headBox">
      <div class="container">
        <div class="row">
          <div class="col-md-12 header">
            <nav class="navbar navbar-expand-lg navbar-light ">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <router-link :to="{ name: 'index' }" class="logoA">
                <img src="@/assets/images/logo.png" alt="" class="logo" />
                <div class="logoName">來呷飽貓食堂</div>
              </router-link>
              <div
                class="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul class="navbar-nav nav">
                  <li class="nav-item">
                    <router-link :to="{ name: 'index' }">
                      <i class="fas fa-home"></i>首頁
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link :to="{ name: 'product' }"> 
                      <i class="fas fa-cookie-bite"></i>商品列表
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link :to="{ name: 'coupon' }">
                      <i class="fas fa-bell"></i>好康活動
                    </router-link>
                  </li>
                </ul>

                <ul class="navbar-nav ml-md-auto nav2">
                  <li class="nav-item cartBtn">
                    <router-link to="/cart">
                      <i class="fas fa-shopping-cart"></i>購物車
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/login">管理中心</router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>

    <div class="container-fluid pd0">
      <footerStyle />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/sass/variables.scss";
@import "headerPage.scss";
.pd0 {
  padding-left: 0;
  padding-right: 0;
}
</style>

<script>
import footerStyle from "../layout/footerStyle/footerStyle.vue";
export default {
  name: "home",
  components: {
    footerStyle,
  },
  methods: {},
};
</script>
