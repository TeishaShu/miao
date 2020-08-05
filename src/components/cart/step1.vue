<template>
  <div class="row">
    <AlertMessage/>
    <!--沒東西-->
    <div
      class="col-md-12 nothing"
      v-if="dataAPI.carts && dataAPI.carts.length === 0"
    >
      <p>您的購物車內還沒有任何商品!</p>
      <router-link :to="{name:'product'}"><i class="fa fa-angle-double-right pr-2" aria-hidden="true"></i> 快來逛逛</router-link>
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
                <a href="#" class="aBtn" @click.prevent="delOpen(item)"
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
                (省了 NT{{ dataAPI.total - dataCoupon.data.final_total | currency }})
              </td>
              <td>
                NT{{ (dataCoupon.data.final_total) | currency }}
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
            <button class="send" type="submit">送出訂單</button>
          </div>
        </div>
      </form>
    </div>

    <DelModal titleType="產品" :api="delApi" :productName="deleteProductName" />
  </div>
</template>
<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  a.disabled{
    pointer-events: none;
    i{
      color: lighten($or, 20%);
      border: 1px solid lighten($or, 20%);
    }
  }
  .coupon a.disabled{
    pointer-events: none;
    background: lighten($or, 20%);
  }
  .out {
    margin-top: 20px;
  }
  .red{
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
  .pd0{
    padding-left: 0;
    padding-right: 0;
  }
  /* Chrome, Safari, Edge, Opera 。。。input type="number" Remove Arrows/Spinners */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox 。。。input type="number" Remove Arrows/Spinners */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .nothing {
    text-align: center;
    p {
      font-size: 20px;
      font-weight: bold;
      margin-top: 60px;
      margin-bottom: 20px;
    }
    a {
      background: $pink;
      padding: 10px 20px;
      border-radius: 30px;
      color: #fff;
      margin-bottom: 30px;
      display: inline-block;
      font-weight: bold;
      &:hover {
        background: $red;
      }
    }
  }
  th {
    background: #ddd;
    padding: 0 10px;
    margin-bottom: 0;
    font-size: 16px;
    line-height: 35px;
    width: 100%;
  }
  .table {
    img {
      width: 100px;
      border: 1px solid #ddd;
    }
    tr {
      border-bottom: 2px solid #ddd;
    }
    td {
      vertical-align: middle;
      &:nth-child(1) {
        width: 120px;
      }
      &:nth-child(3) {
        color: $red;
      }
      &:last-child{
        text-align: center;
      }
    }
    i {
      color: $or;
      border: 1px solid $or;
      padding: 6px 7px;
      border-radius: 5px;
      cursor: pointer;
    }
    input {
      border-radius: 5px;
      text-align: center;
      width: 30px;
      border: 1.5px solid rgb(173, 173, 173);
      font-size: 14px;
    }
    .couponTr{
      border-bottom: none;
    }
  }
  .info {
    margin-top:30px;
    input {
      width: 100%;
      display: block;
      border-radius: 30px;
      border: 1px solid #ddd;
      padding: 5px 15px;
      margin: 10px 0;
    }
    textarea {
      width: 100%;
      display: block;
      border-radius: 10px;
      border: 1px solid #ddd;
      padding: 10px 15px;
      margin: 10px 0;
    }
  }
  .book {
    margin-top: 30px;
    em {
      text-align: right;
    }
    li {
      width: 100%;
      border-bottom: 1px dotted #ddd;
      padding: 10px;
    }
    .coupon {
      position: relative;
      display: block;
      border-radius: 30px;
      border: 1px solid $or;
      overflow: hidden;
      margin-top: 10px;
      margin-bottom: 5px;
      padding: 0;
      input {
        width: calc(100% - 90px);
        border: none;
        display: inline-block;
        padding: 5px 15px;
      }
      a {
        background: $or;
        color: #fff;
        text-align: center;
        width: 80px;
        display: inline-block;
        height: 100%;
        position: absolute;
        vertical-align: middle;
        line-height: 32px;
        right: 0;
      }
    }
  }
  .send,.send:focus{
    background: $red;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    display: block;
    line-height: 40px;
    margin-bottom: 30px;
    margin-top: 30px;
    border: none;
    width: 100%;
    outline-color: unset;
  }

  .coupon {
    position: relative;
    border-radius: 30px;
    border: 1px solid $or;
    overflow: hidden;
    padding: 0;
    margin: 10px 0;
    text-align: left;
    input {
      width: calc(100% - 90px);
      border: none;
      display: inline-block;
      padding: 5px 15px;
      text-align:left;
    }
    a {
      background: $or;
      color: #fff;
      text-align: center;
      width: 80px;
      display: inline-block;
      height: 100%;
      position: absolute;
      vertical-align: middle;
      line-height: 32px;
      right: 0;
    }
  }
  .total {
    background: #f1f1f1;
  }
  .cheep {
    font-size: 18px;
    color: red;
  }
  span{
    margin-top: -10px;
    display: block;
    font-size: 14px;
    margin-left: 15px;
    margin-bottom: -2px;
  }
  .formInput{
    input,textarea{
      width: 100%;
      border: 1px solid #ced4da;
      padding: 10px;
      border-radius: 0.25rem;
    }
  }
</style>
<script>
import AlertMessage from "@/alert/AlertMessage.vue";
import DelModal from "@/components/modal/DelModal.vue";
import $ from "jquery";
export default {
  components: {
    DelModal,
    AlertMessage,
  },
  created() {
    this.api();
  },
  mounted() {
    this.validateBootstrap2();
  },
  data() { 
    return {
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
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      this.axios.get(api).then((response) => {
        this.$store.dispatch('updateLoading', false);
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
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/coupon`;
      this.$http.post(api, { data: this.textCoupon }).then((response) => {
        this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          this.dataCoupon = response.data;
        } else {
          this.$bus.$emit('message:push',response.data.message,'danger','fa-times');
        }
      });
    },
    async sentStep1() {
      const vm = this;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/order`;
      const dataString = JSON.stringify({
          data: {
              user: this.user,
              message: this.message
          }
      }); 
      await fetch(api, {
            method: 'POST',
            body: dataString,
            headers: new Headers({ 'Content-Type': 'application/json'})
        })
        .then(res => { return res.json(); })
        .then(res => {
            if (res.success) {
              //換路由..注意寫法.不是用 "=""
              vm.$router.push(`/cart/${res.orderId}`);
              this.$emit('nextStep',2); // 父層step更改
              // this.step += 1;  不能在子層改父層的值
            }
        })
        .catch(error => { console.log(error);});


      // 這邊總是會跳過.
      // const postURL = function(dataString){
      //   fetch('https://vue-course-api.hexschool.io/api/teisha/order', {
      //     method: 'POST',
      //     body: dataString,
      //     headers: new Headers({
      //       'Content-Type': 'application/json'
      //     })
      //   })
      //     .then(res => {
      //       alert('here')
      //       return res.json();
      //     })
      //     .then(res => {
      //       console.log('ok!!!',res)
      //       alert('ok')

      //       if (res.data.success) {
      //         //換路由..注意寫法.不是用 "=""
      //         console.log('response',response)
      //         vm.$router.push(`/cart/${response.data.orderId}`);
      //         this.$emit('nextStep',2); // 父層step更改
      //         // this.step += 1;  不能在子層改父層的值
      //       }
      //     })
      //     .catch(error => {
      //       console.log(error)
      //       alert('error')
      //     });
      // }

      // await postURL(dataString);

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
              $(".aBtn").addClass("disabled");
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
