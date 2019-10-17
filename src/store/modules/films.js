export default {
  namespaced: true,

  state: {
    all: [],
    isLoaded: false,
    error: false,
  },
  getters: {
    allFilms: state => state.all,
    isLoaded: state => state.isLoaded,
  },
  mutations: {
    FILMS_UPDATED: (state, payload) => {
      state.all.push(payload);
    },
    IS_LOADED_UPDATED: (state, payload) => {
      state.isLoaded = payload;
    },
    STATE_RESET: (state) => {
      state.all = [];
      state.isLoaded = false;
    },
    SET_ERROR: (state, error) => {
      state.error = error;
    },
  },
  actions: {
    getAllFilms: ({ commit, rootGetters, dispatch }) => {
      commit('STATE_RESET');
      rootGetters.HTTP.get('https://swapi.co/api/films/').then(async (response) => {
        await dispatch('updateFilmPoster', response.data.results);
      }, (err) => {
        commit('SET_ERROR', err);
      });
    },
    updateFilmPoster: async ({ commit, rootGetters }, films) => {
      let defaultImage = 'https://placehold.it/260x85?text=Placeholder';

      const asyncGetImg = (film) => {
        rootGetters.HTTP.get('https://pixabay.com/api/', {
          params: {
            key: process.env.VUE_APP_PIXABAY_KEY,
            q: film.title
          }
        }).then((response) => {
          film.poster = !response.data.totalHits ? defaultImage : response.data.hits[0].webformatURL;
          commit('FILMS_UPDATED', film);
        }, (err) => {
          commit('SET_ERROR', err);
        });

        return film;
      };

      films.map(asyncGetImg);
      commit('IS_LOADED_UPDATED', true);
    },
  },
};
