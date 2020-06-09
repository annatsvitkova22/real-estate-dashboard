# Stage 1 - the build process
FROM node:13.12.0 as build-deps
WORKDIR .
COPY package.json yarn.lock ./
RUN yarn
RUN npm i -g @angular/cli
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY --from=build-deps dist/real-estate-dashboard /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
