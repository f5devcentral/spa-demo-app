<template>
  <div class="card" v-bind:class="getClassStatus">
    <p>isActive: {{ service.isActive }}</p>
    <p>URL: {{ service.url }}</p>
    <p>isHealthy: {{ service.isHealthy }}</p>
    <i class="material-icons md-120">{{ service.icon }}</i>
    <!-- <router-link v-bind:to="'/settings'"> -->
    <span
      class="material-icons settings"
      v-if="service.isConfigurable"
      v-on:click="toggleShowSettings"
      >settings</span
    >
    <!-- </router-link> -->
    <h3>{{ service.title }}</h3>
    <div class="info">
      <p class="url">{{ service.url }}</p>
      <p class="latency">{{ service.latency }}<span class="unit">ms</span></p>
    </div>
    <ChangeUrl
      v-if="settingsVisible"
      v-on:hide="toggleShowSettings"
      :service="service"
    />
    <div class="chart-container">
      <div class="lds-dual-ring" v-if="service.chartData.length == 0"></div>
      <StatsGraph :chartdata="chartData" v-if="service.chartData.length > 0" />
    </div>
  </div>
</template>
<script>
import StatsGraph from "../components/StatsGraph";
import ChangeUrl from "../components/ChangeUrl";
export default {
  name: "StatsCard",
  components: { ChangeUrl, StatsGraph },
  props: ["service"],
  data() {
    return {
      chartData: [],
      settingsVisible: false,
    };
  },
  methods: {
    buildChartData: function (data) {
      // ensure we have lables and data
      if (data && data.length == 2) {
        this.chartData = {
          labels: data[0],
          datasets: [
            {
              // label: "Data One",
              backgroundColor: "#000",
              data: data[1],
            },
          ],
        };
      }
    },
    showSettings: function () {
      this.settingsVisible = true;
    },
    hideSettings: function () {
      this.settingsVisible = false;
    },
    toggleShowSettings: function () {
      this.settingsVisible = !this.settingsVisible;
    },
  },
  created() {
    this.buildChartData(this.getChartData);
  },
  computed: {
    getChartData: function () {
      return this.service.chartData;
    },
    getClassStatus: function () {
      if (!this.service.isActive) return "disabled";
      else if (!this.service.isHealthy) return "error";
      else return "";
    },
  },
  watch: {
    getChartData(newVar) {
      this.buildChartData(newVar);
    },
    service: function (newVal) {
      this.buildChartData(newVal.chartData[0], newVal.chartData[1]);
    },
    deep: true,
  },
};
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,900";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 32%;
  margin-bottom: 2%;
}
.disabled {
  background: grey;
}
.error {
  background: red;
}
.card h3 {
  font-weight: 600;
}

.card i {
  position: absolute;
  top: 20px;
  right: 15px;
  max-height: 120px;
}

.card .info .latency {
  margin-top: 8px;
  color: #212121;
  font-size: 45px;
  font-weight: 400;
  line-height: 40px;
}

.card .info .latency .unit {
  font-size: 15px;
}

@media (max-width: 990px) {
  .card {
    margin: 20px;
  }
}
.material-icons.md-120 {
  font-size: 120px;
}
.settings {
  position: absolute;
  /* bottom: 20px;
  right: 15px; */
  top: 10px;
  right: 5px;
  max-height: 120px;
  color: black;
}

.chart-container {
  flex-grow: 1;
  min-height: 0;
}
.chart-container div {
  position: relative;
  width: 100%;
  height: 200px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: auto;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>