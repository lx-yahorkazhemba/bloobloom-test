<template>
  <Transition>
    <div v-if="showFilters" class="filters-wrapper">
      <div class="filter-options">
        <GlassesFilter
          v-for="filter in availableFilters"
          :filter="filter"
          :key="filter.id"
          :handle-filters-change="handleFiltersChange"
          :selected-filters="selectedFilters"
        />
      </div>
      <div class="results-amount">{{ count }} RESULTS FOUND</div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default {
  name: "GlassesFilters",

  props: {
    handleFiltersChange: {
      type: Function,
      default: () => {},
    },
    selectedFilters: {
      type: Object,
      default: () => ({}),
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    availableFilters: { type: Array, default: () => [] },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    isOptionSelected(id) {
      return !!this.selectedFilters[this.filter.id].includes(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.filters-wrapper {
  border-top: $border_style;

  .filter-options {
    display: flex;
  }

  .results-amount {
    border-top: $border_style;
    border-bottom: none;
    padding: 21px 30px;
    font-size: 15px;
    text-align: center;
    font-weight: 600;
  }
}

.v-enter-active {
  @include common-animation(filters-appearance);
}

.v-leave-active {
  @include common-animation(filters-disappearance, ease-in);
}
</style>
