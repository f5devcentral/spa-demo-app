# --------- Base ---------
FROM node:lts-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./nginx.conf ./nginx.conf

ARG VUE_APP_GLOBAL_BACKGROUND_COLOR
ENV VUE_APP_GLOBAL_BACKGROUND_COLOR $VUE_APP_GLOBAL_BACKGROUND_COLOR

ARG VUE_APP_GLOBAL_COLOR
ENV VUE_APP_GLOBAL_COLOR $VUE_APP_GLOBAL_COLOR

RUN npm run build

# --------- Release ---------
FROM nginx:stable-alpine as release

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]