import { NotFoundError } from "../../helpers/customErrors.js"
import { formatErrorAsJson } from "../../helpers/utils.js"

export default function (locatorService) {
  let operations = {
    GET,
    POST
  }

  function GET(req, res) {
    try {
      const { serviceName } = req.params
      const service = locatorService.getService(serviceName)
      res.status(200).json(service)
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).json(formatErrorAsJson(e.message))
      } else {
        res.status(500).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      }
    }
  }

  GET.apiDoc = {
    summary: "Returns a specific service URL.",
    operationId: "getService",
    parameters: [
      {
        name: "serviceName",
        in: "path",
        schema: {
          type: "string",
          example: "inventory"
        },
        required: true,
        description: "Service Name",
      }
    ],
    responses: {
      200: {
        description: "A single remote service.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ConfigService"
            }
          }
        }
      },
      404: {
        description: "Service not found.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
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

  function POST(req, res) {
    try {
      const { serviceName } = req.params
      const { url } = req.body
      const service = locatorService.setServiceUrl(serviceName, url)
      res.status(200).json(service)
    }
    catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).json(formatErrorAsJson(e.message))
      } else {
        res.status(500).json(formatErrorAsJson(e.message))
        console.log(`Error in ${req.method} ${req.url}: ${e.message}`)
      }
    }
  }

  POST.apiDoc = {
    summary: "Set URL for service",
    operationId: "setServiceUrl",
    parameters: [
      {
        name: "serviceName",
        in: "path",
        schema:
          { type: "string" },
        required: true,
        description: "Service Name",
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                example: "http://recommendations:8001"
              }
            }
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: "The updated service.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ConfigService"
            }
          }
        }
      },
      404: {
        description: "Service not found.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error"
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
