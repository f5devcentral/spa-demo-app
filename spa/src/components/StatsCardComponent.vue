<template>
  <div class="card" v-bind:class="getClassStatus">
    <i class="material-icons md-120">{{ localService.icon }}</i>
    <span class="material-icons active on" v-if="localService.isActive && localService.isConfigurable"
      v-on:click="turnServiceOff">
      toggle_on
    </span>
    <span class="material-icons settings" v-if="localService.isConfigurable"
      v-on:click="toggleShowSettings">settings</span>
    <!-- </router-link> -->
    <h3>{{ localService.title }}</h3>
    <div class="info">
      <p class="url">{{ localService.url }}</p>
      <p class="latency">{{ localService.latency }}<span class="unit">ms</span></p>
    </div>
    <ChangeUrlComponent v-if="settingsVisible" v-on:hide="toggleShowSettings" :service="localService" />
    <div class="chart-container">
      <div class="lds-dual-ring" v-if="localService.chartData.length == 0"></div>
      <StatsGraphComponent :chartData="chartData" v-if="localService.chartData.length > 0" />
    </div>
  </div>
</template>
<script>
import StatsGraphComponent from "../components/StatsGraphComponent";
import ChangeUrlComponent from "../components/ChangeUrlComponent";
export default {
  name: "StatsCardComponent",
  components: { ChangeUrlComponent, StatsGraphComponent },
  props: ["service"],
  data() {
    return {
      chartData: [],
      settingsVisible: false,
      localService: this.service
    };
  },
  methods: {
    buildChartData: function (data) {
      // ensure we have labels and data
      if (data && data.length == 2) {
        this.chartData = {
          labels: data[0],
          datasets: [
            {
              label: "ms",
              fill: {
                target: true,
                above: "#666"
              },
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
    turnServiceOff: function () {
      this.localService.isActive = false;
      localStorage.setItem(this.localService.name + "_url", null);
    },
  },
  created() {
    this.buildChartData(this.getChartData);
  },
  computed: {
    getChartData: function () {
      return this.localService.chartData;
    },
    getClassStatus: function () {
      if (!this.localService.isActive) return "disabled";
      else if (!this.localService.isHealthy) return "error";
      else return "";
    },
  },
  watch: {
    getChartData(newVar) {
      this.buildChartData(newVar);
    },
    localService: {
      handler(newVal) {
        this.buildChartData(newVal.chartData[0], newVal.chartData[1]);
      },
      deep: true,
    }
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
    font-size: 100px;
    margin-right: 10px;
}

@media (max-width: 1400px) {
.material-icons.md-120 {
    font-size: 70px;
    margin-right: 10px;
}
}
@media (max-width: 1100px) {
.material-icons.md-120 {
    font-size: 40px;
    margin-right: 10px;
}
}

.settings {
  position: absolute;
  top: 10px;
  right: 5px;
  max-height: 120px;
  color: black;
}

.active {}

.active.on {
  color: green;
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