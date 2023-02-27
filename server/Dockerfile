FROM node:lts-alpine

WORKDIR /usr/server

EXPOSE  5006

COPY package.json  package-lock.json tsconfig.json ./
COPY ./src ./src

RUN npm install

RUN sh -c "apk add --no-cache ghostscript && apk add --no-cache graphicsmagick"

CMD npm start

