import axios from 'axios';
import {cart, addCartApi, addCartBtnApi} from '@/api/api.js';

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
      cart()
      .then((response) => {
        if (response.data.success) {
          context.commit('CARTBRNNUM', response.data.data.carts.length);
        }
      })
      .catch((err) => {
        console.error('api err')
      })
    },
    async addCart(context, item) {
      const addCartSend = {
        product_id: item.id,
        qty: 1,
      };
      context.commit('LOADING', true, { root: true });
      addCartApi({ data: addCartSend })
      .then((response) => {
        if(response.data.success){
          context.commit('LOADING', false, { root: true });
          context.dispatch('cartBtnApi');
          // this.$bus.$emit('message:push',`已加入購物車: ${item.title}`,'success');
        }
      })
      .catch((err) => {
        console.error('api err')
      })
    },
    async addCartBtn(context) {
      context.commit('LOADING', true, { root: true });
      const addCartSend2 = {
        product_id: context.rootState.productModules.dataProduct2.id,
        qty: context.rootState.productModules.selectNum2,
      };
      addCartBtnApi({ data: addCartSend2 })
      .then((response) => {
        context.commit('LOADING', false, { root: true });
        if (response.data.success) {
          context.commit('productModules/DATAPRODUCT2', response.data.data.product, { root: true });
          context.dispatch('cartBtnApi');
          // this.$bus.$emit('message:push','成功加入購物車','success');
        }
      })
      .catch((err) => {
        console.error('api err')
      })
    },
  },
};
