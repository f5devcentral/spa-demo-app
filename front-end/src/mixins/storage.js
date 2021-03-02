import axios from "axios";

export default {
    methods: {
        async populateLocalStorage() {
            // set service urls if not present
            if(!localStorage.spa_url) localStorage.spa_url = this.spa_url || window.location.protocol + "//" + window.location.host;
            if (!localStorage.api_url)
                localStorage.api_url = this.api_url || process.env.VUE_APP_API_URL;
            
            if (!localStorage.recommendations_url)
                localStorage.recommendations_url =
                    this.recommendations_url || process.env.VUE_APP_REC_URL;
            

            // get remotly monitored service urls
            if (!localStorage.database_url) {
                    localStorage.database_url = this.database_url || 
                 await this.getRemoteServiceUrl(localStorage.api_url + "/api/config/database");
            }
            if (!localStorage.inventory_url) {
                localStorage.inventory_url = this.inventory_url || 
                 await this.getRemoteServiceUrl(localStorage.api_url + "/api/config/inventory");
            }

            
        },

        populateServices() {
            for (const service of this.services) {
                // load chart data
                if(localStorage.name) service.chartData = localStorage.name;

                // load url
                service.url = localStorage.getItem(service.name + "_url");
            }
        },
        writeStats() {
            for (const service of this.services) {
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

                var lables = [];
                var data = [];
                var i = 0;

                stats.forEach((stat) => {
                    lables.push(i);
                    i++;
                    data.push(stat);
                })
                service.chartData = [lables, data];
            }
        },
        async getRemoteServiceUrl(statsUrl) {
            try {
                const resp = await axios.get(statsUrl, {timeout: 10000});
                const data = resp.data;
                if(data["url"])
                    return data["url"];
                else
                    return null;
            } catch (error) {
                console.log(error);
            }
        }
    }
};