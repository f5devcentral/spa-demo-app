
import request from "supertest"
import app from "../server.js"
import { expect } from "chai"
import { stub } from "sinon"
import sinon from "sinon"
import axios from "axios"

describe("GET /api/recommendations/{productId}", function () {

  const responseStub = {
    headers: { "content-type": "application/json" },
    data: [
      { "id": "890", "name": "Unibroue - La Fin Du Monde", "price": "11.99", "description": "Canada- Tripel- 9% ABV. La Fin du Monde has a brilliant golden color with vigorously effervescent foam. It is mildly yeasty with a pleasingly complex palate of malt, fruit and spice notes followed by a smooth, dry finish. BeerAdvocate's #13 of 25 All-Time Top Beers 2008.", "imageUrl": "/images/unibroue.png", "averageRating": "4.6" },
      { "id": "234", "name": "New Belgium Voodoo Ranger Imperial IPA", "price": "8.99", "description": "Colorado & NC- American Double/Imperial IPA- 9% ABV. 85 IBUs. A bold imperial IPA with a rare blend of Mosaic, Calypso, Bravo, and Delta hops creating an explosion of fresh cut pine and citrus flavors.", "imageUrl": "/images/voodoo.png", "averageRating": "4.6" },
      { "id": "112", "name": "Samuel Adams Utopias", "price": "239.99", "description": "Massachusetts- American Strong Ale- 28% ABV. BARREL AGED. 2019 vintage is a blend of batches, some aged up to 26 years in a variety of barrels. The '19 recipe includes Utopias aged in Aquavit, Carcavelos and Ruby Port barrels as well as Cognac and Madeira finishing barrels.", "imageUrl": "/images/samueladams.png", "averageRating": "4.6" }
    ]
  }

  afterEach(() => {
    sinon.restore()
  })

  it("Should return 3 product recommendations excluding the specified product", async function () {
    const axiosStub = stub(axios, "get").resolves(Promise.resolve(responseStub))

    const response = await request(app)
      .get("/api/recommendations/123")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(200)
    expect(response.body.length).to.equal(3)
    expect(axiosStub.callCount).to.equal(1)
  })

  it("Should emit a 500 error if an error is thrown", async function () {
    const axiosStub = stub(axios, "get").rejects(new Error("Oops."))

    const response = await request(app)
      .get("/api/recommendations/999")
      .set("Accept", "application/json")

    expect(response.headers["content-type"]).to.match(/json/)
    expect(response.status).to.equal(500)
    expect(response.body).to.deep.equal({ error: "Oops." })
    expect(axiosStub.callCount).to.equal(1)
  })
})
