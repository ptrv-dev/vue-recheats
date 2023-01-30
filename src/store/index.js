import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
    search: '',
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    removeToken(state) {
      state.token = null;
    },
    setSearch(state, payload) {
      state.search = payload;
    },
  },
  actions: {},
});
