
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"

describe("Server error handler", function () {

  it("Should return error when calling a service incorrectly", async function () {

    const response = await request(app)
      .post("/api/inventory")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send("{ productId: 56\" }")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(400)
    expect(response.body).to.deep.equal({ "error": { "expose": true, "statusCode": 400, "status": 400, "body": "{ productId: 56\" }", "type": "entity.parse.failed" } })
  })
})
