<template>
  <div class="container out">
    <AlertMessage />

    <div class="row">
      <div class="col-md-5 text-center">
        <img
          :src="dataProduct2.imageUrl"
          alt="產品圖"
          class="img-fluid"
        >
      </div>
      <div class="col-md-7 inner">
        <h3>{{ dataProduct2.title }}</h3>
        <p class="type">
          {{ dataProduct2.category }}
        </p>
        <ul class="detail">
          <li
            v-for="(el,index) in detail(dataProduct2.description)"
            :key="index"
          >
            {{ el }}
          </li>
        </ul>
        <p class="price">
          <em>NT{{ dataProduct2.origin_price | currency }}</em><br>NT{{ dataProduct2.price | currency }}
        </p>
        <div class="add">
          <i
            class="fas fa-minus"
            @click="changeNum(-1)"
          />
          <input
            v-model.trim="selectNum2"
            type="text"
          >
          <i
            class="fas fa-plus"
            @click="changeNum(1)"
          />
        </div>
        <a
          href="#"
          class="addCart"
          @click.prevent="addCartBtn"
        ><i
          class="fa fa-heart mr-2"
          aria-hidden="true"
        />加入購物車</a>
      </div>
    </div>

    <div class="row recommend">
      <div class="col-md-12">
        <h3>相關產品推薦</h3>
      </div>
      <div
        v-for="(item,index) in similarProduct"
        :key="index"
        class="col-md-3 col-sm-6 box"
      >
        <ProductModal :item="item" />
      </div>
    </div>

    <CartBtn />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartBtn from '@/components/frontend/index/CartBtn.vue'
import ProductModal from '@/components/frontend/modal/ProductModal.vue'
import AlertMessage from '@/alert/AlertMessage.vue'

export default {
  components: {
    CartBtn,
    AlertMessage,
    ProductModal
  },
  data () {
    return {
      similarProductAll: [],
      similarProductFilter: []
    }
  },
  computed: {
    ...mapGetters('ProductModules', ['dataProduct2', 'selectNum2', 'similarProduct'])
  },
  watch: {
    $route (to, from) {
      const id = to.params.id
      this.$store.dispatch('ProductModules/getProduct2', id)
      this.$store.dispatch('ProductModules/resetNum')
      this.$store.dispatch('ProductModules/getProduct', 'all')
    }
  },
  created () {
    this.getProduct2()
  },
  methods: {
    getProduct2 () {
      const { id } = this.$route.params
      this.$store.dispatch('ProductModules/getProduct2', id)
      this.$store.dispatch('ProductModules/resetNum')
      this.$store.dispatch('ProductModules/getProduct', 'all')
    },
    changeNum (num) {
      this.$store.dispatch('ProductModules/changeNum', num)
    },
    detail (txt) {
      if (txt === undefined) {
        return
      } // 注意傳入的值.不要使function壞掉
      return txt.split('@')
    },
    ...mapActions('AddCartModules', ['addCartBtn'])
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .recommend{
    margin: 60px 0;
  }
  .box{
    margin-bottom: 30px;
  }
  .out {
    margin-top: 20px;
    min-height:calc(100vh - 300px);
  }
  .inner{
    padding-left: 60px;
  }
  img {
    box-shadow: 0 0 5px lighten($txt, 45%);
    width: 90%;
    padding: 5%;
    margin: 0 auto;
    margin-top: 20px;
  }
  h3 {
    color: $primary1;
    font-size: 25px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 25px;
  }
  i{
    cursor: pointer;
  }
  .type {
    background: $primary2_light;
    color: #fff;
    font-size: 16px;
    padding: 1px 10px;
    border-radius: 20px;
    margin-bottom: 15px;
    display: inline-block;
  }
  ul{
    padding-top: 20px;
  }
  .detail {
    border-top: 1px solid #ddd;
    margin-bottom: 30px;
  }
  .price {
    line-height: 30px;
    display: inline-block;
    font-size: 27px;
    font-weight: bold;
    vertical-align: middle;
    margin-right: 30px;
    color: $primary2;
    em {
      font-size: 18px;
      text-decoration: line-through;
      color:lighten($txt,30%);
    }
  }
  .add{
    border:1px solid lighten($txt,50%);
    border-radius: 20px;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    margin-top: 20px;
    i{
      padding: 10px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background: lighten($txt,50%);
    }
    input{
      border: none;
      text-align: center;
    }
  }
  .addCart{
    background: $primary1;
    border-radius: 20px;
    color: #fff;
    display: block;
    text-align: center;
    padding: 9px;
    margin-top: 30px;
  }
  @media(max-width:768px){
    .inner{
      padding-left: 15px;
      h3{
        text-align: center;
      }

    }
    .type{
      display: none;
    }
    .box{
      flex: 0 0 50%;
      max-width: 50%;
      padding-right: 10px;
      padding-left: 10px;
    }
    .add{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
