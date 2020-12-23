export default {
  strict: true,
  namespaced: true,
  state: {
    adminProductData: [],
    adminProductPage: {
      current_page: 1,
      total_pages: 1
    }
  },
  mutations: {
    ADMIN_PRODUCT_DATA (state, payload) {
      state.adminProductData = payload
    },
    ADMIN_PRODUCT_PAGE (state, payload) {
      state.adminProductPage = payload
    }
  }
}
