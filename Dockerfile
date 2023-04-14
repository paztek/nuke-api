FROM node:18-alpine as base

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json /

EXPOSE 3000

RUN npm ci

COPY . /app

CMD ["node", "bin/www"]
