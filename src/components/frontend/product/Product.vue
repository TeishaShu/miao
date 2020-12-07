<template>
  <div>
    <AlertMessage />

    <!--content-->
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <Aside :category-item="categoryItem" />
        </div>
        <div class="col-md-9">
          <div class="row productStyle">
            <div
              v-for="item in pagination.pageAry[pagination.current_page - 1]"
              :key="item.id"
              class="col-md-4 col-sm-6 col-6 proCol"
            >
              <ProductModal :item="item" />
            </div>

            <div class="col-md-12 pageOut">
              <paginate
                v-if="pagination.total_pages"
                :page-count="pagination.total_pages"
                :prev-text="'<'"
                :next-text="'>'"
                :page-range="3"
                :value="pagination.current_page"
                @input="clickPage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <CartBtn />
  </div>
</template>

<script>
import ProductModal from '@/components/frontend/modal/ProductModal.vue'
import CartBtn from '@/components/frontend/index/CartBtn.vue'
import Paginate from 'vuejs-paginate'
import AlertMessage from '@/alert/AlertMessage.vue'
import { mapGetters } from 'vuex'
import Aside from './Aside.vue'

export default {
  components: {
    ProductModal,
    CartBtn,
    Paginate,
    AlertMessage,
    Aside
  },
  computed: { // 不適合太複雜的處理.資料處理
    ...mapGetters('productModules', ['products', 'categoryItem', 'pagination'])
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      const categoryStyle = this.$route.params.id // 當前的產品分類
      this.$store.dispatch('productModules/getProduct', categoryStyle)
    },
    selectCategory (style, isPageClick) {
      this.$store.dispatch('productModules/selectCategory', { style, isPageClick })
      // 產品頁切換的話要換路由
      if (isPageClick) {
        this.$router.push(`/product/${style}`)
      }
    },
    clickPage (event) {
      this.$store.dispatch('productModules/clickPage', event)
    }
  }
}
</script>

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
