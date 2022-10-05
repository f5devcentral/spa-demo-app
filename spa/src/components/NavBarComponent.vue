<template>
  <div id="nav-bar">
    <router-link
      id="products-link"
      to="/products"
    >
      <h1>BREWZ</h1>
    </router-link>
    <button
      class="nav-link"
      @click="$router.push('/cart')"
    >
      Shopping Cart
    </button>
    <SignOutButton
      v-if="isAuthenticated"
      class="nav-link"
    />
    <SignInButton
      v-else
      class="nav-link"
    />
  </div>
</template>

<script setup lang="ts">
import { useIsAuthenticated } from "../composition-api/useIsAuthenticated"
import SignInButton from "./SignInButton.vue"
import SignOutButton from "./SignOutButton.vue"

const isAuthenticated = useIsAuthenticated()
</script>

<style scoped>
#nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
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

.nav-link {
  float: right;
  margin-left: 5px;
  margin-right: 5px;
}

.auth {
  float: right;
  padding-top: 10px;
}

.material-icons.md-48 {
  font-size: 48px;
}
</style>
