FROM node:16 AS builder
WORKDIR /home
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build:prod

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx-k8s.conf /etc/nginx/nginx.conf
COPY --from=builder /home/dist/client/browser .