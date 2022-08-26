export default function (productsService) {
  let operations = {
    GET
  };

  async function GET(req, res) {
    try {
      const cart = await productsService.getProductById(req.params.productId);
      res.status(200).json(cart)
    }
    catch (e) {
      res.status(404).json(e.message)
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`);
    }
  }

  GET.apiDoc = {
    summary: 'Returns product details',
    operationId: 'getUserCart',
    parameters: [
      {
        name: 'productId',
        in: 'path',
        schema:
          { type: 'string' },
        required: true,
        description: 'Product Id',
      }
    ],
    responses: {
      200: {
        description: 'Product details.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      },
      default: {
        description: 'An error occurred',
        content: {
          'application/json': {
            schema: {
              additionalProperties: true
            }
          }
        }
      }
    }
  };

  return operations;
}
