import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //上面2段掛載.這邊啟用

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading:false,
  },
  mutations: { //操作、修改資料狀態. 同步的行為
    LOADING(state,status){
      state.isLoading = status;
    }
  },
  actions: { //透過 dispatch 操作 actions 的值
    updateLoading(context,status){
      context.commit('LOADING',status);
    }
  },
  modules: { //放其他類別
    
  }
})
