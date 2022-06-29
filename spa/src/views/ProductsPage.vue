<template>
  <div id="page-wrap">
    <ProductsGridComponent :products="products" />
  </div>
</template>

<script>
import axios from "axios";
import storage from "../mixins/storage";
import ProductsGridComponent from "../components/ProductsGridComponent.vue";

export default {
  name: "ProductsPage",
  components: {
    ProductsGridComponent,
  },
  mixins: [storage],
  data() {
    return {
      api_url: localStorage.api_url,
      products: [],
    };
  },
  async created() {
    const result = await axios.get(`${this.api_url}/api/products`);
    const products = result.data;
    this.products = products;
  },
};
</script>

