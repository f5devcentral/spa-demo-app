import { describe, it, expect, afterEach } from "vitest"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mount, flushPromises } from "@vue/test-utils"
import InventoryComponent from "../InventoryComponent.vue"

const mockInventoryData = [
  {
    id: "123",
    quantity: 20,
  },
  {
    id: "234",
    quantity: 30,
  },
  {
    id: "345",
    quantity: 10,
  },
  {
    id: "456",
    quantity: 2,
  },
  {
    id: "567",
    quantity: 14,
  },
  {
    id: "678",
    quantity: 9,
  },
  {
    id: "789",
    quantity: 5,
  },
  {
    id: "890",
    quantity: 7,
  },
  {
    id: "901",
    quantity: 22,
  },
  {
    id: "112",
    quantity: 0,
  },
  {
    id: "223",
    quantity: 32,
  },
  {
    id: "334",
    quantity: 11,
  },
]

describe("InventoryComponent", () => {
  const mock = new MockAdapter(axios)

  afterEach(() => {
    mock.resetHistory()
  })

  it("Shows in stock when inventory is available", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/inventory").reply(200, mockInventoryData)

    localStorage.api_url = ""

    const wrapper = mount(InventoryComponent, {
      props: { id: "123" },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Good news, 20 in stock!")
    expect(mock.history.get.length).toBe(1)
  })

  it("Shows low stock when inventory is limited", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/inventory").reply(200, mockInventoryData)

    localStorage.api_url = ""

    const wrapper = mount(InventoryComponent, {
      props: { id: "456" },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Order quick, only 2 in stock!")
    expect(mock.history.get.length).toBe(1)
  })

  it("Shows no stock when inventory is zero", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/inventory").reply(200, mockInventoryData)

    localStorage.api_url = ""

    const wrapper = mount(InventoryComponent, {
      props: { id: "112" },
    })

    await flushPromises()

    expect(wrapper.text()).toContain("Sorry, we're out of stock!")
    expect(mock.history.get.length).toBe(1)
  })

  it("Shows nothing when there was an error getting inventory", async () => {
    // arguments for reply are (status, data, headers)
    mock.onGet("/api/inventory").reply(500)

    localStorage.api_url = ""

    const wrapper = mount(InventoryComponent, {
      props: { id: "112" },
    })

    await flushPromises()

    expect(wrapper.text()).toBe("")
    expect(mock.history.get.length).toBe(1)
  })
})
