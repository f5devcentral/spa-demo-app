
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';
import { stub } from 'sinon';
import sinon from 'sinon';
import LocatorService from '../services/locatorService.js'

describe('GET /api/config/{serviceName}', function () {

  afterEach(() => {
    sinon.restore();
  });

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
      .get('/api/config/nosuchservice')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: 'service not found' });
  });

  it('Should return 500 when there is an error looking up a service', async function () {
    const locatorStub = stub(LocatorService, "getService").throws(new Error("something bad"));

    const response = await request(app)
      .get('/api/config/inventory')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: 'something bad' });
    expect(locatorStub.callCount).to.equal(1);
  });
});

describe('POST /api/config/{serviceName}', function () {

  afterEach(() => {
    sinon.restore();
  });

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

  it('Should throw an error when attempting to set the URL of an unknown service', async function () {
    const response = await request(app)
      .post('/api/config/blah')
      .set('Accept', 'application/json')
      .send({ url: 'whatever' })
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: 'service not found' });
  });

  it('Should return 500 when there is an error updating a service', async function () {
    const locatorStub = stub(LocatorService, "setServiceUrl").throws(new Error("something bad"));

    const response = await request(app)
      .post('/api/config/inventory')
      .set('Accept', 'application/json')
      .send({ url: 'whatever' })

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: 'something bad' });
    expect(locatorStub.callCount).to.equal(1);
  });
});
