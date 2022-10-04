const apiDoc = {
  openapi: '3.0.0',
  servers: [
    { url: '/api' },
  ],
  info: {
    title: 'Brewz Inventory API.',
    version: '1.0.0'
  },
  components: {
    schemas: {
      ProductInventory: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          quantity: { type: 'number' }
        },
        required: ['id']
      }
    }
  },
  paths: {}
};

export default apiDoc;
