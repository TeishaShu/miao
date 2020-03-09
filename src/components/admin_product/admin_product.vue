<template>
  <div>
    <a href="#" class="add">建立新產品</a>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>分類</th>
            <th>名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" value="adtr" /></td>
            <td>名稱</td>
            <td>原價</td>
            <td>售價</td>
            <td class="state">
              <i class="fas fa-check-circle"></i
              ><i class="fas fa-minus-circle"></i>
            </td>
            <td>
              <a href="#" class="edit">編輯</a>
              <a href="#" class="del">刪除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12 pageOut">
      <paginate
        :page-count="20"
        :prev-text="'<'"
        :next-text="'>'"
        :page-range="3"
      >
      </paginate>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
@import "../../assets/sass/page.scss";
@import "admin_product.scss";
</style>
<script>
import Paginate from "vuejs-paginate";
export default {
  components: {
    Paginate
  }
};
</script>
