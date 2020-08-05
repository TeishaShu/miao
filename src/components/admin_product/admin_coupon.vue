<template>
  <div>
    <AlertMessage/>

    <a href="#" class="add" @click.prevent="openModel('add')">建立新的優惠卷</a>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th width="90">排序</th>
            <th>名稱</th>
            <th>優惠碼</th>
            <th width="120">折扣比</th>
            <th width="150">到期日</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in couponsData" :key="item.id">
            <td>{{ item.num }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td style="text-align:center;">{{ item.percent }}%</td>
            <td style="text-align:center;">{{ dateForm(item.due_date) }}</td>
            <td class="state" style="text-align:center;">
              <i
                class="fas fa-check-circle okGreen"
                v-show="item.is_enabled"
              ></i
              ><i
                class="fas fa-minus-circle noRed"
                v-show="!item.is_enabled"
              ></i>
            </td>
            <td>
              <a href="#" class="edit" @click.prevent="openModel('edit', item)"
                >編輯</a
              >
              <a href="#" class="del" @click.prevent="delOpen(item)">刪除</a>
            </td>
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
        :clickHandler="getCoupon"
      >
      </paginate>
    </div>
    <!--model-->
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
              <span>{{modalStyle === "add" ? "新增優惠券" : "編輯優惠券"}}</span>
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
                      type="number"
                      class="form-control"
                      placeholder="請輸入優惠折扣百分比"
                      v-model.trim="addNew.percent"
                      max="99"
                      min="1"
                      maxlength='2'
                      @keyup="keyupUpdatePercent(addNew.percent)"
                    />
                  </div>
                  <div class="form-group col-md-6 dateStyle">
                    <div>到期日</div>
                    <datepicker
                      v-model="date"
                    ></datepicker>
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
    <DelModal titleType="優惠劵" :api="delApi" :productName="deleteProductName"/>

  </div>
</template>

<style lang="scss">
@import "@/assets/scss/date.scss"; //裡面有date的css連結
</style>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/page.scss";
@import "@/assets/scss/adminPage.scss";
</style>

<script>
import DelModal from "@/components/modal/DelModal.vue";
import Datepicker from "vuejs-datepicker";
import Paginate from "vuejs-paginate";
import AlertMessage from "@/components/alert/alertMessage.vue";
import $ from "jquery";
export default {
  components: {
    Datepicker,
    Paginate,
    DelModal,
    AlertMessage
  },
  created() {
    let today = +new Date();
    this.addNew.due_date = today;
    this.date = this.dateForm(today);
    this.getCoupon();
  },
  data() {
    return {
      couponsData: [],
      addNew: {
        title: "",
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: "",
      },
      dataPage: {
        // current_page: 1 //這個刪除
      },
      date: "",
      modalStyle: "",
      delId: {},
      delApi: "",
      deleteProductName: "",
    };
  },
  watch: { //這個用function順序會不對.js跟vue會不同.watch可以，裡面是物件
    date: function (value) {
      // console.log('watch');
      this.addNew.due_date = +new Date(value);
    },
    // percent: function(value) {
    //   console.log(value);
    //   const regexp = /^\d{2}$/;

    //   if (!regexp.test(value)) {
    //     this.percent = 0;
    //   }
    //   // this.percent = value.replace(/^\d{2}$/,"")
    // }
  },
  methods: {
    getCoupon() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupons?page=${this.dataPage.current_page}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false);
          this.$store.dispatch('backSmToggle', false);
          this.couponsData = response.data.coupons;
          this.dataPage = response.data.pagination;
        }
      });
    },
    keyupUpdatePercent(val){  //.......................................正規式這邊卡了一下.然後錯誤值要帶回去
      const regexp = /^\d{0,2}$/; //最多2位數.可以用console測試

      if (!regexp.test(val)) {
        this.addNew.percent = 0;
      }
    },
    dateForm(num) {
      let dd = new Date(num);
      return `${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`;
    },
    openModel(style, item) {
      this.modalStyle = style;
      if (style === "add") {
        this.addNew.title = "";
        this.addNew.is_enabled = 0;
        this.addNew.percent = 0;
        this.addNew.due_date = +new Date();
        this.addNew.code = "";
      } else if (style === "edit") {
        this.addNew = Object.assign({}, item);
      }
      $("#addModal").modal("show");
    },
    sentCoupon() {
      if (this.addNew.title === "" || this.addNew.code === "" || this.addNew.percent === 0 ) {
        this.$bus.$emit('message:push',"請正確填寫資料",'danger','fa-times');
        return;
      }
      const vm = this;
      // $("#addModal button").prop('disabled',true);
      this.$store.dispatch('updateLoading', true);
      if (this.modalStyle === "add") {
        const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupon`;
        
        this.$http.post(api, { data: vm.addNew }).then((response) => {
          if (response.data.success) {
            this.$store.dispatch('updateLoading', false);
            this.couponsData = response.data.coupons;
            this.getCoupon();
          }
        });
      } else if (this.modalStyle === "edit") {
        const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupon/${this.addNew.id}`;
        this.$http.put(api, { data: vm.addNew }).then((response) => {
          if (response.data.success) {
            this.$store.dispatch('updateLoading', false);
            this.couponsData = response.data.coupons;
            this.$bus.$emit('message:push',response.data.message,'success','fa-check');
            this.getCoupon();
          }
        });
      }
      $("#addModal").modal("hide");
    },
    newDateForm(num) {
      return +new Date(num);
    },

    delOpen(item) {
      // console.log(item)
      this.delId = item;
      this.delApi = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/admin/coupon/${this.delId.id}`;
      this.deleteProductName = item.title;
      $("#delModal").modal("show");
    },
  },
  
};
</script>
