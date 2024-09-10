FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma migrate deploy
EXPOSE 3000
CMD ["npm", "run", "start"]