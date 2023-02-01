FROM node:lts-alpine

WORKDIR /usr/src/server

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY ./src ./src

RUN npm install

CMD npm run dev

