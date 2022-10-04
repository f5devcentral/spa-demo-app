<template>
  <div class="inventory" v-if="inventoryIsActive">
    <div class="instore">
      <input class="input" type="radio" name="inventory" :disabled="inventory == 0" />
      <h3 class="input-label">In Store</h3>
      <p v-if="inventory == 0">Sorry, we're out of stock!</p>
      <p v-else-if="inventory >= 5">Good news, {{ inventory }} in stock!</p>
      <p v-else>Order quick, only {{ inventory }} in stock!</p>
    </div>
    <div class="delivery">
      <input class="input" type="radio" name="inventory" />
      <h3 class="input-label">Delivery</h3>
      <p>We'll ship it to your home</p>
    </div>
  </div>
</template>
   
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { ProductInventory } from "../types";

export default defineComponent({
  name: "InventoryComponent",
  props: ["id"],

  data() {
    return {
      products: [],
      inventoryIsActive: true,
      inventory: 0,
      api_url: localStorage.api_url,
    };
  },
  async created() {
    try {
      // get data
      const { data: inventory } = await axios.get(
        `${this.api_url}/api/inventory`
      );
      // find inventory for product
      inventory.forEach((item: ProductInventory) => {
        if (item.id === this.id) this.inventory = item["quantity"];
      });
    } catch (err) {
      console.log(err);
      this.inventoryIsActive = false;
    }
  },
});
</script>

<style scoped>
.inventory {
  border-radius: 4px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  padding: 20px;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 2%;
}

.instore {
  width: 50%;
  float: left;
  padding: 4px 4px 4px 4px;
}

.instore p {
  width: 85%;
}

.delivery {
  width: 50%;
  float: left;
  padding: 4px 4px 4px 4px;
}

.input-label {
  display: inline;
}
.instore .input, .delivery .input {
margin-left: 0px;
margin-right: 10px;
}
</style>