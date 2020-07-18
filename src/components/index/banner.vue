<template>
  <div
      id="carouselExampleControls"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item banner banner1 active">
          <img src="@/assets/images/banner/cat1.jpg" class="w-100 px-block" alt="" />
          <img src="@/assets/images/banner/txt1.png" class="animate__animated animate__slideInRight d-block" alt="" />
          <img src="@/assets/images/banner/cat_s1.jpg" class="w-100 cell-block" alt="" />
        </div>
        <div class="carousel-item banner banner2">
          <img src="@/assets/images/banner/cat2.jpg" class="w-100 px-block" alt="" />
          <img src="@/assets/images/banner/txt2.png" class="animate__animated animate__tada d-block" alt="" />
          <img src="@/assets/images/banner/cat_s2.jpg" class="w-100 cell-block" alt="" />
        </div>
        <div class="carousel-item banner banner3">
          <img src="@/assets/images/banner/cat3.jpg" class="w-100 px-block" alt="" />
          <img src="@/assets/images/banner/txt3.png" class="animate__animated animate__tada d-block" alt="" />
          <img src="@/assets/images/banner/cat_s3.jpg" class="w-100 cell-block" alt="" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/sass/variables.scss";
  .banner{
    position: relative;
    img:nth-child(2){
      position: absolute;
      z-index: 20;
    }
  }
  .banner1{
    img:nth-child(2){
      width: 25%;
      top: 0;
      bottom: 0;
      right: 20%;
      margin: auto;
      animation-duration: 2s;
    }
  }
  .banner2{
    img:nth-child(2){
      width: 20%;
      top: 70px;
      right: 40%;
      animation-duration: 1.5s;
    }
  }
  .banner3{
    img:nth-child(2){
      width: 20%;
      top: 90px;
      right: 34%;
      animation-duration: 1.5s;
      animation-iteration-count:2;
      animation-direction: alternate;
    }
  }
  @media(max-width:992px){
    .banner1{
      img:nth-child(2){
        width: 40%;
        top: 40px;
        right: 15%;
        bottom: unset;
      }
    }
    .banner2{
      img:nth-child(2){
        width: 30%;
        top: 15px;
        right: 0;
        left:0;
        margin: 0 auto;
      }
    }
    .banner3{
      img:nth-child(2){
        width: 30%;
        top: 30px;
        right: 33%;
      }
    }
  }
  @media(max-width:768px){
    .banner1{
      img:nth-child(2){
        width: 47%;
        top: 50px;
        right: 5%;
      }
    }
    .banner2{
      img:nth-child(2){
        width: 40%;
        top: 30px;
        right: 0;
        left:0;
        margin: 0 auto;
      }
    }
    .banner3{
      img:nth-child(2){
        width: 40%;
        top: 40px;
        right: 37%;
      }
    }
}
</style>

