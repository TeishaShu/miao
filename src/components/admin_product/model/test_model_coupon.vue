<template>
  <div>
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{
                modalStyle === "add" ? "新增優惠券" : "編輯優惠券"
              }}</span>
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
                  <label for="title">*標題</label>
                  <input
                    type="text"
                    id="title"
                    class="form-control"
                    placeholder="請輸入標題"
                    v-model.trim="addNew.title"
                  />
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="addNew.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <!--是否啟用的上面value要注意-->
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">*優惠折扣 (百分比)</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠折扣百分比"
                      v-model.trim="addNew.percent"
                      id="percent"
                    />
                  </div>
                  <div class="form-group col-md-6 dateStyle">
                    <div>到期日</div>
                    <datepicker v-model="date"></datepicker>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="code">*優惠卷代碼</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠卷代碼"
                      v-model.trim="addNew.code"
                      id="code"
                    />
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
            <button type="button" class="btn btn-primary" @click="sentCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠劵</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">「{{ delId.title }}」</strong>
            的優惠劵(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delSend">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'testModelCoupon',
    props:{
        modalStyleComponent:{
            type:String,
            required:true
        }
    }
}
</script>
