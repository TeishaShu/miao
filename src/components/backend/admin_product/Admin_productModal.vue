<template>
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
</template>
<script>
export default {
  data () {
    return {
      addNew: false // 判斷modal是新增還是編輯
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/adminPage.scss";
</style>
