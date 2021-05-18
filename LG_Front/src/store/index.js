import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  // computed
  getters: {

    getIsLogin: state => {
      return state.isLogin;
    },


  },

  mutations: {
    setLogin (state, bool) { // 로그인하는 함수
      if (bool)
        state.isLogin = true
      else {
        state.isLogin = false
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
