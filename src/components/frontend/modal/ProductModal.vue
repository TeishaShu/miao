<template>
  <div>
    <a>
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
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  h3{
    height: 84px;
    color: $or;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .proImg img{
    object-fit: contain;
    width: 100%;
    padding: 5px;
    cursor: pointer;
  }
  a{
      box-shadow: 0 0 5px #ababab;
      display: block;
      padding: 10px 0;
      border: 2px solid #fff;
      &:hover{
        border: 2px solid $or_light;
        box-shadow: 0 0 5px $or;
        transition-property: border, box-shadow;
        transition-duration: 0.1s, 0.1s;
        transition-timing-function: ease, ease-in;
        h3{
          color: $red;
          transition: color 0.5s ease;
          cursor: pointer;
        }
      }
    }
    .proTxt{
    padding: 15px;
    p{
      color: $txt;
      line-height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    em{
      font-size: 12px;
      text-decoration: line-through;
      
    }
    i{
      color: $pink;
      border: 1px solid $pink;
      padding: 11px 12px 11px 9px;
      border-radius: 100%;
      float: right;
      vertical-align: middle;
      cursor: pointer;
      &:hover{
        color: $red;
        border: 1px solid $red;
      }
    }
    .type{
      background:$pink;
      color: #fff;
      font-size: 12px;
      padding:1px 10px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  }
  @media(max-width:426px){
    .proTxt{
      padding: 10px;
    }
    h3{
      height: 70px;
    }
  }
</style>

<script>
export default {
  props:{
    item:{
      type: Object,
      default: () => {}
    }
  },
  methods:{
    clickProduct(item){
      let id = item.id;
      this.$router.push({ path: `/product2/${id}` });
    },
    addCart(item) {
      this.$store.dispatch('addCart', item);
    },
  }
}
</script>