import "mocha"
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"

describe("GET /api/api-docs", function () {
  it("Should return the OpenAPI spec", async function () {
    const response = await request(app)
      .get("/api/api-docs")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.info.title).to.equal("Brewz Recommendations API.")
  })
})
