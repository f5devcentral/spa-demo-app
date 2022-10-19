<template>
  <div v-if="product" id="page-wrap" :key="product.id">
    <div id="img-wrap">
      <img v-if="product.imageUrl" :src="config.apiUrl + product.imageUrl" />
    </div>
    <div id="product-details">
      <h1 id="product-name">
        {{ product.name }}
      </h1>
      <h3 id="product-price">${{ product.price }}</h3>
      <p><b>Average rating</b>: {{ product.averageRating }}</p>
      <p>{{ product.description }}</p>
      <InventoryComponent v-if="config.inventoryUrl && product?.id" :id="product.id" />
      <button v-if="!itemIsInCart && !showSuccessMessage" id="add-to-cart" @click="addToCart">
        Add to Cart
      </button>
      <button v-if="!itemIsInCart && showSuccessMessage" id="add-to-cart" class="green-button">
        Successfully added item to cart!
      </button>
      <button v-if="itemIsInCart" id="add-to-cart" class="grey-button">
        Item is already in cart
      </button>
    </div>
    <RecommendationsComponent v-if="config.recommendationsUrl && product?.id" :id="product.id" />
  </div>
  <NotFoundPage v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import type { Product } from "../types"
import NotFoundPage from "./NotFoundPage.vue"
import RecommendationsComponent from "../components/RecommendationsComponent.vue"
import InventoryComponent from "../components/InventoryComponent.vue"
import { loadStorage } from "@/utils/Storage"

export default defineComponent({
  name: "ProductDetailPage",
  components: {
    NotFoundPage,
    RecommendationsComponent,
    InventoryComponent,
  },
  data() {
    return {
      product: {} as Product,
      cartItems: [] as Product[],
      showSuccessMessage: false,
      config: {} as any,
    }
  },
  computed: {
    itemIsInCart(): boolean {
      return this.cartItems.some(item => item.id === this.product.id)
    },
  },
  watch: {
    $route() {
      this.loadProduct(this.$route.params.id as string)
    },
  },
  async created() {
    this.config = loadStorage()
    await this.loadProduct(this.$route.params.id as string)
  },
  methods: {
    async addToCart() {
      await axios.post(`${this.config.apiUrl}/api/users/${this.config.userId}/cart`, {
        productId: this.$route.params.id,
      })
      this.showSuccessMessage = true
      setTimeout(() => {
        this.$router.push("/products")
      }, 1500)
    },
    async loadProduct(id: string) {
      const { data: product } = await axios.get(`${this.config.apiUrl}/api/products/${id}`)
      this.product = product

      const { data: cartItems } = await axios.get(
        `${this.config.apiUrl}/api/users/${this.config.userId}/cart`
      )
      this.cartItems = cartItems
    },
  },
})
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  height: 400px;
  display: flex;
  justify-content: center;
}

#img-wrap img {
  width: 400px;
  height: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}

#product-name {
  width: 500px;
}

#product-price {
  position: absolute;
  top: 24px;
  right: 16px;
}

.green-button {
  background-color: green;
}

.grey-button {
  background-color: #888;
}
</style>
