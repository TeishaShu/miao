<template>
  <div class="container out">
    <AlertMessage/>

    <div class="row">
      <div class="col-md-5 text-center">
        <img :src="dataProduct2.imageUrl" alt="" class="img-fluid" />
      </div>
      <div class="col-md-7 inner">
        <h3>{{ dataProduct2.title }}</h3>
        <p class="type">{{ dataProduct2.category }}</p>
        <ul class="detail">
          <li v-for="el in detail(dataProduct2.description)">{{ el }}</li>
        </ul>
        <p class="price">
          <em>NT{{ dataProduct2.origin_price | currency }}</em
          ><br />NT{{ dataProduct2.price | currency }}
        </p>
        <div class="add">
          <i class="fas fa-minus" @click="changeNum(-1)"></i>
          <input type="text" v-model.trim="selectNum2" />
          <i class="fas fa-plus" @click="changeNum(1)"></i>
        </div>
        <a href="#" class="addCart" @click.prevent="addCartProductIn"><i class="fa fa-heart mr-2" aria-hidden="true"></i>加入購物車</a>
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
import cartBtn from "@/layout/footerStyle/cartBtn.vue";
import AlertMessage from "@/components/alert/alertMessage.vue";
export default {
  components: {
    cartBtn,
    AlertMessage,
  },
  data() {
    return {
    };
  },
  computed: {
    dataProduct2(){
      return this.$store.state.dataProduct2;
    },
    selectNum2(){
      return this.$store.state.selectNum2;
    }
  },
  methods: {
    getProduct2() {
      const id = this.$route.params.id;
      this.$store.dispatch('getProduct2', id);
    },
    addCartProductIn() {
      this.$store.dispatch('addCartProductIn');
    },
    changeNum(num) {
      this.$store.dispatch('changeNum', num)
    },
    detail(txt) {
      if (txt === undefined) {
        return;
      } // 注意傳入的值.不要使function壞掉
      return txt.split("@");
    },
  },
  created() {
    this.getProduct2();
  },
};
</script>
