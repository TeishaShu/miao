<template>
  <div>
    <body>
      <AlertMessage />

      <form class="form-signin">
        <img
          src="@/assets/images/logo.png"
          alt="logo 圖片"
        >
        <h4>管理員登入</h4>
        <label
          for="inputEmail"
          class="sr-only"
        >Email address</label>
        <input
          id="inputEmail"
          v-model="user.username"
          type="email"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        >
        <label
          for="inputPassword"
          class="sr-only"
        >Password</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required=""
          @keyup.13="send"
        >
        <div class="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
            > 記住帳號密碼
          </label>
        </div>
        <button
          type="submit"
          @click.prevent="send"
        >
          登入
        </button>
      </form>
    </body>
  </div>
</template>

<script>
import AlertMessage from '@/components/alert/AlertMessage.vue'
import { SignIn } from '@/api/api.js'

export default {
  components: {
    AlertMessage
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async send () {
      this.$store.dispatch('updateLoading', true)
      SignIn(this.user)
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.$router.push('/admin')
            const token = response.data.token
            const expired = response.data.expired
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
          } else {
            const messageObj = {
              fontawesome: 'fa-times',
              message: `${response.data.message}: ${response.data.error.message}`,
              status: 'danger'
            }
            this.$store.dispatch('AlertMessageModules/updateMsg', messageObj)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin-top: -80px;
  }
  h4 {
    color: #ef9240;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
    letter-spacing: 10px;
    text-align: center;
  }
  img {
    margin: 0 auto;
    display: block;
  }

  .form-signin {
    padding: 15px;
    margin: auto;
    max-width: 400px;
    width: 100%;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  button {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 30px;
    display: block;
    width: 100%;
    background: #ef9240;
    color: #fff;
    border: none;
    &:hover{
      background: #ef4068;
    }
  }
</style>
