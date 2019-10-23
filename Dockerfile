FROM node:12.12.0-alpine
LABEL maintainer "mayorov@max mmaerov@gmail.com"
WORKDIR /usr/app
COPY app/ /usr/app/
RUN npm install
CMD ["npm", "start"]
