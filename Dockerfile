FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN apk add --no-cache make gcc g++ python
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
