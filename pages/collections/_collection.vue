<template>
  <div class="bloobloom-app">
    <AppHeader @handleMenuShow="handleMenuShow" :showMenu="showMenu" />
    <div class="main">
      <GlassesToolbar :handleFilterShow="handleFilterShow" :collectionType="collectionType" />
      <GlassesFilters
        :availableFilters="availableFilters"
        :handleFiltersChange="handleFiltersChange"
        :selectedFilters="selectedFilters"
        :showFilters="showFilters"
        :count="count"
      />
      <GlassesGrid :glassesList="glassesList" />
      <GlassesMenu :showMenu="showMenu" @handleMenuShow="handleMenuShow" />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import collectionsApi from "~/services/collectionsApi.service";
import { FILTERS_LIST } from "~/constants";

export default {
  name: "GlassCollections",
  data() {
    return {
      showFilters: false,
      showMenu: false,
      availableFilters: FILTERS_LIST,
      selectedFilters: {
        colour: [],
        shape: [],
      },
    };
  },

  methods: {
    handleFilterShow() {
      this.showFilters = !this.showFilters;
    },
    handleMenuShow(event: MouseEvent, value: boolean) {
      if (event?.relatedTarget?.parentElement?.id !== "bloobloom-menu") {
        this.showMenu = !!value;
      }
    },
    handleFiltersChange(id: string, value: string) {
      const index = this.selectedFilters[id].findIndex(filterValue => filterValue === value);
      if (index > -1) {
        this.$delete(this.selectedFilters[id], index);
      } else {
        this.selectedFilters[id].push(value);
      }
    },
    async makeRequest() {
      const collection = await collectionsApi.getCollection(
        this.collectionType,
        this.selectedFilters,
        1,
      );

      this.glassesList = collection.glasses;
      this.count = collection.meta.total_count;
    },
  },

  watch: {
    selectedFilters: {
      handler() {
        this.makeRequest();
      },
      deep: true,
    },
  },

  async asyncData({ params, error }: Context) {
    const collection = await collectionsApi
      .getCollection(params.collection, { colour: [], shape: [] }, 1)
      .catch(e => {
        error({ message: e.response.statusText });
      });

    if (!collection) return;

    return {
      glassesList: collection.glasses,
      collectionType: params.collection,
      count: collection.meta.total_count,
    };
  },
};
</script>

<style lang="scss" scoped>
.bloobloom-app {
  border: $border_style;

  .main {
    position: relative;
  }
}
</style>
