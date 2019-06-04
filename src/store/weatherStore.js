import axios from "axios";
import key from "./keys.js";

export default {
  namespaced: true,
  state: {
    cities: [],
    items: [],
    isLoading: null,
    searchLoading: null
    // time: null
  },
  mutations: {
    SET_CITY(state, payload) {
      state.cities.push(payload);
      state.isLoading = false;
    },
    SET_ITEM_CITY(state, payload) {
      state.items = payload;
      state.searchLoading = false;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_SEARCHLOADING(state, payload) {
      state.searchLoading = payload;
    }
  },
  actions: {
    INIT_STATE({ dispatch, state, commit }) {
      commit("SET_LOADING", true);
      // check state
      if (state.cities.length === 0) {
        let arr = [];
        if (localStorage.getItem("city") != null) {
          arr = JSON.parse(localStorage.getItem("city"));
        }
        arr.forEach(el => {
          dispatch("GET_WEATHER_CITY", el);
        });
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
              key.weather
            }&q=${latitude},${longitude}&language=ru-ru`;
            axios
              .get(url)
              .then(response => {
                // compare key in localStorage
                let exist = false;
                arr.forEach(el => {
                  if (el.Key === response.data.Key) {
                    exist = true;
                  }
                });
                if (!exist) {
                  dispatch("GET_WEATHER_CITY", response.data);
                }
              })
              // eslint-disable-next-line
              .catch(error => console.error("Erorr", error.message));
          });
        } else {
          alert("Геолокация Недоступна");
        }
      } else {
        commit("SET_LOADING", true);
      }
    },
    async GET_WEATHER_CITY({ commit }, data) {
      let queryKey = data.Key ? data.Key : data.selectCity.Key;
      let city = {};
      let url = `https://dataservice.accuweather.com/currentconditions/v1/${queryKey}?apikey=${
        key.weather
      }&language=ru-ru&details=true`;
      await axios
        .get(url)
        .then(result => {
          let res = result.data[0];
          let cityName = data.ParentCity
            ? data.ParentCity.LocalizedName
            : data.LocalizedName;
          let time = new Date(res.LocalObservationDateTime).toLocaleString(
            "ru",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          );
          city = {
            key: queryKey,
            city: data.selectCity ? data.selectCity.city : cityName,
            country: data.Country
              ? data.Country.LocalizedName
              : data.selectCity.country,
            temp: `${res.Temperature.Metric.Value.toFixed()}°  ${
              res.Temperature.Metric.Unit
            }`,
            windDirect: res.Wind.Direction.Localized,
            windSpeed: `${res.Wind.Speed.Metric.Value}  ${
              res.Wind.Speed.Metric.Unit
            }`,
            weatherText: res.WeatherText,
            realFeelTemperature: `${res.RealFeelTemperature.Metric.Value.toFixed()}° ${
              res.RealFeelTemperature.Metric.Unit
            }`,
            visibility: `${res.Visibility.Metric.Value} ${
              res.Visibility.Metric.Unit
            }`,
            WeatherIcon: res.WeatherIcon,
            IsDayTime: res.IsDayTime,
            time: time,
            pressure: `${res.Pressure.Metric.Value} мм рт. ст.`
          };
          commit("SET_CITY", city);
        })
        // eslint-disable-next-line
        .catch(error => console.error(error.message));
    },
    SEARCH_CITY({ commit }, payload) {
      commit("SET_SEARCHLOADING", true);
      let url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
        key.weather
      }&q=${payload.searchText}&language=ru-ru`;
      let items = [];
      let cities = {};
      axios
        .get(url)
        .then(response => {
          if (response.data.length > 0) {
            response.data.forEach(el => {
              cities = {
                country: el.Country.LocalizedName,
                city: el.LocalizedName,
                Key: el.Key
              };
              items.push(cities);
            });
          } else {
            cities = {
              city: "Ничего не найдено"
            };
            items.push(cities);
          }
          commit("SET_ITEM_CITY", items);
        })
        // eslint-disable-next-line
        .catch(error => console.error(error));
    },
    // eslint-disable-next-line
    async GET_WEATHER_FORECAST({ commit }, payload) {
      let arr = [];
      let url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${
        payload.city.key
      }?apikey=${key.weather}&language=ru-ru&metric=true`;
      await axios
        .get(url)
        .then(async result => {
          let res = result.data.DailyForecasts;
          arr = res.map(el => {
            return {
              date: new Date(el.Date).toLocaleString("ru", {
                day: "numeric",
                month: "long"
              }),
              dayIcon: el.Day.Icon,
              dayIconText: el.Day.IconPhrase,
              tempDay: `${el.Temperature.Maximum.Value.toFixed()} ° C`,
              nightIcon: el.Night.Icon,
              tempNight: `${el.Temperature.Minimum.Value.toFixed()} ° C`
            };
          });
          // eslint-disable-next-line
        })
        // eslint-disable-next-line
        .catch(error => console.error(error.message));
      return arr;
    },
    DELETE_FROM_LS() {
      /// ToDo
    }
  },
  getters: {}
};

