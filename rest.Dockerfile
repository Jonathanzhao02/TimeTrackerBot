ARG NODE_ENV=development

FROM node:20-alpine3.19 AS build

WORKDIR /app

ENV NODE_ENV $NODE_ENV
COPY yarn.lock package.json ./
COPY packages ./packages
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
RUN yarn build:rest

FROM node:20-alpine3.19 AS production

WORKDIR /app

COPY --from=build /app/yarn.lock /app/package.json ./
COPY --from=build /app/packages ./packages
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn workspace @time-tracker/rest install --production

FROM gcr.io/distroless/nodejs20-debian12 AS final

WORKDIR /app

ENV USE_SECRETS 1
COPY --from=production /app .

EXPOSE 3000

WORKDIR /app/packages/rest

CMD ["dist/index.js"]
