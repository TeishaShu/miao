import axios from 'axios';
import _ from 'lodash';

export default {
  strict: true,
  namespaced: true,
  state: {
    dataProduct2: {
      category: '',
      content: '',
      description: '',
      id: '',
      image: '',
      imageUrl: '',
      is_enabled: 0,
      num: 0,
      origin_price: '',
      price: '',
      title: '',
      unit: '',
    },
    selectNum2: 1,
    allProducts: [],
    products: [],
    pagination: {
      pageAry: [],
      perPage: 6,
      total_pages: 1,
      current_page: 1,
    },
    categoryItem: [
      { value: 'all', label: '全部商品' },
      { value: 'can', label: '罐頭' },
      { value: 'dryFood', label: '乾糧' },
      { value: 'snack', label: '零食' },
      { value: 'nutrition', label: '營養品' },
    ],
  },
  mutations: {
    DATAPRODUCT2(state, payload) {
      state.dataProduct2 = payload;
    },
    SELECTNUM2(state, payload) {
      state.selectNum2 = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
  actions: {
    changeNum(context, num) {
      // const orNum = Number(this.selectNum2);
      const orNum = Number(context.state.selectNum2);
      if (num < 0 && orNum <= 1) {
        context.commit('SELECTNUM2', 1);
      } else {
        context.commit('SELECTNUM2', orNum + num);
      }
    },
    resetNum(context) {
      context.commit('SELECTNUM2', 1);
    },
    async getProduct2(context, id) { // Product2.vue
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      await axios.get(api).then((response) => {
        context.commit('LOADING', false, { root: true });
        if (response.data.success) {
          context.commit('DATAPRODUCT2', response.data.product);
        }
      });
    },
    async getProduct(context, categoryStyle) { // Product.vue
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      await axios.get(api).then((response) => {
        context.commit('LOADING', false, { root: true });
        if (response.data.success) {
          // 過濾未啟用的產品資訊
          const responseProduct = response.data.products;
          const filterProductData = [];
          responseProduct.forEach((e) => {
            if (!e.is_enabled) {
              return;
            }
            filterProductData.push(e);
          });
          // 全部的原始資料
          context.commit('ALLPRODUCTS', filterProductData);
          // 當前的顯示資料
          context.dispatch({
            type: 'selectCategory',
            style: categoryStyle,
            isPageClick: false,
          });
        }
      });
    },
    selectCategory(context, {style, isPageClick}) {
      context.commit('PRODUCTS', []);
      // this.pagination.current_page = 1;
      context.commit('PAGINATION', {
        perPage: 6,
        total_pages: 1,
        current_page: 1,
        pageAry: [],
      });

      // 換內容
      const changeData = (style === 'all')
        ? context.state.allProducts
        : _.filter(context.state.allProducts, ['category', context.getters.categoryItemObject[style]]);
      context.commit('PRODUCTS', changeData);
      context.dispatch('productPage');

      // 留著筆記-----------------------------------------------------------
      // this.products = (style === "all")
      //   ? this.allProducts
      //   : _.filter(this.allProducts, ['category', this.categoryItemObject[style]]);
      // 比較前後
      // if (style === "all") {
      //   this.products = this.allProducts;
      // }
      // else {
      //   this.products = _.filter(this.allProducts, ['category', this.categoryItemObject[style]]);
      // const selectAry = [];
      // this.allProducts.forEach((el) => {
      //   if (el.category === this.categoryItemObject[style]) {
      //     selectAry.push(el);
      //   }
      // });
      // this.products = selectAry;
      // }
    },
    productPage(context) {
      const newAry = [];
      for (let i = 0; i < context.state.products.length; i++) {
        const onePage = [];
        for (
          let n = i * context.state.pagination.perPage;
          n < (i + 1) * context.state.pagination.perPage;
          n++
        ) {
          if (context.state.products[n] !== undefined) {
            onePage.push(context.state.products[n]);
          }
        }
        if (onePage.length !== 0) {
          newAry.push(onePage);
        }
      }
      const newObject = { ...context.state.pagination };
      newObject.pageAry = newAry;
      newObject.total_pages = newAry.length;
      context.commit('PAGINATION', newObject);
    },
    clickPage(context, num) {
      const newObject = { ...context.state.pagination };
      newObject.current_page = num;
      context.commit('PAGINATION', newObject);
    },
  },
  getters: {
    dataProduct2(state) {
      return state.dataProduct2;
    },
    selectNum2(state) {
      return state.selectNum2;
    },
    categoryItemObject(state) {
      const sort = _.zipObject(
        _.map(state.categoryItem, 'value'),
        _.map(state.categoryItem, 'label'),
      );
      return sort;
    },
    products(state) {
      return state.products;
    },
    categoryItem(state) {
      return state.categoryItem;
    },
    pagination(state) {
      return state.pagination;
    },
    similarProduct(state) {
      const style = state.dataProduct2.category;
      const filterData = [];
      state.allProducts.forEach((e) => {
        if (e.id !== state.dataProduct2.id && e.category === style && filterData.length < 4) {
          filterData.push(e);
        }
      });
      return filterData;
    },
  },
};
