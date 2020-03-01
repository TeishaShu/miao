<template>
  <div>
    <body>
      <form class="form-signin">
        <img src="/logo.png" alt="">
        <h4>管理員登入</h4>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required=""
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> 記住帳號密碼
          </label>
        </div>
        <button type="submit">
          登入
        </button>
      </form>
    </body>
  </div>
</template>
<style lang="scss" scoped>
    @import './login.scss';
</style>