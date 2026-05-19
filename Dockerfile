FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install && npm --prefix backend install && npm --prefix frontend install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
