FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN npx prisma generate

CMD sh prisma-migration.sh && yarn run start

# TODO: Should probably set up NGINX as a reverse proxy
