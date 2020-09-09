import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    cartBtnNum: 0,
  },
  mutations: {
    CARTBRNNUM(state, payload) {
      state.cartBtnNum = payload;
    },
  },
  actions: {
    async cartBtnApi(context) { // 購物車圓形按鈕
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      await axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('CARTBRNNUM', response.data.data.carts.length);
        }
      });
    },
    async addCart(context, item) {
      const addCartSend = {
        product_id: item.id,
        qty: 1,
      };
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      await axios.post(api, { data: addCartSend }).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('cartBtnApi');
        // this.$bus.$emit('message:push',`已加入購物車: ${item.title}`,'success');
      });
    },
    async addCartProductIn(context) {
      context.commit('LOADING', true, { root: true });
      const addCartSend2 = {
        product_id: context.rootState.productModules.dataProduct2.id,
        qty: context.rootState.productModules.selectNum2,
      };
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      await axios.post(api, { data: addCartSend2 }).then((response) => {
        context.commit('LOADING', false, { root: true });
        if (response.data.success) {
          context.commit('productModules/DATAPRODUCT2', response.data.data.product, { root: true });
          context.dispatch('cartBtnApi');
          // this.$bus.$emit('message:push','成功加入購物車','success');
        }
      });
    },
  },
};
