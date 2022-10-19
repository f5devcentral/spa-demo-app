import { describe, it, expect, vi } from "vitest"
import { mount, RouterLinkStub } from "@vue/test-utils"
import NavBarComponent from "../NavBarComponent.vue"

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

describe("NavBarComponent", () => {
  describe("with security disabled", () => {
    it("Renders properly", () => {
      isAuthenticated = true

      const wrapper = mount(NavBarComponent, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
        props: {
          enableSecurity: false,
        },
      })

      expect(wrapper.text()).toBe("BREWZShopping Cart")
    })
  })

  describe("with security enabled", () => {
    it("Renders properly when authenticated", () => {
      isAuthenticated = true

      const wrapper = mount(NavBarComponent, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
        props: {
          enableSecurity: true,
        },
      })

      expect(wrapper.text()).toContain("BREWZShopping CartWelcome, bob(JWT)")
    })

    it("Renders properly when not authenticated", () => {
      isAuthenticated = false

      const wrapper = mount(NavBarComponent, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
        props: {
          enableSecurity: true,
        },
      })

      expect(wrapper.text()).toContain("BREWZShopping CartSign In")
    })
  })

  it("Shopping Cart button routes to the cart page", async () => {
    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = mount(NavBarComponent, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        enableSecurity: true,
      },
    })

    await wrapper.find("#shopping-cart").trigger("click")

    expect(mockRouter.push).toHaveBeenCalledWith("/cart")
  })
})
