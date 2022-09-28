<template>
  <div class="cards-view">
    <GlassesItem
      v-for="(glass, index) in glassesList"
      :key="glass.id"
      :glass="glass"
      :is-last-card="getIsLastCard(index, glassesList)"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    glassesList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getIsLastCard(index, cards) {
      return cards.length - 1 === index;
    },
  },
};
</script>

<style lang="scss" scoped>
.cards-view {
  display: flex;
  flex-wrap: wrap;
  border-top: $border_style;
}
</style>
