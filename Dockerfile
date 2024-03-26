FROM node:latest
WORKDIR /aluraflix-api
COPY package*.json ./
RUN npm install
COPY .env ./
COPY . .
RUN npm run migrate
EXPOSE 3333
CMD ["npm", "run", "dev"]
