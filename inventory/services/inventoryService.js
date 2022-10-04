import fs from "fs/promises"

const inventoryService = {
  async getInventory() {
    const data = await fs.readFile("./inventory.json", { encoding: "utf8" })
    return JSON.parse(data)
  }
}

export default inventoryService
