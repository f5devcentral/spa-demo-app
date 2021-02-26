# --------- Base ---------
From node:lts-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

# --------- Release ---------
FROM nginx:stable-alpine as release

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]