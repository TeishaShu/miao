<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div
        v-if="dataAPI.is_paid"
        class="link"
      >
        <img
          src="@/assets/images/finished_g.png"
          alt="訂單完成"
        >
        <div class="aStyle">
          <router-link :to="{name:'product'}">
            <i
              class="fa fa-angle-double-right pr-2"
              aria-hidden="true"
            />繼續購物
          </router-link>
        </div>
      </div>
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
            <tr
              v-for="item in dataAPI.products"
              :key="item.id"
            >
              <td>
                <img
                  :src="item.product.imageUrl"
                  alt="訂單產品"
                >
                <p>
                  {{ item.product.title }}
                </p>
              </td>
              <td>{{ item.qty }}</td>
              <td>NT{{ item.product.price | currency }}</td>
            </tr>
            <tr class="total">
              <td colspan="2">
                總計
              </td>
              <td>NT{{ dataAPI.total | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive step2table two">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">
                訂購者資訊
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                姓名
              </td>
              <td>{{ dataAPI.user.name }}</td>
            </tr>
            <tr>
              <td>
                電話
              </td>
              <td>{{ dataAPI.user.tel }}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>{{ dataAPI.user.email }}</td>
            </tr>
            <tr>
              <td>地址</td>
              <td>{{ dataAPI.user.address }}</td>
            </tr>
            <tr>
              <td>備註</td>
              <td>{{ dataAPI.message }}</td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td>
                <!--原來這邊這樣-->
                <span
                  v-if="dataAPI.is_paid && dataAPI.create_at"
                  class="green"
                >已付款</span>
                <span
                  v-else
                  class="red"
                >尚未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="link">
        <a
          v-if="!dataAPI.is_paid"
          href="#"
          class="send"
          @click.prevent="pay"
        >確認付款</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Cart2Order, Cart2Pay } from '@/api/api.js'

export default {
  data () {
    return {
      orderId: '',
      dataAPI: {
        user: {
          userL: ''
        }
      },
      textCoupon: { code: '' }
    }
  },
  created () {
    this.orderId = this.$route.params.orderId // orderId 是對應到 router裡面路由id的名稱
    this.getApi()
  },
  methods: {
    getApi () {
      this.$store.dispatch('updateLoading', true)
      Cart2Order(this.orderId)
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.dataAPI = response.data.order
            if (!response.data.order.is_paid) {
              this.$store.commit('CartStepModules/NOWSTEP', 2)
            } else {
              this.$store.commit('CartStepModules/NOWSTEP', 3)
            }
          }
        })
        .catch(() => {
          console.error('api err')
        })
    },
    pay () {
      this.$store.dispatch('updateLoading', true)
      Cart2Pay(this.orderId)
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.getApi() // 注意要重新刷頁面
            this.$store.commit('CartStepModules/NOWSTEP', 3)
          }
        })
        .catch(() => {
          console.error('api err')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .out {
    margin-top: 20px;
  }
  .red {
    color: red;
    font-weight: bold;
  }
  .green {
    color: #18cf18;
    font-weight: bold;
  }
  .step2table {
    margin-bottom: 30px;
  }
  table{
    img {
      width: 60px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  thead {
    background: #ddd;
    color: #767676;
  }
  th {
    padding: 7px 10px;
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
  }
  p {
    display: inline-block;
  }
  td {
    text-align: center;
    vertical-align: middle;
    border-top: none;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(3) {
      color: #000;
    }
    &:last-child {
      text-align: right;
    }
  }
  tr {
    border-bottom: 1px solid #dee2e6;
  }

  .total {
    background: #f1f1f1;
  }
  .two {
    td {
      &:nth-child(1) {
        width: 150px;
      }
      text-align: left;
    }
  }
  .send {
    background: $primary2;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    display: block;
    line-height: 40px;
    margin-bottom: 30px;
  }
  .link{
    text-align: center;
    img{
      width: 30%;
      margin-bottom: 20px;
    }
  }
  .aStyle a{
    background: #ff7e9c;
    padding: 10px 20px;
    border-radius: 30px;
    color: #fff;
    margin-bottom: 30px;
    display: inline-block;
    font-weight: bold;
    &:hover{
      background: $primary2;
    }
  }
  @media(max-width:768px){
    .link{
      img{
        width: 200px;
      }
    }
  }
</style>
