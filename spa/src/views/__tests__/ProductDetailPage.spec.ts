import { afterEach, describe, it, expect, vi } from "vitest"
import { shallowMount, RouterLinkStub, flushPromises } from "@vue/test-utils"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import ProductDetailPage from "../ProductDetailPage.vue"
import type { Product } from "../../types"

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: { value: true },
      accounts: { value: [{ name: "bob" }] },
      inProgress: true,
    }
  },
}))

let isAuthenticated: boolean

vi.mock("../../composition-api/useIsAuthenticated", () => ({
  useIsAuthenticated: () => isAuthenticated,
}))

const mockCartProducts: Product[] = [
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

vi.mock("../../utils/Storage", () => ({
  loadStorage: () => {
    return { apiUrl: "", inventoryUrl: "", recommendationsUrl: "", userId: "12345" }
  },
}))

const mockRouter = {
  push: vi.fn(),
}

describe("ProductDetailPage", () => {
  afterEach(() => {
    mock.resetHistory()
  })

  it("Renders properly with product not already in cart", async () => {
    isAuthenticated = true
    const mockRoute = {
      params: {
        id: "345",
      },
    }
    mock.onGet("/api/products/345").reply(200, {
      _id: "345",
      id: "345",
      name: "Dogfish Head 90-Minute IPA",
      price: "12.99",
      description:
        "Delaware- American Double / Imperial IPA- 9% ABV. Extremely complex; there is plenty of malt in this brew to match up with the extreme hopping program, leaving citrus, raisin and brandied fruitcake aromas and flavors. A hophead joy!",
      imageUrl: "/images/dogfish.png",
      averageRating: "4.7",
    } as Product)
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

    const wrapper = shallowMount(ProductDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    await flushPromises()

    expect(wrapper.text()).toContain("Dogfish Head 90-Minute IPA")
    expect(wrapper.text()).toContain("Add to Cart")
    expect(wrapper.text()).not.toContain("Item is already in cart")
    expect(mock.history.get.length).toBe(2)
  })

  it("Renders properly with product already in cart", async () => {
    isAuthenticated = true
    const mockRoute = {
      params: {
        id: "123",
      },
    }
    mock.onGet("/api/products/123").reply(200, mockCartProducts[0])
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

    const wrapper = shallowMount(ProductDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    await flushPromises()

    expect(wrapper.text()).toContain("Elysian Space Dust IPA")
    expect(wrapper.text()).not.toContain("Add to Cart")
    expect(wrapper.text()).toContain("Item is already in cart")
    expect(mock.history.get.length).toBe(2)
  })

  it("Adds product to cart when clicked Add button", async () => {
    isAuthenticated = true
    const mockRoute = {
      params: {
        id: "345",
      },
    }
    mock.onGet("/api/products/345").reply(200, {
      _id: "345",
      id: "345",
      name: "Dogfish Head 90-Minute IPA",
      price: "12.99",
      description:
        "Delaware- American Double / Imperial IPA- 9% ABV. Extremely complex; there is plenty of malt in this brew to match up with the extreme hopping program, leaving citrus, raisin and brandied fruitcake aromas and flavors. A hophead joy!",
      imageUrl: "/images/dogfish.png",
      averageRating: "4.7",
    } as Product)
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)
    mock.onPost("/api/users/12345/cart", { productId: "345" }).reply(200)

    const wrapper = shallowMount(ProductDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    await flushPromises()
    await wrapper.find("#add-to-cart").trigger("click")

    expect(mock.history.get.length).toBe(2)
    expect(mock.history.post.length).toBe(1)
  })
})
