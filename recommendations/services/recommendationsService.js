import fs from 'fs/promises'

const seedFile = process.env.SEED_FILE || "beerProducts.json"

const recommendationsService = {
  async getRecommendations() {
    const products = await this.getProducts()
    return this.selectRandomProducts(products)
  },

  async getRecommendationsForProduct(productId) {
    const products = await this.getProducts()
    const filteredProducts = products.filter((product) => product.id !== productId)
    return this.selectRandomProducts(filteredProducts)
  },

  async getProducts() {
    const data = await fs.readFile(`./${seedFile}`, { encoding: 'utf8' })
    const products = JSON.parse(data)
    return products
  },

  selectRandomProducts(products) {
    var randKeys = []
    while (randKeys.length < 3) {
      var key = parseInt(Math.random() * products.length)
      if (randKeys.indexOf(key) === -1)
        randKeys.push(key)
    }

    const randomProducts = [
      products[randKeys[0]],
      products[randKeys[1]],
      products[randKeys[2]]
    ]
    return randomProducts
  }
}

export default recommendationsService
