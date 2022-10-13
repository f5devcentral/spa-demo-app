import { describe, it, expect, afterEach, vi } from "vitest"
import { ref } from "vue"
import { mount, flushPromises } from "@vue/test-utils"
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser"
import ShowJWTComponent from "../ShowJWTComponent.vue"
import clipboardCopy from "clipboard-copy"

let mockAcquireTokenSilent = vi.fn(async () => {
  return { accessToken: "THISISATOKEN" }
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
      accounts: { value: [{ name: "bob" }] },
      inProgress: ref(InteractionStatus.None),
    }
  },
}))

vi.mock("clipboard-copy")

describe("ShowJWTComponent", () => {
  afterEach(() => {
    mockAcquireTokenRedirect.mockRestore()
    mockAcquireTokenSilent.mockRestore()
    vi.mocked(clipboardCopy).mockRestore()
  })

  it("Renders properly", () => {
    const wrapper = mount(ShowJWTComponent)

    expect(wrapper.text()).toContain("(JWT)")
  })

  it("JWT button shows JWT token dialog", async () => {
    const wrapper = mount(ShowJWTComponent)

    await wrapper.find("#jwt").trigger("click")
    await flushPromises()

    expect(mockAcquireTokenSilent).toHaveBeenCalled()
    expect(mockAcquireTokenRedirect).not.toHaveBeenCalled()
    expect(wrapper.find("#jwtText").text()).toContain("THISISATOKEN")
  })

  it("JWT token dialog Copy to clipboard copies token to clipboard", async () => {
    const wrapper = mount(ShowJWTComponent)

    await wrapper.find("#jwt").trigger("click")
    await flushPromises()
    await wrapper.find("#copyButton").trigger("click")

    expect(vi.mocked(clipboardCopy)).toHaveBeenCalledWith("THISISATOKEN")
  })

  it.todo("Token request InteractionRequired", async () => {
    mockAcquireTokenSilent = vi.fn(async () => {
      throw new InteractionRequiredAuthError()
    })

    const wrapper = mount(ShowJWTComponent)
    await wrapper.find("#jwt").trigger("click")
    await flushPromises()

    expect(mockAcquireTokenSilent).toHaveBeenCalled()
    expect(mockAcquireTokenRedirect).toHaveBeenCalled()
  })
})
