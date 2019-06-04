<template>
  <div class="detail">
    <div class="detail__date">{{ cityItem.date }}</div>
    <div
      class="detail__day_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.dayIcon}.png`)})`}"
    ></div>
    <div class="detail__day_temp">Днём:</div>
    <div class="detail__day_temp_value">{{ cityItem.tempDay }}</div>
    <div
      class="detail__night_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.nightIcon}.png`)})`}"
    ></div>
    <div class="detail__night_temp">Ночью:</div>
    <div class="detail__night_temp_value">{{ cityItem.tempNight }}</div>
    <div class="detail__day_text">{{ cityItem.dayIconText }}</div>
  </div>
</template>
<script>
export default {
  name: "card-datails",
  components: {},
  props: {
    cityItem: {
      type: Object,
      required: true
    },
    dayTime: {
      required: true
    }
  },
};
</script>
<style lang="scss" scoped>
.detail {
  margin: 0.25rem;
  width: 90px;
  height: 250px;
  min-height: 240px;
  border-radius: 1rem;
  text-align: center;
  &:hover {
    transform: scale(1.05);
  }
  .detail__date {
    color: white;
  }
  .detail__day_icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__day_temp {
    color: lightgray;
  }
  .detail__day_temp_value {
    color: white;
    font-size: 1.25rem;
    font-weight: 400;
  }
  .detail__night_icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__night_temp {
    color: lightgray;
  }
  .detail__night_temp_value {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }
  .detail__day_text {
    font-size: 0.7rem;
    word-break: normal;
    color: lightgray;
    white-space: normal;
  }
}
@media screen and (max-width: 800px) {
  .detail {
    width: 16vw;
    .detail__day_icon {
      width: 15vw;
    }
    .detail__night_icon {
      width: 15vw;
      display: none;
    }
    .detail__day_text {
      word-break: break-word;
    }
  }
}
</style>
