const apiDoc = {
  openapi: "3.0.0",
  servers: [
    { url: "/api" },
  ],
  info: {
    title: "Brewz Core API.",
    version: "1.0.0"
  },
  components: {
    schemas: {
      Recommendation: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "456"
          },
          name: {
            type: "string",
            example: "Founders KBS (Kentucky Breakfast Stout)"
          },
          price: {
            type: "string",
            example: "17.99"
          },
          description: {
            type: "string",
            example: "Michigan- American Double/Imperial Stout- 11.2% ABV. BARREL AGED. An imperial stout brewed with a massive amount of coffee and chocolates, then cave-aged in oak bourbon barrels for an entire year to make sure wonderful bourbon undertones come through in the finish. Awesome!"
          },
          imageUrl: {
            type: "string",
            example: "/images/founders.png"
          },
          averageRating: {
            type: "string",
            example: "4.6"
          }
        },
        required: ["name"]
      },
      Product: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "1234567"
          },
          id: {
            type: "string",
            example: "890"
          },
          name: {
            type: "string",
            example: "Unibroue - La Fin Du Monde"
          },
          price: {
            type: "string",
            example: "11.99"
          },
          description: {
            type: "string",
            example: "Canada- Tripel- 9% ABV. La Fin du Monde has a brilliant golden color with vigorously effervescent foam. It is mildly yeasty with a pleasingly complex palate of malt, fruit and spice notes followed by a smooth, dry finish. BeerAdvocate's #13 of 25 All-Time Top Beers 2008."
          },
          imageUrl: {
            type: "string",
            example: "/images/unibroue.png"
          },
          averageRating: {
            type: "string",
            example: "4.6"
          }
        },
        required: ["name"]
      },
      ProductInventory: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "345",
          },
          quantity: {
            type: "number",
            example: 10
          }
        },
        required: ["id"]
      },
      ConfigService: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "inventory"
          },
          url: {
            type: "string",
            example: "http://inventory:8002"
          }
        },
        required: ["name"]
      },
      ServiceStatus: {
        type: "object",
        properties: {
          host: {
            type: "string",
            example: "http://api:8000"
          },
          latency: {
            type: "string",
            example: "42"
          }
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Could not find the <entity name here>!"
          }
        }
      }
    }
  },
  paths: {}
}

export default apiDoc
