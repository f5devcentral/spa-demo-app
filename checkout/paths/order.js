import { RequestInvalidError } from '../helpers/customErrors.js'
import { formatErrorAsJson } from '../helpers/utils.js'

export default function (checkoutService) {
  let operations = {
    POST
  }

  async function POST(req, res) {
    try {
      const { userId, products } = req.body
      const orderId = await checkoutService.createOrder(userId, products)
      res.status(200).json({ orderId: orderId })
    }
    catch (e) {
      if (e instanceof RequestInvalidError) {
        res.status(400).json(formatErrorAsJson(e.message))
      } else {
        res.status(500).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      }
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
  }

  return operations
}
