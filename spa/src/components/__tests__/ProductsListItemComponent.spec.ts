import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import ProductsListItemComponent from "../ProductsListItemComponent.vue"
import type { Product } from "../../types"

describe("ProductsListItemComponent", () => {
  it("Renders properly", () => {
    const product: Product = {
      _id: "123",
      id: "123",
      name: "Elysian Space Dust IPA",
      price: "10.49",
      description: "Description here",
      imageUrl: "/images/elysian.png",
      averageRating: "4.5",
    }
    localStorage.api_url = ""

    const wrapper = mount(ProductsListItemComponent, {
      props: { product: product, readOnly: false },
    })

    expect(wrapper.text()).toContain("Elysian Space Dust IPA")
  })

  it("Removes a product from cart", async () => {
    const product: Product = {
      _id: "123",
      id: "123",
      name: "Elysian Space Dust IPA",
      price: "10.49",
      description: "Description here",
      imageUrl: "/images/elysian.png",
      averageRating: "4.5",
    }
    const wrapper = mount(ProductsListItemComponent, {
      props: { product: product, readOnly: false },
    })

    await wrapper.find("button").trigger("click")

    // assert event has been emitted
    expect(wrapper.emitted()["remove-from-cart"]).toBeTruthy()

    // assert event count
    expect(wrapper.emitted()["remove-from-cart"].length).toBe(1)

    // assert event payload
    expect(wrapper.emitted()["remove-from-cart"][0]).toEqual(["123"])

    expect(wrapper.find("img").element.src).toContain("/images/elysian.png")
  })
})
