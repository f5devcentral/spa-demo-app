<template>
  <div id="page-wrap" v-if="product" :key="product.id">
    <div id="img-wrap">
      <img v-bind:src="API_URL + product.imageUrl" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">${{ product.price }}</h3>
      <p><b>Average rating</b>: {{ product.averageRating }}</p>
      <p>{{ product.description }}</p>
      <Inventory :id="this.product.id" />
      <button
        id="add-to-cart"
        v-if="!itemIsInCart && !showSuccessMessage"
        v-on:click="addToCart"
      >
        Add to Cart
      </button>
      <button
        id="add-to-cart"
        class="green-button"
        v-if="!itemIsInCart && showSuccessMessage"
      >
        Successfully added item to cart!
      </button>
      <button id="add-to-cart" class="grey-button" v-if="itemIsInCart">
        Item is already in cart
      </button>
    </div>
    <Recommendations />"
  </div>
  <NotFoundPage v-else />
</template>

<script>
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import Recommendations from "../components/Recommendations";
import Inventory from "../components/Inventory";

export default {
  name: "ProductDetailPage",
  components: {
    NotFoundPage,
    Recommendations,
    Inventory,
  },
  data() {
    return {
      product: {},
      cartItems: [],
      showSuccessMessage: false,
      API_URL: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some((item) => item.id === this.product.id);
    },
  },
  methods: {
    async addToCart() {
      await axios.post(`${process.env.VUE_APP_API_URL}/api/users/12345/cart`, {
        productId: this.$route.params.id,
      });
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.$router.push("/products");
      }, 1500);
    },
  },
  async created() {
    const { data: product } = await axios.get(
      `${process.env.VUE_APP_API_URL}/api/products/${this.$route.params.id}`
    );
    this.product = product;

    const { data: cartItems } = await axios.get(
      `${process.env.VUE_APP_API_URL}/api/users/12345/cart`
    );
    this.cartItems = cartItems;
  },
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}

#price {
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
