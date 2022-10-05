<template>
  <div class="grid-wrap">
    <ProductsGridItemComponent
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import ProductsGridItemComponent from "./ProductsGridItemComponent.vue"
import { Product } from "../types"

export default defineComponent({
    name: "ProductsGridComponent",
    components: {
        ProductsGridItemComponent,
    },
    props: {
      products: {
        type: Array as PropType<Product[]>,
        required: true
      }
    },
})
</script>

<style scoped>
  .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }
</style>