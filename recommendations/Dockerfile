# --------- Base ---------
FROM node:16-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

ARG SEED_FILE
ENV SEED_FILE $SEED_FILE

COPY ./recommendations/package*.json ./

RUN npm install

COPY ./recommendations ./
COPY $SEED_FILE ./products.json

RUN npm prune --production 

# --------- Release ---------
FROM base as release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ ./
COPY --from=builder /app/products.json ./

USER node

CMD ["node", "./server.js"]