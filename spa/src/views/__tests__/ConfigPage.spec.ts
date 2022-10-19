import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import ConfigPage from "../ConfigPage.vue"

describe("ConfigPage", () => {
  it("Renders properly", async () => {
    const wrapper = mount(ConfigPage)

    expect(wrapper.text()).toContain("Configuration Items")
  })

  it("Updates state when form text updates are made", async () => {
    const wrapper = mount(ConfigPage)
    const inputs = wrapper.findAll("input[type='text']")

    inputs.forEach(async input => {
      const randomText = Math.random().toString().slice(2, 8)

      await input.setValue(randomText)

      expect((input.element as HTMLInputElement).value).toBe(randomText)
      const config = JSON.parse(localStorage.getItem("config") || "{}") as any
      expect(config[input.attributes("id") as any]).toBe(randomText)
    })
  })

  it("Updates state when form checkbox updates are made", async () => {
    const wrapper = mount(ConfigPage)
    const inputs = wrapper.findAll("input[type='checkbox']")

    inputs.forEach(async input => {
      const checkBox = input.element as HTMLInputElement

      await input.setValue(true)
      // await flushPromises()

      expect(checkBox.checked).toBe(true)
      let config = JSON.parse(localStorage.getItem("config") || "{}") as any
      expect(config[input.element.id]).toBe(true)

      await input.setValue(false)
      // await flushPromises()

      expect(checkBox.checked).toBe(false)
      config = JSON.parse(localStorage.getItem("config") || "{}") as any
      expect(config[input.element.id]).toBe(false)
    })
  })
})
