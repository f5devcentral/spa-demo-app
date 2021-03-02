<template>
  <div class="container">
    <form id="settings" v-on:submit.prevent="onSubmit">
      <p id="errors" v-if="errors.length > 0">
          Errors:
        <ul id="errors">
        <li v-for="error in errors" :key="error.id">
          {{ error }} 
        </li>
      </ul>
    </p>
      <label>API Url: </label>
      <input type="text" v-model="api_url" />
      <p>
        <label id="header">Database Url: </label>
        <input type="text" v-model="database_url" />
      </p>
      <p>
        <label id="header">Recommendations Url: </label>
        <input type="text" v-model="recommendations_url" />
      </p>
      <p>
        <label id="header">Inventory Url: </label>
        <input type="text" v-model="inventory_url" />
      </p>
      <button>Submit</button>
    </form>
  </div>
</template>
<script>
import storage from "../mixins/storage";
export default {
  name: "settings",
  mixins: [storage],
  data() {
    return {
      api_url: process.env.VUE_APP_API_URL,
      database_url: null,
      recommendations_url: process.env.VUE_APP_REC_URL,
      inventory_url: null,
      errors: [],
    };
  },
  methods: {
    updateSettings(api_url, database_url, recommendations_url, inventory_url) {
      localStorage.api_url = api_url;
      localStorage.database_url = database_url;
      localStorage.recommendations_url = recommendations_url;
      localStorage.inventory_url = inventory_url;
    },
    onSubmit() {
      console.log("SUBMIT");
      // clear errors
      this.errors = [];

      // check enssential services
      if (!this.api_url || !this.is_url(this.api_url)) {
        this.errors.push("A valid API URL is required.");
      }

      if (this.errors.length == 0) {
        this.updateSettings(
          this.api_url,
          this.database_url || "",
          this.recommendations_url || "",
          this.inventory_url || ""
        );

        this.showSuccessMessage = true;
        setTimeout(() => {
          this.$router.push("/stats");
        }, 1500);
      }
    },
    is_url(str) {
      //   const regexp = /((http(s)?(:\/\/)))/g;
      //   if (regexp.test(str)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      console.log(str);
      if (str) return true;
    },
  },
  created() {
    // populate local storage with component URLs
    this.populateLocalStorage();
  },
  mounted() {
    this.populateServiceUrls();
  },
};
</script>
<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 16px;
}
label {
  display: inline-block;
  text-align: left;
  font-weight: bold;
}
input[type="text"] {
  display: inline-block;
  text-align: left;
  padding: 10px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  /* border-radius: 10px; */
}

#errors {
  color: red;
}
#header {
}
</style>