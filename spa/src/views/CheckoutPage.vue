<template>
  <div id="page-wrap">
    <h1>Checkout</h1>
    <ProductsListComponent
      :products="cartItems"
      :read-only="true"
    />
    <div class="flex-box">
      <div>
        <h3>Shipping Address:</h3>
        <h4>
          {{ shippingAddress.street }}<br>
          {{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.zip }}
        </h4>
      </div>
      <div>
        <h3 id="total-price">
          Total: ${{ totalPrice }}
        </h3>
      </div>
    </div>
    <button
      id="checkout-button"
      :disabled="cartItems.length === 0"
      @click="checkout(cartItems)"
    >
      Complete Purchase
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Address, Product, OrderProduct, Order } from "../types"
import ProductsListComponent from "../components/ProductsListComponent.vue"
import { ElMessageBox } from "element-plus"
import { h } from "vue"
import { useMsal } from "../composition-api/useMsal"
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser"
import { tokenRequest } from "../authConfig"

export default defineComponent({
  name: "CartPage",
  components: {
    ProductsListComponent,
  },
  data() {
    return {
      instance: useMsal().instance,
      inProgress: useMsal().inProgress,
      api_url: localStorage.api_url,
      checkout_url: localStorage.checkout_url,
      cartItems: [] as Product[],
      shippingAddress: {
        street: "801 5th Ave",
        city: "Seattle",
        state: "WA",
        zip: "98104"
      } as Address
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((sum, item: Product) => sum + Number(item.price), 0)
        .toFixed(2)
    },
  },
  async created() {
    const result = await axios.get(`${this.api_url}/api/users/${localStorage.userId}/cart`)
    const cartItems = result.data
    this.cartItems = cartItems
  },
  methods: {
    async removeFromCart(productId: string) {
      const result = await axios.delete<Product[]>(
        `${this.api_url}/api/users/${localStorage.userId}/cart/${productId}`
      )
      this.cartItems = result.data
    },
    async getToken() {
      const tokenResponse = await this.instance.acquireTokenSilent({
        ...tokenRequest
      }).catch(async (e) => {
        if (e instanceof InteractionRequiredAuthError) {
          await this.instance.acquireTokenRedirect(tokenRequest)
        }
        throw e
      })
      if (this.inProgress === InteractionStatus.None) {
        return tokenResponse.accessToken
      }
    },
    async checkout(items: Product[]) {
      try {
        const token = await this.getToken()
        if (token === undefined) {
          this.showError("getting an API token")
          return
        }
        const orderProducts = items.map<OrderProduct>((p) => { return { id: p.id } })
        const { data: response } = await axios.post(`${this.checkout_url}/api/order`, {
          products: orderProducts,
          shippingAddress: this.shippingAddress,
          userId: localStorage.userId
        } as Order, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        ElMessageBox({
          title: "Purchase Complete",
          message: h("p", null, [
            h("div", { class: "bottom-room" }, "Thank you for your purchase!"),
            h("span", { class: "top-room" }, "Your Order ID is: "),
            h("span", { class: "bold" }, response.orderId),
          ]),
          type: "success",
          confirmButtonText: "OK",
          closeOnClickModal: false,
          callback: () => this.$router.push("/products")
        })
      }
      catch (error) {
        this.showError("completing your purchase")
      }
    },
    showError(message: string) {
      ElMessageBox({
        title: "Error",
        message: h("p", null, [
          h("div", { class: "bottom-room" }, `There was an error ${message}.`),
          h("span", { class: "top-room" }, "Please call our support line: "),
          h("span", { class: "bold bigger" }, "+800 11 ASK 4 F5"),
        ]),
        type: "error",
        confirmButtonText: "OK",
        closeOnClickModal: false
      })
    }
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

.flex-box {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100;
  padding-bottom: 30px;
  justify-content: space-between;
}
</style>
