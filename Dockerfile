FROM node:12.13-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --network-timeout 3600000

COPY . .

RUN yarn build

FROM node:12.13-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --network-timeout 3600000

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
