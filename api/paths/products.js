import { formatErrorAsJson } from "../helpers/utils.js"

export default function (productsService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    try {
      res.status(200).json(await productsService.getProducts())
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
    }
  }

  GET.apiDoc = {
    summary: "Returns all products.",
    operationId: "getProducts",
    parameters: [],
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
