<template>
  <div>
    <!--這頁的page有紅字、日期的部分-->
    <AlertMessage />

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="30" />
            <th width="120">
              購買人資訊
            </th>
            <th width="120">
              修改訂單
            </th>
            <th width="120">
              訂購產品
            </th>
            <th width="120">
              應付金額
            </th>
            <th width="150">
              是否付款
            </th>
            <!--<th width="120">購買時間</th>-->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tempProduct"
            :key="index"
            :class="{ notUse: !item.is_paid }"
          >
            <td>{{ item.num }}</td>
            <td>
              <ul>
                <li>姓名: {{ item.user.name }}</li>
                <li>電話: {{ item.user.tel }}</li>
                <li>信箱: {{ item.user.email }}</li>
                <li>地址: {{ item.user.address }}</li>
                <li>備註: {{ item.message }}</li>
              </ul>
            </td>
            <td>
              <i
                class="fas fa-pencil-alt"
                @click="openModel(item)"
              />
            </td>
            <td>
              <ul>
                <!--訂購產品項目的顯示...-->
                <li
                  v-for="(pro) in item.products"
                  :key="pro.id"
                >
                  {{ pro.product.title }} * {{ pro.qty }}
                </li>
              </ul>
            </td>
            <td style="text-align:right">
              {{ item.total | currency }}
            </td>
            <td :class="{ okGreen: item.is_paid }">
              {{ item.is_paid ? "已付款" : "未付款" }}
            </td>
            <!--<td>{{ dateForm(item.create_at) }}</td>-->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12 pageOut">
      <paginate
        v-if="dataPage.current_page"
        :page-count="dataPage.total_pages"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
        :value="dataPage.current_page"
        @input="changePage"
      />
    </div>

    <!--model-->
    <div
      id="editModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelEdit"
            >
              <span
                aria-hidden="true"
                style="color:#fff"
              >&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <div class="table-responsive">
                    <table class="table model">
                      <thead>
                        <tr>
                          <th>商品名稱</th>
                          <th>單價</th>
                          <th>訂購數量</th>
                          <th>小計</th>
                        </tr>
                      </thead>
                      <tbody class="pro">
                        <tr
                          v-for="(item, key) in newEdit.products"
                          :key="item.id"
                        >
                          <td>{{ item.product.title }}</td>
                          <td>${{ item.product.price }}</td>
                          <td>
                            <input
                              v-model.trim="item.qty"
                              autocomplete="on"
                              pattern="\d*"
                              type="number"
                              min="1"
                              @change="updateTotal(key, item.qty, item.product.price)"
                              @keyup="keyupUpdateTotal(item.qty)"
                            >
                          </td>
                          <td>${{ item.total }}</td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            總金額
                          </td>
                          <td>
                            $ {{ newEdit.total }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="form-group modelUser">
                  <div class="table-responsive">
                    <table class="table model ">
                      <thead>
                        <tr>
                          <th colspan="2">
                            購買人資訊
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>姓名</td>
                          <td>
                            <input
                              v-model.trim="newEdit.user.name"
                              type="text"
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>電話</td>
                          <td>
                            <input
                              v-model.trim="newEdit.user.tel"
                              type="text"
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>E-mail</td>
                          <td>
                            <input
                              v-model.trim="newEdit.user.email"
                              type="text"
                            >
                          </td>
                        </tr>
                        <tr>
                          <td>地址</td>
                          <td>
                            <input
                              v-model.trim="newEdit.user.address"
                              type="text"
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="cancelEdit"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/alert/AlertMessage.vue'
import $ from 'jquery'
import Paginate from 'vuejs-paginate'
import { BookGet, BookUpdate } from '@/api/api.js'

export default {
  components: {
    Paginate,
    AlertMessage
  },
  data () {
    return {
      tempProduct: [],
      dataPage: {},
      editItem: {
        create_at: 1585625169,
        id: '',
        is_paid: false,
        num: 1,
        products: {},
        total: 1,
        user: {}
      },
      newEdit: {
        create_at: 1585625169,
        id: '',
        is_paid: false,
        num: 1,
        products: {},
        total: 1,
        user: {}
      },
      status: {
        fileUpLoading: false
      }
    }
  },
  created () {
    this.getBook()
  },
  methods: {
    updateTotal (key, qty, price) { // wow!!正則判斷
      const newEditProducts = this.newEdit.products
      newEditProducts[key].total = qty * price
      newEditProducts[key].final_total = qty * price
      let newTotal = 0
      for (const prop in newEditProducts) {
        newTotal += newEditProducts[prop].total
      }
      this.newEdit.total = newTotal
    },
    keyupUpdateTotal (qty) {
      qty = qty.replace(/[^\d]/g, '')
    },
    cancelEdit () { // have red
      this.newEdit = {}
      this.editItem = {}
    },
    getBook (style, num) {
      this.$store.dispatch('updateLoading', true)
      let currentPage = 1
      if (style === 'changePage') {
        currentPage = num
      }
      BookGet(currentPage)
        .then((res) => {
          this.$store.dispatch('updateLoading', false)
          this.$store.dispatch('backSmToggle', false)
          if (res.data.success) {
            this.tempProduct = res.data.orders
            this.dataPage = res.data.pagination
          }
        })
    },
    changePage (event) {
      this.dataPage.current_page = event
      this.getBook('changePage', event)
    },
    dateForm (num) {
      const dd = new Date(num)
      return `${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`
    },
    openModel (item) {
      if (item.is_paid) {
        return
      }
      this.editItem = {}
      this.newEdit = {}
      this.editItem = item // 保留原本的
      this.newEdit = JSON.parse(JSON.stringify(item))
      $('#editModal').modal('show')
    },
    async updateProduct () {
      this.$store.dispatch('updateLoading', true)
      BookUpdate(this.newEdit.id, { data: this.newEdit })
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.getBook()
            $('#editModal').modal('hide')
            const messageObj = {
              fontawesome: 'fa-check',
              message: response.data.message,
              status: 'success'
            }
            this.$store.dispatch('AlertMessageModules/updateMsg', messageObj)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  @import "@/assets/scss/page.scss";
  @import "@/assets/scss/adminPage.scss";
  th {
    padding: 0 5px;
  }
  td {
    text-align: center;
  }
  i {
    cursor: not-allowed;
  }
  .model {
    td {
      text-align: left;
    }
    th {
      text-align: left;
    }
    input
    ,
    textarea {
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      margin: 5px 0;
      width: 100%;
    }
  }
  .modelUser {
    margin-top: 30px;
  }
  .pro {
    input {
      width: 50px;
      text-align: center !important;
    }
  }
</style>
