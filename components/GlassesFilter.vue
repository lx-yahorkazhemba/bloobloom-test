<template>
  <div class="filter" :class="filter.id">
    <div class="filter-name">{{ filter.id }}</div>
    <div class="filter-options">
      <div
        v-for="option in filter.options"
        :key="option.id"
        :class="['option', { selected: isOptionSelected(option.id) }]"
        @click="handleFiltersChange({ id: filter.id, value: option.id })"
      >
        <div
          v-if="option.src"
          :class="['option-img', { selected: isOptionSelected(option.id) }]"
          :style="{ backgroundImage: `url(${option.src})` }"
        ></div>
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlassesFilter",

  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    handleFiltersChange: {
      type: Function,
      default: () => {},
    },
    selectedFilters: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    isOptionSelected(id: "colour" | "shape") {
      return !!this.selectedFilters[this.filter.id].includes(id);
    },
  },
});
</script>

<style lang="scss" scoped>
.filter {
  width: 25%;
  border-right: $border_style;
  font-size: 15px;

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .option {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  &.shape {
    .filter-options {
      height: 120px;
      padding: 0 22px;
      justify-content: space-between;
    }

    .option {
      width: auto;
      padding: 0 5px;

      &:hover {
        text-decoration: underline;
      }

      &.selected {
        text-decoration: underline;
      }
    }
  }

  &.colour {
    .filter-options {
      padding: 14px 22px;
    }

    .option {
      width: 33%;
      height: 24px;
      margin: 11px 0;
      text-transform: capitalize;

      &-img {
        margin-right: 7px;
        width: 16px;
        height: 16px;
        border-radius: 50%;

        &:hover {
          outline: $border_style;
        }

        &.selected {
          outline: $border_style;
        }
      }
    }
  }

  &:not(:first-child) {
    border-left: none;
  }

  &-name {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    height: 60px;
    font-weight: 700;
    border-bottom: $border_style;
  }
}
</style>
