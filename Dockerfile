FROM node:latest

COPY package.json /app/package.json
WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 8080
CMD node server.js