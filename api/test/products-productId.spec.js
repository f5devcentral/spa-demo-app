
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';
import { stub } from 'sinon';
import sinon from 'sinon';
import { MongoClient } from 'mongodb';

const aProduct = { "_id": "456", "id": "456", "name": "Founders KBS (Kentucky Breakfast Stout)", "price": "17.99", "description": "Michigan- American Double/Imperial Stout- 11.2% ABV. BARREL AGED. An imperial stout brewed with a massive amount of coffee and chocolates, then cave-aged in oak bourbon barrels for an entire year to make sure wonderful bourbon undertones come through in the finish. Awesome!", "imageUrl": "/images/founders.png", "averageRating": "4.6" };

describe('GET /api/products/{productId}', function () {
  let stubFindOne;
  let mockDb;
  let mockInstanceStub;
  let mockConnectionStub;

  beforeEach(() => {

    stubFindOne = sinon.stub().resolves(
      aProduct
    );

    mockDb = {
      collection: () => {
        return {
          findOne: stubFindOne,
        };
      }
    };

    mockInstanceStub = {
      db: () => mockDb,
      close: sinon.spy()
    }
  })

  afterEach(() => {
    sinon.restore();
  });

  it('Should return a specific product', async function () {
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .get('/api/products/456')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(aProduct);
    expect(stubFindOne.callCount).to.equal(1);
    expect(mockConnectionStub.callCount).to.equal(1);
    expect(mockInstanceStub.close.called).to.be.true;
  });

  it('Should throw a 404 error if the product could not be found', async function () {
    stubFindOne = sinon.stub().resolves(
      null
    );
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .get('/api/products/456999')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.equal("Could not find the product!");
    expect(stubFindOne.callCount).to.equal(1);
    expect(mockConnectionStub.callCount).to.equal(1);
    expect(mockInstanceStub.close.called).to.be.true;
  });

  it('Should emit a 500 error if the mongo connect fails, and cannot close afterward', async function () {
    mockConnectionStub = stub(MongoClient, "connect").rejects(new Error("Oops."));

    const response = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({error: "Cannot read properties of undefined (reading 'close')"});
    expect(mockConnectionStub.callCount).to.equal(1);
  });
});
