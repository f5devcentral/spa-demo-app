import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { initialize } from 'express-openapi';
import ApiDoc from './api-doc.js';
import InventoryService from './services/inventoryService.js';


const LISTENER_TCP_PORT = 8002;
const __dirname = path.resolve();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(LISTENER_TCP_PORT, () => {
    console.log(`Server is listening on port ${LISTENER_TCP_PORT}`);
});

initialize({
  app,
  apiDoc: ApiDoc,
  dependencies: {
    inventoryService: InventoryService
  },
  paths: path.resolve(__dirname, 'paths/'),
});

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://localhost:${LISTENER_TCP_PORT}/api/api-docs`,
    },
  })
);

export default app;