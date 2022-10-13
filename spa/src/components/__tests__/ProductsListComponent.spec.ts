import { describe, it, expect } from "vitest"
import { mount, RouterLinkStub } from "@vue/test-utils"

import ProductsListComponent from "../ProductsListComponent.vue"
import type { Product } from "../../types"

describe("ProductsListComponent", () => {
  it("Renders properly with products", () => {
    const products: Product[] = [
      {
        _id: "123",
        id: "123",
        name: "Elysian Space Dust IPA",
        price: "10.49",
        description:
          "Washington- American Double/Imperial IPA- 8.2% ABV. 73 IBUs. Pours a clear golden amber color with a thick white head. Aromas of pine and citrus with a bit of breadiness and tropical fruit. Flavors of tropical fruit, citrus and pine with notes of orange peel. Enjoy!",
        imageUrl: "/images/elysian.png",
        averageRating: "4.5",
      },
      {
        _id: "234",
        id: "234",
        name: "New Belgium Voodoo Ranger Imperial IPA",
        price: "8.99",
        description:
          "Colorado & NC- American Double/Imperial IPA- 9% ABV. 85 IBUs. A bold imperial IPA with a rare blend of Mosaic, Calypso, Bravo, and Delta hops creating an explosion of fresh cut pine and citrus flavors.",
        imageUrl: "/images/voodoo.png",
        averageRating: "4.6",
      },
      {
        _id: "345",
        id: "345",
        name: "Dogfish Head 90-Minute IPA",
        price: "12.99",
        description:
          "Delaware- American Double / Imperial IPA- 9% ABV. Extremely complex; there is plenty of malt in this brew to match up with the extreme hopping program, leaving citrus, raisin and brandied fruitcake aromas and flavors. A hophead joy!",
        imageUrl: "/images/dogfish.png",
        averageRating: "4.7",
      },
    ]

    const wrapper = mount(ProductsListComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { products: products },
    })

    expect(wrapper.text()).toContain("Elysian Space Dust IPA")
    expect(wrapper.text()).toContain("New Belgium Voodoo Ranger Imperial IPA")
    expect(wrapper.text()).toContain("Dogfish Head 90-Minute IPA")
  })

  it("Renders properly without products", () => {
    const products: Product[] = []

    const wrapper = mount(ProductsListComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { products: products },
    })

    expect(wrapper.text()).toContain("You haven't added anything to your cart yet!")
  })

  it("Removes a product from cart", async () => {
    const products: Product[] = [
      {
        _id: "123",
        id: "123",
        name: "Elysian Space Dust IPA",
        price: "10.49",
        description: "Description here",
        imageUrl: "/images/elysian.png",
        averageRating: "4.5",
      },
    ]
    const wrapper = mount(ProductsListComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { products: products },
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
