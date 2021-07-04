import * as loginSer from '../service/loginService'
import { register } from '../service/registerService'

export default {
  namespaced: true,
  state: {
    data: {},
    isLoading: false,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload
    },
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      commit('setIsLoading', true)
      const resp = await loginSer.login(username, password)
      commit('setData', resp.data)
      commit('setIsLoading', false)
      return resp
    },
    async loginOut({ commit }) {
      commit('setData', null)
      loginSer.loginOut()
    },

    async whoami({ commit }) {
      commit('setIsLoading', true)
      const resp = await loginSer.whoami()
      console.log(resp);
      commit('setData', resp)
      commit('setIsLoading', false)
      return resp
    },

    // async register({ commit }, { username, password, photo}) {
    //   commit('setIsLoading', true)
    //   const resp = await register(username, password, photo)
    //   console.log(resp)
    //   commit('setIsLoading', false)
    //   return resp
    // },
    async register({ commit }, formData) {
      commit('setIsLoading', true)
      const resp = await register(formData)
      console.log(resp)
      commit('setIsLoading', false)
      return resp
    },
  },
  modules: {},
}
