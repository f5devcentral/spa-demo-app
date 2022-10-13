import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import SignInButton from "../SignInButton.vue"

const loginRedirect = vi.fn()

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: {
        value: true,
        loginRedirect: loginRedirect,
      },
      accounts: { value: [{ name: "bob" }] },
      inProgress: true,
    }
  },
}))

describe("SignInButton", () => {
  it("Renders properly", () => {
    const wrapper = mount(SignInButton)

    expect(wrapper.text()).toContain("Sign In")
  })

  it("Sign In button calls loginRedirect", async () => {
    const mockRouter = {
      push: vi.fn(),
    }

    const wrapper = mount(SignInButton, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    })

    await wrapper.find("button").trigger("click")

    expect(loginRedirect).toHaveBeenCalled()
  })
})
