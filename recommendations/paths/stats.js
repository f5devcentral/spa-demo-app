export default function () {
  let operations = {
    GET
  }

  function GET(req, res) {
    res.status(200).json({})
  }

  GET.apiDoc = {
    summary: 'Returns Recommendations API status.',
    operationId: 'status',
    parameters: [],
    responses: {
      200: {
        description: 'An empty object.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {}
            }
          }
        }
      },
      default: {
        description: 'An error occurred',
        content: {
          'application/json': {
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
