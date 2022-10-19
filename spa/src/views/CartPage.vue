<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsListComponent :products="cartItems" @remove-from-cart="removeFromCart($event)" />
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button
      v-if="config.enableSecurity"
      id="checkout-button"
      :disabled="cartItems.length === 0"
      @click="checkIfAuthenticated()"
    >
      Proceed to Checkout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import type { Product } from "../types"
import ProductsListComponent from "../components/ProductsListComponent.vue"
import { useIsAuthenticated } from "../composition-api/useIsAuthenticated"
import { ElMessageBox } from "element-plus"
import { loadStorage } from "@/utils/Storage"

export default defineComponent({
  name: "CartPage",
  components: {
    ProductsListComponent,
  },
  data() {
    return {
      config: {} as any,
      cartItems: [] as Product[],
      isAuthenticated: {} as any,
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item: Product) => sum + Number(item.price), 0).toFixed(2)
    },
  },
  async created() {
    this.config = loadStorage()
    this.isAuthenticated = useIsAuthenticated()
    const result = await axios.get(`${this.config.apiUrl}/api/users/${this.config.userId}/cart`)
    this.cartItems = result.data
  },
  methods: {
    async removeFromCart(productId: string) {
      const result = await axios.delete<Product[]>(
        `${this.config.apiUrl}/api/users/${this.config.userId}/cart/${productId}`
      )
      this.cartItems = result.data
    },
    checkIfAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.push("/checkout")
      } else {
        ElMessageBox.alert(
          "You must sign in before you can complete your purchase.",
          "Sign In Required",
          {
            confirmButtonText: "OK",
          }
        )
      }
    },
  },
})
</script>

<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

#total-price {
  padding: 16px;
  text-align: right;
}

#checkout-button {
  width: 100%;
}

.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
}
</style>
