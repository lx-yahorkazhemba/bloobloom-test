<template>
  <div class="header">
    <div
      id="menu-btn"
      :class="['menu-btn', { isOpen: showMenu }]"
      @mouseover="onShowMenu($event, true)"
      @mouseleave="onShowMenu($event, false)"
    >
      Menu
    </div>
    <div class="logo"><span>Bloobloom</span></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
  props: {
    handleMenuShow: {
      type: Function,
      default: () => {},
    },
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onShowMenu(event, value) {
      this.$emit("handleMenuShow", event, value);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: $border_style;

  .menu-btn {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 40px;
    position: relative;
    border-right: $border_style;

    &:hover {
      cursor: pointer;
    }

    &.isOpen:after {
      content: "";
      position: absolute;
      bottom: 8px;
      width: 39px;
      height: 1px;
      background: $primary;
    }
  }

  .logo {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    flex-grow: 1;

    span {
      position: relative;
      left: -100px;
    }
  }
}
</style>
