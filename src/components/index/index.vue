<template>
  <div>
    <banner />

    <!--product-->
    <div class="product">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="title">
            多項產品<br>挑嘴愛貓吃不膩
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          123
        </div>
      </div>
    </div>

    <cartBtn />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "./index.scss";
</style>
<script>
import banner from "../../layout/banner/banner.vue";
import cartBtn from "../../layout/footerStyle/cartBtn.vue";
export default {
  data() {
    return {
      allProducts: [],
      products: [],
    };
  },
  components: {
    banner,
    cartBtn,
  },
  methods: {
    addCart(item) {
      // this.isLoading = true;
      let addCartSend = {
        product_id: item.id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.$http.post(api, { data: addCartSend }).then((response) => {
        // this.isLoading = false;
      });
    },
  },
};
</script>
