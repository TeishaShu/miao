<template>
  <div class="row">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="col-md-12">
      <div class="table-responsive step2table">
        <table class="table">
          <thead>
            <tr>
              <th>商品資訊</th>
              <th>數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataAPI.products" :key="item.id">
              <td>
                <img :src="item.product.imageUrl" alt />
                <p>
                  {{ item.product.title }}
                </p>
              </td>
              <td>{{ item.qty }}</td>
              <td>NT{{ item.product.price | currency }}</td>
            </tr>
            <tr class="total">
              <td colspan="2">總計</td>
              <td>NT{{ dataAPI.total | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive step2table two">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">訂購者資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                姓名
              </td>
              <td>{{ dataAPI.user.userL.name }}</td>
            </tr>
            <tr>
              <td>
                電話
              </td>
              <td>{{ dataAPI.user.userL.tel }}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>{{ dataAPI.user.userL.email }}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{ dataAPI.user.userL.address }}</td>
            </tr>
            <!--<tr>  api沒有送這個資料
              <td>備註</td>
              <td>{{dataAPI.user.userL.name}}</td>
            </tr>-->
            <tr>
              <td>付款狀態</td>
              <td>
                <!--原來這邊這樣-->
                <span v-if="dataAPI.is_paid && dataAPI.create_at" class="green"
                  >已付款</span
                >
                <span v-else class="red">尚未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="link">
        <router-link
          :to="{ name: 'product' }"
          class="aStyle"
          v-if="dataAPI.is_paid"
          >>> 逛逛其他產品</router-link
        >
        <a href="#" class="send" @click.prevent="pay" v-else>確認付款</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
// @import "step1.scss";
@import "step2.scss";
</style>
<script>
export default {
  data() {
    return {
      orderId: "",
      isLoading: false,
      dataAPI: {
        user: {
          userL: "",
        },
      },
      textCoupon: { code: "" },
    };
  },
  // props: {
  //   step: Number,
  // },
  created() {
    this.orderId = this.$route.params.orderId; //orderId 是對應到 router裡面路由id的名稱
    this.getApi();
  },
  methods: {
    getApi() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/order/${this.orderId}`;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataAPI = response.data.order;
        }
      });
    },
    pay() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/pay/${this.orderId}`;
      this.$http.post(api).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.getApi(); //注意要重新刷頁面
          this.$emit("nextStep",3); // 父層step更改
        }
      });
    },
  },
};
</script>
