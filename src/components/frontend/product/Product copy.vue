<template>
  <div>
    <AlertMessage/>

    <!--content-->
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <Aside :categoryItem = "categoryItem" @click/>
        </div>
        <!--<div class="col-md-3 asideBox">
          <ul>
            <li v-for="(item,index) in categoryItem" :key="index"
            @click="selectCategory(`${item.value}`, true)">
              <i class="fas fa-cookie"></i>{{item.label}}
            </li>
          </ul>
        </div>-->
        <div class="col-md-9">
          <div class="row productStyle">
            <div
              class="col-md-4 col-sm-6 col-6 proCol"
              v-for="item in pagination.pageAry[pagination.current_page - 1]"
              :key="item.id"
            >
              <ProductModal :item = "item"/>
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
  @import "@/assets/scss/variables.scss";
  @import "@/assets/scss/page.scss";
  @import "@/assets/scss/aside.scss";
  h3{
    height: 84px;
    color: $or;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .proCol{
    margin: 15px 0;
  }
  
  @media(max-width:426px){
    .proCol{
      padding: 0 10px;
      margin: 10px 0;
    }
  }
</style>

<script>
import ProductModal from "@/components/frontend/modal/ProductModal.vue";
import cartBtn from "@/components/frontend/index/CartBtn.vue";
import Paginate from "vuejs-paginate";
import AlertMessage from "@/alert/AlertMessage.vue";
import Aside from "./Aside.vue";
import _ from 'lodash';
export default {
  components: {
    ProductModal,
    cartBtn,
    Paginate,
    AlertMessage,
    Aside,
  },
  data() {
    return {
      allProducts: [],
      products: [],
      pagination: {
        pageAry: [],
        perPage: 6,
        total_pages: 1,
        current_page: 1,
      },
      categoryItem: [
        {'value': 'all', 'label': '全部商品'},
        {'value': 'can', 'label': '罐頭'},
        {'value': 'dryFood', 'label': '乾糧'},
        {'value': 'snack', 'label': '零食'},
        {'value': 'nutrition', 'label': '營養品'},
      ],
    };
  },
  computed: { //不適合太複雜的處理.資料處理
    categoryItem2() {
      return _.zipObject(
        _.map(this.categoryItem, 'value'),
        _.map(this.categoryItem, 'label')
      );
    },
  },
  methods: {
    getProduct() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/products/all`;
      this.$http.get(api).then((response) => {
        this.$store.dispatch('updateLoading', false);
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
          //全部的原始資料
          this.allProducts = filterProductData;
          //當前的顯示資料
          const categoryStyle = this.$route.params.id; //當前的產品分類
          this.selectCategory(categoryStyle, false)
        }
      });
    },
    clickProduct(item) {
      let id = item.id;
      this.$router.push({ path: `/product2/${id}` });
    },
    addCart(item) {
      this.$store.dispatch('addCart', item);
    },
    selectCategory(style,isPageClick) {
      this.products = [];
      this.pagination.current_page = 1;

      //產品頁切換的話要換路由
      if(isPageClick){
        this.$router.push(`/product/${style}`);
      }

      //換內容
      this.products = (style === "all")
        ? this.allProducts
        : _.filter(this.allProducts, ['category', this.categoryItem2[style]]);

      // 比較前後
      // if (style === "all") {
      //   this.products = this.allProducts;
      // }
      // else {
      //   this.products = _.filter(this.allProducts, ['category', this.categoryItem2[style]]);
        // const selectAry = [];
        // this.allProducts.forEach((el) => {
        //   if (el.category === this.categoryItem2[style]) {
        //     selectAry.push(el);
        //   }
        // });
        // this.products = selectAry;
      // }
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
  created() {
    this.getProduct();
  },
};
</script>
