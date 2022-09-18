import { MongoClient, } from 'mongodb';
import locatorService from "./locatorService.js";
import { NotFoundError } from '../helpers/customErrors.js'

const productsService = {

    mongoDbName: 'vue-db',

    async getProducts() {
        let client;
        try {
            client = await getMongoDbConnection();
            const db = client.db(this.mongoDbName);
            return await db.collection('products').find({}).toArray();
        }
        finally { await client.close(); }
    },

    async getProductById(productId) {
        let client;
        try {
            client = await getMongoDbConnection();
            const db = client.db(this.mongoDbName);
            const product = await db.collection('products').findOne({ id: productId });
            if (!product) throw new NotFoundError("Could not find the product!");
            return product;
        }
        finally { await client.close(); }
    },

    async getUserCart(userId) {
        let client;
        try {
            client = await getMongoDbConnection();
            const db = client.db(this.mongoDbName);
            const user = await db.collection('users').findOne({ id: userId });
            if (!user) throw new NotFoundError("Could not find user!");
            const products = await db.collection('products').find({}).toArray();
            const cartItemIds = user.cartItems;
            return cartItemIds.map(id => products.find(product => product.id === id));
        }
        finally { await client.close(); }
    },

    async deleteItemFromUserCart(userId, productId) {
        let client;
        try {
            client = await getMongoDbConnection();
            const db = client.db(this.mongoDbName);
            await db.collection('users').updateOne({ id: userId }, {
                $pull: { cartItems: productId },
            });
            const user = await db.collection('users').findOne({ id: userId });
            const products = await db.collection('products').find({}).toArray();
            return user.cartItems.map(id => products.find(product => product.id === id));
        }
        finally { await client.close(); }
    },

    async addItemToUserCart(userId, productId) {
        let client;
        try {
            client = await getMongoDbConnection();
            const db = client.db(this.mongoDbName);
            // TODO: Validate that the product actually exists before adding it to the cart
            await db.collection('users').updateOne({ id: userId }, {
                $addToSet: { cartItems: productId },
            });
            const user = await db.collection('users').findOne({ id: userId });
            if (!user) throw new NotFoundError("Could not find the user!");
            const products = await db.collection('products').find({}).toArray();
            const cartItemIds = user.cartItems;
            return cartItemIds.map(id => products.find(product => product.id === id));
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

export default productsService;
