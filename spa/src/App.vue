<template>
  <div id="app">
    <NavBarComponent />
    <router-view :key="$route.name + ($route.params.id || '')" />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import storage from "./mixins/storage";

export default {
  name: "App",
  components: {
    NavBarComponent,
  },
  mixins: [storage],
  async created() {
    // populate local storage with component URLs
    this.populateLocalStorage();
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Arial;
}

#page-wrap {
  margin: auto;
  max-width: 800px;
  min-height: 100vh;
}

button {
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}
</style>
