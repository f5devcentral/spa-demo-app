import { describe, it, expect } from "vitest"
import { shallowMount } from "@vue/test-utils"
import FailedPage from "../FailedPage.vue"

describe("FailedPage", () => {
  it("Renders properly", async () => {
    const wrapper = shallowMount(FailedPage)

    expect(wrapper.text()).toContain("Login Failed.")
  })
})
