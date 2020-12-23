export default {
  strict: true,
  namespaced: true,
  state: {
    adminProductData: [],
    adminProductPage: {
      current_page: 1,
      total_pages: 1
    },
    tempProduct: {
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      image: '',
      description: '',
      content: '這是內容',
      is_enabled: 0,
      imageUrl: ''
    }, // 新增
    addNew: false, // 判斷modal是新增還是編輯
    status: {
      fileUpLoading: false
    }
  },
  mutations: {
    ADMIN_PRODUCT_DATA (state, payload) {
      state.adminProductData = payload
    },
    ADMIN_PRODUCT_PAGE (state, payload) {
      state.adminProductPage = payload
    },
    TEMP_PRODUCT (state, payload) {
      state.tempProduct = payload
    },
    ADD_NEW (state, payload) {
      state.addNew = payload
    },
    STATUS (state, payload) {
      state.fileUpLoading = payload
    }
  }
}
