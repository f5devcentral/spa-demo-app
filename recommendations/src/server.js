import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/recommendations', async (req, res) => {
  res.status(500).json('Unknown error: Inner exception code ID10T');
});

app.get('/api/stats', async (req, res) => {
  res.status(200).json({});
})

app.listen(8001, () => {
    console.log('Server is listening on port 8001');
});