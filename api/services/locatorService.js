import { NotFoundError } from "../helpers/customErrors.js"

const ERR_SVC_NOT_FOUND = "service not found"

let services = [
  {
    name: "database",
    url: process.env.MONGO_URL || "mongodb"
  },
  {
    name: "inventory",
    url: process.env.INVENTORY_URL || "http://inventory:8002"
  },
  {
    name: "recommendations",
    url: process.env.RECOMMENDATIONS_URL || "http://recommendations:8001"
  }
]

const locatorService = {
  getService(serviceName) {
    const service = services.find(service => service.name === serviceName)
    if (service) {
      return service
    }
    else {
      throw new NotFoundError(ERR_SVC_NOT_FOUND)
    }
  },

  getAllServices() {
    return services
  },

  setServiceUrl(serviceName, url) {
    const service = this.getService(serviceName)
    service.url = url
    return service
  }
}

export default locatorService
