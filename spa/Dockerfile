# --------- Base ---------
FROM node:16-alpine AS base

WORKDIR /app

# --------- Builder ---------
FROM base as builder

COPY ./ ./

RUN npm install

ARG VITE_APP_GLOBAL_BACKGROUND_COLOR
ENV VITE_APP_GLOBAL_BACKGROUND_COLOR $VITE_APP_GLOBAL_BACKGROUND_COLOR

ARG VITE_APP_GLOBAL_COLOR
ENV VITE_APP_GLOBAL_COLOR $VITE_APP_GLOBAL_COLOR

RUN npm run build

# --------- Release ---------
FROM nginx:stable-alpine as release

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
