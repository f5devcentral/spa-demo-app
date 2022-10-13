import { describe, it, expect } from "vitest"
import { mount, RouterLinkStub } from "@vue/test-utils"

import ProductsGridItemComponent from "../ProductsGridItemComponent.vue"
import type { Product } from "../../types"

describe("ProductsGridItemComponent", () => {
  it("Renders properly", () => {
    const product: Product = {
      _id: "123",
      id: "123",
      name: "Elysian Space Dust IPA",
      price: "10.49",
      description:
        "Washington- American Double/Imperial IPA- 8.2% ABV. 73 IBUs. Pours a clear golden amber color with a thick white head. Aromas of pine and citrus with a bit of breadiness and tropical fruit. Flavors of tropical fruit, citrus and pine with notes of orange peel. Enjoy!",
      imageUrl: "/images/elysian.png",
      averageRating: "4.5",
    }
    localStorage.api_url = ""

    const wrapper = mount(ProductsGridItemComponent, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
      props: { product: product },
    })

    expect(wrapper.text()).toContain("Elysian Space Dust IPA")
  })
})
