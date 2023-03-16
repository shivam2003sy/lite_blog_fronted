import { createStore } from 'vuex'
export default createStore({
  state: {
    // 1. Create a state variable to hold the user's name
    user :{}
  },
  getters: {
    // 3. Create a getter to return the user's name
    user : state => state.user
  },

  mutations: {
    // 2. Create a mutation to set the user's name
    user : (state, user) => state.user = user
  },
  actions: {
    user({commit}, user) {
      commit('user', user)
    }
  },
  modules: {
  }
}
)
