<script>
import { Line } from "vue-chartjs";
export default {
  name: "StatsGraph",
  extends: Line,
  props: ["chartdata"],
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartOptions);
  },
  watch: {
    chartdata: function (newVal) {
      //   console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.renderChart(newVal, this.chartOptions);
    },
  },
};
</script>