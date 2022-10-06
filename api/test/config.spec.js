
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"

describe("GET /api/config", function () {

  it("Should return information for all configured services", async function () {
    const response = await request(app)
      .get("/api/config")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.length).to.equal(3)
    expect(response.body.find(o => o.name === "database")).to.not.be.undefined
    expect(response.body.find(o => o.name === "inventory")).to.not.be.undefined
    expect(response.body.find(o => o.name === "recommendations")).to.not.be.undefined
  })
})
