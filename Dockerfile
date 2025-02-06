# Sử dụng Node image làm base image
FROM node:18

# Tạo và thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào container
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc của dự án
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng vào container
COPY . .

# Xây dựng ứng dụng React
RUN npm run build

# Cung cấp cổng mà ứng dụng sẽ chạy trên đó
EXPOSE 3000

# Chạy ứng dụng React trong chế độ production
CMD ["npx", "serve", "build"]
