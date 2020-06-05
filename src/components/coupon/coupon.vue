<template>
  <div class="minHeight">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <img src="../../assets/coupon.png" alt="" />
    <div class="coupon">
      <div v-if="haveCoupon">
        <h2>開幕慶優惠</h2>
        <p>
          <b style="font-size: 24px; color: red;"
            >{{ dateFormat(coupon.due_date) }} 前</b
          >輸入以下代碼<br />即可獲得<b style="font-size: 30px; color: red;"
            >全館優惠 {{ coupon.percent }}%</b
          >
          折扣
        </p>
        <div class="box">
          <input :value="coupon.code" id="codyId" />
          <button @click="copyInput">複製</button>
        </div>
      </div>
      <div v-else>目前尚無優惠劵</div>
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
      haveCoupon: false,
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

          // 優惠劵顯示在頁面上
          // 一個以上優惠劵可以用.選擇最新建立的
          if (unexpiredCoupon.length > 1) {
            this.haveCoupon = true;
            const filterNewestCoupon = unexpiredCoupon.map((e) => e.num);
            // 最小數字最新增加的資料
            // const nimNum = Math.min.apply(null,filterNewestCoupon);
            const nimNum = Math.min(...filterNewestCoupon);
            // 陣列的哪筆資料
            const whichOrder = filterNewestCoupon.indexOf(nimNum);
            this.coupon = unexpiredCoupon[whichOrder];
          } else if ((unexpiredCoupon.length = 1)) {
            this.haveCoupon = true;
            this.coupon = unexpiredCoupon[0];
          } else {
            this.haveCoupon = false;
          }
        }
      });
    },
    copyInput() {
      const txt = $("#codyId").select();
      document.execCommand("copy");
      alert("已經複製優惠碼:" + this.coupon.code);
    },
    dateFormat(num) {
      const dd = new Date(num);
      return `${dd.getFullYear()}年${dd.getMonth()}月${dd.getDate()}日`;
    },
  },
  created() {
    this.getAPI();
  },
};
</script>
