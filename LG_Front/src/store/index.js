import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inter: null,
  },
  // computed
  getters: {
  },

  mutations: {
    clearinter(state) {
      clearInterval(state.inter)
    }

  },
  actions: {
  },
  modules: {
  }
})
