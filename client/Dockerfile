FROM node:lts-alpine
ENV PORT=$CLIENT_PORT
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE $CLIENT_PORT
CMD [ "npm", "run", "dev"]