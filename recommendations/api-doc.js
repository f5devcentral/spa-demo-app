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
          id: { type: "string" },
          name: { type: "string" },
          price: { type: "string" },
          description: { type: "string" },
          imageUrl: { type: "string" },
          averageRating: { type: "string" }
        },
        required: ["name"]
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
