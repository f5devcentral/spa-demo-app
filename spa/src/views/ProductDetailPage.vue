<template>
  <div
    v-if="product"
    id="page-wrap"
    :key="product.id"
  >
    <div id="img-wrap">
      <img
        v-if="product.imageUrl"
        :src="api_url + product.imageUrl"
      >
    </div>
    <div id="product-details">
      <h1 id="product-name">
        {{ product.name }}
      </h1>
      <h3 id="product-price">
        ${{ product.price }}
      </h3>
      <p><b>Average rating</b>: {{ product.averageRating }}</p>
      <p>{{ product.description }}</p>
      <InventoryComponent
        v-if="showService('inventory') && product?.id"
        :id="product.id"
      />
      <button
        v-if="!itemIsInCart && !showSuccessMessage"
        id="add-to-cart"
        @click="addToCart"
      >
        Add to Cart
      </button>
      <button
        v-if="!itemIsInCart && showSuccessMessage"
        id="add-to-cart"
        class="green-button"
      >
        Successfully added item to cart!
      </button>
      <button
        v-if="itemIsInCart"
        id="add-to-cart"
        class="grey-button"
      >
        Item is already in cart
      </button>
    </div>
    <RecommendationsComponent
      v-if="showService('recommendations') && product?.id"
      :id="product.id"
    />
  </div>
  <NotFoundPage v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Product } from "../types"
import NotFoundPage from "./NotFoundPage.vue"
import RecommendationsComponent from "../components/RecommendationsComponent.vue"
import InventoryComponent from "../components/InventoryComponent.vue"

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
      api_url: localStorage.api_url,
    }
  },
  computed: {
    itemIsInCart(): boolean {
      return this.cartItems.some((item) => item.id === this.product.id)
    },
  },
  watch: {
    "$route"() {
      this.loadProduct(this.$route.params.id as string)
    }
  },
  async created() {
    await this.loadProduct(this.$route.params.id as string)
  },
  methods: {
    async addToCart() {
      await axios.post(`${this.api_url}/api/users/${localStorage.userId}/cart`, {
        productId: this.$route.params.id,
      })
      this.showSuccessMessage = true
      setTimeout(() => {
        this.$router.push("/products")
      }, 1500)
    },
    showService(serviceName: string): boolean {
      return localStorage.getItem(serviceName + "_url") !== null
    },
    async loadProduct(id: string) {
      const { data: product } = await axios.get(
        `${this.api_url}/api/products/${id}`
      )
      this.product = product

      const { data: cartItems } = await axios.get(
        `${this.api_url}/api/users/${localStorage.userId}/cart`
      )
      this.cartItems = cartItems
    }
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
