# ===== Stage 1 =====

# Naming the stage so that it can be referenced by later stages
FROM node:14.18.1 as build 
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

# Creating the production-ready files to be served by NGINX in stage 2
RUN ["yarn", "build"]      

# ===== Stage 2 =====

FROM nginx

# From Stage 1, copy the build files into the default directory that NGINX serves files from
COPY --from=build /app/build /usr/share/nginx/html
