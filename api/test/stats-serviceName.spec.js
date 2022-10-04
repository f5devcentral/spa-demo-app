
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"
import axios from "axios"
import { stub } from "sinon"
import sinon from "sinon"
import { MongoClient } from "mongodb"

describe("GET /api/stats/{serviceName}", function () {

  afterEach(() => {
    sinon.restore()
  })

  it("Should return an empty JSON payload when called with unknown serviceName", async function () {
    const response = await request(app)
      .get("/api/stats/blah")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body).to.be.empty
  })

  it("Should return service stats when called with known serviceName: inventory", async function () {
    const axiosStub = stub(axios, "get").resolves(Promise.resolve({}))

    const response = await request(app)
      .get("/api/stats/inventory")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.host).to.equal("http://inventory:8002")
    expect(response.body.latency).to.be.a("number")
    expect(axiosStub.callCount).to.equal(1)
  })

  it("Should return service stats when called with known serviceName: recommendations", async function () {
    const axiosStub = stub(axios, "get").resolves(Promise.resolve({}))

    const response = await request(app)
      .get("/api/stats/recommendations")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.host).to.equal("http://recommendations:8001")
    expect(response.body.latency).to.be.a("number")
    expect(axiosStub.callCount).to.equal(1)
  })

  it("Should return service stats when called with known serviceName: database", async function () {
    let stubFind
    let mockDb
    let mockInstanceStub
    let mockConnectionStub


    stubFind = sinon.stub().returns({
      project: sinon.stub().returnsThis(),
      limit: sinon.stub().returnsThis(),
      skip: sinon.stub().returnsThis(),
      toArray: sinon.stub().resolves([]),
    })

    mockDb = {
      collection: () => {
        return {
          find: stubFind
        }
      }
    }

    mockInstanceStub = {
      db: () => mockDb,
      close: sinon.spy()
    }
    mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub))

    const response = await request(app)
      .get("/api/stats/database")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.host).to.equal("mongodb://mongodb:27017")
    expect(response.body.latency).to.be.a("number")
    expect(stubFind.callCount).to.equal(1)
    expect(mockConnectionStub.callCount).to.equal(1)
    expect(mockInstanceStub.close.called).to.be.true
  })
})
