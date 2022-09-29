<template>
  <div class="cards-view">
    <GlassesItem
      v-for="(glass, index) in glassesList"
      :key="glass.id"
      :glass="glass"
      :is-last-card="getIsLastCard(index, glassesList)"
    />
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="340"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IGlasses } from "~/services/collectionsApi.types";

export default defineComponent({
  props: {
    glassesList: {
      type: Array,
      default() {
        return [];
      },
    },
    disableInfiniteScroll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getIsLastCard(index: number, cards: IGlasses[]) {
      return cards.length - 1 === index;
    },
    loadMore() {
      this.$emit("loadMore");
    },
  },
});
</script>

<style lang="scss" scoped>
.cards-view {
  display: flex;
  flex-wrap: wrap;
  border-top: $border_style;
}
</style>
