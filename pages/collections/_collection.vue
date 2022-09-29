<template>
  <div class="bloobloom-app">
    <AppHeader :show-menu="showMenu" @handleMenuShow="handleMenuShow" />
    <div class="main">
      <GlassesToolbar :handle-filter-show="handleFilterShow" :collection-type="collectionType" />
      <GlassesFilters
        :available-filters="availableFilters"
        :selected-filters="selectedFilters"
        :show-filters="showFilters"
        :count="count"
        @toggle-filter="toggleFilter"
      />
      <GlassesGrid
        :glasses-list="glassesList"
        :disable-infinite-scroll="disableInfiniteScroll"
        @loadMore="loadMore"
      />
      <GlassesMenu :show-menu="showMenu" @handleMenuShow="handleMenuShow" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import collectionsApi from "~/services/collectionsApi.service";
import {
  FILTERS_LIST,
  TFilter,
  TSelectedFilters,
  ECollectionColor,
  ECollectionShape,
} from "~/constants";
import { IGlasses } from "~/services/collectionsApi.types";

export default defineComponent({
  name: "GlassCollections",
  data(): {
    showFilters: boolean;
    showMenu: boolean;
    availableFilters: typeof FILTERS_LIST;
    selectedFilters: TSelectedFilters;
    glassesList: IGlasses[];
    collectionType: string;
    count: number;
    page: number;
    disableInfiniteScroll: boolean;
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
      page: 1,
      disableInfiniteScroll: false,
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
    this.disableInfiniteScroll = this.glassesList.length === this.count;
  },

  watch: {
    selectedFilters: {
      async handler() {
        this.page = 1;
        const collection = await this.fetchCollection(this.selectedFilters, this.page);

        this.glassesList = collection.glasses;
        this.count = collection.meta.total_count;
        this.disableInfiniteScroll = this.glassesList.length === this.count;
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
    toggleFilter(filter: TFilter) {
      const index = this.selectedFilters[filter.id].findIndex(
        (filterValue: ECollectionColor | ECollectionShape) => filterValue === filter.value,
      );
      if (index > -1) {
        this.$delete(this.selectedFilters[filter.id], index);
      } else {
        // TODO: Find a good way to type filters update
        (this.selectedFilters[filter.id] as any).push(filter.value);
      }
    },
    async fetchCollection(selectedFilters: TSelectedFilters, page: number) {
      const collection = await collectionsApi.getCollection(
        this.collectionType,
        selectedFilters,
        page,
      );

      return collection;
    },

    async loadMore() {
      if (this.glassesList.length === this.count) {
        this.disableInfiniteScroll = true;
        return;
      }

      this.page++;
      this.disableInfiniteScroll = true;

      const collection = await this.fetchCollection(this.selectedFilters, this.page);

      this.glassesList.push(...collection.glasses);
      this.count = collection.meta.total_count;
      this.disableInfiniteScroll = false;
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
