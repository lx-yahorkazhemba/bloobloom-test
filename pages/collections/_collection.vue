<template>
  <div class="bloobloom-app">
    <AppHeader :show-menu="showMenu" @handleMenuShow="handleMenuShow" />
    <div class="main">
      <GlassesToolbar :handle-filter-show="handleFilterShow" :collection-type="collectionType" />
      <GlassesFilters
        :available-filters="availableFilters"
        :handle-filters-change="handleFiltersChange"
        :selected-filters="selectedFilters"
        :show-filters="showFilters"
        :count="count"
      />
      <GlassesGrid :glasses-list="glassesList" />
      <GlassesMenu :show-menu="showMenu" @handleMenuShow="handleMenuShow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import collectionsApi from "~/services/collectionsApi.service";
import { ECollectionColor, FILTERS_LIST, ECollectionShape, TFilter } from "~/constants";
import { IGlasses } from "~/services/collectionsApi.types";

export default defineComponent({
  name: "GlassCollections",
  data(): {
    showFilters: boolean;
    showMenu: boolean;
    availableFilters: typeof FILTERS_LIST;
    selectedFilters: {
      colour: ECollectionColor[];
      shape: ECollectionShape[];
    };
    glassesList: IGlasses[];
    collectionType: string;
    count: number;
  } {
    return {
      showFilters: false,
      showMenu: false,
      availableFilters: FILTERS_LIST,
      selectedFilters: {
        colour: [],
        shape: [],
      },
      glassesList: [],
      collectionType: "",
      count: 0,
    };
  },
  async fetch() {
    const { params, error } = this.$nuxt.context;

    const collection = await collectionsApi
      .getCollection(params.collection, { colour: [], shape: [] }, 1)
      .catch(e => {
        error({ message: e.response.statusText });
      });

    if (!collection) return;

    this.glassesList = collection.glasses;
    this.collectionType = params.collection;
    this.count = collection.meta.total_count;
  },

  watch: {
    selectedFilters: {
      handler() {
        this.makeRequest();
      },
      deep: true,
    },
  },
  methods: {
    handleFilterShow() {
      this.showFilters = !this.showFilters;
    },
    handleMenuShow(event: MouseEvent, value: boolean) {
      const target = event?.relatedTarget as HTMLDivElement;

      if (target?.parentElement?.id !== "bloobloom-menu") {
        this.showMenu = !!value;
      }
    },
    handleFiltersChange(event: TFilter) {
      const index = this.selectedFilters[event.id].findIndex(
        filterValue => filterValue === event.value,
      );
      if (index > -1) {
        this.$delete(this.selectedFilters[event.id], index);
      } else {
        // TODO: Find a good way to type filters update
        (this.selectedFilters[event.id] as any).push(event.value);
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
});
</script>

<style lang="scss" scoped>
.bloobloom-app {
  border: $border_style;

  .main {
    position: relative;
  }
}
</style>
