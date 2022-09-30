<template>
  <div id="brewz">
    <NavBarComponent />
    <router-view :key="$route.name || '' + ($route.params.id || '')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBarComponent from "./components/NavBarComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBarComponent,
  },
  data: () => {
    return {
      color: import.meta.env.VITE_APP_GLOBAL_COLOR || '#000',
      backgroundColor: import.meta.env.VITE_APP_GLOBAL_BACKGROUND_COLOR || '#FFF'
    }
  },
  async created() {
    // populate local storage with component URLs
    const default_uri = `${window.location.protocol}//${window.location.host}`;
    localStorage.spa_url = default_uri || null;
    localStorage.api_url = localStorage.api_url || default_uri || null;
    localStorage.recommendations_url = localStorage.recommendations_url || default_uri || null;
    localStorage.inventory_url = localStorage.inventory_url || default_uri || null;
    localStorage.checkout_url = localStorage.checkout_url || default_uri || null;
  },
  beforeCreate() {
    this.$nextTick(() => {
      const backgroundColor = import.meta.env.VITE_APP_GLOBAL_BACKGROUND_COLOR || '#FFF'
      const bodyElement = document.querySelector('html') as HTMLElement
      bodyElement.style.backgroundColor = backgroundColor;
    })
  }
});
</script>

<style>
h1, h2, h3 {
  color: v-bind(color);
  background-color: v-bind(backgroundColor);
}

body {
  box-sizing: border-box;
  font-family: Arial;
  margin: 0px;
}

#brewz {
  box-sizing: border-box;
  font-family: Arial;
  color: v-bind(color);
  padding: 8px;
  background-color: v-bind(backgroundColor);
}

#page-wrap {
  margin: auto;
  max-width: 800px;
  min-height: 100vh;
}

button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}

.bold {
  font-size: larger;
}

.bold {
  font-weight: bold;
}

.top-room {
  margin-top: 6px;
}

.bottom-room {
  margin-bottom: 6px;
}
</style>
