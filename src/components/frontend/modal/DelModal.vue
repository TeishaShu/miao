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
import { Cart, AdminGet, CouponGet } from '@/api/api.js'

export default {
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
    },
    reloadApi: {
      type: String,
      required: true
    }
  },
  methods: {
    delSend () {
      const vm = this
      $('#delModal button').prop('disabled', true)
      vm.$http.delete(vm.api).then((response) => {
        this.reloadPage()
        $('#delModal').modal('hide')
        $('#delModal button').prop('disabled', false)
      })
    },
    reloadPage () {
      switch (this.reloadApi) {
        case 'Cart':
          this.cartApi()
          break
        case 'AdminGet':
          this.adminProductApi()
          break
        case 'CouponGet':
          this.adminCoupon()
          break
      }
    },
    cartApi () {
      Cart()
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          if (response.data.success) {
            this.$store.commit('CartStepModules/STEP1DATAAPI', response.data.data)
            this.$store.commit('CartStepModules/NOWSTEP', 1)
          }
        })
    },
    adminProductApi () {
      AdminGet(this.adminProductPage.current_page)
        .then((response) => {
          this.$store.dispatch('updateLoading', false)
          this.$store.dispatch('backSmToggle', false)
          this.$store.commit('BackendModules/ADMINPRODUCTDATA', response.data.products)
          this.$store.commit('BackendModules/ADMINPRODUCTPAGE', response.data.pagination)
        })
    },
    adminCoupon () {
      CouponGet(this.dataPage.current_page)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('updateLoading', false)
            this.$store.dispatch('backSmToggle', false)
            this.couponsData = response.data.coupons
            this.dataPage = response.data.pagination
          }
        })
    }

  }
}
</script>
