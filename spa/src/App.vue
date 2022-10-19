<template>
  <div id="brewz">
    <NavBarComponent :enableSecurity="config.enableSecurity" />
    <router-view :key="$route.name || '' + ($route.params.id || '')" />
  </div>
</template>

<script lang="ts">
import { loadStorage, saveStorage } from "@/utils/Storage"
import { defineComponent } from "vue"
import NavBarComponent from "./components/NavBarComponent.vue"

export default defineComponent({
  name: "App",
  components: {
    NavBarComponent,
  },
  data: () => {
    return {
      color: import.meta.env.VITE_APP_GLOBAL_COLOR || "#000",
      backgroundColor: import.meta.env.VITE_APP_GLOBAL_BACKGROUND_COLOR || "#FFF",
      config: {} as any,
    }
  },
  async created() {
    // populate local storage with component URLs
    const default_uri = `${window.location.protocol}//${window.location.host}`
    this.config = loadStorage()
    this.config.spaUrl = default_uri || null
    this.config.apiUrl = this.config.apiUrl || default_uri || null
    this.config.recommendationsUrl = this.config.recommendationsUrl || default_uri || null
    this.config.inventoryUrl = this.config.inventoryUrl || default_uri || null
    this.config.checkoutUrl = this.config.checkoutUrl || default_uri || null
    this.config.userId = this.config.userId || "12345"
    this.config.enableSecurity = this.config.enableSecurity || false
    saveStorage(this.config)
  },
  beforeCreate() {
    this.$nextTick(() => {
      const backgroundColor = import.meta.env.VITE_APP_GLOBAL_BACKGROUND_COLOR || "#FFF"
      const bodyElement = document.querySelector("html") as HTMLElement
      bodyElement.style.backgroundColor = backgroundColor
    })
  },
})
</script>

<style>
h1,
h2,
h3 {
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

.bottom-room-more {
  margin-bottom: 16px;
}

.top-room-more {
  margin-top: 16px;
}

.bottom-room {
  margin-bottom: 6px;
}

.pointer {
  cursor: pointer;
}
</style>
