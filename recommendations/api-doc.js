const apiDoc = {
  openapi: "3.0.0",
  servers: [
    { url: "/api" },
  ],
  info: {
    title: "Brewz Recommendations API.",
    version: "1.0.0"
  },
  components: {
    schemas: {
      Recommendation: {
        type: "object",
        properties: {
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
      ServiceStatus: {
        type: "object",
        properties: {
          host: {
            type: "string",
            example: "http://recommendations:8001",
          },
          latency: {
            type: "string",
            example: "42"
          }
        }
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
