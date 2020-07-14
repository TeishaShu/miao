<template>
  <div class="minHeight">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <AlertMessage/>
    
    <img src="@/assets/images/coupon.png" alt="" />
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
@import "../../assets/sass/variables.scss";
@import "coupon.scss";
</style>
<script>
import cartBtn from "@/layout/footerStyle/cartBtn.vue";
import AlertMessage from "@/components/alert/alertMessage.vue";
import $ from "jquery";
export default {
  components:{
    cartBtn,
    AlertMessage
  },
  data() {
    return {
      couponCode: 'DTJ00001',
      isLoading: false,
    };
  },
  mounted(){
    // 這個無法用 created 測試是因為 created 時.子元件還沒掛進來
    // this.alertBus('yhhh');
  },
  methods: {
    copyInput() {
      const txt = $("#codyId").select();
      document.execCommand("copy");
      this.alertBus(`已經複製優惠碼:${this.couponCode}`);
    },
    dateFormat(num) {
      const dd = new Date(num);
      return `${dd.getFullYear()}年${dd.getMonth()+1}月${dd.getDate()}日`;
    },
    alertBus(content){
      this.$bus.$emit('message:push',content,'warning');
    }
  },
};
</script>
