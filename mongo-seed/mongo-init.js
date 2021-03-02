var products = JSON.parse(cat('/docker-entrypoint-initdb.d/initProducts.json'))
var users = JSON.parse(cat('/docker-entrypoint-initdb.d/initUsers.json'))

let error = true

db = db.getSiblingDB('vue-db') 

let res = [
  db.products.insert(products),
  db.users.insert(users)
]

printjson(res)

if (error) {
  print('Error, exiting.')
  quit(1)
}