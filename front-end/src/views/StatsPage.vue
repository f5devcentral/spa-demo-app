<template>
  <div class="container">
    <h3 id="config" v-if="this.$route.query.config == 'first'">
      Please configure your service URLs.
    </h3>

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
          isHealthy: true,
          title: "Single Page Application",
          get url() {
            return localStorage.getItem("spa_url") || null;
          },
          set url(value) {
            localStorage.setItem("spa_url", value);
          },
          monitorLocal: true,
          statsUrl: window.location.protocol + "//" + window.location.host,
        },
        {
          name: "api",
          chartData: [],
          latency: null,
          icon: "api",
          isActive: false,
          isConfigurable: true,
          isHealthy: true,
          title: "API",
          get url() {
            return localStorage.getItem("api_url") || null;
          },
          monitorLocal: true,
          get statsUrl() {
            return this.url + "/api/stats";
          },
          set url(value) {
            localStorage.setItem("api_url", value);
          },
        },
        {
          name: "database",
          chartData: [],
          latency: null,
          icon: "storage",
          isActive: false,
          isConfigurable: true,
          isHealthy: true,
          title: "Database",
          get url() {
            return localStorage.getItem("database_url") || null;
          },
          set url(value) {
            localStorage.setItem("database_url", value);
          },
          monitorLocal: false,
          get statsUrl() {
            return localStorage.getItem("api_url") + "/api/stats/database";
          },
        },
        {
          name: "recommendations",
          chartData: [],
          latency: null,
          icon: "add_shopping_cart",
          isActive: false,
          isConfigurable: true,
          isHealthy: true,
          title: "Recommendations",
          get url() {
            return localStorage.getItem("recommendations_url") || null;
          },
          set url(value) {
            localStorage.setItem("recommendations_url", value);
          },
          monitorLocal: true,
          get statsUrl() {
            return this.url + "/api/stats";
          },
        },
        {
          name: "inventory",
          chartData: [],
          latency: null,
          icon: "inventory",
          isActive: false,
          isConfigurable: true,
          isHealthy: true,
          title: "Inventory",
          get url() {
            return localStorage.getItem("inventory_url") || null;
          },
          set url(value) {
            localStorage.setItem("inventory_url", value);
          },
          monitorLocal: false,
          get statsUrl() {
            return localStorage.getItem("api_url") + "/api/stats/inventory";
          },
        },
      ],
    };
  },
  async mounted() {
    // get service status
    this.populateServices();
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
#config {
  color: red;
  position: absolute;
  top: 90px;
  left: 80px;
}
</style>