import axios from "axios";

export default {
  namespaced: true,

  state: {
    all: false,
    page: false,
    isLoaded: false,
    error: false,
  },
  getters: {
    filmsData: state => {
      return state.all;
    },
    page: state => state.page,
  },
  mutations: {
    FILMS_UPDATED: (state, response) => {
      state.all = response;
    },
    IS_LOADED: (state, response) => {
      state.isLoaded = response;
    },
    SET_ERROR: (state, error) => {
      state.error = error;
    },
  },
  actions: {
    getAllFilms: async ({ commit, rootGetters, dispatch }) => {
      await rootGetters.HTTP.get('https://swapi.co/api/films/').then((response) => {
        commit('FILMS_UPDATED', response.data.results);
        // await dispatch('searchPosters');
      }, (err) => {
        commit('SET_ERROR', err);
      });
    },
    searchPosters: ({ commit, state }) => {
      // let filmsModified = state.all;
      let filmsModified = state.all.map(async (e) => {
        await axios.get('https://pixabay.com/api/', {
         params: {
           key: '13946176-5efe0deaabd8f5d7a020a0ba7',
           q: e.title
         }
        }).then(async (response) => {
          e.poster = !response.data.totalHits ? 'http://placehold.it/260x85?text=Placeholder' : response.data.hits[0].webformatURL;
          console.log(e);
        }, (err) => {
          commit('SET_ERROR', err);
        });

        return e;
      });

      console.log(filmsModified, state);
      commit('FILMS_UPDATED', filmsModified);
    },
  },
};
