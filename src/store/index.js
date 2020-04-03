import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading:false,
  },
  mutations: {
    LOADING(state,status){
      state.isLoading = status;
    }
  },
  actions: {
    updateLoading(context,state){
      context.commit('LOADING',status);
    }
  },
  modules: {
    
  }
})
