let services = [
    {
        name: "database",
        url: process.env.MONGO_URL
    },
    {
        name: "inventory",
        url: process.env.INVENTORY_URL
    },
    {
        name: "recommendations",
        url: process.env.RECOMMENDATIONS_URL
    }
]

const locatorService = {
    getService(serviceName) {
        return services.find(service => service.name === serviceName);
    },

    getAllServices() {
        return services;
    },

    setServiceUrl(serviceName, url) {
        const service = this.getService(serviceName)

        if (service) {
          service.url = url;
          return service;
        }
        else {
            // TODO: Figure out how to throw "typed" errors to differentiate business/data exceptions from system failures
            throw new Error({ "error": "service not found" });
        }
    }
}

export default locatorService;
