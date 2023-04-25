# --------- Base ---------
FROM node:18-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./ ./
COPY ./inventory.json ./

RUN npm prune --production 

# --------- Release ---------
FROM base as release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ ./
COPY --from=builder /app/inventory.json ./

USER node

CMD ["node", "./server.js"]
