import { describe, it, expect, afterEach, vi } from "vitest"
import { mount } from "@vue/test-utils"
import SignOutButton from "../SignOutButton.vue"
import clipboardCopy from "clipboard-copy"

const mockLogoutRedirect = vi.fn()

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: {
        value: true,
        logoutRedirect: mockLogoutRedirect,
      },
      accounts: { value: [{ name: "bob" }] },
      inProgress: { value: "none" },
    }
  },
}))

const mockRouter = {
  push: vi.fn(),
}

vi.mock("clipboard-copy")

describe("SignOutButton", () => {
  afterEach(() => {
    mockLogoutRedirect.mockRestore()
    mockRouter.push.mockRestore()
    vi.mocked(clipboardCopy).mockRestore()
  })

  it("Renders properly", () => {
    const wrapper = mount(SignOutButton)

    expect(wrapper.text()).toContain("Welcome, bob")
  })

  it("Profile button routes to profile page", async () => {
    const wrapper = mount(SignOutButton, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    })

    await wrapper.find("#profile").trigger("click")

    expect(mockRouter.push).toHaveBeenCalledWith("/profile")
  })

  it("Logout calls logoutRedirect", async () => {
    const wrapper = mount(SignOutButton, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    })

    await wrapper.find("#logout").trigger("click")

    expect(mockLogoutRedirect).toHaveBeenCalled()
  })
})
