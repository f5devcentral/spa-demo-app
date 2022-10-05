<template>
  <div v-if="products.length > 0">
    <ProductsListItemComponent
      v-for="product in products"
      :key="product.id"
      :product="product"
      :read-only="readOnly"
      @remove-from-cart="$emit('remove-from-cart', $event)"
    />
  </div>
  <p v-else>
    You haven't added anything to your cart yet!
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Product } from "../types"
import ProductsListItemComponent from "./ProductsListItemComponent.vue"

export default defineComponent({
  name: "ProductsListComponent",
  components: {
    ProductsListItemComponent,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["remove-from-cart"],
})
</script>
