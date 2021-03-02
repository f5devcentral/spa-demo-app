<template>
  <div class="container">
    <StatsCard
      v-for="service in services"
      :key="service.name"
      :service="service"
    />
  </div>
</template>

<script>
import stats from "../mixins/stats";
import storage from "../mixins/storage";
import StatsCard from "../components/StatsCard";
export default {
  name: "Stats",
  components: { StatsCard },
  mixins: [stats, storage],
  data() {
    return {
      services: [
        {
          name: "spa",
          chartData: [],
          latency: null,
          icon: "cloud",
          isActive: true,
          isConfigurable: false,
          tite: "Single Page Application",
          url: null,
          statsByLantency: true,
          statsUrl: window.location.protocol + "//" + window.location.host,
        },
        {
          name: "api",
          chartData: [],
          latency: null,
          icon: "api",
          isActive: true,
          isConfigurable: true,
          tite: "API",
          url: null,
          statsByLantency: true,
          statsUrl: process.env.VUE_APP_API_URL + "/api/stats",
        },
        {
          name: "database",
          chartData: [],
          latency: null,
          icon: "storage",
          isActive: true,
          isConfigurable: true,
          tite: "Database",
          url: null,
          statsByLantency: false,
          statsUrl: process.env.VUE_APP_API_URL + "/api/stats/db",
        },
        {
          name: "recommendations",
          chartData: [],
          latency: null,
          icon: "add_shopping_cart",
          isActive: true,
          isConfigurable: true,
          tite: "Recommendations",
          url: null,
          statsByLantency: true,
          statsUrl: process.env.VUE_APP_REC_URL + "/api/stats",
        },
        {
          name: "inventory",
          chartData: [],
          latency: null,
          icon: "inventory",
          isActive: true,
          isConfigurable: true,
          tite: "Inventory",
          url: null,
          statsByLantency: true,
          statsUrl: process.env.VUE_APP_API_URL + "/api/stats/inventory",
        },
      ],
      api_url: null,
      database_url: null,
      recommendations_url: null,
      inventory_url: null,
      frontendIsActive: true,
      frontend_url: window.location.protocol + "//" + window.location.host,
      frontend_time: 0,
      apiIsActive: true,
      api_time: 0,
      dbIsActive: true,
      db_time: 0,
      recIsActive: true,
      recommendations_time: 0,
      inventoryIsActive: true,
      inventory_time: 0,
    };
  },
  async mounted() {
    this.populateComponentUrls();
    // get service status
    this.getAllStatus();
  },
  async created() {
    // populate local storage with component URLs
    this.populateLocalStorage();

    // refresh the graphs
    this.$nextTick(function () {
      window.setInterval(() => {
        this.writeStats();
        this.getAllStatus();
        this.getChartData();
        // }, 60000);
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