<template lang="pug">
  include ../tools/mixins.pug
  .home
    h1.home__title Каталог фильмов
    +b.search
      +e.I.icon.fa.fa-search
      +e.INPUT(type="text" v-model="search" @input="filteredFilms" placeholder="Введите  название").field

    .home__films
      +b(v-if="!filmsLoaded").I.loader.fa.fa-spinner.fa-spin
      +b(v-else="" v-for="item in films").film
        +e.IMG(src="http://placehold.it/260x85?text=Placeholder").poster
        +e.description
          +e.name {{ item.title }}
          +e.producer {{ item.producer }}
    .more-films(v-if="!hideButton && filmsLoaded" @click="nextPage") Показать еще
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
        filmsLoaded: false,
        films: false,
        search: ''
      };
    },
    computed: {
      ...mapGetters({
        filmsData: 'films/filmsData',
      }),
    },
    async created() {
      await this.$store.dispatch('films/getAllFilms');
      this.films = this.basicCountFilms();
      this.filmsLoaded = true;
    },
    mounted() {},
    methods: {
      basicCountFilms() {
        const end = this.page * this.size;
        return this.filmsData.slice(0, end);
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

        if (this.search === '') {
          this.films = this.basicCountFilms();
        }
      },
    },
  }
</script>

<style lang="scss"></style>
