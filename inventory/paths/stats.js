export default function () {
  let operations = {
    GET
  }

  function GET(req, res) {
    console.log(req.ip + " - - [" + new Date().toISOString() + "] \"GET /api/stats HTTP/1.1\" 200 - \"-\" \"" + req.headers["user-agent"] + "\"")
    res.status(200).json({})
  }

  GET.apiDoc = {
    summary: "Returns Inventory API status.",
    operationId: "status",
    parameters: [],
    responses: {
      200: {
        description: "An empty object.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {}
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
