<template>
  <div>
    <div
      id="delModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <b>刪除{{ titleType }}</b>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span
                aria-hidden="true"
                class="text-white"
              >&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除{{ titleType }} (刪除後將無法恢復)<br>
            <strong class="text-danger">「{{ productName }}」</strong>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary cancelBtn"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger confirm"
              @click="delSend()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DelModalComponent',
  props: {
    titleType: {
      type: String,
      required: true
    },
    api: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    }
  },
  methods: {
    delSend () {
      const vm = this
      $('#delModal button').prop('disabled', true)
      vm.$http.delete(vm.api).then((response) => {
        window.location.reload() // 可以這樣重刷頁面
        $('#delModal').modal('hide')
      })
    }
  }
}
</script>
