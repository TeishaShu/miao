<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <nav
            class="col-md-2 d-none d-md-block sidebar"
            :class="{'smSet':backSmToggle}"
          >
            <div class="sidebarSticky">
              <div class="navbar-brand logoA">
                <img
                  src="@/assets/images/logo.png"
                  alt=""
                >
                <p>後臺設定管理</p>
              </div>
              <h6>
                管理員
              </h6>
              <ul>
                <li>
                  <router-link :to="{name:'admin_product'}">
                    <i class="fas fa-boxes" />
                    產品列表
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'admin_book'}">
                    <i class="fas fa-tasks" />
                    訂單管理
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'admin_coupon'}">
                    <i class="fas fa-ticket-alt" />
                    優惠卷
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="col-md-10 main">
          <div class="top">
            <div
              class="toggle"
              @click="smToggle"
            >
              <i class="fas fa-bars" />
            </div>
            <div class="name">
              <i class="fas fa-user-tie" />
              <p>歡迎，管理員</p>
              <a
                href="#"
                @click.prevent="signout"
              >登出</a>
            </div>
          </div>
          <div
            class="toggleUl"
            style="display:none"
          >
            <ul>
              <li>
                <router-link :to="{name:'admin_product'}">
                  <i class="fas fa-boxes" />
                  產品列表
                </router-link>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-tasks" />
                  訂單管理
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-ticket-alt" />
                  優惠卷
                </a>
              </li>
            </ul>
          </div>

          <div class="inner">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  /* Navbar */
  .navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }
  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
  }
  /* Content */
  @media (min-width: 768px) {
    [role="main"] {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }
  //admin_del
  /* Menu_top */
  .inner {
    margin: 60px 80px;
    padding: 0 15px;
  }
  .main{
    padding-left: 0;
    padding-right: 0;
  }
  .top {
    border-bottom: 1px solid #ddd;
    text-align: right;
    font-size: 16px;
    padding: 10px;
    height: 49px;
    position: sticky;
    top: 0;
    background-color: #fff;
    a {
      border-radius: 4px;
      font-size: 12px;
      background: #ef9240;
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      padding: 5px 10px;
      margin-left: 18px;
      &:hover {
        background: #ef4068;
        border: none;
      }
    }
  }
  .name {
    vertical-align: middle;
    display: flex;
    align-items: center;
    float: right;
  }
  /*  aside */
  .router-link-exact-active {
    background: $red;
    color: #fff;
    border-radius: 0;
  }
  a {
    padding: 10px;
    font-size: 16px;
    color: #6e6e6edd;
    display: block;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background: $or;
      z-index: -1;
    }
    &:hover {
      color: #fff !important;
      position: relative;
      &::before {
        transition: 1s width;
        content: "";
        width: 100%;
      }
    }
  }
  .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  .logoA {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    img {
      width: 80%;
      margin-top: 10px;
    }
    p {
      color: $or;
      font-size: 16px;
      letter-spacing: 10px;
      font-weight: bold;
      text-align: center;
      padding-left: 15px;
    }
  }
  i {
    padding-right: 10px;
  }
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 0; /* Height of navbar */
    border-right: 1px solid #c5c5c5;
    background-color: #f8f9fa;
    h6 {
      width: 100%;
      text-align: center;
      border-bottom: 2px dotted #ddd;
      display: inline-block;
      font-size: 14px;
      padding-bottom: 5px;
      a {
        color: #464646;
        font-size: 18px;
      }
    }
  }
  .sidebarSticky {
    position: relative;
    top: 0;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports (position: sticky) {
    .sidebarSticky {
      position: sticky;
    }
  }
  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }
  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }
  .sidebar .nav-link.active {
    color: #007bff;
  }
  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }
  .sidebar-heading {
    text-transform: uppercase;
  }
  .toggleUl {
    display: none;
    background: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    width: 100%;
    z-index: 29;
    ul {
      width: 200px;
      box-shadow: 3px 5px 3px #000;
      height: 100vh;
      background: #fff;
      z-index: 30;
    }
    li {
      &:hover {
        background: $or;
      }
    }
  }
  .toggle {
    display: none;
    float: left;
    i {
      border: 1px solid rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.5);
      padding: 7px 12px;
      font-size: 14px;
      border-radius: 5px;
    }
  }
  @media (max-width: 992px) {
    .inner {
      margin: 35px 0;
    }
    .logoA {
      p {
        letter-spacing: 0;
        padding-left: 0;
      }
    }
  }
  @media (max-width: 768px) {
    .toggle {
      display: inline-block;
    }
    .toggleUl {
      display: block;
    }
    .smSet{
      top:49px;
      background-color: rgba(0, 0, 0, 0.5) ;
      display: block !important;
      .sidebarSticky{
        width:300px;
        background-color: #fff;
      }
      h6{
        display: none;
      }
    }
    .logoA{
      border-bottom: 2px dotted #ddd;
      img{
        width: 150px;
        margin-bottom: 5px;
      }
      p{
        font-size: 20px;
      }
    }
  }
</style>

<script>
import { signOut } from '@/api/api.js'

export default {
  computed: {
    backSmToggle () {
      return this.$store.state.backSmToggle
    }
  },
  methods: {
    signout () {
      signOut()
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
        .catch(() => {
          console.error('err api')
        })
    },
    smToggle () {
      this.$store.dispatch('backSmToggle', !this.backSmToggle)
    }
  }
}
</script>
