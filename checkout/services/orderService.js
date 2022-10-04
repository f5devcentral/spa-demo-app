import { RequestInvalidError } from '../helpers/customErrors.js'
import { MongoClient, } from 'mongodb'

const ERR_NO_PRODUCTS = "No products in order!"
const ERR_NO_USER_ID = "No userId in order!"

const checkoutService = {

  mongoDbName: 'vue-db',
  mongoUrl: process.env.MONGO_URL || "mongodb",

  async createOrder(userId, products) {

    if (products.length === 0) throw new RequestInvalidError(ERR_NO_PRODUCTS)
    if (!userId)  throw new RequestInvalidError(ERR_NO_USER_ID)

    const orderId = this.generateOrderId()
    await this.emptyUserCart(userId)
    return orderId
  },

  generateOrderId() {
    let id = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for (var i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * 36))
    }
    return id
  },

  async emptyUserCart(userId) {
    let client
    try {
      client = await getMongoDbConnection(this.mongoUrl)
      const db = client.db(this.mongoDbName)
      await db.collection('users').updateOne({ id: userId }, {
        $set: { cartItems: [] },
      })
    }
    finally { await client.close() }
  }
}

async function getMongoDbConnection(mongoUrl) {
  const mongoEndpoint = `mongodb://${mongoUrl}:27017`
  console.log(`Connecting to MongoDB at ${mongoEndpoint}`)
  return await MongoClient.connect(
    mongoEndpoint,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

export default checkoutService
