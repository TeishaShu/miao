<template>
  <div
      id="carouselExampleControls"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item banner1 active">
          <img src="@/assets/images/banner/cat1.jpg" class="d-block w-100" alt="" />
          <img src="@/assets/images/banner/txt1.png" class="d-block " alt="" />
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner/cat2.jpg" class="d-block w-100" alt="" />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner/cat3.jpg" class="d-block w-100" alt="" />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
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
  @import "test.scss";
</style>