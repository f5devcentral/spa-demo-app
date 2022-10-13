<template>
  <div class="product-container">
    <img class="product-image" :src="api_url + product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button v-if="!readOnly" class="remove-button" @click="$emit('remove-from-cart', product.id)">
      Remove From Cart
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"
import type { Product } from "../types"

export default defineComponent({
  name: "ProductsListItemComponent",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    readOnly: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["remove-from-cart"],
  data() {
    return {
      api_url: localStorage.api_url,
    }
  },
})
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
