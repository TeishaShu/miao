export default {
  strict: true,
  namespaced: true,
  state: {
    couponCode: 'DTJ00001'
  },
  mutations: {
    UPDATECOUPONCODE (state, code) {
      state.couponCode = code
    }
  },
  actions: {

  }
}
