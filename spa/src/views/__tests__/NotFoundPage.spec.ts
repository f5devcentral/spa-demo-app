import { describe, it, expect } from "vitest"
import { shallowMount } from "@vue/test-utils"
import NotFoundPage from "../NotFoundPage.vue"

describe("NotFoundPage", () => {
  it("Renders properly", async () => {
    const wrapper = shallowMount(NotFoundPage)

    expect(wrapper.text()).toContain("404: Page Not Found")
  })
})
