<template>
  <div>
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <banner />
    <div class="container">
      <div class="row">
        <div class="col-md-3 asideBox">
          <ul>
            <li @click="selectCategory('all')">
              <i class="fas fa-cookie"></i>全部商品
            </li>
            <li @click="selectCategory('乾糧')">
              <i class="fas fa-cookie"></i>乾糧
            </li>
            <li @click="selectCategory('罐頭')">
              <i class="fas fa-cookie"></i>罐頭
            </li>
            <li @click="selectCategory('零食')">
              <i class="fas fa-cookie"></i>零食
            </li>
            <li @click="selectCategory('營養品')">
              <i class="fas fa-cookie"></i>營養品
            </li>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="row productStyle">
            <div
              class="col-md-4 col-sm-6 col-6 proCol"
              v-for="item in pagination.pageAry[pagination.current_page - 1]"
              :key="item.id"
            >
              <a>
                <!--<pre>{{item}}</pre>-->
                <div @click="clickProduct(item)" class="proImg">
                  <img :src="`${item.imageUrl}`" alt="" />
                </div>
                <!--注意這邊style的寫法.backgroundImage、url裡面沒有''-->
                <div class="proTxt">
                  <p class="type">{{ item.category }}</p>
                  <h3 @click="clickProduct(item)">
                    {{ item.title }}
                  </h3>
                  <p>
                    <em>NT{{ item.origin_price | currency }}</em
                    ><br />NT{{ item.price | currency }}
                  </p>
                  <i
                    class="fas fa-cart-plus"
                    @click.prevent="addCart(item)"
                  ></i>
                </div>
              </a>
            </div>

            <div class="col-md-12 pageOut">
              <paginate
                v-if="pagination.total_pages"
                :page-count="pagination.total_pages"
                :prev-text="'<'"
                :next-text="'>'"
                :page-range="3"
                v-model="pagination.current_page"
              >
              </paginate>
            </div>
          </div>
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
