export default function (statsService) {
  let operations = {
    GET
  }

  async function GET(req, res) {
    let stats
    switch (req.params.serviceName) {
      case "database":
        stats = await statsService.getDatabaseStats()
        break
      case "inventory":
      case "recommendations":
        stats = await statsService.getRestApiStats(req.params.serviceName)
        break
      default:
        stats = {}
    }
    res.status(200).json(stats)
  }

  GET.apiDoc = {
    summary: 'Returns statistics for a specific service name.',
    operationId: 'get_Stats',
    parameters: [
      {
        name: 'serviceName',
        in: 'path',
        schema:
          { type: 'string' },
        required: true,
        description: 'Service Name',
      }
    ],
    responses: {
      200: {
        description: 'A single remote service performance stats.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ServiceStatus'
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
