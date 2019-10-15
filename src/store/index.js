import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// modules
import films from '@/store/modules/films';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    films,
  },
  getters: {
    HTTP: () => axios,
  },
  state: {},
  mutations: {},
  actions: {},
})
