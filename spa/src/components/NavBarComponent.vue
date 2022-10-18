<template>
  <div id="nav-bar">
    <router-link id="products-link" to="/products">
      <h1>BREWZ</h1>
    </router-link>
    <div class="nav-link">
      <button id="shopping-cart" @click="$router.push('/cart')">Shopping Cart</button>
    </div>
    <template v-if="enableSecurity">
      <SignOutButton v-if="isAuthenticated" class="nav-link" />
      <SignInButton v-else class="nav-link" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useIsAuthenticated } from "../composition-api/useIsAuthenticated"
import SignInButton from "./SignInButton.vue"
import SignOutButton from "./SignOutButton.vue"

defineProps({
  enableSecurity: {
    type: Boolean,
    required: true,
  },
})
const isAuthenticated = useIsAuthenticated()
</script>

<style scoped>
#nav-bar {
  border-bottom: 1px solid #ddd;
  height: 65px;
  width: 100%;
}

#products-link {
  text-align: center;
  display: block;
  font-size: 22px;
  float: left;
  text-decoration: none;
}

#products-link h1 {
  margin: 0;
}

.auth {
  float: right;
  padding-top: 10px;
}

.material-icons.md-48 {
  font-size: 48px;
}
</style>

<style>
.nav-link {
  float: right;
  margin-right: 5px;
  margin-top: 10px;
}

.nav-link button {
  padding: 10px;
}
</style>
