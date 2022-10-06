import { formatErrorAsJson } from "../../../../helpers/utils.js"

export default function (productsService) {
  let operations = {
    DELETE
  }

  async function DELETE(req, res) {
    try {
      const { userId, productId } = req.params
      const cartItems = await productsService.deleteItemFromUserCart(userId, productId)
      res.status(200).json(cartItems)
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
    }
  }

  DELETE.apiDoc = {
    summary: "Deletes a specific item in user cart",
    operationId: "deleteItemFromUserCart",
    parameters: [
      {
        name: "userId",
        in: "path",
        schema:
          { type: "string" },
        required: true,
        description: "User Id",
      },
      {
        name: "productId",
        in: "path",
        schema:
        {
          type: "string"
        },
        required: true,
        description: "Product Id",
      }
    ],
    responses: {
      200: {
        description: "A list of products currently in the user cart.",
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
      500: {
        description: "An error occurred.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
            }
          }
        }
      }
    }
  }

  return operations
}
