<template>
  <div class="container">
    <StatsCard
      :active="'true'"
      :title="'Frontend'"
      :host="frontend_host"
      :time="frontend_time"
      :icon="'cloud'"
    />
    <StatsCard
      :active="apiIsActive"
      :title="'API'"
      :host="api_host"
      :time="api_time"
      :icon="'api'"
    />
    <StatsCard
      :active="dbIsActive"
      :title="'Database'"
      :host="db_host"
      :time="db_time"
      :icon="'storage'"
    />
    <StatsCard
      :active="recIsActive"
      :title="'Recommendations'"
      :host="recommendations_host"
      :time="recommendations_time"
      :icon="'add_shopping_cart'"
    />
    <StatsCard
      :active="inventoryIsActive"
      :title="'Inventory'"
      :host="inventory_host"
      :time="inventory_time"
      :icon="'inventory'"
    />
  </div>
</template>

<script>
import StatsCard from "../components/StatsCard";
export default {
  name: "Stats",
  components: { StatsCard },
  data() {
    return {
      frontend_host: window.location.protocol + "//" + window.location.host,
      frontend_time: 0,
      apiIsActive: true,
      api_host: process.env.VUE_APP_API_URL,
      api_time: 0,
      dbIsActive: true,
      db_host: null,
      db_time: 0,
      recIsActive: true,
      recommendations_host: process.env.VUE_APP_REC_URL,
      recommendations_time: 0,
      inventoryIsActive: true,
      inventory_host: null,
      inventory_time: 0,
    };
  },
  methods: {
    async getStatus() {
      // frontend
      const frontend_url =
        window.location.protocol + "//" + window.location.host;
      const frontend_start = new Date();
      fetch(frontend_url).then(() => {
        this.frontend_time = new Date() - frontend_start;
      });

      // api
      const api_url = process.env.VUE_APP_API_URL + "/api/stats";
      const api_start = new Date();
      fetch(api_url).then(() => {
        this.api_time = new Date() - api_start;
      });

      // db
      const db_url = process.env.VUE_APP_API_URL + "/api/stats/db";
      // const db_start = new Date();
      fetch(db_url)
        .then((resp) => resp.json())
        .then((data) => {
          // this.db_time = new Date() - db_start;
          if (!data["db_host"] || !data["db_latency"]) this.dbIsActive = false;
          if (data["db_host"]) this.db_host = data["db_host"];
          if (data["db_latency"]) this.db_time = data["db_latency"];
        })
        .catch((error) => {
          this.dbIsActive = false;
          console.log(error);
        });

      // inventory
      const inv_url = process.env.VUE_APP_API_URL + "/api/stats/inventory";
      fetch(inv_url)
        .then((resp) => resp.json())
        .then((data) => {
          if (!data["inventory_host"] || !data["inventory_latency"])
            this.inventoryIsActive = false;
          if (data["inventory_host"])
            this.inventory_host = data["inventory_host"];
          if (data["inventory_latency"])
            this.inventory_time = data["inventory_latency"];
        })
        .catch((error) => {
          this.inventoryIsActive = false;
          console.log(error);
        });

      // if (data["inventory_host"]) {
      //     this.inventory_host = data["inventory_host"];
      //     this.inventory_time = data["inventory_latency"];
      //   } else {
      //     this.inventoryIsActive = false;
      //   }

      // recommendations
      const rec_url = process.env.VUE_APP_REC_URL + "/api/stats";
      const recommendations_start = new Date();
      fetch(rec_url)
        .then(() => {
          this.recommendations_time = new Date() - recommendations_start;
        })
        .catch((error) => {
          this.recIsActive = false;
          console.log(error);
        });
    },
  },
  async mounted() {
    this.getStatus();
  },
};
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
  padding: 50px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
}
</style>