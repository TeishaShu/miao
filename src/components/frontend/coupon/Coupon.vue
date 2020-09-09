<template>
  <div class="minHeight">
    <AlertMessage/>

    <img src="@/assets/images/coupon.png" class="animate__animated animate__bounceIn" alt="" />
    <div class="coupon">
      <div>
        <h2>開幕慶優惠 !</h2>
        <p>輸入以下代碼，即可獲得<br>
          <b style="font-size: 24px; color: red;">
           全館 8折優惠</b>
        </p>
        <div class="box">
          <input v-model="couponCode" id="codyId" readonly />
          <button @click="copyInput">複製</button>
        </div>
      </div>
    </div>
    <cartBtn />
  </div>
</template>

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
      background: $or;
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
      color: rgb(131, 131, 131);
      font-weight: bold;
      vertical-align: middle;
    }
    button{
      background:$red;
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
    border: 2px solid $red;
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

<script>
import cartBtn from '@/components/frontend/index/CartBtn.vue';
import AlertMessage from '@/alert/AlertMessage.vue';
import $ from 'jquery';

export default {
  components: {
    cartBtn,
    AlertMessage,
  },
  data() {
    return {
      couponCode: 'DTJ00001',
    };
  },
  mounted() {
    // 這個無法用 created 測試是因為 created 時.子元件還沒掛進來
    // this.alertBus('yhhh');
  },
  methods: {
    copyInput() {
      const txt = $('#codyId').select();
      document.execCommand('copy');
      this.alertBus(`已經複製優惠碼: ${this.couponCode}`);
    },
    dateFormat(num) {
      const dd = new Date(num);
      return `${dd.getFullYear()}年${dd.getMonth() + 1}月${dd.getDate()}日`;
    },
    alertBus(content) {
      this.$bus.$emit('message:push', content, 'success', 'fa-check');
    },
  },
};
</script>
