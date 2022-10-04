import axios from "axios"
import { formatErrorAsJson } from "../helpers/utils.js"

export default function (locatorService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    try {
      const { data: recommendations } = await axios.get(
        `${locatorService.getService("recommendations").url}/api/recommendations`
      )
      res.status(200).json(recommendations)
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
    }
  }

  GET.apiDoc = {
    summary: "Returns product recommendations.",
    operationId: "getRecommendations",
    parameters: [],
    responses: {
      200: {
        description: "A list of product recommendations.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Recommendation"
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
