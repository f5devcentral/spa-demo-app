<template>
  <div class="product-container">
    <img class="product-image" :src="api_url + product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button class="remove-button" v-if="!readOnly" v-on:click="$emit('remove-from-cart', product.id)">
      Remove From Cart
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ProductsListItemComponent",
  props: ["product", "readOnly"],
  data() {
    return {
      api_url: localStorage.api_url,
    };
  },
});
</script>

<style scoped>
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
}
</style>
