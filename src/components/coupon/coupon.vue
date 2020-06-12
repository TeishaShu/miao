<template>
  <div class="minHeight">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <img src="../../assets/coupon.png" alt="" />
    <div class="coupon">
      <div>
        <h2>開幕慶優惠 !</h2>
        <p>輸入以下代碼，即可獲得<br>
          <b style="font-size: 24px; color: red;">
           全館 8折優惠</b>
        </p>
        <div class="box">
          <input value="DTJ00001" id="codyId" />
          <button @click="copyInput">複製</button>
        </div>
      </div>
    </div>
    <couponModal title="複製成功" :content="`已經複製優惠碼: DTJ00001`" />
    <cartBtn />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "coupon.scss";
</style>
<script>
import cartBtn from "../../layout/footerStyle/cartBtn.vue";
import couponModal from './modelCoupon';
import $ from "jquery";
export default {
  components:{
    couponModal,
    cartBtn
  },
  data() {
    return {
      coupon: [],
      isLoading: false,
    };
  },
  methods: {
    copyInput() {
      const txt = $("#codyId").select();
      document.execCommand("copy");
      // alert("已經複製優惠碼:" + this.coupon.code);
      $('#couponModal').modal('show');
    },
    dateFormat(num) {
      const dd = new Date(num);
      return `${dd.getFullYear()}年${dd.getMonth()+1}月${dd.getDate()}日`;
    },
  },
};
</script>
