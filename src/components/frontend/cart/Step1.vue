<template>
  <div class="row justify-content-center">
    <AlertMessage />
    <!--沒東西-->
    <div
      v-if="dataAPI.carts && dataAPI.carts.length === 0"
      class="col-md-12 nothing"
    >
      <p>您的購物車內還沒有任何商品!</p>
      <router-link :to="{name:'product'}">
        <i
          class="fa fa-angle-double-right pr-2"
          aria-hidden="true"
        /> 快來逛逛
      </router-link>
    </div>
    <!--有東西  v-if="dataAPI.carts.length !== 0"-->
    <div
      v-if="dataAPI.carts && dataAPI.carts.length !== 0"
      class="col-md-10"
    >
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th><b>購物清單</b></th>
              <th>單價</th>
              <th>數量</th>
              <th class="smNone">
                小計
              </th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataAPI.carts"
              :key="item.id"
            >
              <td>
                <img
                  :src="item.product.imageUrl"
                  alt="產品圖"
                  class="smNone"
                >
                <p>{{ item.product.title }}</p>
              </td>
              <td>NT{{ item.product.price | currency }}</td>
              <td style="text-align:center">
                x {{ item.qty }}
              </td>
              <td class="smNone">
                NT{{ (item.product.price * item.qty) | currency }}
              </td>
              <td>
                <a
                  href="#"
                  class="aBtn"
                  @click.prevent="delOpen(item)"
                ><i
                  class="fas fa-trash-alt"
                /></a>
              </td>
            </tr>

            <tr class="total">
              <td colspan="3">
                <b>總計</b>
              </td>
              <td class="smNone" />
              <td>NT{{ dataAPI.total | currency }}</td>
            </tr>
            <tr
              v-show="dataCoupon.success"
              class="total cheep"
            >
              <td>折扣價</td>
              <td class="smNone" />
              <td
                colspan="2"
                style="text-align:right; white-space:nowrap;"
              >
                (省了 NT{{ dataAPI.total - dataCoupon.data.final_total | currency }})
              </td>
              <td>
                NT{{ (dataCoupon.data.final_total) | currency }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="dataAPI.carts && dataAPI.carts.length !== 0"
      class="col-md-6"
    >
      <div class="coupon">
        <input
          v-model.trim="textCoupon.code"
          type="text"
          placeholder="請輸入優惠碼"
          @keyup.13="sendCoupon"
        ><a
          href="#"
          @click.prevent="sendCoupon"
        >送出</a>
      </div>
    </div>
    <!--v-if="dataAPI.carts.length !== 0"-->
    <div class="col-md-10 mt-3">
      <form
        class="needs-validation formInput"
        novalidate
      >
        <div
          v-if="dataAPI.carts && dataAPI.carts.length !== 0"
          class="form-row"
        >
          <div class="col-md-12 mb-3">
            <h5>收件人資訊</h5>
            <label for="name">*收件人姓名</label>
            <input
              id="name"
              v-model="user.name"
              class="form-control"
              type="text"
              required
            >
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人姓名
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="phone">*收件人電話</label>
            <input
              id="phone"
              v-model="user.tel"
              class="form-control"
              type="number"
              required
            >
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人電話
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="email">*E-mail</label>
            <input
              id="email"
              v-model="user.email"
              class="form-control"
              type="email"
              required
            >
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              請輸入收件人E-mail
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="address">*收件人地址</label>
            <input
              id="address"
              v-model="user.address"
              class="form-control"
              type="text"
              required
            >
            <div class="valid-feedback">
              正確!
            </div>
            <div class="invalid-feedback">
              地址欄位不得留空
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label>留言備註</label>
            <textarea
              v-model="message"
              rows="4"
            />
            <button
              class="send"
              type="submit"
            >
              送出訂單
            </button>
          </div>
        </div>
      </form>
    </div>

    <DelModal
      title-type="產品"
      :api="delApi"
      :product-name="deleteProductName"
    />
  </div>
</template>

<script>
import AlertMessage from '@/alert/AlertMessage.vue'
import DelModal from '@/components/frontend/modal/DelModal.vue'
import $ from 'jquery'
import { cart, cartDel, cartCoupon, cartOrder } from '@/api/api.js'

export default {
  components: {
    DelModal,
    AlertMessage
  },
  data () {
    return {
      dataAPI: {
        // carts:[] 加這個或是上面的v-if要多一個條件
      },
      textCoupon: { code: '' },
      dataCoupon: {
        success: false,
        data: {
          final_total: 0
        }
      },
      userStyle: {
        name: false,
        email: false,
        tel: false,
        address: false
      },
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: '',
      delItem: '',
      delApi: '',
      deleteProductName: ''
    }
  },
  created () {
    this.api()
  },
  mounted () {
    this.validateBootstrap2()
  },
  methods: {
    api () {
      this.$store.dispatch('updateLoading', true)
      cart()
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.dataAPI = response.data.data
            this.$store.commit('cartStepModules/NOWSTEP', 1)
          }
        })
        .catch(() => {
          console.error('api err')
        })
    },
    delOpen (item) {
      this.delApi = cartDel(item.id)
      this.deleteProductName = item.product.title
      $('#delModal').modal('show')
    },
    sendCoupon () {
      this.$store.dispatch('updateLoading', true)
      cartCoupon({ data: this.textCoupon })
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.dataCoupon = response.data
            this.$bus.$emit('message:push', response.data.message, 'success', 'fa-check')
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger', 'fa-times')
          }
        })
        .catch(() => {
          console.error('api err')
        })
    },
    async sentStep1 () {
      const vm = this
      await cartOrder({
        data: {
          user: vm.user,
          message: vm.message
        }
      })
        .then((response) => {
          if (response.data.success) {
          // 換路由..注意寫法.不是用 "=""
            vm.$router.push(`/cart/${response.data.orderId}`)
            // this.step += 1;  不能在子層改父層的值
            // this.$emit('nextStep',2); // 父層step更改
            this.$store.commit('cartStepModules/NOWSTEP', 2)
          }
        })
        .catch(() => {
          console.error('api err')
        })
    },
    validateBootstrap2 () {
      const vm = this
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName('needs-validation')
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', (event) => {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            event.preventDefault()
            // 驗證過
            // 按鈕全部不能按
            $('.aBtn').addClass('disabled')
            $('button').prop('disabled', true)
            vm.sentStep1()
          }
          form.classList.add('was-validated')
        },
        false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  h5{
    color: $or;
    margin-bottom: 25px;
    margin-top: 30px;
    font-weight: 600;
  }
  a.disabled{
    pointer-events: none;
    i{
      color: lighten($or, 20%);
      border: 1px solid lighten($or, 20%);
    }
  }
  .coupon{
    a.disabled{
    pointer-events: none;
    background: lighten($or, 20%);
    }
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
  }
  .table {
    img {
      width: 100px;
      border: 1px solid #ddd;
      margin-right: 21px;
    }
    p {
      display: inline-block;
      max-width: calc(100% - 122px);
    }
    tr {
      border-bottom: 2px solid #ddd;
    }
    td {
      vertical-align: middle;
      &:nth-child(3) {
        color: $red;
      }
      &:last-child{
        text-align: center;
      }
    }
  }
  .aBtn i{
    color: $or;
    border: 1px solid $or;
    padding: 6px 7px;
    border-radius: 5px;
    cursor: pointer;
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
    margin-top: 10px;
    margin-bottom: 15px;
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
      border: 1px solid lighten($txt,60%);
      padding: 10px;
      border-radius: 0.25rem;
      display: inline-block;
    }
  }
  textarea {
    width: 100%;
    display: block;
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 10px 15px;
    margin-bottom: 10px;
  }
  label {
    margin-bottom:0;
  }
  @media (max-width:768px){
    .smNone{
      display:none;
    }
    .table p{
      max-width: unset;
    }
  }
</style>
