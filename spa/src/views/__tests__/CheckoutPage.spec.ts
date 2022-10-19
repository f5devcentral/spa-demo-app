import { afterEach, describe, it, expect, vi } from "vitest"
import { shallowMount, RouterLinkStub, flushPromises } from "@vue/test-utils"
import { InteractionStatus } from "@azure/msal-browser"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import CheckoutPage from "../CheckoutPage.vue"
import type { Product } from "../../types"

let mockToken: string | undefined
const mockAcquireTokenSilent = vi.fn(async () => {
  return { accessToken: mockToken }
})
const mockAcquireTokenRedirect = vi.fn()

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: {
        value: true,
        acquireTokenSilent: mockAcquireTokenSilent,
        acquireTokenRedirect: mockAcquireTokenRedirect,
      },
      accounts: [{ name: "bob" }],
      inProgress: InteractionStatus.None,
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

const mockOrderCompleteSuccess = { orderId: "HSJDU538HD" }

const mock = new MockAdapter(axios)

vi.mock("../../utils/Storage", () => ({
  loadStorage: () => {
    return { apiUrl: "", checkoutUrl: "", userId: "12345" }
  },
}))

describe("CheckoutPage", () => {
  afterEach(() => {
    mock.resetHistory()
  })

  it("Renders properly with products and address", async () => {
    isAuthenticated = true
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

    const wrapper = shallowMount(CheckoutPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("801 5th Ave")
    expect(wrapper.text()).toContain("Checkout")
    expect(wrapper.text()).toContain("Total: $32.47")
    expect(wrapper.find("#complete-button").attributes("disabled")).toBeUndefined()
    expect(mock.history.get.length).toBe(1)
  })

  it("Completes checkout if user token is available", async () => {
    mockToken = "THISISATOKEN"
    isAuthenticated = true
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)
    mock.onPost("/api/order").reply(200, mockOrderCompleteSuccess)

    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = shallowMount(CheckoutPage, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    wrapper.find("#complete-button").trigger("click")
    await flushPromises()
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.post.length).toBe(1)
  })

  it("Shows message if user token is unavailable", async () => {
    mockToken = undefined
    isAuthenticated = false
    mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = shallowMount(CheckoutPage, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()
    wrapper.find("#complete-button").trigger("click")
    await flushPromises()

    expect(mockRouter.push).not.toHaveBeenCalled()
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.post.length).toBe(0)
  })

  it("Disables complete button with no products", async () => {
    isAuthenticated = true
    mock.onGet("/api/users/12345/cart").reply(200, [])

    const wrapper = shallowMount(CheckoutPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Total: $0.00")
    expect(wrapper.find("#complete-button").attributes("disabled")).toBeDefined()
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.post.length).toBe(0)
  })
})
