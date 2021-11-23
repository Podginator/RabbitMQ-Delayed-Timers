FROM node:16 as builder

WORKDIR /usr/src/app

COPY dist ./dist
COPY node_modules ./node_modules

EXPOSE 8000

CMD [ "node", "dist/app.js", "main" ]
