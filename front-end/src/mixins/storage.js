export default {
    methods: {
        populateLocalStorage() {
            // set service urls if not present
            if (!localStorage.api_url)
                localStorage.api_url = this.api_url || process.env.VUE_APP_API_URL;
            if (!localStorage.database_url)
                localStorage.database_url = this.database_url || "";
            if (!localStorage.recommendations_url)
                localStorage.recommendations_url =
                    this.recommendations_url || process.env.VUE_APP_REC_URL;
            if (!localStorage.inventory_url)
                localStorage.inventory_url = this.inventory_url || "";
        },

        populateComponentUrls() {
            // check for service urls in local storage
            if (localStorage.api_url) this.api_url = localStorage.api_url;
            if (localStorage.database_url)
            this.database_url = localStorage.database_url;
            if (localStorage.recommendations_url)
            this.recommendations_url = localStorage.recommendations_url;
            if (localStorage.inventory_url)
            this.inventory_url = localStorage.inventory_url;
        },
        writeStats() {
            for (const service of this.services) {
                // console.log(service);
                // get stats history
                var stats = JSON.parse(localStorage.getItem(service.name)) || [];
                if (!(stats instanceof Array)) stats = [stats];

                // only store 10 elements
                var new_stats = stats.slice(Math.max(stats.length - 20, 0));
                new_stats.push(service.latency);
                localStorage.setItem(service.name, JSON.stringify(new_stats));
            }
        },
        // writeStats(frontend, api, db, recommendations, inventory) {
        //     var stats = JSON.parse(localStorage.getItem("stats")) || [];
        //     if (!(stats instanceof Array)) stats = [stats];

        //     // only store 10 elements
        //     var new_stats = stats.slice(Math.max(stats.length - 20, 0));
        //     new_stats.push([frontend, api, db, recommendations, inventory]);
        //     localStorage.setItem("stats", JSON.stringify(new_stats));
        //     },
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
        }
        // getChartData() {
        //     const stats = JSON.parse(localStorage.getItem("stats")) || [];

        //     var lables = [];
        //     var data1 = [];
        //     var data2 = [];
        //     var data3 = [];
        //     var data4 = [];
        //     var data5 = [];
        //     var i = 0;
        //     stats.forEach((stat) => {
        //         lables.push(i);
        //         i++;
        //         data1.push(stat[0]);
        //         data2.push(stat[1]);
        //         data3.push(stat[2]);
        //         data4.push(stat[3]);
        //         data5.push(stat[4]);
        //     });

        //     return [
        //         [lables, data1],
        //         [lables, data2],
        //         [lables, data3],
        //         [lables, data4],
        //         [lables, data5],
        //     ];
        // },
    }
};