import { MongoClient, } from 'mongodb';
import locatorService from "./locatorService.js";

const checkoutService = {

  mongoDbName: 'vue-db',

  async createOrder(userId) {
    const orderId = this.generateOrderId();
    await this.emptyUserCart(userId)
    return orderId
  },

  generateOrderId() {
    let id = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
  },

  async emptyUserCart(userId) {
    let client;
    try {
      client = await getMongoDbConnection();
      const db = client.db(this.mongoDbName);
      await db.collection('users').updateOne({ id: userId }, {
        $set: { cartItems: [] },
      });
    }
    finally { await client.close(); }
  }
}

async function getMongoDbConnection() {
  const mongoEndpoint = `mongodb://${locatorService.getService("database").url}:27017`;
  console.log(`Connecting to MongoDB at ${mongoEndpoint}`);
  return await MongoClient.connect(
    mongoEndpoint,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

export default checkoutService;
