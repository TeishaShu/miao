<template>
  <div class="container out">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <AlertMessage/>

    <div class="row">
      <div class="col-md-5 text-center">
        <img :src="dataProdtct.imageUrl" alt="" class="img-fluid" />
      </div>
      <div class="col-md-7 inner">
        <h3>{{ dataProdtct.title }}</h3>
        <p class="type">{{ dataProdtct.category }}</p>
        <ul class="detail">
          <li v-for="el in detail(dataProdtct.description)">{{ el }}</li>
        </ul>
        <p class="price">
          <em>NT{{ dataProdtct.origin_price | currency }}</em
          ><br />NT{{ dataProdtct.price | currency }}
        </p>
        <div class="add">
          <i class="fas fa-minus" @click="changeNum(-1)"></i>
          <input type="text" v-model.trim="selectNum" />
          <i class="fas fa-plus" @click="changeNum(1)"></i>
        </div>
        <a href="#" class="addCart" @click.prevent="addCart"><i class="fa fa-heart mr-2" aria-hidden="true"></i>加入購物車</a>
      </div>
    </div>
    <cartBtn />
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "product2.scss";
</style>

<script>
import cartBtn from "../../layout/footerStyle/cartBtn.vue";
import AlertMessage from "./../alert/alertMessage.vue";
export default {
  components: {
    cartBtn,
    AlertMessage,
  },
  data() {
    return {
      dataProdtct: {
        category: "",
        content: "",
        description: "",
        id: "",
        image: "",
        imageUrl: "",
        is_enabled: 0,
        num: 0,
        origin_price: "",
        price: "",
        title: "",
        unit: "",
      },
      isLoading: false,
      addCartSend: {},
      selectNum: 1,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const id = this.$route.params.id;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/product/${id}`;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataProdtct = response.data.product;
        }
      });
    },
    addCart() {
      const vm = this;
      this.isLoading = true;
      this.addCartSend.product_id = this.dataProdtct.id;
      this.addCartSend.qty = this.selectNum;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.$http.post(api, { data: this.addCartSend }).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataProdtct = response.data.data.product;
          this.$bus.$emit('message:push','成功加入購物車','success');
        }
      });
    },
    changeNum(num) {
      let orNum = Number(this.selectNum);
      if (num < 0 && orNum <= 1) {
        this.selectNum = 1;
      } else {
        this.selectNum = orNum + num;
      }
    },
    detail(txt) {
      if (txt === undefined) {
        return;
      } // 注意傳入的值.不要使function壞掉
      return txt.split("@");
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
