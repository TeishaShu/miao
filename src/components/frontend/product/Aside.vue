<template>
  <div class="asideBox">
    <ul>
      <li v-for="(item,index) in categoryItem" :key="index"
          @click="selectCategory(`${item.value}`, true)">
        <i class="fas fa-cookie"></i>{{item.label}}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  @import "@/assets/scss/aside.scss";
</style>

<script>
export default {
  props: {
    categoryItem: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectCategory(style, isPageClick) {
      this.$store.dispatch('productModules/selectCategory', { style, isPageClick });
      // 產品頁切換的話要換路由
      if (isPageClick) {
        this.$router.push(`/product/${style}`);
      }
    },
  },
};
</script>
