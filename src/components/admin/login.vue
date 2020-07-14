<template>
  <div>
    <body>
      <form class="form-signin">
        <img src="@/assets/images/logo.png" alt="" />
        <h4>管理員登入</h4>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
          v-model="user.username"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required=""
          v-model="user.password"
          @keyup.13="send"
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> 記住帳號密碼
          </label>
        </div>
        <button type="submit" @click.prevent="send">
          登入
        </button>
      </form>
    </body>
  </div>
</template>
<style lang="scss" scoped>
@import "login.scss";
</style>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    send() {
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/admin/signin`;
      this.$http.post(api, this.user).then(response => {
        if(response.data.success){
          // console.log('login route',this)
          this.$router.push('/admin')
        }else{
          alert('帳號密碼錯誤')
        }
      });
    }
  }
};
</script>
