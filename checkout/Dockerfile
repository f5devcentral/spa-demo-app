# --------- Base ---------
FROM node:19-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm prune --production 

# --------- Release ---------
FROM base as release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ ./

USER node

CMD ["node", "--import", "./tracing.js", "./server.js"]
