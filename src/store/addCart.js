import { Cart, AddCartApi, AddCartBtnApi } from '@/api/api.js'

export default {
  strict: true,
  namespaced: true,
  state: {
    cartBtnNum: 0
  },
  mutations: {
    CARTBRNNUM (state, payload) {
      state.cartBtnNum = payload
    }
  },
  actions: {
    async cartBtnApi (context) { // 購物車圓形按鈕
      Cart()
        .then((response) => {
          if (response.data.success) {
            context.commit('CARTBRNNUM', response.data.data.carts.length)
          }
        })
    },
    async AddCart (context, item) {
      const addCartSend = {
        product_id: item.id,
        qty: 1
      }
      context.commit('LOADING', true, { root: true })
      AddCartApi({ data: addCartSend })
        .then((response) => {
          if (response.data.success) {
            context.commit('LOADING', false, { root: true })
            context.dispatch('cartBtnApi')
          // this.$bus.$emit('message:push',`已加入購物車: ${item.title}`,'success');
          }
        })
    },
    async addCartBtn (context) {
      context.commit('LOADING', true, { root: true })
      const addCartSend2 = {
        product_id: context.rootState.ProductModules.dataProduct2.id,
        qty: context.rootState.ProductModules.selectNum2
      }
      AddCartBtnApi({ data: addCartSend2 })
        .then((response) => {
          context.commit('LOADING', false, { root: true })
          if (response.data.success) {
            context.commit('ProductModules/DATAPRODUCT2', response.data.data.product, { root: true })
            context.dispatch('cartBtnApi')
          // this.$bus.$emit('message:push','成功加入購物車','success');
          }
        })
    }
  }
}
