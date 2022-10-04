
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';
import { stub } from 'sinon';
import sinon from 'sinon';
import { MongoClient } from 'mongodb';

const orderProducts = [
  { "_id": "123", "id": "123", "name": "Elysian Space Dust IPA", "price": "10.49", "description": "Washington- American Double/Imperial IPA- 8.2% ABV. 73 IBUs. Pours a clear golden amber color with a thick white head. Aromas of pine and citrus with a bit of breadiness and tropical fruit. Flavors of tropical fruit, citrus and pine with notes of orange peel. Enjoy!", "imageUrl": "/images/elysian.png", "averageRating": "4.5" },
  { "_id": "234", "id": "234", "name": "New Belgium Voodoo Ranger Imperial IPA", "price": "8.99", "description": "Colorado & NC- American Double/Imperial IPA- 9% ABV. 85 IBUs. A bold imperial IPA with a rare blend of Mosaic, Calypso, Bravo, and Delta hops creating an explosion of fresh cut pine and citrus flavors.", "imageUrl": "/images/voodoo.png", "averageRating": "4.6" },
  { "_id": "456", "id": "456", "name": "Founders KBS (Kentucky Breakfast Stout)", "price": "17.99", "description": "Michigan- American Double/Imperial Stout- 11.2% ABV. BARREL AGED. An imperial stout brewed with a massive amount of coffee and chocolates, then cave-aged in oak bourbon barrels for an entire year to make sure wonderful bourbon undertones come through in the finish. Awesome!", "imageUrl": "/images/founders.png", "averageRating": "4.6" },
];
const user = {
  "id": "12345",
  "cartItems": ["123", "234", "456"]
};
const anUpdateResult = { "acknowledged": true, "matchedCount": 1, "modifiedCount": 1 };

describe('GET /api/users/{userId}/cart', function () {
  let stubFind;
  let stubFindOne;
  let stubUpdateOne;
  let mockDb;
  let mockInstanceStub;
  let mockConnectionStub;

  beforeEach(() => {

    stubFind = sinon.stub().returns({
      project: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      toArray: sinon.stub().resolves(orderProducts),
    });

    stubFindOne = sinon.stub().resolves(
      user
    );

    stubUpdateOne = sinon.stub().resolves(anUpdateResult);

    mockDb = {
      collection: () => {
        return {
          find: stubFind,
          findOne: stubFindOne,
          updateOne: stubUpdateOne,
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

  it('Should get the user cart', async function () {
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .get('/api/users/12345/cart')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(3);
    expect(stubFind.callCount).to.equal(1);
    expect(mockConnectionStub.callCount).to.equal(1);
    expect(mockInstanceStub.close.called).to.be.true;
  });

  it('Should emit a 404 error if the user cart cannot be found', async function () {
    stubFindOne = sinon.stub().resolves(
      null
    );
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .get('/api/users/123456/cart')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.equal("Could not find user!");
    expect(mockConnectionStub.callCount).to.equal(1);
  });

  it('Should emit a 500 error if the mongo connect fails, and cannot close afterward', async function () {
    mockConnectionStub = stub(MongoClient, "connect").rejects(new Error("Oops."));

    const response = await request(app)
      .get('/api/users/12345/cart')
      .set('Accept', 'application/json')

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: "Cannot read properties of undefined (reading 'close')" });
    expect(mockConnectionStub.callCount).to.equal(1);
  });
});

describe('POST /api/users/{userId}/cart', function () {
  let stubFind;
  let stubFindOne;
  let stubUpdateOne;
  let mockDb;
  let mockInstanceStub;
  let mockConnectionStub;

  beforeEach(() => {

    stubFind = sinon.stub().returns({
      project: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      toArray: sinon.stub().resolves(orderProducts),
    });

    stubFindOne = sinon.stub().resolves(
      user
    );

    stubUpdateOne = sinon.stub().resolves(anUpdateResult);

    mockDb = {
      collection: () => {
        return {
          find: stubFind,
          findOne: stubFindOne,
          updateOne: stubUpdateOne,
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

  it('Should add a product to the user cart', async function () {
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .post('/api/users/12345/cart')
      .set('Accept', 'application/json')
      .send({ productId: '112' })

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(3);
    expect(stubFind.callCount).to.equal(1);
    expect(stubUpdateOne.callCount).to.equal(1);
    expect(mockConnectionStub.callCount).to.equal(1);
    expect(mockInstanceStub.close.called).to.be.true;
  });

  it('Should emit a 404 error if the user does not exist in the database', async function () {
    stubFindOne = sinon.stub().resolves(null);
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub));

    const response = await request(app)
      .post('/api/users/99999/cart')
      .set('Accept', 'application/json')
      .send({ productId: '112' })

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ error: "Could not find the user!" });
    expect(stubFindOne.callCount).to.equal(1);
    expect(stubUpdateOne.callCount).to.equal(1);
    expect(mockConnectionStub.callCount).to.equal(1);
    expect(mockInstanceStub.close.called).to.be.true;
  });

  it('Should emit a 500 error if the mongo connect fails, and cannot close afterward', async function () {
    mockConnectionStub = stub(MongoClient, "connect").rejects(new Error("Oops."));

    const response = await request(app)
      .post('/api/users/12345/cart')
      .set('Accept', 'application/json')
      .send({ productId: '112' })

    expect(response.headers["content-type"]).to.match(/json/);
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: "Cannot read properties of undefined (reading 'close')" });
    expect(stubFind.callCount).to.equal(0);
    expect(stubUpdateOne.callCount).to.equal(0);
    expect(mockConnectionStub.callCount).to.equal(1);
  });
});
