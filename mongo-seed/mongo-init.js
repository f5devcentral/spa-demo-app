print("Start #################################################################")

const seedFile = process.env.SEED_FILE || "beerProducts.json"

const products = JSON.parse(fs.readFileSync(`/docker-entrypoint-initdb.d/${seedFile}`, "utf8"))
const users = JSON.parse(fs.readFileSync("/docker-entrypoint-initdb.d/initUsers.json", "utf8"))

db = db.getSiblingDB("vue-db")

db.createCollection("products")
db.products.insert(products)

db.createCollection("users")
db.users.insert(users)

print("END #################################################################")
