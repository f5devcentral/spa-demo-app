import "mocha"
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"
import { stub } from "sinon"
import sinon from "sinon"
import { MongoClient } from "mongodb"

const exampleOrder = {
  userId: "12345",
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
}

const anUpdateResult = { "acknowledged": true, "matchedCount": 1, "modifiedCount": 1 }

let stubUpdateOne
let mockDb
let mockInstanceStub
let mockConnectionStub

describe("GET /api/api-docs", function () {
  it("Should return the OpenAPI spec", async function () {
    const response = await request(app)
      .get("/api/api-docs")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.info.title).to.equal("Brewz Checkout API.")
  })
})

describe("POST /api/order", function () {

  beforeEach(() => {

    stubUpdateOne = sinon.stub().resolves(anUpdateResult)

    mockDb = {
      collection: () => {
        return {
          updateOne: stubUpdateOne,
        }
      }
    }

    mockInstanceStub = {
      db: () => mockDb,
      close: sinon.spy()
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it("Should return an orderId", async function () {

    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub))

    const response = await request(app)
      .post("/api/order")
      .set("Accept", "application/json")
      .send(exampleOrder)

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.orderId).to.have.lengthOf(10)

    expect(stubUpdateOne.callCount).to.equal(1)
    expect(mockConnectionStub.callCount).to.equal(1)
    expect(mockInstanceStub.close.called).to.be.true

  })

  it("Should emit a 400 error if order contains no products", async function () {

    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub))

    const response = await request(app)
      .post("/api/order")
      .set("Accept", "application/json")
      .send({ products: [], shippingAddress: exampleOrder.shippingAddress, userId: exampleOrder.userId })

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(400)
    expect(response.body).to.deep.equal({ error: "No products in order!" })
    expect(stubUpdateOne.callCount).to.equal(0)
    expect(mockConnectionStub.callCount).to.equal(0)
    expect(mockInstanceStub.close.called).to.be.false
  })

  it("Should emit a 400 error if order contains no userId", async function () {

    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub))

    const response = await request(app)
      .post("/api/order")
      .set("Accept", "application/json")
      .send({ products: exampleOrder.products, shippingAddress: exampleOrder.shippingAddress, userId: "" })

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(400)
    expect(response.body).to.deep.equal({ error: "No userId in order!" })
    expect(stubUpdateOne.callCount).to.equal(0)
    expect(mockConnectionStub.callCount).to.equal(0)
    expect(mockInstanceStub.close.called).to.be.false
  })


  it("Should emit a 500 error if the mongo connect fails, and cannot close afterward", async function () {
    mockConnectionStub = stub(MongoClient, "connect").rejects(new Error("Oops."))

    const response = await request(app)
      .post("/api/order")
      .set("Accept", "application/json")
      .send(exampleOrder)

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(500)
    expect(response.body).to.deep.equal({ error: "Cannot read properties of undefined (reading 'close')" })
    expect(stubUpdateOne.callCount).to.equal(0)
    expect(mockConnectionStub.callCount).to.equal(1)
    expect(mockInstanceStub.close.called).to.be.false
  })

})



describe("GET /api/stats", function () {
  it("Should return an empty JSON payload", async function () {
    const response = await request(app)
      .get("/api/stats")
      .set("Accept", "application/json")
    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body).to.be.empty
  })
})
