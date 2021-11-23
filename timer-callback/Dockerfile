FROM node:16 as builder

WORKDIR /usr/src/app

COPY src ./src
COPY node_modules ./node_modules

EXPOSE 8001

CMD [ "node", "src/app.js", "main" ]
