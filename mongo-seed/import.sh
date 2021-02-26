#!/bin/bash
mongoimport --host mongodb --db vue-db --collection users --type json --file /mongo-seed/initUsers.json --jsonArray
mongoimport --host mongodb --db vue-db --collection products --type json --file /mongo-seed/initProducts.json --jsonArray