import axios from "axios"
import { formatErrorAsJson } from "../helpers/utils.js"

export default function (locatorService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    try {
      const { data: inventory } = await axios.get(
        `${locatorService.getService("inventory").url}/api/inventory`
      )
      res.status(200).json(inventory)
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
