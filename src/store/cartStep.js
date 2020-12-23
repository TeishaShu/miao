export default {
  strict: true,
  namespaced: true,
  state: {
    nowStep: 1,
    step1DataAPI: {
      // carts:[] 加這個或是上面的v-if要多一個條件
    }
  },
  mutations: {
    NOWSTEP (state, payload) {
      state.nowStep = payload
    },
    STEP1DATAAPI (state, payload) {
      state.step1DataAPI = payload
    }
  }
}
