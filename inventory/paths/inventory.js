import { formatErrorAsJson } from "../helpers/utils.js"

export default function (inventoryService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    try {
      res.status(200).json(await inventoryService.getInventory())
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
    }
  }

  GET.apiDoc = {
    summary: "Returns inventory information for all products.",
    operationId: "getInventory",
    parameters: [],
    responses: {
      200: {
        description: "A list of product inventory items.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ProductInventory"
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
