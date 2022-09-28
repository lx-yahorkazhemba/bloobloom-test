<template>
  <Transition name="menu">
    <div v-if="showMenu" id="bloobloom-menu" class="menu" @mouseleave="handleShow($event)">
      <div
        v-for="option in optionList"
        :key="option.id"
        :class="['menu-option', { 'sub-option': option.hasSubOptions }]"
        @mouseover="handleSubMenuShow(option.id, option.hasSubOptions)"
        @mouseleave="handleSubMenuClose($event)"
      >
        {{ option.label }}
      </div>
      <Transition name="sub-menu">
        <div v-if="showSubMenu" class="sub-menu">
          <div
            v-for="subOption in subOptionList"
            :key="subOption.id"
            class="menu-option"
            @click="handleSelection($event, subOption.id)"
          >
            {{ subOption.label }}
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
import { SUB_OPTIONS_LIST, MENU_OPTIONS_LIST } from "~/constants";

export default {
  name: "GlassesMenu",
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
  data() {
    return {
      optionList: MENU_OPTIONS_LIST,
      showSubMenu: false,
      subOptionList: SUB_OPTIONS_LIST,
      currentGlassesType: null,
    };
  },
  watch: {
    showMenu(newState) {
      if (!newState) this.subMenuClose();
    },
  },
  methods: {
    handleShow(event) {
      if (event.relatedTarget.id !== "menu-btn") {
        this.$emit("handleMenuShow");
      }
    },
    handleSubMenuShow(type, hasSubOptions) {
      this.currentGlassesType = type;
      this.showSubMenu = hasSubOptions;
    },
    subMenuClose() {
      this.currentGlassesType = null;
      this.showSubMenu = false;
    },
    handleSelection(type) {
      const selection = `${this.currentGlassesType}-${type}`;
      this.$emit("handleMenuShow");
      this.$router.push(selection);
    },
    handleSubMenuClose(event) {
      if (event.relatedTarget.id === "menu-btn") this.subMenuClose();
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  height: 100%;
  width: 240px;
  top: 0;
  background: $secondary;
  border-right: $border_style;

  &-option {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: $border_style;
    cursor: pointer;

    &:hover {
      background: $primary;
      color: $secondary;
    }

    &.sub-option {
      position: relative;

      &:after {
        position: absolute;
        right: 20px;
        content: "\23F5";
        font-size: 20px;
        color: $third;
      }
    }
  }

  .sub-menu {
    position: absolute;
    left: 240px;
    width: 240px;
    height: 100%;
    top: 0;
    background: $secondary;
    border-right: $border_style;
  }
}

.menu-enter-active {
  @include common-animation(main-menu-appearance);
}

.menu-leave-active {
  @include common-animation(main-menu-disappearance, ease-in);
}

.sub-menu-enter-active {
  @include common-animation(sub-menu-appearance);
}

.sub-menu-leave-active {
  @include common-animation(sub-menu-disappearance, ease-in);
}
</style>
