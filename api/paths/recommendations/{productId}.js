import axios from "axios"
import { formatErrorAsJson } from "../../helpers/utils.js"

export default function (locatorService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    try {
      const { data: recommendations } = await axios.get(
        `${locatorService.getService("recommendations").url}/api/recommendations/${req.params.productId}`
      )
      res.status(200).json(recommendations)
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
    }
  }

  GET.apiDoc = {
    summary: "Returns product recommendations for specified product.",
    operationId: "getRecommendationsForProduct",
    parameters: [
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
        description: "A list of products excluding the specified product.",
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
