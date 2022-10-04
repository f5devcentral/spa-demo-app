const apiDoc = {
  openapi: "3.0.0",
  servers: [
    { url: "/api" },
  ],
  info: {
    title: "Brewz Checkout API.",
    version: "1.0.0"
  },
  components: {
    schemas: {
      OrderProduct: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"]
      },
      Address: {
        properties: {
          street: {
            type: "string",
            example: "437 Lytton"
          },
          city: {
            type: "string",
            example: "Palo Alto"
          },
          state: {
            type: "string",
            example: "CA"
          },
          zip: {
            type: "string",
            example: "94301"
          }
        },
        type: "object"
      },
      Order: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: {
              $ref: "#/components/schemas/OrderProduct"
            }
          },
          shippingAddress: {
            $ref: "#/components/schemas/Address"
          },
          userId: {
            type: "string"
          }
        },
        required: ["products", "shippingAddress"]
      },
      ServiceStatus: {
        type: "object",
        properties: {
          host: { type: "string" },
          latency: { type: "string" }
        }
      }
    }
  },
  paths: {}
}

export default apiDoc
