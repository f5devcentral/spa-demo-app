
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';
import axios from 'axios';
import { stub } from 'sinon';

describe('GET /api/stats/{serviceName}', function () {

  it('Should return an empty JSON payload when called with unknown serviceName', async function () {
    const response = await request(app)
      .get('/api/stats/blah')
      .set('Accept', 'application/json')
    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.empty;
  });

  it('Should return service stats when called with known serviceName', async function () {
    const axiosStub = stub(axios, "get").resolves(Promise.resolve({}));

    const response = await request(app)
      .get('/api/stats/inventory')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.host).to.equal('http://inventory:8002');
    expect(response.body.latency).to.be.a('number');
    expect(axiosStub.callCount).to.equal(1);
  });
});
