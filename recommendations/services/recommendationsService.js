import fs from 'fs/promises';

const recommendationsService = {
  async getRecommendations() {
    const data = await fs.readFile('./products.json', { encoding: 'utf8' });
    const products = JSON.parse(data);
    var randKeys = [];
    while (randKeys.length < 3) {
      var key = parseInt(Math.random() * products.length)
      if (randKeys.indexOf(key) === -1) randKeys.push(key)
    }

    const randomProducts = [
      products[randKeys[0]],
      products[randKeys[1]],
      products[randKeys[2]]
    ]
    return randomProducts;
  },
}

export default recommendationsService;
