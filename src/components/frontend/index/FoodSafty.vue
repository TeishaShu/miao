<template>
  <div class="bg">
    <div class="row ml-0 mr-0 safty">
      <div class="col-md-5 title">
        <h2>
          <div>食安把關</div>健康營養別擔心
        </h2>
        <p>
          嚴選產品嚴格控管<br>
          多元創意貓口味<br>
          天然原料檢驗超放心<br>
          任君搭配貓開心!<br>
        </p>
      </div>
      <div class="col-md-6 cookieImg">
        <img
          src="@/assets/images/index/cookie1.png"
          class="parallax_level_1"
          alt="餅乾背景圖"
        >
        <img
          src="@/assets/images/index/cookie2.png"
          class="parallax_level_4"
          alt="餅乾背景圖"
        >
        <img
          src="@/assets/images/index/cookie3.png"
          class="parallax_level_3"
          alt="餅乾背景圖"
        >
      </div>
    </div>
    <img
      src="@/assets/images/index/cookie_cat.png"
      class="saftyCatBg"
      alt="貓咪背景圖"
    >
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  @import "@/assets/scss/indexTitle.scss";
  .safty{
    background-size: contain;
    background-position: right bottom;
    background-repeat: no-repeat;
  }
  .saftyCatBg{
    height: 118%;
    position:absolute;
    right: 0;
    bottom: 0;
  }
  .bg{
    position: relative;

    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#cdc7c7+0,c9c9c9+37,bdb6b3+43,bdb6b3+47,c9c9c9+52,fbfefc+100 */
    background: #cdc7c7; /* Old browsers */
    background: linear-gradient(to bottom,  #cdc7c7 0%,#c9c9c9 37%,#bdb6b3 43%,#bdb6b3 47%,#c9c9c9 52%,#fbfefc 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#cdc7c7', endColorstr='#fbfefc',GradientType=0 ); /* IE6-9 */
  }
  .cookieImg{
    position: relative;
    img{
      background-repeat: no-repeat;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 3;
      &:nth-child(1){
        max-width: 55%;
      }
      &:nth-child(2){
        max-width: 90%;
        right: 17%;
      }
      &:nth-child(3){
        max-width: 100%;
        bottom: -85px;
        right: 22%;
        z-index: 30;
      }
    }
  }
  .title{
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color:darken($txt,30%);
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&1+0,0+100;White+to+Transparent */
    background: linear-gradient(to right,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */

    h2{
      margin-top: 0;
    }
  }
  @media(max-width:1200px){
    .title{
      height: 400px;
    }
    .cookieImg{
      img{
        &:nth-child(1){
          display:none;
        }
        &:nth-child(3){
          max-width: 87%;
          bottom: -40px;
          right: 10%;
        }
      }
    }
  }
  @media(max-width:992px){
    .saftyCatBg{
      height: 89%;
    }
  }
  @media(max-width:768px){
    .title{
      height: 510px;
      padding-top: 35px;
      justify-content:flex-start;
    }
    .saftyCatBg{
      height: 370px;
    }
    .cookieImg{
      img{
        &:nth-child(1){
          display:block;
          max-width: 93%;
        }
        &:nth-child(2){
          display:none;
        }
        &:nth-child(3){
          max-width: 63%;
          bottom: -24px;
          right: unset;
          left: -1%;
        }
      }
    }
  }
  @media(max-width:600px){
    .saftyCatBg{
      height: 240px;
    }
    .title{
      height: 400px;
    }
    .cookieImg{
      img{
        &:nth-child(1){
          display:none;
        }
        &:nth-child(2){
          display:block;
          right:0;
        }
      }
    }
  }
</style>
