FROM node:18 as client
WORKDIR /app/client
COPY client package.json /app/client/
RUN yarn 
COPY client /app/client
RUN yarn build

FROM node:alpine
WORKDIR /app/
COPY server/package.json /app
RUN yarn
COPY server /app
COPY --from=client /app/client/build /app/client
EXPOSE 8080
CMD [ "yarn", 'start' ]