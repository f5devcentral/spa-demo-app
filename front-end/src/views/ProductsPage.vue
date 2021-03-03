<template>
  <div id="page-wrap">
    <ProductsGrid :products="products" />
  </div>
</template>

<script>
import axios from "axios";
import storage from "../mixins/storage";
import ProductsGrid from "../components/ProductsGrid.vue";

export default {
  name: "ProductsPage",
  components: {
    ProductsGrid,
  },
  mixins: [storage],
  data() {
    return {
      api_url: localStorage.api_url,
      products: [],
    };
  },
  async created() {
    // if the app is not configured yet
    if (!this.api_url) this.$router.push("/stats?config=first");
    else {
      const result = await axios.get(`${this.api_url}/api/products`);
      const products = result.data;
      this.products = products;
    }
  },
};
</script>

