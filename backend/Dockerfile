FROM node:23 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]


FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev 
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]