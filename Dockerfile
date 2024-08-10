# ใช้ base image node
FROM node:16

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json มาที่ working directory
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดมาที่ working directory
COPY . .

# เปิดพอร์ต
EXPOSE 5000

# รันคำสั่ง
CMD ["npm", "run", "dev"]
