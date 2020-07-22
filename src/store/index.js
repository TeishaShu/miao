import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)  //上面2段掛載.這邊啟用

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading:false,
    cartBtnNum:0,
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
  },
  mutations: { //操作、修改資料狀態. 同步的行為
    LOADING(state,status){
      state.isLoading = status;
    },
    CARTBRNNUM(state, payload){
      state.cartBtnNum = payload;
    },
    DATAPRODUCT2(state, payload){
      state.dataProduct2 = payload;
    },
    SELECTNUM2(state, payload){
      state.selectNum2 = payload;
    },
  },
  actions: { //透過 dispatch 操作 actions 的值
    updateLoading(context,status){
      context.commit('LOADING',status);
    },
    cartBtnApi(context){ // 購物車圓形按鈕
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CARTBRNNUM', response.data.data.carts.length)
        }
      });
    },
    addCart(context, item) {
      const addCartSend = {
        product_id: item.id,
        qty: 1,
      };
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      axios.post(api, { data: addCartSend }).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('cartBtnApi');
        // this.$bus.$emit('message:push',`已加入購物車: ${item.title}`,'success');
      });
    },
    addCartProductIn(context) {
      context.commit('LOADING', true);
      const addCartSend2 = {
        product_id : context.state.dataProduct2.id,
        qty :  context.state.selectNum2,
      };
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      axios.post(api, { data: addCartSend2 }).then((response) => {
        context.commit('LOADING', false);
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
    getProduct2(context, id) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/product/${id}`;
      axios.get(api).then((response) => {
        context.commit('LOADING', false);
        if (response.data.success) {
          context.commit('DATAPRODUCT2', response.data.product)
        }
      });
    },
  },
  modules: { //放其他類別
    
  }
})
