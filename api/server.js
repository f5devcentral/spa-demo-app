import express from 'express'
import bodyParser from 'body-parser'

import path from 'path'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { initialize } from 'express-openapi'
import ProductsService from './services/productsService.js'
import ApiDoc from './api-doc.js'
import LocatorService from './services/locatorService.js'
import StatsService from './services/statsService.js'

const LISTENER_TCP_PORT = 8000
const imageDirectory = process.env.IMAGE_DIRECTORY || "beer"
const __dirname = path.resolve()
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, `assets/${imageDirectory}`)))

app.listen(LISTENER_TCP_PORT, () => {
  console.log(`Server is listening on port ${LISTENER_TCP_PORT}`)
  console.log(`path is ${ __dirname }`)
})

await initialize({
  app,
  apiDoc: ApiDoc,
  dependencies: {
    locatorService: LocatorService,
    productsService: ProductsService,
    statsService: StatsService,
  },
  paths: path.resolve(__dirname, 'paths/'),
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
