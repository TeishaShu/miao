<template>
  <div>
    <AlertMessage />

    <a
      href="#"
      class="add"
      @click.prevent="openModel('add')"
    >建立新的優惠卷</a>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="90">
              排序
            </th>
            <th>名稱</th>
            <th>優惠碼</th>
            <th width="120">
              折扣比
            </th>
            <th width="150">
              到期日
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
            v-for="item in couponsData"
            :key="item.id"
          >
            <td>{{ item.num }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td style="text-align:center;">
              {{ item.percent }}%
            </td>
            <td style="text-align:center;">
              {{ dateForm(item.due_date) }}
            </td>
            <td
              class="state"
              style="text-align:center;"
            >
              <i
                v-show="item.is_enabled"
                class="fas fa-check-circle okGreen"
              /><i
                v-show="!item.is_enabled"
                class="fas fa-minus-circle noRed"
              />
            </td>
            <td>
              <a
                href="#"
                class="edit"
                @click.prevent="openModel('edit', item)"
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
    <div class="col-md-12 pageOut">
      <paginate
        v-if="dataPage.current_page"
        v-model="dataPage.current_page"
        :page-count="dataPage.total_pages"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
        :click-handler="getCoupon"
      />
    </div>
    <!--model-->
    <div
      id="addModal"
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
              <span>{{ modalStyle === "add" ? "新增優惠券" : "編輯優惠券" }}</span>
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
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">*標題</label>
                  <input
                    v-model.trim="addNew.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      v-model="addNew.is_enabled"
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

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">*優惠折扣 (百分比)</label>
                    <input
                      v-model.trim="addNew.percent"
                      type="number"
                      class="form-control"
                      placeholder="請輸入優惠折扣百分比"
                      max="99"
                      min="1"
                      maxlength="2"
                      @keyup="keyupUpdatePercent(addNew.percent)"
                    >
                  </div>
                  <div class="form-group col-md-6 dateStyle">
                    <div>到期日</div>
                    <datepicker
                      v-model="date"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="code">*優惠卷代碼</label>
                    <input
                      v-model.trim="addNew.code"
                      type="text"
                      class="form-control"
                      placeholder="請輸入優惠卷代碼"
                    >
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
              @click="sentCoupon"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <DelModal
      title-type="優惠劵"
      :api="delApi"
      :product-name="deleteProductName"
    />
  </div>
</template>

<script>
import DelModal from '@/components/frontend/modal/DelModal.vue'
import Datepicker from 'vuejs-datepicker'
import Paginate from 'vuejs-paginate'
import AlertMessage from '@/alert/AlertMessage.vue'
import $ from 'jquery'
import { couponGet, couponAdd, couponEdit } from '@/api/api.js'

export default {
  components: {
    Datepicker,
    Paginate,
    DelModal,
    AlertMessage
  },
  data () {
    return {
      couponsData: [],
      addNew: {
        title: '',
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: ''
      },
      dataPage: {
        // current_page: 1 //這個刪除
      },
      date: '',
      modalStyle: '',
      delId: {},
      delApi: '',
      deleteProductName: ''
    }
  },
  watch: { // 這個用function順序會不對.js跟vue會不同.watch可以，裡面是物件
    date (value) {
      this.addNew.due_date = +new Date(value)
    }
  },
  created () {
    const today = +new Date()
    this.addNew.due_date = today
    this.date = this.dateForm(today)
    this.getCoupon()
  },
  methods: {
    getCoupon () {
      this.$store.dispatch('updateLoading', true)
      couponGet(this.dataPage.current_page)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('updateLoading', false)
            this.$store.dispatch('backSmToggle', false)
            this.couponsData = response.data.coupons
            this.dataPage = response.data.pagination
          }
        })
        .catch(() => {
          console.error('getCoupon api err')
        })
    },
    keyupUpdatePercent (val) { // 正規式卡了一下.錯誤值要帶回去
      const regexp = /^\d{0,2}$/

      if (!regexp.test(val)) {
        this.addNew.percent = 0
      }
    },
    dateForm (num) {
      const dd = new Date(num)
      return `${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`
    },
    openModel (style, item) {
      this.modalStyle = style
      if (style === 'add') {
        this.addNew.title = ''
        this.addNew.is_enabled = 0
        this.addNew.percent = 0
        this.addNew.due_date = +new Date()
        this.addNew.code = ''
      } else if (style === 'edit') {
        this.addNew = { ...item }
      }
      $('#addModal').modal('show')
    },
    sentCoupon () {
      const vm = this
      if (vm.addNew.title === '' || vm.addNew.code === '' || vm.addNew.percent === 0) {
        vm.$bus.$emit('message:push', '請正確填寫資料', 'danger', 'fa-times')
        return
      }
      vm.$store.dispatch('updateLoading', true)
      if (vm.modalStyle === 'add') {
        couponAdd({ data: vm.addNew })
          .then((response) => {
            if (response.data.success) {
              vm.$store.dispatch('updateLoading', false)
              vm.couponsData = response.data.coupons
              vm.getCoupon()
            }
          })
          .catch(() => {
            console.error('addNew api err')
          })
      } else if (vm.modalStyle === 'edit') {
        couponEdit(vm.addNew.id, { data: vm.addNew })
          .then((response) => {
            console.log('ok', response)
            if (response.data.success) {
              vm.$store.dispatch('updateLoading', false)
              vm.couponsData = response.data.coupons
              vm.$bus.$emit('message:push', response.data.message, 'success', 'fa-check')
              vm.getCoupon()
            }
          })
          .catch(() => {
            console.error('edit api err')
          })
      }
      $('#addModal').modal('hide')
    },
    newDateForm (num) {
      return +new Date(num)
    },
    delOpen (item) {
      console.log('del')
      this.delId = item
      // this.delApi = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${this.delId.id}`;
      this.delApi = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${this.delId.id}`
      this.deleteProductName = item.title
      $('#delModal').modal('show')
    }
  }

}
</script>

<style lang="scss">
  @import "@/assets/scss/date.scss"; //裡面有date的css連結
</style>
<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  @import "@/assets/scss/page.scss";
  @import "@/assets/scss/adminPage.scss";
</style>
