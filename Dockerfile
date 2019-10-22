FROM node:12.12.0-alpine
LABEL maintainer "mayorov@max mmaerov@gmail.com"
WORKDIR /usr/app
COPY package.json /usr/app
RUN npm install
COPY . /usr/app
CMD ["node", "server.js"]
