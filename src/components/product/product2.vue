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
  @import "@/assets/scss/variables.scss";
  .out {
    margin-top: 20px;
    min-height:calc(100vh - 300px);
  }
  .inner{
    padding-left: 60px;
  }
  img {
    box-shadow: 0 0 5px #c3c3c3;
    width: 90%;
    padding: 5%;
    margin: 0 auto;
    margin-top: 20px;
  }
  h3 {
    color: $or;
    font-size: 25px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 25px;
  }
  i{
    cursor: pointer;
  }
  .type {
    background: $pink;
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
    color: $txt;
    line-height: 30px;
    display: inline-block;
    font-size: 27px;
    font-weight: bold;
    vertical-align: middle;
    margin-right: 30px;
    color: $red;
    em {
      font-size: 18px;
      text-decoration: line-through;
      color:$txt;
    }
  }
  .add{
    border:1px solid $light_gray;
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
      background: $light_gray;
    }
    input{
      border: none;
      text-align: center;
    }
  }
  .addCart{
    background: $or;
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
  }
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
      this.$store.dispatch('resetNum');
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
