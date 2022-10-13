import { describe, it, expect, afterEach } from "vitest"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mount, flushPromises, RouterLinkStub } from "@vue/test-utils"
import RecommendationsComponent from "../RecommendationsComponent.vue"

const mockRecommendationsData = [
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
  {
    _id: "345",
    id: "345",
    name: "Dogfish Head 90-Minute IPA",
    price: "12.99",
    description:
      "Delaware- American Double / Imperial IPA- 9% ABV. Extremely complex; there is plenty of malt in this brew to match up with the extreme hopping program, leaving citrus, raisin and brandied fruitcake aromas and flavors. A hophead joy!",
    imageUrl: "/images/dogfish.png",
    averageRating: "4.7",
  },
]

describe("RecommendationsComponent", () => {
  const mock = new MockAdapter(axios)

  afterEach(() => {
    mock.resetHistory()
  })

  it("Shows recommendations", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/recommendations/567").reply(200, mockRecommendationsData)

    localStorage.api_url = ""
    localStorage.recommendations_url = ""

    const wrapper = mount(RecommendationsComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { id: "567" },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Check out these similar selections")
    expect(wrapper.text()).toContain("Elysian Space Dust IPA")
    expect(mock.history.get.length).toBe(1)
  })

  it("Shows nothing when there was an error getting recommendations", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/recommendations").reply(500)

    localStorage.api_url = ""

    const wrapper = mount(RecommendationsComponent, {
      props: { id: "123" },
    })

    await flushPromises()

    expect(wrapper.text()).not.toContain("Check out these similar selections")
    expect(wrapper.text()).toBe("")
    expect(mock.history.get.length).toBe(1)
  })
})
