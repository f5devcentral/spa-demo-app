
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"
import { stub } from "sinon"
import sinon from "sinon"
import axios from "axios"

describe("GET /api/inventory", function () {

  const responseStub = {
    headers: { "content-type": "application/json" },
    data: [
      {
        id: "123",
        quantity: 20,
      },
      {
        id: "234",
        quantity: 30,
      },
      {
        id: "345",
        quantity: 10,
      },
      {
        id: "456",
        quantity: 2,
      },
      {
        id: "567",
        quantity: 14,
      },
      {
        id: "678",
        quantity: 9,
      },
      {
        id: "789",
        quantity: 5,
      },
      {
        id: "890",
        quantity: 7,
      },
      {
        id: "901",
        quantity: 22,
      },
      {
        id: "112",
        quantity: 0,
      },
      {
        id: "223",
        quantity: 32,
      },
      {
        id: "334",
        quantity: 11,
      },
    ]
  }

  afterEach(() => {
    sinon.restore()
  })

  it("Should return 12 product quantities", async function () {
    const axiosStub = stub(axios, "get").resolves(Promise.resolve(responseStub))

    const response = await request(app)
      .get("/api/inventory")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.length).to.equal(12)
    expect(axiosStub.callCount).to.equal(1)
  })

  it("Should emit a 500 error if an error is thrown", async function () {
    const axiosStub = stub(axios, "get").rejects(new Error("Oops."))

    const response = await request(app)
      .get("/api/inventory")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(500)
    expect(response.body).to.deep.equal({ error: "Oops." })
    expect(axiosStub.callCount).to.equal(1)
  })
})
