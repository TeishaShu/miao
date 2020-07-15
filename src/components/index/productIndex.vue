<template>
  <div class="product" :style="{backgroundImage:'url(' + require('@/assets/images/index/productBg.jpg') + ')'}">
    <div class="container">
      <div class="row">
        <div class="col-md-7 title">
          <h2>
          <div>多項產品</div>挑嘴愛貓吃不膩
          </h2>
          <img src="@/assets/images/index/productCat.png" class="px-block" alt="" />
        </div>
        <div class="col-md-5 categoryBox">
          <div class="row">
            <div class="col-md-6 col-sm-6 cell-6" v-for="(item,index) in productImg" :key="index">
              <a href="#" class="category">
                <img :src="item.img" alt="" />
                <h4>
                    {{item.category}}
                </h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/sass/variables.scss";
  @import "title.scss";
    .product{
      width: 100%;
      background-size: cover;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-color: #eee8e9;
      background-position-y: bottom;
    }
    .title{
      img{
      width: 60%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
    }
    }
    .categoryBox{
      padding: 15px 0;
    }
    .category{
      text-align: center;
      background: white;
      box-shadow: 0 0 5px #ababab;
      display: block;
      padding: 10px;
      margin: 15px 0;
      img{
        width: 100%;
      }
      &:hover{
        border:2px solid $or_light;
        box-shadow:0 0 5px $or;
        h4{
          background: $red;
        }
      }
      h4{
        color: white;
        background-color: #ef9240;
        padding: 6px 25px;
        border-radius: 50px;
        display: inline-block;
        margin-top: 20px;
        font-size: 1.3rem;
      }
    }
  @media(max-width:768px){
    .categoryBox{
      padding: 20px;
      padding-top: 0;
    }
    .category{
      margin: 10px 0;
      h4{
        font-size: 1rem;
        padding: 3px 25px;
        margin-bottom: 0;
      }
    }
    .cell-6{
      flex: 0 0 50%;
      max-width: 50%;
      padding: 0 10px;
    }
  }
  
</style>

<script>
export default {
  name: "product-index",//注意不能大寫
  props: {
    productImg:{
      type: Array,
      default: () => [],
    },
    backgroundImage:{
      type: String,
      default:""
    }
  }
}
</script>