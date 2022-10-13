import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import WelcomeNameComponent from "../WelcomeNameComponent.vue"

let mockAccounts = [{ name: "bob" }]

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: { value: true },
      accounts: { value: mockAccounts },
      inProgress: true,
    }
  },
}))

let isAuthenticated: boolean

vi.mock("../../composition-api/useIsAuthenticated", () => ({
  useIsAuthenticated: () => isAuthenticated,
}))

describe("WelcomeNameComponent", () => {
  it("Renders properly when authenticated and contains accounts", () => {
    isAuthenticated = true

    const wrapper = mount(WelcomeNameComponent)

    expect(wrapper.text()).toContain("Welcome, bob")
  })

  it("Renders properly when authenticated and does not contain accounts", () => {
    isAuthenticated = true
    mockAccounts = []

    const wrapper = mount(WelcomeNameComponent)

    expect(wrapper.text()).toContain("")
  })

  it("Renders properly when not authenticated", () => {
    isAuthenticated = false

    const wrapper = mount(WelcomeNameComponent)

    expect(wrapper.text()).toContain("")
  })
})
