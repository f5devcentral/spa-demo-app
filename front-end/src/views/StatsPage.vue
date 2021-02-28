<template>
  <div class="container">
    <StatsCard
      :active="'true'"
      :title="'Frontend'"
      :host="frontend_host"
      :time="frontend_time"
      :icon="'cloud'"
      :chartdata="chartdata[0]"
    />
    <StatsCard
      :active="apiIsActive"
      :title="'API'"
      :host="api_host"
      :time="api_time"
      :icon="'api'"
      :chartdata="chartdata[1]"
    />
    <StatsCard
      :active="dbIsActive"
      :title="'Database'"
      :host="db_host"
      :time="db_time"
      :icon="'storage'"
      :chartdata="chartdata[2]"
    />
    <StatsCard
      :active="recIsActive"
      :title="'Recommendations'"
      :host="recommendations_host"
      :time="recommendations_time"
      :icon="'add_shopping_cart'"
      :chartdata="chartdata[3]"
    />
    <StatsCard
      :active="inventoryIsActive"
      :title="'Inventory'"
      :host="inventory_host"
      :time="inventory_time"
      :icon="'inventory'"
      :chartdata="chartdata[4]"
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
      chartdata: this.getChartData(),
      testdata: [
        [0, 1, 2, 3, 4],
        [6, 7, 2, 99, 2],
      ],
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
    writeStats(frontend, api, db, recommendations, inventory) {
      var stats = JSON.parse(localStorage.getItem("stats")) || [];
      if (!(stats instanceof Array)) stats = [stats];

      // only store 10 elements
      var new_stats = stats.slice(Math.max(stats.length - 20, 0));
      new_stats.push([frontend, api, db, recommendations, inventory]);
      localStorage.setItem("stats", JSON.stringify(new_stats));
    },
    getChartData() {
      const stats = JSON.parse(localStorage.getItem("stats")) || [];

      var lables = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      var data5 = [];
      var i = 0;
      stats.forEach((stat) => {
        lables.push(i);
        i++;
        data1.push(stat[0]);
        data2.push(stat[1]);
        data3.push(stat[2]);
        data4.push(stat[3]);
        data5.push(stat[4]);
      });

      return [
        [lables, data1],
        [lables, data2],
        [lables, data3],
        [lables, data4],
        [lables, data5],
      ];
    },
  },
  async mounted() {
    this.getStatus();
  },
  async created() {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.getStatus();
        this.writeStats(
          this.frontend_time,
          this.api_time,
          this.db_time,
          this.recommendations_time,
          this.inventory_time
        );
        this.chartdata = this.getChartData();
      }, 60000);
      // }, 6000);
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