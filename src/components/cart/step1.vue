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
      <router-link :to="{name:'product'}">>> 快來逛逛</router-link>
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
                <a href="#" @click.prevent="delOpen(item)"
                  ><i class="fas fa-trash-alt" @click="delOpen(item)"></i
                ></a>
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
            <button class="send" type="submit" @click="validateBootstrap2()">送出訂單</button>
          </div>
        </div>
      </form>
    </div>

    <DelModal titleType="產品" :api="delApi" :productName="deleteProductName" />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/sass/variables.scss";
@import "step1.scss";
</style>
<script>
import DelModal from "@/components/modal/DelModal.vue";
import $ from "jquery";
export default {
  components: {
    DelModal,
  },
  created() {
    this.api();
  },
  // mounted() {
  //   this.validateBootstrap2();
  // },
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
      userStyle: {
        name: false,
        email: false,
        tel: false,
        address: false,
      },
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
      delItem: "",
      delApi: "",
      deleteProductName: "",
    };
  },
  
  methods: {
    api() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.axios.get(api).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.dataAPI = response.data.data;
          this.$emit("nextStep",1); // 父層step更改
        }
      });
    },
    delOpen(item) {
      this.delItem = item;
      this.delApi = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart/${item.id}`;
      this.deleteProductName = item.product.title;
      $("#delModal").modal("show");
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
    async sentStep1() {
      const vm = this;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/order`;
      const userL = this.user;
      const messageL = this.message;

      const dataContent = { data: { user: { userL }, messageL } };
      const dataString = JSON.stringify(dataContent); 
      alert('out1')
      // 這邊總是會跳過.
      const postURL = await function(dataString){
        fetch('https://vue-course-api.hexschool.io/api/teisha/order', {
          method: 'POST',
          body: dataString,
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(res => {
            alert('here')
            return res.json();
          })
          .then(res => {
            console.log('ok!!!',res)
            alert('ok')

            if (res.data.success) {
              //換路由..注意寫法.不是用 "=""
              console.log('response',response)
              vm.$router.push(`/cart/${response.data.orderId}`);
              this.$emit('nextStep',2); // 父層step更改
              // this.step += 1;  不能在子層改父層的值
            }
          })
          .catch(error => {
            console.log(error)
            alert('error')
          });
      }

      await postURL(dataString);

      
      console.log('zzz')
      debugger

    },
    validateBootstrap2(){
      const vm = this;
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      const validation =Array.prototype.filter.call(forms, function(form) {
        form.addEventListener("submit",function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              // 驗證過
              //按鈕全部不能按
              $("a").addClass("disabled");
              $("button").prop("disabled", true);
              vm.sentStep1();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
  },
};
</script>
