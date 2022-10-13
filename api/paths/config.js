export default function (locatorService) {
  let operations = {
    GET
  }

  function GET(req, res) {
    res.status(200).json(locatorService.getAllServices())
  }

  GET.apiDoc = {
    summary: "Returns remote service URLs.",
    operationId: "getAllServices",
    parameters: [],
    responses: {
      200: {
        description: "A list of remote services.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/ConfigService"
              }
            }
          }
        }
      },
      default: {
        description: "An error occurred.",
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
