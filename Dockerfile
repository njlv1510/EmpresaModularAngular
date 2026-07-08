FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/empresa-modular-angular/browser /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf && \
    sed -i '/user nginx;/d' /etc/nginx/nginx.conf && \
    mkdir -p /tmp/nginx/client_temp && \
    chmod -R 777 /tmp/nginx

ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]