print('Start #################################################################');

var products = JSON.parse(fs.readFileSync('/docker-entrypoint-initdb.d/initProducts.json', 'utf8'))
var users = JSON.parse(fs.readFileSync('/docker-entrypoint-initdb.d/initUsers.json', 'utf8'))

db = db.getSiblingDB('vue-db');

db.createCollection('products');
db.products.insert(products);

db.createCollection('users');
db.users.insert(users);

print('END #################################################################');