<template>
  <div class="weather__searchList">
    <div v-for="(item, i) in items" :key="i">
      <div class="weather__searchList_item" @click="selectItem(item)">
        <div class="weather__searchList_item_city" v-text="item.city"></div>
        <div class="weather__searchList_item_country" v-text="item.country"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "search-list",
  components: {},
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.weather__searchList {
  left: 0;
  right: 0;
  z-index: 1;
  width: 20%;
  overflow: auto;
  cursor: pointer;
  max-height: 100%;
  margin-top: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  background-color: whitesmoke;
  .weather__searchList_item {
    &:hover {
      font-weight: bold;
    }
    .weather__searchList_item_city {
      font-size: 1.1rem;
    }
    .weather__searchList_item_country {
      font-size: .9rem;
    }
  }
}
@media screen and (max-width: 800px) {
  .weather__searchList {
    width: 55%;
  }
}
</style>
