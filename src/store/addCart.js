import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    cartBtnNum:0,
  },
  mutations: {
    CARTBRNNUM(state, payload){
      state.cartBtnNum = payload;
    },
  },
  actions: {
    async cartBtnApi(context){ // 購物車圓形按鈕
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      await axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CARTBRNNUM', response.data.data.carts.length)
        }
      });
    },
    async addCart(context, item) {
      const addCartSend = {
        product_id: item.id,
        qty: 1,
      };
      context.commit('LOADING', true, {root: true});
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      await axios.post(api, { data: addCartSend }).then((response) => {
        context.commit('LOADING', false, {root: true});
        context.dispatch('cartBtnApi');
        // this.$bus.$emit('message:push',`已加入購物車: ${item.title}`,'success');
      });
    },
    async addCartProductIn(context, rootState) {
      context.commit('LOADING', true, {root: true});
      console.log('a',rootState)
      const addCartSend2 = {
        product_id : rootState['dataProduct2/id'],
        qty :  rootState['dataProduct2/selectNum2'],
        // product_id : context.state.dataProduct2.id,//id
        // qty :  context.state.selectNum2,
      };
      console.log('addCartSend2',addCartSend2)
      const api = `${process.env.VUE_APP_DEFAULT_SRC}/api/teisha/cart`;
      await axios.post(api, { data: addCartSend2 }).then((response) => {
        context.commit('LOADING', false, {root: true});
        if (response.data.success) {
          console.log( response.data.data.product)
          context.commit('productModules/DATAPRODUCT2',  response.data.data.product, {root: true})
          context.dispatch('cartBtnApi');
          // this.$bus.$emit('message:push','成功加入購物車','success');
        }
      });
    },
  },

}