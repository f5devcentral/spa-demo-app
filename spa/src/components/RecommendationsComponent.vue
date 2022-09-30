<template>
  <div class="recommendations" v-if="recIsActive">
    <h3>Check out these similar selections</h3>
    <ProductsGridComponent :products="products" />
  </div>
</template>
   
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import ProductsGridComponent from "../components/ProductsGridComponent.vue";

export default defineComponent({
  name: "RecommendationsComponent",
  props: ["id"],
  components: {
    ProductsGridComponent,
  },
  data() {
    return {
      products: [],
      recIsActive: true,
      recommendations_url: localStorage.recommendations_url,
    };
  },
  async created() {
    axios
      .get(`${this.recommendations_url}/api/recommendations/${this.id}`)
      .then((result) => {
        const products = result.data;
        this.products = products;
      })
      .catch((error) => {
        console.log(error);
        this.recIsActive = false;
      });
  },
});
</script>

<style scoped>
</style>