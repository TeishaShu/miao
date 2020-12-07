<template>
  <div>
    <a>
      <div
        class="proImg"
        @click="clickProduct(item)"
      >
        <img
          :src="`${item.imageUrl}`"
          alt=""
        >
      </div>
      <!--注意這邊style的寫法.backgroundImage、url裡面沒有''-->
      <div class="proTxt">
        <p class="type">{{ item.category }}</p>
        <h3 @click="clickProduct(item)">
          {{ item.title }}
        </h3>
        <p>
          <em>NT{{ item.origin_price | currency }}</em><br>NT{{ item.price | currency }}
        </p>
        <i
          class="fas fa-cart-plus"
          @click.prevent="addCart(item)"
        />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    clickProduct (item) {
      const { id } = item
      this.$router.push({ path: `/product2/${id}` })
    },
    addCart (item) {
      this.$store.dispatch('addCartModules/addCart', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  h3{
    height: 84px;
    color: darken($or,10%);
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
      box-shadow: 0 0 5px lighten($txt,45%);
      display: block;
      padding: 0;
      border: 2px solid #fff;
      &:hover{
        border: 2px solid $or_light;
        box-shadow: 0 0 5px $or;
        transition-property: all;
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
      color: lighten($red, 10%);
      border: 1px solid lighten($red, 5%);
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
      background:lighten($red, 10%);
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
