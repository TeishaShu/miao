export default {
  strict: true,
  namespaced: true,
  state: {
    nowStep:1
  },
  mutations: {
    NOWSTEP (state, payload) {
      state.nowStep = payload;
    }
  },
}