import Vue from 'vue'
import Vuex from 'vuex'
import loginUser from './loginUser'
import BookStore from './bookStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginUser,
    BookStore
  }
})
