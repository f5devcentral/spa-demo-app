<template>
  <div class="recommendations" v-if="recIsActive">
    <h3>Check out these similar selections</h3>
    <ProductsGrid :products="products" />
  </div>
</template>
   
<script>
import axios from "axios";
import ProductsGrid from "../components/ProductsGrid.vue";

export default {
  name: "Recommendations",
  components: {
    ProductsGrid,
  },
  data() {
    return {
      products: [],
      recIsActive: true,
    };
  },
  async created() {
    axios
      .get(`${process.env.VUE_APP_REC_URL}/api/recommendations`)
      .then((result) => {
        const products = result.data;
        this.products = products;
      })
      .catch((error) => {
        console.log(error);
        this.recIsActive = false;
      });
  },
};
</script>

<style scoped>
</style>