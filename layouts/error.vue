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
<script>
export default {
  layout: "error",
  props: {
    error: {
      type: {
        message: String,
        default: "Unknown error",
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.error-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  background: black;

  h1 {
    font-size: 30px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: white;
  }

  .back-btn {
    display: flex;
    justify-content: center;

    a {
      color: white;
    }
  }
}
</style>
