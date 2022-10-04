<template>
  <div class="grid-wrap">
    <ProductsGridItemComponent
        v-for="product in products"
        :key="product.id"
        :product="product" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductsGridItemComponent from './ProductsGridItemComponent.vue';

export default defineComponent({
    name: 'ProductsGridComponent',
    props: ['products'],
    components: {
        ProductsGridItemComponent,
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