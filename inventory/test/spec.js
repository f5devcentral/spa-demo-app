import 'mocha'
import request from 'supertest'
import app from '../server.js'
import { expect } from 'chai'

describe('GET /api/api-docs', function () {
  it('Should return the OpenAPI spec', async function () {
    const response = await request(app)
      .get('/api/api-docs')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.info.title).to.equal("Brewz Inventory API.");
  });
});

describe('GET /api/inventory', function () {
  it('Should return 3 product quantities', async function () {
    const response = await request(app)
      .get('/api/inventory')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(12);
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
