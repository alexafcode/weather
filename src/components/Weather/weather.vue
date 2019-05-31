<template>
  <div class="weather">
    <loading v-show="isLoading"></loading>
    <loading-search v-show="searchLoading"></loading-search>
    <div v-show="!isLoading" class="weather__search" v-click-outside>
      <input type="text" label="Search" v-model="searchText" placeholder="Поиск города">
      <search-list v-if="selectCityShow" :items="items" @selectItem="getWeatherByCity"></search-list>
      <button @click="searchCity">Search</button>
    </div>
    <div v-show="!isLoading">
      <div v-for="(city, index) in cities" :key="index">
        <card :city="city"></card>
      </div>
    </div>
  </div>
</template>
<script>
import loading from "../../views/loading.vue";
import loadingSearch from "../../views/search-loading.vue";
import card from "./card-weather.vue";
import searchList from "./search-list.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "whether",
  components: {
    loading,
    card,
    searchList,
    loadingSearch
  },
  data: () => ({
    searchText: "",
    selectCityShow: false,
    selectCity: {}
  }),
  computed: {
    ...mapActions("weatherStore", [
      "INIT_STATE",
      "SEARCH_CITY",
      "GET_WEATHER_CITY"
    ]),
    ...mapState("weatherStore", [
      "cities",
      "items",
      "isLoading",
      "searchLoading"
    ])
  },
  created() {
    this.INIT_STATE;
  },
  mounted() {},
  methods: {
    searchCity() {
      this.SEARCH_CITY;
      this.selectCityShow = true;
    },
    getWeatherByCity(data) {
      this.selectCity = data;
      this.GET_WEATHER_CITY;
      this.selectCityShow = false;
      this.searchText = "";
    },
    hideDiv() {
      this.selectCityShow = false;
      this.searchText = "";
    }
  },
  directives: {
    ClickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = event => {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context.hideDiv();
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.weather {
  position: relative;
  .weather__search {
    width: 500px;
    margin: auto;
    text-align: center;
    input {
      width: 70%;
    }
    button {
      margin-left: .25rem;
      border-radius: .75rem;
    }
  }
}
@media screen and (max-width: 800px) {
  .weather {
    .weather__search {
      width: 80%;
      margin: .75rem auto;
      input {
        width: 75%;
      }
    }
  }
}
</style>
