export default function (inventoryService) {
  let operations = {
    GET
  };

  async function GET(req, res) {
    try {
      res.status(200).json(inventoryService.getInventory());
    }
    catch (e) {
      res.status(500).json(e.message)
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`);
    }
  }

  GET.apiDoc = {
    summary: 'Returns inventory information for all products.',
    operationId: 'getInventory',
    parameters: [],
    responses: {
      200: {
        description: 'A list of product inventory items.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ProductInventory'
              }
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
