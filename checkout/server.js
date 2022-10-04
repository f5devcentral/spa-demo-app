import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import swaggerUi from "swagger-ui-express"
import { initialize } from "express-openapi"
import ApiDoc from "./api-doc.js"
import CheckoutService from "./services/orderService.js"

const LISTENER_TCP_PORT = 8003
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
    checkoutService: CheckoutService
  },
  paths: path.resolve(__dirname, "paths/"),
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
