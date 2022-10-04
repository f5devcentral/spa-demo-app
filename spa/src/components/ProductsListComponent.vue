<template>
  <div v-if="products.length > 0">
    <ProductsListItemComponent
      v-for="product in products"
      v-on:remove-from-cart="$emit('remove-from-cart', $event)"
      :key="product.id"
      :product="product"
      :readOnly="readOnly"
    />
  </div>
  <p v-else>You haven't added anything to your cart yet!</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductsListItemComponent from "./ProductsListItemComponent.vue";

export default defineComponent({
  name: "ProductsListComponent",
  props: ["products", "readOnly"],
  components: {
    ProductsListItemComponent,
  },
});
</script>
