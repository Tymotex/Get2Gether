# ===== Building Production-Ready Files =====
FROM node:14-alpine as clientBuild

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build 

# # Outputs static build files to `./out`
RUN yarn export

# ===== NGINX =====

FROM nginx

COPY --from=clientBuild /app/out /usr/share/nginx/html
