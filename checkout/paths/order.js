import { formatErrorAsJson } from '../helpers/utils.js'

export default function (checkoutService) {
  let operations = {
    POST
  };

  async function POST(req, res) {
    const { products } = req.body;
    if (products.length > 0) {
      res.status(200).json({ orderId: checkoutService.createOrder() })
    }
    else {
      res.status(400).json(formatErrorAsJson("No products in order!"))
    }
  }

  POST.apiDoc = {
    summary: 'Purchase items collected in a shopping cart.',
    operationId: 'createOrder',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order',
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: 'An order confirmation number.',
        content: {
          'application/json': {
            schema: {
              type: 'string'
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
