<template>
  <div :id="isLastCard && 'last-item'" class="glasses-item">
    <div class="glasses-item-title">{{ glass.name }}</div>
    <img :src="glass.glass_variants[0].media[0].url" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    glass: {
      type: Object,
      default: () => ({}),
    },
    isLastCard: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.glasses-item {
  position: relative;
  width: calc(33.3% - 1px);
  height: 340px;
  border-bottom: $border_style;

  &:not(:nth-child(3n)) {
    border-right: $border_style;
    width: 33.3%;
  }

  &-title {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 20px;
    font-size: 20px;
    text-transform: uppercase;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
