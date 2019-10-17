<template lang="pug">
  include ../tools/mixins.pug
  .home
    h1.home__title Каталог фильмов
    +b.search
      +e.I.icon.fa.fa-search
      +e.INPUT(type="text" v-model="search" @input="filteredFilms" placeholder="Введите  название").field

    .home__films
      +b(v-if="!isLoaded").I.loader.fa.fa-spinner.fa-spin
      +b(v-else="" v-for="film in films").film
        img(:src="film.poster").film__poster
        +e.description
          +e.name {{ film.title }}
          +e.producer {{ film.producer }}
    .more-films(v-if="!hideButton && isLoaded && !searchFailed" @click="nextPage") Показать еще
    .failed-search(v-else-if="searchFailed") К сожалению, поиск по сайту не дал никаких результатов.
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Home",
    data: function () {
      return {
        size: 3,
        page: 1,
        hideButton: false,
        films: false,
        search: '',
        searchFailed: false,
      };
    },

    computed: {
      ...mapGetters({
        filmsData: 'films/allFilms',
        isLoaded: 'films/isLoaded',
      }),
    },

    watch: {
      filmsData: function () {
        this.films = this.basicCountFilms();
      }
    },

    created() {
      this.$store.dispatch('films/getAllFilms');
    },

    methods: {
      basicCountFilms() {
        return this.filmsData.slice(0, this.page * this.size);
      },

      nextPage() {
        this.page++;
        this.films = this.basicCountFilms();

        if ((this.page * this.size) >= this.filmsData.length) {
          this.hideButton = true;
        }
      },

      filteredFilms() {
        this.films = this.filmsData.filter((e) => {
          return e.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
        });

        (this.films.length === 0) ? this.searchFailed = true : this.searchFailed = false;

        if (this.search === '') {
          this.films = this.basicCountFilms();
        }
      },
    },
  }
</script>

<style lang="scss"></style>
