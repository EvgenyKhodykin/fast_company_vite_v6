FROM node:19-alpine as client
WORKDIR /app/client
COPY client/package*.json ./
RUN yarn
COPY client ./
RUN yarn build

FROM node:19-alpine as server
WORKDIR /app
COPY server/package*.json ./
RUN yarn
COPY server ./
COPY --from=client /app/client/dist ./client/
EXPOSE 8080
CMD [ "yarn", "start" ]