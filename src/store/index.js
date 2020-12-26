import Vue from 'vue'
import Vuex from 'vuex'

import ProductModules from './products'
import AddCartModules from './addCart'
import CartStepModules from './cartStep'
import AdminProductModules from './adminProduct'
import AlertMessageModules from './alertMessage'

Vue.use(Vuex) // 上面2段掛載.這邊啟用

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    backSmToggle: false
  },
  mutations: { // 操作、修改資料狀態. 同步的行為
    LOADING (state, status) {
      state.isLoading = status
    },
    BACKSMTOGGLE (state, payload) {
      state.backSmToggle = payload
    }
  },
  actions: { // 透過 dispatch 操作 actions 的值
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    backSmToggle (context, status) {
      context.commit('BACKSMTOGGLE', status)
    }
  },
  modules: { // 放其他類別
    ProductModules,
    AddCartModules,
    CartStepModules,
    AdminProductModules,
    AlertMessageModules
  }
})
