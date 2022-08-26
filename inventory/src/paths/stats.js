export default function () {
  let operations = {
    GET
  };

  async function GET(req, res) {
    // 10.1.1.6 - - [05/Mar/2021:16:31:09 +0000] "GET /products HTTP/1.1" 200 582 "-""Envoy/HC" "-"
    console.log(req.ip + ' - - [' + new Date().toISOString() + '] "GET /api/stats HTTP/1.1" 200 - "-" "' + req.headers['user-agent'] + '"')
    res.status(200).json({});
  }

  GET.apiDoc = {
    summary: 'Returns Inventory API status.',
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
  };

  return operations;
}
