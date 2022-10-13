import { afterEach, describe, it, expect } from "vitest"
import { shallowMount, flushPromises } from "@vue/test-utils"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import ProductsPage from "../ProductsPage.vue"
import type { Product } from "../../types"

const mockProducts: Product[] = [
  {
    _id: "123",
    id: "123",
    name: "Elysian Space Dust IPA",
    price: "10.49",
    description:
      "Washington- American Double/Imperial IPA- 8.2% ABV. 73 IBUs. Pours a clear golden amber color with a thick white head. Aromas of pine and citrus with a bit of breadiness and tropical fruit. Flavors of tropical fruit, citrus and pine with notes of orange peel. Enjoy!",
    imageUrl: "/images/elysian.png",
    averageRating: "4.5",
  },
  {
    _id: "234",
    id: "234",
    name: "New Belgium Voodoo Ranger Imperial IPA",
    price: "8.99",
    description:
      "Colorado & NC- American Double/Imperial IPA- 9% ABV. 85 IBUs. A bold imperial IPA with a rare blend of Mosaic, Calypso, Bravo, and Delta hops creating an explosion of fresh cut pine and citrus flavors.",
    imageUrl: "/images/voodoo.png",
    averageRating: "4.6",
  },
]

const mock = new MockAdapter(axios)
localStorage.api_url = ""

describe("ProductsPage", () => {
  afterEach(() => {
    mock.resetHistory()
  })

  it("Renders properly", async () => {
    mock.onGet("/api/products").reply(200, mockProducts)

    shallowMount(ProductsPage)
    await flushPromises()

    expect(mock.history.get.length).toBe(1)
  })
})
