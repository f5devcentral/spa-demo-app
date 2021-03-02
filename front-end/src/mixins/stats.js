import axios from "axios";

const timeout = 30000;

export default {
    methods: {
        async getLatency(url) {
        const start_time = new Date();
        try {
            await axios.get(url, {timeout:timeout});
            // url, latency, isActive
            return [url, new Date() - start_time, true];
        } catch (error){
            console.log(error);
            // url, latency, isActive
            return [url, null, false];
        }
        },
        async getStats(url, byLatency) {
            try {
                const start_time = new Date();
                const resp = await axios.get(url, {timeout:timeout});
                if (byLatency) {
                    return [url, new Date() - start_time, true];
                }
                else {
                    const data = resp.data;
                    if (data["host"] && data["latency"])
                        return [data["host"], data["latency"], true];
                    else 
                        return [null, null, false];
                }
            } catch (error) {
                console.log(error);
                return [null, null, false];
            }
        },
        async getAllStatus() {
            for (const service of this.services) {
                if(service.statsUrl)
                    [service.url, service.latency, service.isActive] = 
                    await this.getStats(service.statsUrl, service.statsByLantency);
                    // console.log(`${service.name}:${service.latency}:${service.isActive}`);
            }
        }
    }
}