<template>
  <div class="row">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!--Alert-->

    <div class="col-md-12 cou">
      <img src="../../assets/coupon.png" alt="" />
      <div class="coupon">
        <h2>開幕慶優惠</h2>
        <div v-if="haveCoupon">
          <p>
            輸入以下代碼，即可獲得<b style="font-size: 30px; color: red;"
              >全館優惠 {{ coupon.percent }}%</b
            >
            折扣
          </p>
          <div class="box">
            <input :value="coupon.code" id="codyId" />
            <button @click="copyInput">複製</button>
          </div>
        </div>
        <div v-else>123</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "coupon.scss";
</style>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      coupon: [],
      isLoading: false,
      haveCoupon: true,
    };
  },
  methods: {
    getAPI() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupons`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false;
          const couponsData = response.data.coupons;
          const unexpiredCoupon = []; // 未到期可以顯示的優惠劵

          // 塞選可以顯示的優惠劵
          couponsData.forEach((e) => {
            // 1.是否啟用
            if (e.is_enabled) {
              // 2.日期比較.時間內的存到 unexpiredCoupon
              const nowDate = Date.parse(new Date());
              const dueDate = e.due_date;
              if (dueDate >= nowDate) {
                unexpiredCoupon.push(e);
              }
            }
          });

          // 優惠劵顯示在頁面上--------------------------------------------------還沒寫完
          console.log('unexpiredCoupon',unexpiredCoupon)
        }
      });
    },
    copyInput() {
      let txt = $("#codyId").select();
      document.execCommand("copy");
      alert("已經複製優惠碼:" + this.coupon.code);
    },
  },
  created() {
    this.getAPI();
  },
};
</script>
