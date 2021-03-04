<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList
      :products="cartItems"
      v-on:remove-from-cart="removeFromCart($event)"
    />
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
import axios from "axios";
import ProductsList from "../components/ProductsList.vue";

export default {
  name: "CartPage",
  components: {
    ProductsList,
  },
  data() {
    return {
      api_url: localStorage.api_url,
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((sum, item) => sum + Number(item.price), 0)
        .toFixed(2);
    },
  },
  methods: {
    async removeFromCart(productId) {
      const result = await axios.delete(
        `${this.api_url}/api/users/12345/cart/${productId}`
      );
      this.cartItems = result.data;
    },
  },
  async created() {
    if (!this.api_url || this.api_url == "null")
      this.$router.push("/stats?config=first");
    else {
      const result = await axios.get(`${this.api_url}/api/users/12345/cart`);
      const cartItems = result.data;
      this.cartItems = cartItems;
    }
  },
};
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
