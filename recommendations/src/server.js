import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

const products = require('../products.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/recommendations', async (req, res) => {
    const keys = Object.keys(products);
    var randKeys = [];
    while(randKeys.length < 3) {
      var key = parseInt(Math.random() * products.length)
      if(randKeys.indexOf(key) === -1) randKeys.push(key)
    }

    const randomProducts =  [
        products[randKeys[0]],
        products[randKeys[1]],
        products[randKeys[2]]
    ]
  res.status(200).json(randomProducts);
});

app.get('/api/stats', async (req, res) => {
  res.status(200).json({});
})

app.listen(8001, () => {
    console.log('Server is listening on port 8001');
});