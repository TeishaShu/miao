<template>
  <div>
  <!--這頁的page有紅字、日期的部分-->
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="30"></th>
            <th width="120">訂購產品</th>
            <th width="120">購買人資訊</th>
            <th width="120">應付金額</th>
            <th width="150">是否付款</th>
            <th width="220">留言訊息</th>
            <th width="120">購買時間</th>
            <th width="120">修改訂單</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in tempProduct"
            :key="index"
            :class="{ notUse: !item.is_paid }"
          >
            <td>{{ item.num }}</td>
            <td>
              <ul><!--訂購產品項目的顯示...-->
                <li v-for="(pro,key) in item.products" :key="pro.id">
                {{pro.product.title}} * {{pro.qty}}</li>
              </ul>
            </td>
            <td>
              <ul v-for="person in item.user" :key="person.id">
                <li>姓名:{{person.name}}</li>
                <li>地址:{{person.address}}</li>
              </ul>
            </td>
            <td style="text-align:right">{{ item.total | currency }}</td>
            <td :class="{ okGreen: item.is_paid }">
              {{ item.is_paid ? "已付款" : "未付款" }}
            </td>
            <td style="text-align:left">{{ item.message }}</td>
            <td>{{dateForm(item.create_at)}}</td>
            <td><i class="fas fa-pencil-alt" @click="openModel(item)"></i></td>
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
                        </tr>
                      </thead>
                      <tbody class="pro">
                        <tr v-for="item in editItem.products" :key="item.id">
                          <td>{{item.product.title}}</td>
                          <td>{{item.product.price}}</td>
                          <td>
                            <i class="fas fa-minus" @click="changeNum(-1)"></i>
                            <input type="text" v-model.trim="item.qty" @change="changeQty"/></td>
                            <i class="fas fa-plus" @click="changeNum(1)"></i>
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
                      <tbody v-for="person in editItem.user" :key="person.id">
                        <tr>
                          <td>姓名</td>
                          <td>{{person.name}}</td>
                        </tr>
                        <tr>
                          <td>電話</td>
                          <td>{{person.tel}}</td>
                        </tr>
                        <tr>
                          <td>E-mail</td>
                          <td>{{person.email}}</td>
                        </tr>
                        <tr>
                          <td>地址</td>
                          <td><input type="text" v-model.trim="person.address"/></td>
                        </tr>
                        <tr>
                          <td>留言</td>
                          <td><textarea row="4" v-model="person.name"></textarea></td>
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
@import "../../assets/sass/variables.scss";
@import "../../assets/sass/page.scss";
@import "admin_product.scss";
th{
  white-space: nowrap;
  padding: 0 5px;
}
td{
  text-align:center;
}
i{
  cursor:pointer;
}
.model{
  td{
    text-align:left;
  }
  th{
    text-align:left;
  }
  input,,textarea{
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    margin:5px 0;
    width:100%;
  }
}
.modelUser{
  margin-top:30px;
}
.pro{
  input{
    width:50px;
    text-align:center !important;
  }
}
</style>
<script>
import Paginate from "vuejs-paginate";
import $ from "jquery";
export default {
  data() {
    return {
      tempProduct: [],
      dataPage: {
        // current_page: 1 //這個刪除
      },
      isLoading: false,
      editItem :{
        create_at:1585625169,
        id:"",
        is_paid:false,
        num:1,
        products:{},
        total:1,
        user:{},
      },
      status:{
        fileUpLoading:false
      }
    };
  },
  components: {
    Paginate,
  },

  methods: {
    getBook() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/orders?page=${this.dataPage.current_page}`;
      this.$http.get(api).then(response => {
        this.isLoading = false;
        console.log('getBook',response.data);
        if (response.data.success) {
          this.tempProduct = response.data.orders;
          this.dataPage = response.data.pagination;
        }
      });
    },
    dateForm(num){
      let dd = new Date(num);
      return `${dd.getFullYear()}/${dd.getMonth()+1}/${dd.getDate()}`;
    },
    edit(item){
      this.editItem = item;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/order/${item.id}`;
      this.$http.put(api,{data}).then(response => {
        this.isLoading = false;
        console.log(response.data);
        if (response.data.success) {
          this.tempProduct = response.data.products;
          this.dataPage = response.data.pagination;
        }
      });
    },
    openModel(item){
      if(item.is_paid){
        return
      }
      this.editItem = {};
      this.editItem = Object.assign({},item);
      $("#editModal").modal("show");
    },
    updateProduct(){
      this.isLoading = true;
      let editt = this.editItem;
      // editt.total = 
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/order/${editt.id}`;
      this.$http.put(api,{"data":editt}).then(response => {
        this.isLoading = false;
        console.log('updateProduct',response.data);
        if (response.data.success) {
          this.getBook();
          $("#editModal").modal("hide");
          alert(response.data.message)
        }
      });
      
    }
  },
  created() {
    this.getBook();
  }
};
</script>
