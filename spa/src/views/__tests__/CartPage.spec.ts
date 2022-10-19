import { beforeEach, afterEach, describe, it, expect, vi } from "vitest"
import { mount, shallowMount, RouterLinkStub, flushPromises } from "@vue/test-utils"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import CartPage from "../CartPage.vue"
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
const mock = new MockAdapter(axios)

let mockEnableSecurity = false
vi.mock("../../utils/Storage", () => ({
  loadStorage: () => {
    return { apiUrl: "", userId: "12345", enableSecurity: mockEnableSecurity }
  },
}))

describe("CartPage", () => {
  afterEach(() => {
    mock.resetHistory()
  })

  describe("with security disabled", () => {
    it("Renders properly with products", async () => {
      isAuthenticated = true
      mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

      const wrapper = shallowMount(CartPage, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      })

      await flushPromises()

      expect(wrapper.text()).toContain("Shopping Cart")
      expect(wrapper.text()).toContain("Total: $32.47")
      expect(wrapper.find("#checkout-button").exists()).toBe(false)
      expect(mock.history.get.length).toBe(1)
    })

    it("Removes product from cart when remove button is clicked", async () => {
      isAuthenticated = true
      mock.onGet("/api/users/12345/cart").reply(200, [mockCartProducts[0]])
      mock.onDelete("/api/users/12345/cart/123").reply(200, [])

      const wrapper = mount(CartPage, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      })
      await flushPromises()
      await wrapper.find(".remove-button").trigger("click")

      expect(mock.history.get.length).toBe(1)
      expect(mock.history.delete.length).toBe(1)
    })
  })

  describe("with security enabled", () => {
    it("Renders properly with products", async () => {
      isAuthenticated = true
      mockEnableSecurity = true
      mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

      const wrapper = shallowMount(CartPage, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      })

      await flushPromises()

      expect(wrapper.text()).toContain("Shopping Cart")
      expect(wrapper.text()).toContain("Total: $32.47")
      expect(wrapper.find("#checkout-button").attributes("disabled")).toBeUndefined()
      expect(mock.history.get.length).toBe(1)
    })

    it("Redirects to checkout if user is authenticated", async () => {
      isAuthenticated = true
      mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

      const mockRouter = {
        push: vi.fn(),
      }

      const wrapper = shallowMount(CartPage, {
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

      wrapper.find("#checkout-button").trigger("click")
      expect(mockRouter.push).toHaveBeenCalledWith("/checkout")
      expect(mock.history.get.length).toBe(1)
    })

    it("Shows message if user is not authenticated", async () => {
      isAuthenticated = false
      mock.onGet("/api/users/12345/cart").reply(200, mockCartProducts)

      const mockRouter = {
        push: vi.fn(),
      }

      const wrapper = shallowMount(CartPage, {
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
      wrapper.find("#checkout-button").trigger("click")

      expect(mockRouter.push).not.toHaveBeenCalled()
      expect(mock.history.get.length).toBe(1)
    })

    it("Disables checkout button with no products", async () => {
      isAuthenticated = true
      mock.onGet("/api/users/12345/cart").reply(200, [])

      const wrapper = shallowMount(CartPage, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      })

      await flushPromises()

      expect(wrapper.text()).toContain("Total: $0.00")
      expect(wrapper.find("#checkout-button").attributes("disabled")).toBeDefined()
      expect(mock.history.get.length).toBe(1)
    })

    it("Removes product from cart when remove button is clicked", async () => {
      isAuthenticated = true
      mock.onGet("/api/users/12345/cart").reply(200, [mockCartProducts[0]])
      mock.onDelete("/api/users/12345/cart/123").reply(200, [])

      const wrapper = mount(CartPage, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      })
      await flushPromises()
      await wrapper.find(".remove-button").trigger("click")

      expect(mock.history.get.length).toBe(1)
      expect(mock.history.delete.length).toBe(1)
    })
  })
})
