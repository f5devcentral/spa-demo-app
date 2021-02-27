<template>
  <div class="card">
    <i class="material-icons md-120">{{ icon }}</i>
    <h3>{{ title }}</h3>
    <div class="info">
      <p class="url">{{ host }}</p>
      <p class="latency">{{ time }}<span class="unit">ms</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "StatsCard",
  props: ["title", "host", "time", "icon"],
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