import axios from 'axios'
import { MongoClient } from 'mongodb'
import locatorService from "./locatorService.js"

const statsService = {

    mongoDbName: 'vue-db',

    async getDatabaseStats() {
        let client
        let payload = {}
        try {
            const db_start = new Date()
            client = await getMongoDbConnection()
            const db = client.db(this.mongoDbName)
            await db.collection('products').find({})
            payload["host"] = `mongodb://${locatorService.getService("database").url}:27017`
            payload["latency"] = new Date() - db_start
            return payload
        }
        finally { await client.close() }
    },

    async getRestApiStats(serviceName) {
        let payload = {}
        const inv_start = new Date()
        const service = locatorService.getService(serviceName)
        await axios.get(
            `${service.url}/api/stats`, { timeout: 15 }
        )
        payload["host"] = service.url
        payload["latency"] = new Date() - inv_start
        return payload
    }
}


async function getMongoDbConnection() {
    const mongoEndpoint = `mongodb://${locatorService.getService("database").url}:27017`
    console.log(`Connecting to MongoDB at ${mongoEndpoint}`)
    return await MongoClient.connect(
        mongoEndpoint,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}

export default statsService
