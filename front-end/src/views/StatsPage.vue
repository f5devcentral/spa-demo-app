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
import axios from "axios";
import StatsCard from "../components/StatsCard";
export default {
  name: "Stats",
  components: { StatsCard },
  data() {
    return {
      frontendIsActive: true,
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
    async getLatency(url) {
      const start_time = new Date();
      try {
        await axios.get(url);
        return [new Date() - start_time, true];
      } catch {
        return [null, false];
      }
    },
    async getStats(url) {
      const resp = await axios.get(url);
      const data = resp.data;
      if (data["host"] && data["latency"])
        return [data["host"], data["latency"], true];
      else return [null, null, false];
    },
    async getStatus() {
      // frontend
      const frontend_url =
        window.location.protocol + "//" + window.location.host;
      [this.frontend_time, this.frontendIsActive] = await this.getLatency(
        frontend_url
      );

      // api
      const api_url = process.env.VUE_APP_API_URL + "/api/stats";
      [this.api_time, this.apiIsActive] = await this.getLatency(api_url);

      // db
      const db_url = process.env.VUE_APP_API_URL + "/api/stats/db";
      [this.db_host, this.db_time, this.dbIsActive] = await this.getStats(
        db_url
      );

      // inventory
      const inv_url = process.env.VUE_APP_API_URL + "/api/stats/inventory";
      [
        this.inventory_host,
        this.inventory_time,
        this.inventoryIsActive,
      ] = await this.getStats(inv_url);

      // recommendations
      const rec_url = process.env.VUE_APP_REC_URL + "/api/stats";
      [this.recommendations_time, this.recIsActive] = await this.getLatency(
        rec_url
      );
    },
  },
  async mounted() {
    this.getStatus();
  },
  async created() {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.getStatus();
      }, 6000);
    });
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