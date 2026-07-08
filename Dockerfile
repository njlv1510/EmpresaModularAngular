# Etapa de compilación
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:alpine

COPY --from=build /app/dist/empresa-modular-angular/browser /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]