import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const inventory = require('../inventory.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/inventory', async (req, res) => {
  res.status(200).json(inventory);
});

app.get('/api/stats', async (req, res) => {
    // 10.1.1.6 - - [05/Mar/2021:16:31:09 +0000] "GET /products HTTP/1.1" 200 582 "-""Envoy/HC" "-"
    console.log(req.ip + ' - - [' + new Date().toISOString() + '] "GET /api/stats HTTP/1.1" 200 - "-" "' + req.headers['user-agent'] +'"')
  res.status(200).json({});
})

app.listen(8002, () => {
    console.log('Server is listening on port 8002');
});
