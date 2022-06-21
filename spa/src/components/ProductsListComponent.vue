<template>
  <div v-if="products.length > 0">
    <ProductsListItemComponent
      v-for="product in products"
      v-on:remove-from-cart="$emit('remove-from-cart', $event)"
      :key="product.id"
      :product="product"
    />
  </div>
  <p v-else>You haven't added anything to your cart yet!</p>
</template>

<script>
import ProductsListItemComponent from "./ProductsListItemComponent.vue";

export default {
  name: "ProductsListComponent",
  props: ["products"],
  components: {
    ProductsListItemComponent,
  },
};
</script>