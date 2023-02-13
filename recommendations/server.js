import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import swaggerUi from "swagger-ui-express"
import { initialize } from "express-openapi"
import ApiDoc from "./api-doc.js"
import RecommendationsService from "./services/recommendationsService.js"
import { formatErrorAsJson } from "./helpers/utils.js"

const LISTENER_TCP_PORT = process.env["RECOMMENDATIONS_SERVICE_PORT"] || 8001
const __dirname = path.resolve()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(LISTENER_TCP_PORT, () => {
  console.log(`Server is listening on port ${LISTENER_TCP_PORT}`)
})

await initialize({
  app,
  apiDoc: ApiDoc,
  dependencies: {
    recommendationsService: RecommendationsService
  },
  paths: path.resolve(__dirname, "paths/"),
  errorMiddleware: function (err, req, res, next) {
    res.status(err.status).json(formatErrorAsJson(err))
    console.log(err)
    next(err)
  },
})

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://localhost:${LISTENER_TCP_PORT}/api/api-docs`,
    },
  })
)

export default app
