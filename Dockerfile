FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
COPY .env.production ./.env
RUN npm run build

FROM node:14-alpine3.10 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
COPY --from=ts-compiler /usr/app/.env ./
RUN npm install --only=production

FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["index.js"]