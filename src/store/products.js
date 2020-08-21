import axios from 'axios';
import _ from 'lodash';

export default {
  strict: true,
  namespaced: true,
  state: {
    dataProduct2: {
      category: "",
      content: "",
      description: "",
      id: "",
      image: "",
      imageUrl: "",
      is_enabled: 0,
      num: 0,
      origin_price: "",
      price: "",
      title: "",
      unit: "",
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
      {'value': 'all', 'label': '全部商品'},
      {'value': 'can', 'label': '罐頭'},
      {'value': 'dryFood', 'label': '乾糧'},
      {'value': 'snack', 'label': '零食'},
      {'value': 'nutrition', 'label': '營養品'},
    ],
    categoryItemObject:{},
  },
  mutations: {
    DATAPRODUCT2(state, payload){
      state.dataProduct2 = payload;
    },
    SELECTNUM2(state, payload){
      state.selectNum2 = payload;
    },
    ALLPRODUCTS(state, payload){
      state.allProducts = payload;
    },
    PRODUCTS(state, payload){
      state.products = payload;
    },
    PAGINATION(state, payload){
      state.pagination = payload;
    },
    CATEGORYITEMOBJECT(state, payload){
      state.categoryItemObject = payload;
    },
  },
  actions: {
    async addCartProductIn(context) {//
      context.commit('LOADING', true, {root: true});
      const addCartSend2 = {
        product_id : context.state.dataProduct2.id,
        qty :  context.state.selectNum2,
      };
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      await axios.post(api, { data: addCartSend2 }).then((response) => {
        context.commit('LOADING', false, {root: true});
        if (response.data.success) {
          context.commit('DATAPRODUCT2',  response.data.data.product)
          context.dispatch('cartBtnApi');
          // this.$bus.$emit('message:push','成功加入購物車','success');
        }
      });
    },
    changeNum(context, num) {
      // const orNum = Number(this.selectNum2);
      const orNum = Number(context.state.selectNum2);
      if (num < 0 && orNum <= 1) {
        context.commit('SELECTNUM2',1);
      } else {
        context.commit('SELECTNUM2',orNum + num);
      }
    },
    resetNum(context){
      context.commit('SELECTNUM2',1);
    },
    async getProduct2(context, id) { // Product2.vue
      
      context.commit('LOADING', true, {root: true});
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      await axios.get(api).then((response) => {
        context.commit('LOADING', false, {root: true});
        if (response.data.success) {
          context.commit('DATAPRODUCT2', response.data.product)
        }
      });
    },
    categoryItemObjectCount(context){
      const sort = _.zipObject(
        _.map(context.state.categoryItem, 'value'),
        _.map(context.state.categoryItem, 'label')
        );
      context.commit('CATEGORYITEMOBJECT',sort)
    },
    async getProduct(context,categoryStyle) { // Product.vue
      context.commit('LOADING', true, {root: true});
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      await axios.get(api).then((response) => {
        context.commit('LOADING', false, {root: true});
        if (response.data.success) {
          //過濾未啟用的產品資訊
          const responseProduct = response.data.products;
          const filterProductData = [];
          responseProduct.forEach((e) => {
            if (!e.is_enabled) {
              return;
            }
            filterProductData.push(e);
          });
          //全部的原始資料
          context.commit('ALLPRODUCTS',filterProductData);
          //當前的顯示資料
          context.dispatch({
            type: 'selectCategory',
            style: categoryStyle,
            isPageClick: false
          });
        }
      });
    },
    selectCategory(context, {style, isPageClick}) {
      context.commit('PRODUCTS',[]);
      // this.pagination.current_page = 1;
      context.commit('PAGINATION',{
        perPage: 6,
        total_pages: 1,
        current_page: 1,
        pageAry: [],
      });

      // 換內容
      const changeData = (style === "all")
      ? context.state.allProducts
      : _.filter(context.state.allProducts, ['category', context.state.categoryItemObject[style]]);
      context.commit('PRODUCTS',changeData); 

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
      let newAry = [];
      for (let i = 0; i < context.state.products.length; i++) {
        let onePage = [];
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

      // this.pagination.pageAry = newAry;
      // this.pagination.total_pages = newAry.length;
      context.commit('PAGINATION',{
        pageAry: newAry,
        total_pages: newAry.length,
        perPage: 6,
        current_page: 1,
      });
    },
  },
  getters:{
    dataProduct2(state){
      return state.dataProduct2;
    },
    selectNum2(state){
      return state.selectNum2;
    }
  },
}
