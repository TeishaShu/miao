<template>
  <div>
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <banner />
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
@import "aside.scss";
@import "product.scss";
@import "../../assets/sass/page.scss";
</style>
<script>
import banner from "../../layout/banner/banner.vue";
import cartBtn from "../../layout/footerStyle/cartBtn.vue";
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      // isLoading: false,
      allProducts: [],
      products: [],
      pagination: {
        pageAry: [],
        perPage: 6,
        total_pages: 1,
        current_page: 1,
      },
    };
  },
  components: {
    banner,
    cartBtn,
    Paginate,
  },
  methods: {
    getProduct() {
      // this.isLoading = true;
      // this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/products/all`;
      this.$http.get(api).then((response) => {
        // this.isLoading = false;
        // this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          //過濾未啟用的產品資訊
          const responseProduct = response.data.products;
          const filterProductData = [];
          responseProduct.forEach((e) => {
            if (!e.is_enabled) {
              return;
            }
            filterProductData.push(e);
          });
          this.products = filterProductData;
          this.allProducts = filterProductData;
          this.page();
        }
      });
    },
    clickProduct(item) {
      let id = item.id;
      this.$router.push({ path: `/product2/${id}` });
    },
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
    selectCategory(style) {
      this.products = [];
      this.pagination.current_page = 1;

      if (style === "all") {
        this.products = this.allProducts;
      } else {
        let selectAry = [];
        this.allProducts.forEach((el) => {
          if (el.category === style) {
            selectAry.push(el);
          }
        });
        this.products = selectAry;
      }
      this.page();
    },
    page() {
      this.pagination.pageAry = [];
      let newAry = [];
      for (let i = 0; i < this.products.length; i++) {
        let onePage = [];
        for (
          let n = i * this.pagination.perPage;
          n < (i + 1) * this.pagination.perPage;
          n++
        ) {
          if (this.products[n] !== undefined) {
            onePage.push(this.products[n]);
          }
        }
        if (onePage.length !== 0) {
          newAry.push(onePage);
        }
      }
      this.pagination.pageAry = newAry;
      this.pagination.total_pages = newAry.length;
    },
  },
  computed: {
    //使用vueX
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
