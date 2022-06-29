import axios from "axios";

export default {
    methods: {
        async populateLocalStorage() {
            // set service urls if not present
            const default_uri = window.location.protocol + "//" + window.location.host;
            localStorage.spa_url = default_uri || null;
            localStorage.api_url = localStorage.api_url || default_uri || null;
            localStorage.recommendations_url = localStorage.recommendations_url || default_uri || null;
            localStorage.inventory_url = localStorage.inventory_url || default_uri || null;
            localStorage.database_url = await this.getRemoteServiceUrl(localStorage.api_url + "/api/config/database") || null;
        },

        populateServices() {
            for (const service of this.services) {
                // load chart data
                if (localStorage.name) service.chartData = localStorage.name;
                // service.chartData = localStorage.getItem(service.name) || null;

                // load url
                const url = localStorage.getItem(service.name + "_url")
                switch (url) {
                    case null:
                    case "null":
                    case "":
                        service.url = null;
                        service.isActive = false;
                        break;
                    default:
                        service.url = url;
                        service.isActive = true;
                }
            }
        },
        writeStats() {
            for (const service of this.services) {
                // only write stats for active services
                if (!service.isActive) return

                // get stats history
                var stats = JSON.parse(localStorage.getItem(service.name)) || [];
                if (!(stats instanceof Array)) stats = [stats];

                // only store 10 elements
                var new_stats = stats.slice(Math.max(stats.length - 20, 0));
                new_stats.push(service.latency);
                localStorage.setItem(service.name, JSON.stringify(new_stats));
            }
        },
        getChartData() {
            for (const service of this.services) {
                const stats = JSON.parse(localStorage.getItem(service.name)) || [];

                var labels = [];
                var data = [];
                var i = 0;

                stats.forEach((stat) => {
                    labels.push(i);
                    i++;
                    data.push(stat);
                })
                service.chartData = [labels, data];
            }
        },
        async getRemoteServiceUrl(statsUrl) {
            try {
                const resp = await axios.get(statsUrl, { timeout: 10000 });
                const data = resp.data;
                if (data["url"])
                    return data["url"];
                else
                    return null;
            } catch (error) {
                console.log(error);
            }
        }
    }
};