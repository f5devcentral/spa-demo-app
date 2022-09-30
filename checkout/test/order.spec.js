import 'mocha'
import request from 'supertest'
import app from '../server.js'
import { expect } from 'chai'

const exampleOrder = {
  products: [
    { "id": "123" },
    { "id": "234" },
    { "id": "456" },
  ],
  shippingAddress: {
    street: "801 5th Ave",
    city: "Seattle",
    state: "WA",
    zip: "98104"
  }
};

describe('GET /api/api-docs', function () {
  it('Should return the OpenAPI spec', async function () {
    const response = await request(app)
      .get('/api/api-docs')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.info.title).to.equal("Brewz Checkout API.");
  });
});

describe('POST /api/order', function () {

  it('Should return an orderId', async function () {
    const response = await request(app)
      .post('/api/order')
      .set('Accept', 'application/json')
      .send(exampleOrder)

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.orderId).to.have.lengthOf(10);
  });

  it('Should emit a 400 error if order contains no products', async function () {
    const response = await request(app)
      .post('/api/order')
      .set('Accept', 'application/json')
      .send({ products: [], shippingAddress: exampleOrder.shippingAddress })

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ error: "No products in order!" });
  });
});

describe('GET /api/stats', function () {
  it('Should return an empty JSON payload', async function () {
    const response = await request(app)
      .get('/api/stats')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.empty;
  });
});
