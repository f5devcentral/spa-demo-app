import { NotFoundError } from '../helpers/customErrors.js'

const ERR_SVC_NOT_FOUND = "service not found";

let services = [
  {
    name: "database",
    url: process.env.MONGO_URL || "mongodb"
  }
]

const locatorService = {
  getService(serviceName) {
    const service = services.find(service => service.name === serviceName);
    if (service) {
      return service;
    }
    else {
      throw new NotFoundError(ERR_SVC_NOT_FOUND);
    }
  },

  getAllServices() {
    return services;
  },

  setServiceUrl(serviceName, url) {
    const service = this.getService(serviceName)
    service.url = url;
    return service;
  }
}

export default locatorService;
