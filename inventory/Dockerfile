# --------- Base ---------
FROM node:12-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./inventory.json ./

RUN npm run build

RUN npm prune --production 

# --------- Release ---------
FROM base as release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/inventory.json ./

USER node

CMD ["node", "./dist/server.js"]