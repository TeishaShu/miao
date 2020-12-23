<template>
  <div>
    <AlertMessage />

    <!--原本的model是用data-toggle和data-target.後來換成用click來用.因為編輯也需要用到
      <a href="#" class="add" data-toggle="modal" data-target="#productModal">建立新產品</a>-->
    <a
      href="#"
      class="add"
      @click.prevent="openModel(true)"
    >建立新產品</a>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="30" />
            <th width="100">
              分類
            </th>
            <th>名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="150">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in adminProductData"
            :key="item.id"
          >
            <td>{{ item.num }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td style="text-align:right">
              {{ item.origin_price | currency }}
            </td>
            <!--全域的filter...filter資料夾+main.js中的使用.....到底??-->
            <td style="text-align:right">
              {{ item.price | currency }}
            </td>
            <td class="state">
              <i
                v-if="item.is_enabled"
                class="fas fa-check-circle okGreen"
              /><i
                v-else
                class="fas fa-minus-circle noRed"
              />
            </td>
            <td>
              <a
                href="#"
                class="edit"
                @click.prevent="openModel(false, item)"
              >編輯</a>
              <a
                href="#"
                class="del"
                @click.prevent="delOpen(item)"
              >刪除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--model-->
    <div
      id="productModal"
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
              <span>{{ addNew ? "建立新產品" : "編輯產品資訊" }}</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                aria-hidden="true"
                style="color:#fff"
              >&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">*輸入圖片網址</label>
                  <input
                    id="image"
                    v-model.trim="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i
                      v-if="status.fileUpLoading"
                      class="fas fa-spinner fa-spin"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    @change="upImg"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt="產品圖"
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="titlePro">*標題</label>
                  <input
                    id="titlePro"
                    v-model.trim="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">*分類</label>
                    <input
                      id="category"
                      v-model.trim="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model.trim="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">*原價</label>
                    <input
                      id="origin_price"
                      v-model.trim="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">*售價</label>
                    <input
                      id="price"
                      v-model.trim="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model.trim="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    style="height:100px"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    >
                    <!--是否啟用的上面value要注意-->
                    <label
                      class="form-check-label"
                      for="is_enabled"
                    >
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
        v-if="adminProductPage.current_page"
        v-model="adminProductPage.current_page"
        :page-count="adminProductPage.total_pages"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
        :click-handler="api"
      />
    </div>

    <DelModal
      title-type="產品"
      :api="delApi"
      :product-name="deleteProductName"
      reload-api="AdminGet"
    />
  </div>
</template>
<script>
import Paginate from 'vuejs-paginate'
import DelModal from '@/components/frontend/modal/DelModal.vue'
import AlertMessage from '@/alert/AlertMessage.vue'
import $ from 'jquery'
import { AdminGet, AdminProduct, AdminEdit, AdminDel, AdminUpload } from '@/api/api.js'

export default {
  components: {
    Paginate,
    DelModal,
    AlertMessage
  },
  data () {
    return {
      delItem: {},
      delApi: '',
      deleteProductName: ''
    }
  },
  computed: {
    adminProductData () {
      return this.$store.state.BackendModules.adminProductData
    },
    adminProductPage () {
      return this.$store.state.BackendModules.adminProductPage
    },
    tempProduct () {
      return this.$store.state.BackendModules.tempProduct
    },
    addNew () {
      return this.$store.state.BackendModules.addNew
    },
    status () {
      return this.$store.state.BackendModules.status
    }
  },
  created () {
    this.api()
  },
  methods: {
    api () {
      this.$store.dispatch('updateLoading', true)
      AdminGet(this.adminProductPage.current_page)
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          this.$store.dispatch('backSmToggle', false)
          this.$store.commit('BackendModules/ADMIN_PRODUCT_DATA', response.data.products)
          this.$store.commit('BackendModules/ADMIN_PRODUCT_PAGE', response.data.pagination)
        })
    },
    openModel (addNewStatus, item) {
      this.$store.commit('AdminProductModules/ADD_NEW', addNewStatus)
      if (this.addNew) {
        const newItem = {
          title: '',
          category: '',
          origin_price: 0,
          price: 0,
          unit: '',
          image: '',
          description: '',
          content: '這是內容',
          is_enabled: 0,
          imageUrl: ''
        }
        this.$store.commit('AdminProductModules/TEMP_PRODUCT', newItem)
      } else {
        // 把編輯前後的資料分開.注意物件特性
        this.$store.commit('AdminProductModules/TEMP_PRODUCT', { ...item })
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      this.$store.dispatch('updateLoading', true)
      if (
        this.tempProduct.title === '' ||
        this.tempProduct.category === '' ||
        this.tempProduct.origin_price === '' ||
        this.tempProduct.price === '' ||
        this.tempProduct.imageUrl === ''
      ) {
        const messageObj = {
          fontawesome: 'fa-times',
          message: '請正確填寫資料',
          status: 'danger'
        }
        this.$store.dispatch('AlertMessageModules/updateMsg', messageObj)
        this.$store.dispatch('updateLoading', false)
        return
      }
      if (this.addNew) {
        AdminProduct({ data: this.tempProduct })
          .then((response) => {
          // this.tempProduct.imageUrl = ''; //新增資料會有舊的...兩個都丟圖片會消失.這個是新增的
            this.$store.dispatch('updateLoading', false)
            this.api()
          })
      } else {
        AdminEdit(this.tempProduct.id, { data: this.tempProduct })
          .then((response) => {
            if (response.data.success) {
              const messageObj = {
                fontawesome: 'fa-check',
                message: response.data.message,
                status: 'success'
              }
              this.$store.dispatch('AlertMessageModules/updateMsg', messageObj)
              this.$store.dispatch('updateLoading', false)
              this.api()
            }
          })
      }
      $('#productModal').modal('hide')
    },
    delOpen (item) {
      this.delApi = AdminDel(item.id)
      this.deleteProductName = item.title
      $('#delModal').modal('show')
    },
    upImg () {
      // 用 console 查看 this.當圖片丟進來時看 $refs 的 files 裡面的 files 是個陣列
      this.$store.commit('AdminProductModules/STATUS', true)
      const imgUrl = this.$refs.files.files[0]
      const formData = new FormData() // web api:這是一個物件要用formData傳送。用formData模擬傳統
      formData.append('file-to-upload', imgUrl)

      AdminUpload(formData)
        .then((response) => {
          this.$store.commit('AdminProductModules/STATUS', false)
          if (response.data.success) {
          // console.log(this.tempProduct)//用這個看.發現沒有getter、setter雙向綁定
            this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl) // 強制寫入
          } else {
            const messageObj = {
              fontawesome: 'fa-times',
              message: response.data.message,
              status: 'danger'
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
</style>
