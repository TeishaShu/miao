<template>
  <div class="container out">
    <div class="row">
      <div class="col-md-5">
        <img src="/dryFood/dr01.jpg" alt="" class="img-fluid" />
      </div>
      <div class="col-md-7 inner">
      
        <h3>【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)</h3>
        <p class="type">乾糧</p>
        <p class="detail">
          複合蔬果膳食纖維化毛配方、均衡w3及w6不飽和脂肪酸、低鎂、低灰分配方
        </p>
        <p class="price"><em>NT$1000</em><br />NT$820</p>
        <div class="add">
          <i class="fas fa-minus"></i>
          <input type="text" />
          <i class="fas fa-plus"></i>
        </div>
        <a href="#" class="addCart">加入購物車</a>
      </div>
    </div>
    <cartBtn/>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "product2.scss";
</style>
<script>
import cartBtn from "../../layout/footerStyle/cartBtn.vue";
export default {
  components:{
    cartBtn
  },
};
</script>
