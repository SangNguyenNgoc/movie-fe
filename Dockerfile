# Giai đoạn 1: Build ứng dụng React
FROM node:22.8.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
ARG REACT_APP_BASE_URL
ARG REACT_APP_AUTH_URL
ARG REACT_APP_APP_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_AUTH_URL=$REACT_APP_AUTH_URL
ENV REACT_APP_APP_URL=$REACT_APP_APP_URL

RUN npm run build

# Giai đoạn 2: Dùng Nginx để phục vụ React App
FROM nginx:latest

# Copy file build React vào Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
