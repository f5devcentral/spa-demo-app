import { describe, it, expect, vi } from "vitest"
import { ref } from "vue"
import { shallowMount, flushPromises } from "@vue/test-utils"
import { InteractionStatus } from "@azure/msal-browser"
import ProfilePage from "../ProfilePage.vue"

const mockAcquireTokenSilent = vi.fn(async () => {
  return { accessToken: "THISISATOKEN" }
})
const mockAcquireTokenRedirect = vi.fn()

vi.mock("../../utils/MsGraphApiCall", () => {
  return {
    callMsGraph: async () => {
      return {
        displayName: "bob",
        jobTitle: "engineer",
        mail: "bob@f5.com",
        businessPhones: ["206-867-5309"],
        officeLocation: "Seattle",
      }
    },
  }
})

vi.mock("../../composition-api/useMsal", () => ({
  useMsal: () => {
    return {
      instance: {
        value: true,
        acquireTokenSilent: mockAcquireTokenSilent,
        acquireTokenRedirect: mockAcquireTokenRedirect,
      },
      accounts: { value: [{ name: "bob" }] },
      inProgress: ref(InteractionStatus.None),
    }
  },
}))

let isAuthenticated: boolean

vi.mock("../../composition-api/useIsAuthenticated", () => ({
  useIsAuthenticated: () => isAuthenticated,
}))

vi.mock("../../utils/Storage", () => ({
  loadStorage: () => {
    return { apiUrl: "" }
  },
}))

describe("ProfilePage", () => {
  it("Renders properly with profile information", async () => {
    isAuthenticated = true
    const wrapper = shallowMount(ProfilePage)

    await flushPromises()

    expect(wrapper.text()).toContain("Name: bob")
  })
})
