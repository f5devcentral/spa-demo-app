
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';

describe('GET /api/config/{serviceName}', function () {

  it('Should return information for a configured service, "recommendations"', async function () {
    const response = await request(app)
      .get('/api/config/recommendations')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ name: 'recommendations', url: 'http://recommendations:8001' });
  });

  it('Should return 404 for an unknown service', async function () {
    const response = await request(app)
      .get('/api/config/sosuchservice')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: 'service not found' });
  });
});

describe('POST /api/config/{serviceName}', function () {
  it('Should set the URL of a configured service, "inventory" to custom value', async function () {
    const response = await request(app)
      .post('/api/config/inventory')
      .set('Accept', 'application/json')
      .send({ url: 'whatever' })
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ name: 'inventory', url: 'whatever' });
  });

  it('Should set the URL of a configured service, "inventory" back to default value', async function () {
    const response = await request(app)
      .post('/api/config/inventory')
      .set('Accept', 'application/json')
      .send({ url: 'http://inventory:8002' })
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ name: 'inventory', url: 'http://inventory:8002' });
  });
});

describe('POST /api/config/{serviceName}', function () {
  it('Should throw an error when attempting to set the URL of an unknown service', async function () {
    const response = await request(app)
      .post('/api/config/blah')
      .set('Accept', 'application/json')
      .send({ url: 'whatever' })
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: 'service not found' });
  });
});
