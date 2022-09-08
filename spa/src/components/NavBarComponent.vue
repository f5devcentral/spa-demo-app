<template>
  <div id="nav-bar">
    <router-link to="/products" id="products-link">
      <h1>BREWZ</h1>
    </router-link>
    <router-link to="/cart" id="cart-link">
      <button>Shopping Cart</button>
    </router-link>
    <router-link to="/stats" id="stats-link">
      <span class="material-icons md-48"> info </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
  beforeCreate() {
    this.$nextTick(() => {
      const color = process.env.VUE_APP_GLOBAL_COLOR || '#000'

      document.querySelector('#products-link').style.color = color;
      document.querySelector('#stats-link').style.color = color;
    })
  }
};
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
  left: 32px;
  position: absolute;
  top: 16px;
  text-decoration: none;
}

#products-link h1 {
  margin: 0;
}

#cart-link {
  position: absolute;
  right: 16px;
  top: 16px;
}
#stats-link {
  position: absolute;
  right: 180px;
  top: 16px;
}
.material-icons.md-48 {
  font-size: 48px;
}
</style>
