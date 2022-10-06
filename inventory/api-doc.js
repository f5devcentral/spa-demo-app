const apiDoc = {
  openapi: "3.0.0",
  servers: [
    { url: "/api" },
  ],
  info: {
    title: "Brewz Inventory API.",
    version: "1.0.0"
  },
  components: {
    schemas: {
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
