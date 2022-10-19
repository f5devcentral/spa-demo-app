<template>
  <div id="page-wrap">
    <ProductsGridComponent :products="products" />
  </div>
</template>

<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import ProductsGridComponent from "../components/ProductsGridComponent.vue"
import type { Product } from "../types"
import { loadStorage } from "@/utils/Storage"

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductsGridComponent,
  },
  data() {
    return {
      config: {} as any,
      products: [] as Product[],
    }
  },
  async created() {
    this.config = loadStorage()
    const result = await axios.get<Product[]>(`${this.config.apiUrl}/api/products`)
    this.products = result.data
  },
})
</script>
