<template>
  <div class="search-list">
    <div v-for="(item, i) in items" :key="i">
      <div class="search-list__item" @click="selectItem(item)">
        <div class="search-list__city" v-text="item.city"></div>
        <div class="search-list__country" v-text="item.country"></div>
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
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.search-list {
  left: 0;
  right: 0;
  z-index: 1;
  width: 20%;
  overflow: auto;
  cursor: pointer;
  margin-top: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  background-color: whitesmoke;
  .search-list__item {
    &:hover {
      font-weight: bold;
    }
    .search-list__city {
      font-size: 1.1rem;
    }
    .search-list__country {
      font-size: 0.9rem;
    }
  }
}
@media screen and (max-width: 800px) {
  .search-list {
    width: 55%;
  }
}
</style>
