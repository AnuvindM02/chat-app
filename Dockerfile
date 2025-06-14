# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --base-href /

# Stage 2: Serve app with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/chat-app/browser /usr/share/nginx/html

# Replace default nginx config
COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]