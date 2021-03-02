print('Start #################################################################');

var products = JSON.parse(cat('/docker-entrypoint-initdb.d/initProducts.json'))
var users = JSON.parse(cat('/docker-entrypoint-initdb.d/initUsers.json'))

db = db.getSiblingDB('vue-db');

db.createCollection('products');
db.products.insert(products);

db.createCollection('users');
db.users.insert(users);

print('END #################################################################');