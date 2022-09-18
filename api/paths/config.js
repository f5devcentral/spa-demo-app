import { formatErrorAsJson } from '../helpers/utils.js'

export default function (locatorService) {
  let operations = {
    GET
  };

  async function GET(req, res) {
    try {
      res.status(200).json(locatorService.getAllServices());
    }
    catch (e) {
      res.status(500).json(formatErrorAsJson(e.message))
      console.log(`Error in ${req.method} ${req.url}: ${e.message}`);
    }
  }

  GET.apiDoc = {
    summary: 'Returns remote service URLs.',
    operationId: 'getAllServices',
    parameters: [],
    responses: {
      200: {
        description: 'A list of remote services.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ConfigService'
              }
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
  };

  return operations;
}
