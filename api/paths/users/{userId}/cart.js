import { NotFoundError } from "../../../helpers/customErrors.js"
import { formatErrorAsJson } from "../../../helpers/utils.js"

export default function (productsService) {
  let operations = {
    GET,
    POST
  }

  async function GET(req, res) {
    try {
      const cart = await productsService.getUserCart(req.params.userId)
      res.status(200).json(cart)
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        // NOTE: This is PURPOSEFULLY setting the error message to a string response instead of JSON to support a specific lab scenario. Do not change this.
        res.status(404).json(e.message)
      } else {
        res.status(500).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      }
    }
  }

  GET.apiDoc = {
    summary: "Returns all products in user cart",
    operationId: "getUserCart",
    parameters: [
      {
        name: "userId",
        in: "path",
        schema:
          { type: "string" },
        required: true,
        description: "User Id",
      }
    ],
    responses: {
      200: {
        description: "A list of products.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product"
              }
            }
          }
        }
      },
      default: {
        description: "An error occurred",
        content: {
          "application/json": {
            schema: {
              additionalProperties: true
            }
          }
        }
      }
    }
  }


  async function POST(req, res) {
    try {
      const { userId } = req.params
      const { productId } = req.body
      const cartItems = await productsService.addItemToUserCart(userId, productId)
      res.status(200).json(cartItems)
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      } else {
        res.status(500).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      }
    }
  }

  POST.apiDoc = {
    summary: "Add a product to user cart",
    operationId: "addItemToUserCart",
    parameters: [
      {
        name: "userId",
        in: "path",
        schema:
          { type: "string" },
        required: true,
        description: "User Id",
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              productId:
                { type: "string" }
            }
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: "A list of products.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Product"
              }
            }
          }
        }
      },
      default: {
        description: "An error occurred",
        content: {
          "application/json": {
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
