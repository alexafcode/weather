<template>
  <div>
    <div
      class="card"
      :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
    >
      <div class="card__title">
        <div class="card__title-time">{{city.time}}</div>
        <div class="card__title-location">{{city.country}}, {{city.city}}</div>
      </div>
      <div class="card__center">
        <div class="card__center-text">
          Сейчас:
          <div class="card__center-temp">{{city.temp}}</div>
          <div class="card__center-real">
            Ощущается как:
            <div class="card__center-val">{{city.realFeelTemperature}}</div>
          </div>
        </div>
        <div>
          <div
            class="card__center-icon"
            :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${city.WeatherIcon}.png`)})`}"
          ></div>
        </div>
        <div class="card__center-wind">
          <div>
            Направление ветра:
            <span class="card__center-direct">{{city.windDirect}}</span>
          </div>
          <!-- <div class="text-md-center"> -->
          Скорость ветра:
          <span class="card__center-speed">{{city.windSpeed}}</span>
          <!-- </div> -->
          <div class="card__center-pressure">
            <img src="@/assets//weather-icons/icon-pressure.png" alt="pressure">
            <span class="card__center-pressure-val">{{city.pressure}}</span>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <button @click="saveToLS">Сохранить</button>
        <div class="card__footer-text">
          <div>{{city.weatherText}}</div>
          <div>Видимость {{city.visibility}}</div>
        </div>
        <button class="card__footer-more" @click="GetWeatherForecast">На 5 дней</button>
      </div>
    </div>
    <div
      class="card__datails"
      v-if="showMore"
      :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
    >
      <div v-for="(item, index) in cityForecastItems" :key="index">
        <card-datail :cityItem="item" :dayTime="dayTime"></card-datail>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import cardDatail from "./card-detail.vue";

export default {
  name: "card-weather",
  components: {
    cardDatail
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    cityForecastItems: null,
    showMore: false
  }),
  computed: {
    dayTime() {
      return this.city.IsDayTime ? "day" : "night";
    },
    ...mapActions("weatherStore", ["GET_WEATHER_FORECAST"])
  },
  methods: {
    saveToLS() {
      let arr = [];
      let city = {};
      city = {
        Key: this.city.key,
        selectCity: {
          city: this.city.city,
          country: this.city.country
        }
      };
      if (localStorage.getItem("city") != null) {
        arr = JSON.parse(localStorage.getItem("city"));
      }
      let exist = false;
      arr.forEach(el => {
        if (el.Key === this.city.key) {
          exist = true;
        }
      });
      if (!exist) {
        arr.push(city);
        localStorage.setItem("city", JSON.stringify(arr));
        alert("Сохранено");
      } else {
        alert("Уже Сохранено");
      }
    },
    GetWeatherForecast() {
      if (!this.showMore) {
        this.GET_WEATHER_FORECAST.then(result => {
          this.cityForecastItems = result;
          this.showMore = true;
        });
      } else {
        this.showMore = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  width: 500px;
  margin: auto;
  height: 200px;
  padding: 1.25rem;
  margin-top: 1%;
  margin-bottom: 1rem;
  border-radius: 1em;
  text-align: center;
  position: relative;
  .card__title {
    color: white;
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
    .card__title-time {
      color: wheat;
      font-size: 0.9rem;
      font-weight: 200;
    }
  }
  .card__center {
    display: flex;
    flex-direction: row;
    align-items: center;

    .card__center-text {
      line-height: 1.5;
      color: lightgray;
      .card__center-temp {
        font-size: 2rem;
        font-weight: 400;
        line-height: 1.75rem;
        color: whitesmoke;
      }
    }
    .card__center-real {
      color: lightgray;
      .card__center-val {
        color: white;
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.5rem;
      }
    }
    .card__center-icon {
      width: 190px;
      height: 135px;
      background-size: contain;
      background-position: top;
      background-repeat: no-repeat;
    }
    .card__center-wind {
      line-height: 1.5;
      color: lightgray;
      .card__center-speed,
      .card__center-direct {
        color: white;
      }
    }
    .card__center-pressure {
      color: lightgray;
    }
  }
  .card__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    button {
      border: none;
      font-size: 16px;
      color: burlywood;
      text-decoration: underline;
      background-color: transparent;
    }
    color: lightgray;
    .card__footer-text {
      text-align: center;
      align-items: flex-end;
    }
  }
}
.card__datails {
  position: relative;
  width: 500px;
  margin: auto;
  display: flex;
  height: 220px;
  padding: 20px;
  margin-bottom: 1vh;
  border-radius: 1em;
  flex-direction: row;
  background-color: lightgray;
}

@media screen and (max-width: 800px) {
  .card {
    width: 90%;
    height: 40%;
    margin: auto;
    .card__center {
      font-size: 12px;
      .card__center-icon {
        width: 45vw;
        height: 25vh;
        background-position: center;
      }
    }
    .card__footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .card__footer-text {
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .card__datails {
    width: 90%;
    margin: auto;
  }
}
</style>
