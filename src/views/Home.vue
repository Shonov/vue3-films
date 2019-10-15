<template lang="pug">
  include ../tools/mixins.pug
  .home
    h1.home__title Каталог фильмов
    +b.search
      +e.I.icon.fa.fa-search
      +e.INPUT(type="text" v-model="search" placeholder="Введите  название").field

    .home__films
      +b(v-for="item in films").film
        +e.IMG(src="http://placehold.it/260x85?text=Placeholder").poster
        +e.description
          +e.name {{ item.title }}
          +e.producer {{ item.producer }}
    .more-films(@click="nextPage") Показать еще
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Home",
    data: function () {
      return {
        size: 3,
        page: 0,
        filmsLoading: false,
        films: false,
      };
    },
    computed: {
      ...mapGetters({
        filmsData: 'films/filmsData',
      }),
    },
    async created() {
      await this.$store.dispatch('films/getAllFilms');
      this.films = this.filmsData.slice(0, this.size);
    },
      mounted() {},
    methods: {
      nextPage() {
        this.page++;
        const end = this.page * this.size + this.size;
        this.films = this.filmsData.slice(0, end);
      },
    },
  }
</script>

<style lang="scss"></style>
