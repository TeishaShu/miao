/* eslint-disable no-unused-vars */

export default {
  strict: true,
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    MESSAGES (state, payload) {
      state.messages.push(payload)
    },
    REMOVEMESSAGETIMING (state, payload) {
      // 這邊刪除後會跳出紅字警告 state 的修改只能在 mutation，可是我確實是在 mutation 中修改，
      // 查資料說是因為v-model的關係，修改後還是一樣，無法改成功一直顯示錯誤
      setTimeout(() => {
        state.messages.forEach((item, i) => {
          if (item.timestamp === payload) {
            state.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    CLOSEMESSAHE (state, payload) {
      state.messages.splice(payload, 1)
    }
  },
  actions: {
    updateMsg (context, status) {
      const timestamp = Math.floor(new Date() / 1000)
      status.timestamp = timestamp
      context.commit('MESSAGES', status)
      context.commit('LOADING', false, { root: true })
      context.commit('REMOVEMESSAGETIMING', timestamp)
    }
  }
}
