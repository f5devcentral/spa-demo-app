<template>
  <div class="container">
    <div class="card card-1">
      <i class="material-icons md-120">cloud</i>
      <h3>Frontend</h3>
      <div class="info">
        <p class="url">{{ FRONTEND }}</p>
        <p class="latency">{{ FRONTEND_TIME }}<span class="unit">ms</span></p>
      </div>
    </div>
    <div class="card card-2" v-bind:class="{ error: !apiIsActive }">
      <i class="material-icons md-120">api</i>
      <h3>API</h3>
      <div class="info">
        <p class="url">{{ API_URL }}</p>
        <p class="latency">{{ API_TIME }}<span class="unit">ms</span></p>
      </div>
    </div>
    <div class="card card-3" v-bind:class="{ error: !dbIsActive }">
      <i class="material-icons md-120">storage</i>
      <h3>Database</h3>
      <div class="info">
        <p class="url">{{ DB_HOST }}</p>
        <p class="latency">{{ DB_TIME }}<span class="unit">ms</span></p>
      </div>
    </div>
    <div class="card card-3" v-bind:class="{ error: !recIsActive }">
      <i class="material-icons md-120">add_shopping_cart</i>
      <h3>Recommendations</h3>
      <div class="info">
        <p class="url">{{ RECOMMENDATIONS_URL }}</p>
        <p class="latency">
          {{ RECOMMENDATIONS_TIME }}<span class="unit">ms</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stats",
  data() {
    return {
      FRONTEND: window.location.protocol + "//" + window.location.host,
      FRONTEND_TIME: 0,
      API_URL: process.env.VUE_APP_API_URL,
      API_TIME: 0,
      apiIsActive: true,
      DB_HOST: null,
      DB_TIME: 0,
      dbIsActive: true,
      RECOMMENDATIONS_URL: process.env.VUE_APP_REC_URL,
      RECOMMENDATIONS_TIME: 0,
      recIsActive: true,
    };
  },
  methods: {
    async getStatus() {
      // frontend
      const api_url = process.env.VUE_APP_API_URL + "/api/stats";
      const api_start = new Date();
      fetch(api_url)
        .then((resp) => resp.json())
        .then((data) => {
          this.API_TIME = new Date() - api_start;
          console.log(data);
          if (data["db_host"]) {
            this.DB_HOST = data["db_host"];
            this.DB_TIME = data["db_latency"];
          } else {
            this.dbIsActive = false;
          }
        })
        .catch((error) => {
          this.apiIsActive = false;
          console.log(error);
        });

      // api
      const frontend_url =
        window.location.protocol + "//" + window.location.host;
      const frontend_start = new Date();
      fetch(frontend_url).then(() => {
        this.FRONTEND_TIME = new Date() - frontend_start;
      });

      // recommendations
      const rec_url = process.env.VUE_APP_REC_URL + "/api/stats";
      const recommendations_start = new Date();
      fetch(rec_url)
        .then(() => {
          this.RECOMMENDATIONS_TIME = new Date() - recommendations_start;
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
@import "https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,900";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
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
</style>