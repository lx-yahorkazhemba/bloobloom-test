<template>
  <div class="glasses-toolbar">
    <div class="glasses-toolbar-title">{{ collectionTypeLabel }}</div>
    <div class="glasses-toolbar-filters">
      <button @click="handleFilterShow">filters</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlassesToolbar",

  props: {
    handleFilterShow: {
      type: Function,
      default: () => {},
    },
    collectionType: {
      type: String,
      default: "",
    },
  },

  methods: {
    onFilterShowChange() {
      this.$emit("handleFilterShow");
    },
  },

  computed: {
    collectionTypeLabel() {
      return this.collectionType.split("-").join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
.glasses-toolbar {
  position: relative;
  display: flex;
  text-transform: uppercase;

  &-title {
    font-weight: bold;
    text-align: center;
    width: 33.3%;
    padding: 15px 0;
    font-size: 20px;
    position: relative;
    margin-left: 33.3%;
    border-left: $border_style;
    border-right: $border_style;
  }

  &-filters {
    display: flex;

    button {
      text-transform: uppercase;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 30px;
      cursor: pointer;
      border: none;
      border-right: $border_style;
    }
  }
}
</style>
