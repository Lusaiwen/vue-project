import * as bookSer from '../service/bookService';
export default {
  namespaced: true,
  state: {
    lists: [],
    isLoading: false,
    lendArrs: []
  },
  mutations: {
    setData(state, payload) {
      state.lists = payload;
    },
    setLendData(state, payload){
      state.lendArrs = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async getBooks({ commit }) {
      commit('setIsLoading', true);
      const resp = await bookSer.getBooks();
      commit('setData', resp.data.data);
      console.log(resp.data.data);
      commit('setIsLoading', false);
      return resp;
    },
    async addBook({ commit }, formData) {
      commit('setIsLoading', true);
      const resp = await bookSer.addBooks(formData);
      commit('setIsLoading', false);
      return resp;
    },
    async changeBook({ commit }, bookForm) {
      commit('setIsLoading', true);
      const resp = await bookSer.changeBook(bookForm);
      commit('setIsLoading', false);
      return resp;
    },
    async deleteBooks({ commit }, bookForm) {
      commit('setIsLoading', true);
      const resp = await bookSer.deleteBook(bookForm);
      commit('setIsLoading', false);
      return resp;
    },
    async lendBook({ commit }, bookForm){
      commit('setIsLoading', true);
      const resp = await bookSer.lendBook(bookForm);
      commit('setIsLoading', false);
      return resp;
    },
    async returnBook({ commit }, bookForm){
      commit('setIsLoading', true);
      const resp = await bookSer.returnBook(bookForm);
      commit('setIsLoading', false);
      return resp;
    },
    async getLendBooks({ commit }){
      commit('setIsLoading', true);
      const resp = await bookSer.getLendBooks();
      commit('setLendData', resp.data.data);
      console.log(resp.data.data);
      commit('setIsLoading', false);
      return resp;
    }
  },
  modules: {},
};
