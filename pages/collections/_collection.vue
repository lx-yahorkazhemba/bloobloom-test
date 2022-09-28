<template>
  <div class="bloobloom-app">
    <div v-for="glass in glassList" :key="glass.id">{{ glass.name }}</div>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import collectionsApi from "~/services/collectionsApi.service";

export default {
  name: "GlassCollections",

  async asyncData({ params, error }: Context) {
    const collection = await collectionsApi
      .getCollection(params.collection, { colour: [], shape: [] }, 1)
      .catch(e => {
        error({ message: e.response.statusText });
      });

    if (!collection) return;

    return {
      glassList: collection.glasses,
      collectionType: params.collection,
      count: collection.meta.total_count,
    };
  },
};
</script>
