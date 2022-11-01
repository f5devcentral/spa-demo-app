
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"
import { stub } from "sinon"
import sinon from "sinon"
import { MongoClient } from "mongodb"

describe("Server error handler", function () {

  let mockInstanceStub

  beforeEach(() => {
    mockInstanceStub = {
      db: () => sinon.spy(),
      close: sinon.spy()
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it("Should return error when calling a service incorrectly", async function () {

    let mockConnectionStub = stub(MongoClient, "connect").resolves(Promise.resolve(mockInstanceStub))

    const response = await request(app)
      .post("/api/users/12345/cart")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send("{ productId: 56\" }")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(400)
    expect(response.body).to.deep.equal({ "error": { "expose": true, "statusCode": 400, "status": 400, "body": "{ productId: 56\" }", "type": "entity.parse.failed" } })
    expect(mockConnectionStub.callCount).to.equal(0)
  })
})
