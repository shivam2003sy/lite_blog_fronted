import { createStore } from 'vuex'
export default createStore({
  state: {
    // 1. Create a state variable to hold the user's name
    user :{},
    modal : false
  },
  getters: {
    // 3. Create a getter to return the user's name
  },

  mutations: {
    // 2. Create a mutation to set the user's name
    user : (state, user) => state.user = user,
    modal : (state, modal) => state.modal = modal
  },
  actions: {
    setUser({commit}, user) {
      commit('user', user)
    },
    modal({commit}, modal) {
      commit('modal', modal)
    }
  },
  modules: {
  }
}
)
