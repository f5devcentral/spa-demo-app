<template>
  <div id="page-wrap">
    <ProductsGridComponent :products="products" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue"
import ProductsGridComponent from "../components/ProductsGridComponent.vue";
import { Product } from "../types"

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductsGridComponent,
  },
  data() {
    return {
      api_url: localStorage.api_url,
      products: [] as Product[],
    };
  },
  async created() {
    const result = await axios.get<Product[]>(`${localStorage.getItem("api_url")}/api/products`);
    this.products = result.data;
  },
});
</script>
