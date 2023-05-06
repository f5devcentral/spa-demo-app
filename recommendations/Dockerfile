# --------- Base ---------
FROM node:18-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY ./recommendations/package*.json ./

RUN npm install

COPY ./recommendations ./

RUN npm prune --production 

# --------- Release ---------
FROM base as release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ ./
COPY ./mongo-seed/beerProducts.json ./
COPY ./mongo-seed/coffeeProducts.json ./

USER node

CMD ["node", "./server.js"]
