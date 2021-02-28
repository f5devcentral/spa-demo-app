import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

const inventory = require('../inventory.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/inventory', async (req, res) => {
  res.status(200).json(inventory);
});

app.get('/api/stats', async (req, res) => {
  res.status(200).json({});
})

app.listen(8002, () => {
    console.log('Server is listening on port 8002');
});