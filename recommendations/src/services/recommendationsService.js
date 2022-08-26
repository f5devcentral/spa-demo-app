import products from '../../products.json' assert {type: 'json'};

const recommendationsService = {
  getRecommendations() {
    const keys = Object.keys(products);
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
