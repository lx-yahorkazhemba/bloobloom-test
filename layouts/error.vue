<template>
  <div class="error-screen">
    <div class="error-screen-info">
      <h1>{{ error.message }}</h1>
      <div class="back-btn">
        <nuxt-link to="/collections/spectacles-women">Go to Home page</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  layout: "error",
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.error-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  background: $primary;

  h1 {
    font-size: 30px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: $secondary;
  }

  .back-btn {
    display: flex;
    justify-content: center;

    a {
      color: $secondary;
    }
  }
}
</style>
