<template>
  <div class="minHeight">
    <AlertMessage />

    <img
      src="@/assets/images/coupon.png"
      class="animate__animated animate__bounceIn"
      alt="優惠形象圖"
    >
    <div class="coupon">
      <div>
        <h2>開幕慶優惠 !</h2>
        <p>
          輸入以下代碼，即可獲得<br>
          <b style="font-size: 24px; color: red;">
            全館 8折優惠</b>
        </p>
        <div class="box">
          <input
            id="codyId"
            :value="couponCode"
            readonly
            @input="updatecouponCode"
          >
          <button @click="copyInput">
            複製
          </button>
        </div>
      </div>
    </div>
    <CartBtn />
  </div>
</template>

<script>
import CartBtn from '@/components/frontend/index/CartBtn.vue'
import AlertMessage from '@/alert/AlertMessage.vue'

export default {
  components: {
    CartBtn,
    AlertMessage
  },
  computed: {
    couponCode () {
      return this.$store.state.Coupon.couponCode
    }
  },
  methods: {
    updatecouponCode (e) {
      this.$store.commit('Coupon/UPDATECOUPONCODE', e.target.value)
    },
    dateFormat (num) {
      const dd = new Date(num)
      return `${dd.getFullYear()}年${dd.getMonth() + 1}月${dd.getDate()}日`
    },
    copyInput () {
      // copy
      document.execCommand('copy') // 這行無法用

      // alert
      this.$store.dispatch('updateLoading', true)
      const messageObj = {
        fontawesome: 'fa-check',
        message: `已經複製優惠碼: ${this.couponCode}`,
        status: 'success'
      }
      this.$store.dispatch('AlertMessageModules/updateMsg', messageObj)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .minHeight{
    min-height:calc(100vh - 375px);
  }
  .coupon{
    text-align: center;
    margin: 0 auto;
    width: 40%;
    h2{
      color: #fff;
      font-weight: bold;
      font-size: 30px;
      background: $primary1;
      display: block;
      line-height: 40px;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 30px;
    }
    input{
      border: none;
      padding: 10px 15px;
      font-size: 16px;
      color: $txt;
      font-weight: bold;
      vertical-align: middle;
    }
    button{
      background:$primary2;
      color: #fff;
      border: none;
      padding: 11.5px 19px 11.5px 15px;
      vertical-align: middle;
      margin-left: -6px;
      font-size: 16px;
    }
  }
  img{
    margin:0 auto;
    margin-top: 10vh;
    margin-bottom: 8vh;
    display: block;
    width: 50%;
    max-width: 800px;
    animation-duration: 1s;
  }
  .box{
    border: 2px solid $primary2;
    display: inline-block;
    border-radius: 30px;
    overflow: hidden;
  }
  p{
    margin-bottom: 20px;
    white-space: nowrap;
  }
  .cou{
    display: block;
    padding: 0 0;
  }
  @media (max-width: 992px) {
    img{
      width: 65%;
    }
    .coupon{
      width: 45%;
    }
  }
  @media (max-width:768px) {
    img{
      width: 80%;
      margin-top: 30px;
      margin-bottom: 40px;
    }
    .coupon{
      width: calc(100% - 30px);
      h2{
        font-size: 22px;
        line-height: 35px;
        margin-bottom: 16px;
      }
    }
    p{
      margin-bottom: 20px;
      white-space: nowrap;
    }
  }
</style>
