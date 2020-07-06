<template>
  <div>
    <!--loading-->
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <!--原本的model是用data-toggle和data-target.後來換成用click來用.因為編輯也需要用到
      <a href="#" class="add" data-toggle="modal" data-target="#productModal">建立新產品</a>-->
    <a href="#" class="add" @click.prevent="openModel(true)">建立新產品</a>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="30"></th>
            <th width="100">分類</th>
            <th>名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataProdtct" :key="item.id">
            <td>{{ item.num }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td style="text-align:right">{{ item.origin_price | currency }}</td>
            <!--全域的filter...filter資料夾+main.js中的使用.....到底??-->
            <td style="text-align:right">{{ item.price | currency }}</td>
            <td class="state">
              <i class="fas fa-check-circle okGreen" v-if="item.is_enabled"></i
              ><i class="fas fa-minus-circle noRed" v-else></i>
            </td>
            <td>
              <a href="#" class="edit" @click.prevent="openModel(false, item)"
                >編輯</a
              >
              <a href="#" class="del" @click.prevent="delOpen(item)">刪除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--model-->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ addNew ? "建立新產品" : "編輯產品資訊" }}</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">*輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model.trim="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUpLoading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="upImg"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                /><!--???-->
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="titlePro">*標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="titlePro"
                    placeholder="請輸入標題"
                    v-model.trim="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">*分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model.trim="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model.trim="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">*原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model.trim="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">*售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model.trim="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model.trim="tempProduct.description"
                    style="height:100px"
                  ></textarea>
                </div>
                <!--<div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model.trim="tempProduct.content"
                  ></textarea>
                </div>-->
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <!--是否啟用的上面value要注意-->
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
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

    <div class="col-md-12 pageOut">
      <paginate
        :pageCount="dataPage.total_pages"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
        v-if="dataPage.current_page"
        v-model="dataPage.current_page"
        :clickHandler="api"
      >
      </paginate>
    </div>

    <DelModal titleType="產品" :api="delApi" :productName="deleteProductName" />
  </div>
</template>
<script>
import Paginate from "vuejs-paginate";
import DelModal from "./../modal/DelModal.vue";
// import model_product from "./model_product.vue";
import $ from "jquery";
export default {
  data() {
    return {
      dataProdtct: [],
      dataPage: {},
      tempProduct: {
        title: "",
        category: "",
        origin_price: 0,
        price: 0,
        unit: "",
        image: "",
        description: "",
        content: "這是內容",
        is_enabled: 0,
        imageUrl: "",
      }, //新增
      addNew: false, //判斷modal是新增還是編輯
      isLoading: false,
      status: {
        fileUpLoading: false,
      },
      delItem: {},
      delApi: "",
      deleteProductName: "",
    };
  },
  components: {
    Paginate,
    DelModal,
  },
  methods: {
    api() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/products?page=${this.dataPage.current_page}`;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        this.dataProdtct = response.data.products;
        this.dataPage = response.data.pagination;
      });
    },
    openModel(addNewStatus, item) {
      this.addNew = addNewStatus;
      if (this.addNew) {
        (this.tempProduct.title = ""),
          (this.tempProduct.category = ""),
          (this.tempProduct.origin_price = 0),
          (this.tempProduct.price = 0),
          (this.tempProduct.unit = ""),
          (this.tempProduct.image = ""),
          (this.tempProduct.description = ""),
          (this.tempProduct.content = "這是內容"),
          (this.tempProduct.is_enabled = 0),
          (this.tempProduct.imageUrl = "");
      } else {
        // this.tempProduct = item; -->不能這樣寫，因為要把編輯前後的資料分開.所以要避開物件船參考的特性...為了取銷的部分嗎?
        this.tempProduct = Object.assign({}, item);
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      if (
        this.tempProduct.title === "" ||
        this.tempProduct.category === "" ||
        this.tempProduct.origin_price === "" ||
        this.tempProduct.price === "" ||
        this.tempProduct.imageUrl === ""
      ) {
        alert("請填寫資料");
        return;
      }
      // $("#productModal button").prop('disabled',true);
      if (this.addNew) {
        const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/product`;
        this.$http.post(api, { data: this.tempProduct }).then((response) => {
          // this.tempProduct.imageUrl = ''; //新增資料會有舊的...兩個都丟圖片會消失.這個是新增的
          this.isLoading = false;
          this.api();
        });
      } else {
        ///////////////要改這裡.put的方式  https://blog.csdn.net/qq_31837621/article/details/80688854
        const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/product/${this.tempProduct.id}`;
        this.$http.put(api, { data: this.tempProduct }).then((response) => {
          this.isLoading = false;
          this.api();
        });
      }
      $("#productModal").modal("hide");
    },
    delOpen(item) {
      this.delItem = item;
      this.delApi = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/product/${this.delItem.id}`;
      this.deleteProductName = item.title;
      $("#delModal").modal("show");
    },
    upImg() {
      //用console查看this.當圖片丟進來時看$refs的files裡面的files是個陣列
      this.status.fileUpLoading = true;
      let imgUrl = this.$refs.files.files[0];
      const formData = new FormData(); //web api:這是一個物件要用formData傳送。用formData模擬傳統
      formData.append("file-to-upload", imgUrl); //??????????從這邊開始看不懂
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/upload`;
      this.$http
        .post(api, formData, {
          header: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.status.fileUpLoading = false;
          if (response.data.success) {
            // this.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(this.tempProduct)//用這個看.發現沒有getter、setter雙向綁定
            this.$set(this.tempProduct, "imageUrl", response.data.imageUrl); //強制寫入
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
            //和alertMessage.vue、bus.js有關
          }
        });
    },
  },
  created() {
    this.api();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "../../assets/sass/page.scss";
@import "admin_product.scss";
</style>
