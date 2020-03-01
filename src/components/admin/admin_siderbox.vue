<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <div class="navbar-brand logoA">
          <img src="/logo.png" alt="" />
          <p>後臺設定管理</p>
        </div>
        <h6>
          管理員
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </h6>
        <ul>
          <li>
            <a class="active" href="#">
              <i class="fas fa-boxes"></i>
              產品列表
            </a>
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

        <h6>
          模擬功能
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </h6>
        <ul>
          <li>
            <a href="#">
              <i class="fas fa-shopping-cart"></i>
              模擬訂單
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/sass/variables.scss';
  @import 'admin_siderbox.scss';
</style>
