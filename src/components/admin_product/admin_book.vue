<template>
  <div>
    <!--這頁的page有紅字、日期的部分-->
    <AlertMessage/>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="30"></th>
            <th width="120">購買人資訊</th>
            <th width="120">修改訂單</th>
            <th width="120">訂購產品</th>
            <th width="120">應付金額</th>
            <th width="150">是否付款</th>
            <th width="120">購買時間</th>
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
              <ul v-for="person in item.user" :key="person.id">
                <li>姓名:{{ person.name }}</li>
                <li>地址:{{ person.address }}</li>
              </ul>
            </td>
            <td><i class="fas fa-pencil-alt" @click="openModel(item)"></i></td>
            <td>
              <ul>
                <!--訂購產品項目的顯示...-->
                <li v-for="(pro, key) in item.products" :key="pro.id">
                  {{ pro.product.title }} * {{ pro.qty }}
                </li>
              </ul>
            </td>
            <td style="text-align:right">{{ item.total | currency }}</td>
            <td :class="{ okGreen: item.is_paid }">
              {{ item.is_paid ? "已付款" : "未付款" }}
            </td>
            <td>{{ dateForm(item.create_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12 pageOut">
      <paginate
        :pageCount="dataPage.total_pages"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
        v-if="dataPage.current_page"
        v-model="dataPage.current_page"
        :clickHandler="getBook"
      >
      </paginate>
    </div>

    <!--model-->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelEdit"
            >
              <span aria-hidden="true" style="color:#fff">&times;</span>
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
                        <tr v-for="(item, key) in newEdit.products" :key="item.id">
                          <td>{{ item.product.title }}</td>
                          <td>${{ item.product.price }}</td>
                          <td>
                            <input
                              autocomplete="on"
                              pattern="\d*"
                              type="number"
                              v-model.trim="item.qty"
                              min="1"
                              @change="updateTotal(key, item.qty, item.product.price)"
                              @keyup="keyupUpdateTotal(item.qty)"
                            />
                          </td>
                          <td>${{ item.total }}</td>
                        </tr>
                        <tr>
                          <td colspan="3">總金額</td>
                          <td>
                            $ {{newEdit.total}}
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
                          <th colspan="2">購買人資訊</th>
                        </tr>
                      </thead>
                      <tbody v-for="person in newEdit.user" :key="person.id">
                        <tr>
                          <td>姓名</td>
                          <td>{{ person.name }}</td>
                        </tr>
                        <tr>
                          <td>電話</td>
                          <td>{{ person.tel }}</td>
                        </tr>
                        <tr>
                          <td>E-mail</td>
                          <td>{{ person.email }}</td>
                        </tr>
                        <tr>
                          <td>地址</td>
                          <td>
                            <input type="text" v-model.trim="person.address" />
                          </td>
                        </tr>
                        <tr>
                          <td>留言</td>
                          <td>
                            <textarea row="4" v-model="person.name"></textarea>
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

<style lang="scss" scoped>
  @import "@/assets/sass/variables.scss";
  @import "@/assets/sass/page.scss";
  @import "admin_product.scss";
  th {
    white-space: nowrap;
    padding: 0 5px;
  }
  td {
    text-align: center;
  }
  i {
    cursor: pointer;
  }
  .model {
    td {
      text-align: left;
    }
    th {
      text-align: left;
    }
    input,
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
<script>
import AlertMessage from "@/components/alert/alertMessage.vue";
import $ from "jquery";
import Paginate from "vuejs-paginate";
export default {
  components:{
    Paginate,
    AlertMessage,
  },
  data() {
    return {
      tempProduct: [],
      dataPage: {
        // current_page: 1 //這個刪除
      },
      editItem: {
        create_at: 1585625169,
        id: "",
        is_paid: false,
        num: 1,
        products: {},
        total: 1,
        user: {},
      },
      newEdit: {
        create_at: 1585625169,
        id: "",
        is_paid: false,
        num: 1,
        products: {},
        total: 1,
        user: {},
      },
      status: {
        fileUpLoading: false,
      },
    };
  },
  methods: {
    updateTotal(key, qty, price) { //wow!!
     	// ^[1-99]$     ^\d{2}$
      // valid  "".e.<1   要正則判斷-------------------------------------------------------------------------------------------------
      // if (valid) {
      // }
      // qty.match(/[\d]*/)
      // qty.replace(/e/,'')

      // console.log('qty',qty)

      const newEdit_products = this.newEdit.products;
      newEdit_products[key].total = qty * price;
      newEdit_products[key].final_total = qty * price;
      let newTotal = 0;
      for (let prop in newEdit_products){
        newTotal += newEdit_products[prop].total
      }
      this.newEdit.total = newTotal;
    },
    keyupUpdateTotal(qty) {//-------------------------------------------------------------------------------------------
      // console.log('keyupUpdateTotal',qty)
      qty = qty.replace(/[^\d]/g,'')  
    },
    cancelEdit(){
      this.newEdit = {};
      this.editItem = {};
    },
    getBook() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/orders?page=${this.dataPage.current_page}`;
      this.$http.get(api).then((response) => {
        this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          this.tempProduct = response.data.orders;
          this.dataPage = response.data.pagination;
        }
      });
    },
    dateForm(num) {
      let dd = new Date(num);
      return `${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`;
    },
    edit(item) {
      this.editItem = item;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/order/${item.id}`;
      this.$http.put(api, { data }).then((response) => {
        this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          this.tempProduct = response.data.products;
          this.dataPage = response.data.pagination;
        }
      });
    },
    openModel(item) {
      if (item.is_paid) {
        return;
      }
      this.editItem = {};
      this.newEdit = {};
      this.editItem = item; // 保留原本的
      this.newEdit =  JSON.parse(JSON.stringify(item));
      $("#editModal").modal("show");
    },
    updateProduct() {
      this.$store.dispatch('updateLoading', true);
      const editt = this.newEdit;
      // editt.total =
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/order/${editt.id}`;
      this.$http.put(api, { data: editt }).then((response) => {
        this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          this.getBook();
          $("#editModal").modal("hide");

          this.$bus.$emit('message:push',response.data.message,'success','fa-check');
        }
      });
    },
  },
  created() {
    this.getBook();
  },
};
</script>
