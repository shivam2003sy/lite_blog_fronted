import { createStore } from 'vuex'

export default createStore({
  state: {
    // 1. Create a state variable to hold the user's name
    user : null
  },
  getters: {
    // 3. Create a getter to return the user's name
    getUser(state) {
      return state.user
    }
  },

  mutations: {
    // 2. Create a mutation to set the user's name
    setUser(state, user) {
      state.user = user
    }

  },
  actions: {
    user(context,setUser){
      context.commit('user', setUser)
    }
  },
  modules: {
  }
}
)
