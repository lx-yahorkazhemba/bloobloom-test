<template>
  <Transition>
    <div v-if="showFilters" class="filters-wrapper">
      <div class="filter-options">
        <GlassesFilter
          v-for="filter in availableFilters"
          :key="filter.id"
          :filter="filter"
          @toggle-filter="$emit('toggle-filter', $event)"
          :selected-filters="selectedFilters"
        />
      </div>
      <div class="filters-results">
        <div class="selected-filters">
          <div v-for="filter in selectedFiltersList" :key="filter.value" class="filter-option">
            <div class="filter-option-name">{{ filter.value }}</div>
            <div class="remove-filter-btn" @click="$emit('toggle-filter', filter)">&#10006;</div>
          </div>
        </div>
        <div class="filters-results-count">{{ count }} RESULTS FOUND</div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ECollectionColor, ECollectionShape, TFilter } from "~/constants";

export default defineComponent({
  name: "GlassesFilters",

  props: {
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
  computed: {
    selectedFiltersList(): TFilter[] {
      return Object.entries(this.selectedFilters)
        .map(([id, selectedValues]) => {
          return selectedValues.map((value: ECollectionColor | ECollectionShape) => ({
            id,
            value,
          }));
        })
        .flat();
    },
  },
});
</script>

<style lang="scss" scoped>
.filters-wrapper {
  border-top: $border_style;

  .filter-options {
    display: flex;
  }

  .filters-results {
    border-top: $border_style;
    border-bottom: none;
    padding: 10px 30px;
    font-size: 15px;
    text-align: center;
    font-weight: 600;
    position: relative;

    .selected-filters {
      width: 30%;
      display: flex;
      flex-wrap: wrap;
      min-height: 40px;

      .filter-option {
        display: flex;
        min-width: 80px;
        margin-right: 10px;
        align-items: center;

        &-name {
          padding: 10px;
          text-transform: uppercase;
          font-weight: normal;
          font-size: 13px;
        }

        .remove-filter-btn {
          position: relative;
          bottom: 1px;
          font-size: 10px;
          cursor: pointer;
        }
      }
    }

    &-count {
      position: absolute;
      top: calc(50% - 8px);
      left: calc(50% - 35px);
    }
  }
}

.v-enter-active {
  @include common-animation(filters-appearance);
}

.v-leave-active {
  @include common-animation(filters-disappearance, ease-in);
}
</style>
