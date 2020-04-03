<template>
  <div class="row">
  <div class=" col-md-12 cou">
    <img src="/coupon.png" alt="" />
    <div class="coupon">
      <h2>開幕慶優惠</h2>
      <p>輸入以下代碼，即可獲得<b style="font-size:30px;color:red;">全館優惠 {{coupon.percent}}%</b> 折扣</p>
      <div class="box">
        <input :value="coupon.code" id="codyId" />
        <button @click="copyInput">複製</button>
      </div>
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
  data(){
    return{
      coupon:[]
    }
  },
  methods:{
    getAPI(){
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupons`;
      this.$http.get(api).then(response => {
        if(response.data.success){
          let couponsData = response.data.coupons;
          couponsData.forEach(e => {
            if(e.is_enabled){
              this.coupon = e
            }
          })
        }
      });
    },
    copyInput(){
      let txt = $('#codyId').select();
      document.execCommand("copy");
      alert('已經複製優惠碼:'+ this.coupon.code)
    }
  },
  created(){
    this.getAPI()
  }
}
</script>
