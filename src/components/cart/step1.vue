<template>
  <div class="row">
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!--沒東西-->
    <div
      class="col-md-12 nothing"
      v-if="dataAPI.carts && dataAPI.carts.length === 0"
    >
      <p>您的購物車內還沒有任何商品!</p>
      <router-link to="/">>> 快來逛逛</router-link>
    </div>
    <!--有東西  v-if="dataAPI.carts.length !== 0"-->
    <div class="col-md-12" v-if="dataAPI.carts && dataAPI.carts.length !== 0">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">購物清單</th>
              <th width="200px">單價</th>
              <th width="200px">數量</th>
              <th width="220px">小計</th>
              <th width="120px">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataAPI.carts" :key="item.id">
              <td>
                <img :src="item.product.imageUrl" alt="" />
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td>NT{{ item.product.price | currency }}</td>
              <td style="text-align:center">
                {{ item.qty }}
              </td>
              <td>NT{{ (item.product.price * item.qty) | currency }}</td>
              <td>
                <i class="fas fa-trash-alt" @click="delcart(item.id)"></i>
              </td>
            </tr>

            <tr class="total">
              <td colspan="5">總計</td>
              <td>NT{{ dataAPI.total | currency }}</td>
            </tr>
            <tr class="total cheep" v-show="dataCoupon.success">
              <td colspan="3">折扣價</td>
              <td colspan="2" style="text-align:right; white-space:nowrap;">
                (省了 NT{{ dataCoupon.data.final_total | currency }})
              </td>
              <td>
                NT{{ (dataAPI.total - dataCoupon.data.final_total) | currency }}
              </td>
            </tr>
            <tr class="couponTr">
              <td colspan="6">
                <div class="coupon">
                  <input
                    type="text"
                    placeholder="請輸入優惠碼"
                    v-model.trim="textCoupon.code"
                    @keyup.13="sendCoupon"
                  /><a href="#" @click.prevent="sendCoupon">送出</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--v-if="dataAPI.carts.length !== 0"-->
    <div class="col-md-12 mt-3">
      <form class="needs-validation formInput" novalidate>
        <div
          class="form-row"
          v-if="dataAPI.carts && dataAPI.carts.length !== 0"
        >
          <div class="col-md-12 mb-3">
            <h5 class="mb-4">收件人資訊</h5>
            <input
              class="form-control"
              type="text"
              placeholder="*收件人姓名"
              v-model="user.name"
              @blur="blurUser('name')"
              required
            />
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人姓名
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <input
              class="form-control"
              type="number"
              placeholder="*收件人電話"
              v-model="user.tel"
              @blur="blurUser('tel')"
              required
            />
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人電話
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <input
              class="form-control"
              type="email"
              placeholder="*E-mail"
              v-model="user.email"
              @blur="blurUser('email')"
              required
            />
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人E-mail
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <input
              class="form-control"
              type="text"
              placeholder="*收件人地址"
              v-model="user.address"
              @blur="blurUser('address')"
              required
            />
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              地址欄位不得留空
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <textarea
              rows="4"
              placeholder="留言備註"
              v-model="message"
            ></textarea>
            <!--<a href="#" class="send" @click.prevent="sentStep1">送出訂單</a>-->
            <button class="send" type="submit" >送出訂單</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "step1.scss";
</style>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      dataAPI: {
        //carts:[] 加這個或是上面的v-if要多一個條件
      },
      textCoupon: { code: "" },
      dataCoupon: {
        success: false,
        data: {
          final_total: 0,
        },
      },
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      userStyle: {
        name: false,
        email: false,
        tel: false,
        address: false,
      },
      message: "",
    };
  },
  created() {
    this.api();
    this.validateBootstrap();
  },
  methods: {
    api() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataAPI = response.data.data;
        }
      });
    },
    delcart(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart/${id}`;
      this.$http.delete(api).then((response) => {
        this.isLoading = false;
        // console.log(response.data);
        if (response.data.success) {
          //   this.dataAPI = response.data.data;
          this.api();
        }
      });
    },
    sendCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/coupon`;
      this.$http.post(api, { data: this.textCoupon }).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataCoupon = response.data;
        } else {
          alert(response.data.message);
        }
      });
    },
    blurUser(name) {
      if (this.user[name] === "") {
        this.userStyle[name] = true;
      } else {
        this.userStyle[name] = false;
      }
    },
    sentStep1000() {
      if (
        this.user.name === "" ||
        this.user.email === "" ||
        this.user.tel === "" ||
        this.user.address === ""
      ) {
        return alert("請填寫資料");
      }

      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/order`;
      let userL = this.user;
      let messageL = this.message;
      this.$http
        .post(api, { data: { user: { userL }, messageL } })
        .then((response) => {
          if (response.data.success) {
            console.log("res", response);
            console.log(this); //換路由...先做後面的頁面
            this.$route.push = `/cart/step2/${response.data.orderId}`;
          }
        });
    },
    validateBootstrap() {
      ("use strict");
      window.addEventListener(
        "load",
        function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation");
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener(
              "submit",
              function(event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                  console.log('0000')
                }
                form.classList.add("was-validated");
                console.log('0')
              },
              false
            );
          });
        },
        false
      );
    },
  },
  
};
</script>
