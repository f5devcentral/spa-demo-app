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
  beforeCreate() {
    this.$nextTick(() => {
      const color = process.env.VUE_APP_GLOBAL_COLOR || '#000'
      const backgroundColor = process.env.VUE_APP_GLOBAL_BACKGROUND_COLOR || '#FFF'

      document.querySelector('body').style.backgroundColor = backgroundColor;
      document.querySelector('body').style.color = color;
      document.querySelector('button').style.color = color;
      document.querySelector('button').style.backgroundColor = backgroundColor;
    })
  }
};
</script>

<style>
body {
  box-sizing: border-box;
  font-family: Arial;
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
</style>
