import axios from "axios";

const timeout = 10000;

export default {
    methods: {
        async getStats(url, monitorLocal) {
            try {
                const start_time = new Date();
                const resp = await axios.get(url, {timeout:timeout});
                // is stat data obtained locally or via remote service
                if (monitorLocal) {
                    return [new Date() - start_time, true];
                }
                else {
                    const data = resp.data;
                    if (data["host"] && data["latency"])
                        return [data["latency"], true];
                    else
                        return [null, false];
                }
            } catch (error) {
                console.log(error);
                return [null, false];
            }
        },
        async getAllStatus() {
            for (const service of this.services) {
                if(service.statsUrl)
                    [service.latency, service.isActive] = 
                    await this.getStats(service.statsUrl, service.monitorLocal);
                    // console.log(`${service.name}:${service.latency}:${service.isActive}`);
            }
        }
    }
}