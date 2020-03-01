<template>
  <div>
    <div class="container-fluid">
      <div class="container">
        <headerPage />
      </div>
    </div>

    <banner />

    <div class="container">
      <div class="row">
        <div class="col-md-3 asideBox">
          <ul>
            <li><i class="fas fa-cookie"></i>全部商品</li>
            <li><i class="fas fa-cookie"></i>乾糧</li>
            <li><i class="fas fa-cookie"></i>罐頭</li>
            <li><i class="fas fa-cookie"></i>零食</li>
            <li><i class="fas fa-cookie"></i>營養品</li>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="row productStyle">
            <div class="col-md-4 proCol">
              <a href="#">
                <div
                  class="proImg"
                  style="background-image: url('/dryFood/dr01.jpg')"
                ></div>
                <div class="proTxt">
                  <h3>
                    【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                  </h3>
                  <p><em>NT$1000</em><br />NT$800</p>
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </a>
            </div>
            <div class="col-md-4 proCol">
              <a href="#">
                <div
                  class="proImg"
                  style="background-image: url('/dryFood/dr01.jpg')"
                ></div>
                <div class="proTxt">
                  <h3>
                    【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                  </h3>
                  <p><em>NT$1000</em><br />NT$800</p>
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </a>
            </div>
            <div class="col-md-4 proCol">
              <a href="#">
                <div
                  class="proImg"
                  style="background-image: url('/dryFood/dr01.jpg')"
                ></div>
                <div class="proTxt">
                  <h3>
                    【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                  </h3>
                  <p><em>NT$1000</em><br />NT$800</p>
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </a>
            </div>
            <div class="col-md-4 proCol">
              <a href="#">
                <div
                  class="proImg"
                  style="background-image: url('/dryFood/dr01.jpg')"
                ></div>
                <div class="proTxt">
                  <h3>
                    【福壽】貓食-燻雞+茄紅素 20LB（9.07kg） 貓飼料 飼料(A832A02)
                  </h3>
                  <p><em>NT$1000</em><br />NT$800</p>
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </a>
            </div>

            <div class="col-md-4">0</div>

            <div class="col-md-12 pageOut">
              <paginate
                :page-count="20"
                :prev-text="'<'"
                :next-text="'>'"
                :page-range="3"
              >
              </paginate>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="container-fluid pd0">
    <cart/>
    <footerStyle/>
    
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/sass/variables.scss";
@import "aside.scss";
@import "product.scss";
@import "../assets/sass/page.scss";
</style>

<script>
import headerPage from "../layout/headerPage/headerPage.vue";
import banner from "../layout/banner/banner.vue";
import Paginate from "vuejs-paginate";
import footerStyle from "../layout/footerStyle/footerStyle.vue";
import cart from "../layout/footerStyle/cart.vue"
export default {
  name: "home",
  components: {
    headerPage,
    banner,
    Paginate,
    footerStyle,
    cart
  },
  methods: {
  },
};
</script>
