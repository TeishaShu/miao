<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <div class="navbar-brand logoA">
                <img src="/logo.png" alt="" />
                <p>後臺設定管理</p>
              </div>
              <h6>
                管理員
              </h6>
              <ul>
                <li>
                  <router-link to="/admin">
                    <i class="fas fa-boxes"></i>
                    產品列表
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'admin_book'}">
                    <i class="fas fa-tasks"></i>
                    訂單管理
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/admin_coupon">
                    <i class="fas fa-ticket-alt"></i>
                    優惠卷
                  </router-link>
                </li>
              </ul>

              <!--<h6>
                模擬功能
              </h6>
              <ul>
                <li>
                  <a href="#">
                    <i class="fas fa-shopping-cart"></i>
                    模擬訂單
                  </a>
                </li>
              </ul>-->
            </div>
          </nav>
        </div>
        <div class="col-md-10 main">
          <div class="top">
            <div class="toggle">
              <i class="fas fa-bars"></i>
            </div>
            <div class="name">
              <i class="fas fa-user-tie"></i>
              <p>歡迎，管理員</p>
              <a href="#" @click.prevent="signout">登出</a>
            </div>
            
          </div>
          <div class="toggleUl" style="display:none">
            <ul>
              <li>
                <router-link to="admin_product">
                  <i class="fas fa-boxes"></i>
                  產品列表
                </router-link>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-tasks"></i>
                  訂單管理
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fas fa-ticket-alt"></i>
                  優惠卷
                </a>
              </li>
            </ul>
          </div>

          <div class="inner">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "admin.scss";
@import "admin_del.scss";
</style>

<script>
export default {
  methods: {
    signout(){
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/logout`;
      this.$http.post(api).then(response => {
        // console.log(response.data)
        if(response.data.success){
          this.$router.push('/login')
        }
      });
    }
  },
};
</script>
