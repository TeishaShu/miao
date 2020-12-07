<template>
  <div>
    <div class="container-fluid headBox">
      <div class="container">
        <div class="row">
          <div class="col-md-12 header">
            <nav class="navbar navbar-expand-lg navbar-light ">
              <button
                class="navbar-toggler smNav"
                type="button"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span class="navbar-toggler-icon" />
              </button>
              <router-link
                :to="{ name: 'index' }"
                class="logoA"
              >
                <img
                  src="@/assets/images/logo.png"
                  alt="logo"
                  class="logo"
                >
                <div class="logoName">
                  來呷飽貓食堂
                </div>
              </router-link>
              <div
                id="bs-example-navbar-collapse-1"
                class="collapse navbar-collapse"
              >
                <ul class="navbar-nav nav">
                  <li class="nav-item">
                    <router-link to="/index">
                      <i class="fas fa-home" />首頁
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/product/all">
                      <i class="fas fa-cookie-bite" />商品列表
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/coupon">
                      <i class="fas fa-bell" />好康活動
                    </router-link>
                  </li>
                </ul>

                <ul class="navbar-nav ml-md-auto nav2">
                  <li class="nav-item cartBtn">
                    <router-link to="/cart">
                      <i class="fas fa-shopping-cart" />購物車
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/login">
                      管理中心
                    </router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <router-view />

    <div class="container-fluid pd0">
      <FooterStyle />
    </div>
  </div>
</template>

<script>
import FooterStyle from '@/components/frontend/index/FooterStyle.vue'

export default {
  components: {
    FooterStyle
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .header {
    color: $primary1;
    margin-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    .logo {
      display: inline-block;
      width: 70%;
    }
    ul {
      display: inline-block;
      &:last-child {
        float: right;
      }
    }
    li {
      display: inline-block;
      padding: 5px;
      cursor: pointer;
    }
  }
  .smNav {
    position: absolute;
    left: 0;
    top: 30px;
  }
  .logoA {
    background: transparent;
    padding: 0;
    text-align: center;
  }
  .logoName {
    color: $primary1;
    letter-spacing: 8px;
  }
  .nav {
    a {
      color: $primary1;
      display: block;
      padding: 5px 15px;
      border-radius: 20px;
      &:hover {
        background: $primary2_light;
        color: #fff;
        transition-property:background, color;
        transition-duration: 0.9s, 0.4s;
        transition-timing-function: ease, ease;
      }
    }
  }
  .nav2 {
    margin-top: 5px;
    li {
      padding: 5px 10px;
      &:nth-child(2) {
        a {
          background: $primary1;
          color: #fff;
          border-radius: 20px;
          padding: 5px 15px;
          font-size: 14px;
        }
      }
    }
  }
  i {
    margin-right: 5px;
  }
  .headBox {
    padding: 0;
    box-shadow: 0 0 5px $primary1;
  }
  .cartBtn {
    a {
      background: #fff;
      color: $primary1 !important;
      padding: 0;
    }
  }

  @media (max-width: 992px) {
    .navbar {
      justify-content: center;
    }
    .navbar-toggler {
      margin-right: 20px;
      font-size: 14px;
    }
    .header {
      li {
        display: block;
      }
      ul {
        display: block;
        &:last-child {
          float: unset;
        }
      }
    }
    .nav a {
      padding: 5px 10px;
    }
    .nav2 {
      margin-top: 0;
      li{
        padding: 10px 15px;
      }
    }
  }

  .pd0 {
    padding-left: 0;
    padding-right: 0;
  }
</style>
