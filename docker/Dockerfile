FROM node:16-alpine

WORKDIR /server

COPY . .

RUN npm i

ENTRYPOINT [ "npm", "start" ]