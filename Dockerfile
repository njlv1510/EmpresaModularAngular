FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/empresa-modular-angular/browser /usr/share/nginx/html

RUN mkdir -p \
    /tmp/client_temp \
    /tmp/proxy_temp \
    /tmp/fastcgi_temp \
    /tmp/uwsgi_temp \
    /tmp/scgi_temp \
    && chmod -R 777 /tmp

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]